import 'dotenv/config';
import pg from 'pg';

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL || '';

export const isDbConfigured = Boolean(connectionString);

/**
 * Shared Neon Postgres connection pool.
 * Neon requires SSL. Using the pooled connection string is recommended
 * for serverless / many short-lived connections.
 */
export const pool = isDbConfigured
  ? new Pool({
      // Strip sslmode/channel_binding from the URL and configure SSL explicitly
      // so pg doesn't emit deprecation warnings and we control verification.
      connectionString: connectionString.replace(/[?&](sslmode|channel_binding)=[^&]*/g, ''),
      ssl: { require: true, rejectUnauthorized: false },
      max: 5,
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 10_000,
    })
  : null;

/**
 * Create the tables this app relies on if they do not already exist.
 * Safe to call on every boot.
 */
export async function initSchema() {
  if (!pool) return;

  await pool.query(`
    CREATE TABLE IF NOT EXISTS inquiries (
      id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      business_name  TEXT NOT NULL,
      contact_person TEXT NOT NULL,
      email          TEXT NOT NULL,
      phone          TEXT NOT NULL,
      business_type  TEXT NOT NULL,
      message        TEXT,
      status         TEXT NOT NULL DEFAULT 'pending',
      created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `);

  // Single-row store for the CMS/site content JSON blob.
  await pool.query(`
    CREATE TABLE IF NOT EXISTS site_content (
      id          TEXT PRIMARY KEY DEFAULT 'default',
      content     JSONB NOT NULL,
      updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `);
}

export async function healthCheck() {
  if (!pool) return { ok: false, reason: 'DATABASE_URL not configured' };
  try {
    const { rows } = await pool.query('SELECT now() AS now');
    return { ok: true, now: rows[0].now };
  } catch (err) {
    return { ok: false, reason: err.message };
  }
}
