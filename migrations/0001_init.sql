-- Migration 0001: initial schema for JayCee Trading (Neon Postgres)
-- Safe to run multiple times (idempotent).

-- Needed for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ---------------------------------------------------------------------------
-- Wholesale inquiries submitted from the site's Wholesale modal
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS inquiries (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_name  TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  email          TEXT NOT NULL,
  phone          TEXT NOT NULL,
  business_type  TEXT NOT NULL,
  message        TEXT,
  status         TEXT NOT NULL DEFAULT 'pending'
                   CHECK (status IN ('pending', 'contacted', 'fulfilled')),
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_inquiries_status     ON inquiries (status);

-- ---------------------------------------------------------------------------
-- Single-row CMS store: the entire editable site content as a JSONB blob,
-- edited through the admin dashboard.
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS site_content (
  id         TEXT PRIMARY KEY DEFAULT 'default',
  content    JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
