/**
 * Thin client-side API helper.
 *
 * The browser never talks to Postgres directly — it calls same-origin `/api/*`
 * endpoints, which the Express server (server/index.js) backs with Neon.
 * In dev, Vite proxies `/api` to the API server (see vite.config.ts).
 */

import type { WholesaleInquiry } from '../types/database';
import type { SiteContentState } from '../types/siteContent';

const ADMIN_TOKEN_KEY = 'jaycee_admin_token_v1';

// ---------------------------------------------------------------------------
// Admin bearer token management
// ---------------------------------------------------------------------------
let adminToken: string | null = (() => {
  try {
    return sessionStorage.getItem(ADMIN_TOKEN_KEY);
  } catch {
    return null;
  }
})();

export function setAdminToken(token: string | null): void {
  adminToken = token;
  try {
    if (token) sessionStorage.setItem(ADMIN_TOKEN_KEY, token);
    else sessionStorage.removeItem(ADMIN_TOKEN_KEY);
  } catch {
    /* ignore storage errors */
  }
}

export function getAdminToken(): string | null {
  return adminToken;
}

async function request<T>(
  path: string,
  init?: RequestInit,
  opts?: { auth?: boolean },
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...((init?.headers as Record<string, string>) || {}),
  };
  if (opts?.auth && adminToken) {
    headers.Authorization = `Bearer ${adminToken}`;
  }
  const res = await fetch(path, { ...init, headers });
  if (!res.ok) {
    throw new Error(`API ${path} failed: ${res.status}`);
  }
  return (await res.json()) as T;
}

/**
 * Exchange the admin passkey for a bearer token from the server.
 * Returns true on success (and stores the token for subsequent calls).
 */
export async function adminLogin(passkey: string): Promise<boolean> {
  try {
    const data = await request<{ ok: boolean; token?: string }>('/api/admin/login', {
      method: 'POST',
      body: JSON.stringify({ passkey }),
    });
    if (data.ok && data.token) {
      setAdminToken(data.token);
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

export function adminLogout(): void {
  setAdminToken(null);
}

// ---------------------------------------------------------------------------
// Inquiries
// ---------------------------------------------------------------------------
export async function submitInquiry(
  inquiry: WholesaleInquiry,
): Promise<{ ok: boolean; persisted?: boolean; id?: string }> {
  return request('/api/inquiries', {
    method: 'POST',
    body: JSON.stringify(inquiry),
  });
}

export async function fetchInquiries(): Promise<WholesaleInquiry[]> {
  const data = await request<{ ok: boolean; inquiries: WholesaleInquiry[] }>(
    '/api/inquiries',
    undefined,
    { auth: true },
  );
  return data.inquiries ?? [];
}

export async function updateInquiryStatus(
  id: string,
  status: NonNullable<WholesaleInquiry['status']>,
): Promise<boolean> {
  try {
    const data = await request<{ ok: boolean }>(
      `/api/inquiries/${id}`,
      {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      },
      { auth: true },
    );
    return Boolean(data.ok);
  } catch {
    return false;
  }
}

// ---------------------------------------------------------------------------
// Site content (CMS)
// ---------------------------------------------------------------------------
export async function fetchSiteContent(): Promise<SiteContentState | null> {
  try {
    const data = await request<{ ok: boolean; content: SiteContentState | null }>(
      '/api/content',
    );
    return data.content ?? null;
  } catch {
    return null;
  }
}

export async function saveSiteContent(content: SiteContentState): Promise<boolean> {
  try {
    const data = await request<{ ok: boolean; persisted?: boolean }>(
      '/api/content',
      {
        method: 'PUT',
        body: JSON.stringify({ content }),
      },
      { auth: true },
    );
    return Boolean(data.ok);
  } catch {
    return false;
  }
}
