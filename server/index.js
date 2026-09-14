import 'dotenv/config';
import express from 'express';
import { pool, isDbConfigured, initSchema, healthCheck } from './db.js';

const app = express();
app.use(express.json({ limit: '2mb' }));

const PORT = process.env.API_PORT || 8787;

const ADMIN_PASSKEY = process.env.ADMIN_PASSKEY || '5309';
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || '';

/**
 * Constant-time-ish string compare to avoid trivial timing leaks.
 */
function safeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string' || a.length !== b.length) {
    return false;
  }
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

/**
 * Middleware guarding admin-only routes. Requires:
 *   Authorization: Bearer <ADMIN_TOKEN>
 * If ADMIN_TOKEN is not configured, admin routes are refused outright so we
 * never fall open to an unauthenticated state.
 */
function requireAdmin(req, res, next) {
  if (!ADMIN_TOKEN) {
    return res
      .status(503)
      .json({ ok: false, error: 'Admin auth not configured (set ADMIN_TOKEN)' });
  }
  const header = req.get('authorization') || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  if (!safeEqual(token, ADMIN_TOKEN)) {
    return res.status(401).json({ ok: false, error: 'Unauthorized' });
  }
  next();
}

// ---------------------------------------------------------------------------
// Health
// ---------------------------------------------------------------------------
app.get('/api/health', async (_req, res) => {
  const db = await healthCheck();
  res.json({
    ok: true,
    dbConfigured: isDbConfigured,
    adminAuthConfigured: Boolean(ADMIN_TOKEN),
    db,
  });
});

// ---------------------------------------------------------------------------
// Admin auth: exchange the passkey for the bearer token
// ---------------------------------------------------------------------------
app.post('/api/admin/login', (req, res) => {
  const { passkey } = req.body || {};
  if (!ADMIN_TOKEN) {
    return res
      .status(503)
      .json({ ok: false, error: 'Admin auth not configured (set ADMIN_TOKEN)' });
  }
  if (!safeEqual(String(passkey || ''), ADMIN_PASSKEY)) {
    return res.status(401).json({ ok: false, error: 'Invalid passkey' });
  }
  res.json({ ok: true, token: ADMIN_TOKEN });
});

// ---------------------------------------------------------------------------
// Wholesale inquiries
// ---------------------------------------------------------------------------
app.post('/api/inquiries', async (req, res) => {
  const {
    businessName,
    contactPerson,
    email,
    phone,
    businessType,
    message,
  } = req.body || {};

  if (!businessName || !contactPerson || !email || !phone) {
    return res.status(400).json({ ok: false, error: 'Missing required fields' });
  }

  if (!pool) {
    // No DB configured — accept the request so the UX still works locally.
    return res.json({ ok: true, persisted: false });
  }

  try {
    const { rows } = await pool.query(
      `INSERT INTO inquiries
         (business_name, contact_person, email, phone, business_type, message, status)
       VALUES ($1, $2, $3, $4, $5, $6, 'pending')
       RETURNING id, created_at`,
      [businessName, contactPerson, email, phone, businessType || 'other', message || ''],
    );
    res.json({ ok: true, persisted: true, id: rows[0].id, createdAt: rows[0].created_at });
  } catch (err) {
    console.error('Failed to insert inquiry:', err);
    res.status(500).json({ ok: false, error: 'Failed to save inquiry' });
  }
});

app.get('/api/inquiries', requireAdmin, async (_req, res) => {
  if (!pool) return res.json({ ok: true, inquiries: [] });
  try {
    const { rows } = await pool.query(
      `SELECT id, business_name AS "businessName", contact_person AS "contactPerson",
              email, phone, business_type AS "businessType", message, status,
              created_at
         FROM inquiries
        ORDER BY created_at DESC
        LIMIT 500`,
    );
    res.json({ ok: true, inquiries: rows });
  } catch (err) {
    console.error('Failed to fetch inquiries:', err);
    res.status(500).json({ ok: false, error: 'Failed to fetch inquiries' });
  }
});

const INQUIRY_STATUSES = ['pending', 'contacted', 'fulfilled'];

app.patch('/api/inquiries/:id', requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body || {};

  if (!INQUIRY_STATUSES.includes(status)) {
    return res.status(400).json({ ok: false, error: 'Invalid status' });
  }
  if (!pool) return res.json({ ok: true, persisted: false });

  try {
    const { rowCount } = await pool.query(
      `UPDATE inquiries SET status = $1 WHERE id = $2`,
      [status, id],
    );
    if (rowCount === 0) {
      return res.status(404).json({ ok: false, error: 'Inquiry not found' });
    }
    res.json({ ok: true, persisted: true });
  } catch (err) {
    console.error('Failed to update inquiry status:', err);
    res.status(500).json({ ok: false, error: 'Failed to update inquiry status' });
  }
});

// ---------------------------------------------------------------------------
// Site content (CMS) — stored as a single JSONB row
// ---------------------------------------------------------------------------
app.get('/api/content', async (_req, res) => {
  if (!pool) return res.json({ ok: true, content: null });
  try {
    const { rows } = await pool.query(
      `SELECT content, updated_at AS "updatedAt" FROM site_content WHERE id = 'default'`,
    );
    if (!rows.length) return res.json({ ok: true, content: null });
    res.json({ ok: true, content: rows[0].content, updatedAt: rows[0].updatedAt });
  } catch (err) {
    console.error('Failed to fetch site content:', err);
    res.status(500).json({ ok: false, error: 'Failed to fetch site content' });
  }
});

app.put('/api/content', requireAdmin, async (req, res) => {
  const content = req.body?.content ?? req.body;
  if (!content || typeof content !== 'object') {
    return res.status(400).json({ ok: false, error: 'Invalid content payload' });
  }

  if (!pool) return res.json({ ok: true, persisted: false });

  try {
    await pool.query(
      `INSERT INTO site_content (id, content, updated_at)
       VALUES ('default', $1, now())
       ON CONFLICT (id) DO UPDATE
         SET content = EXCLUDED.content, updated_at = now()`,
      [content],
    );
    res.json({ ok: true, persisted: true });
  } catch (err) {
    console.error('Failed to save site content:', err);
    res.status(500).json({ ok: false, error: 'Failed to save site content' });
  }
});

// ---------------------------------------------------------------------------
// Boot
// ---------------------------------------------------------------------------
async function start() {
  if (isDbConfigured) {
    try {
      await initSchema();
      console.log('[api] Neon schema ready');
    } catch (err) {
      console.error('[api] Schema init failed:', err.message);
    }
  } else {
    console.warn('[api] DATABASE_URL not set — running without persistence');
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[api] listening on http://0.0.0.0:${PORT}`);
  });
}

start();
