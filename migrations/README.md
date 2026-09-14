# Database migrations (Neon Postgres)

Plain `.sql` files applied in filename order. Each file is written to be
**idempotent** (safe to re-run) using `IF NOT EXISTS` / `CREATE EXTENSION IF NOT EXISTS`.

## Apply

Requires `DATABASE_URL` in `.env` (the Neon connection string).

```bash
npm run migrate
```

This runs every file in `migrations/*.sql` in order inside a single connection.

> Note: the app server (`server/index.js`) also auto-creates these tables on boot
> via `initSchema()`, so migrations are primarily for explicit/CI-driven setup and
> for changes beyond the base schema.

## Add a migration

Create the next numbered file, e.g. `0002_add_something.sql`, and keep it idempotent.
