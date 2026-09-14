import 'dotenv/config';
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import pg from 'pg';

const { Client } = pg;

const __dirname = dirname(fileURLToPath(import.meta.url));
const migrationsDir = join(__dirname, '..', 'migrations');

const connectionString = process.env.DATABASE_URL || '';
if (!connectionString) {
  console.error('ERROR: DATABASE_URL is not set (check your .env).');
  process.exit(1);
}

async function main() {
  const files = readdirSync(migrationsDir)
    .filter((f) => f.endsWith('.sql'))
    .sort();

  if (files.length === 0) {
    console.log('No .sql migrations found.');
    return;
  }

  const client = new Client({
    connectionString: connectionString.replace(
      /[?&](sslmode|channel_binding)=[^&]*/g,
      '',
    ),
    ssl: { require: true, rejectUnauthorized: false },
  });

  await client.connect();
  console.log('Connected to Neon Postgres.');

  try {
    for (const file of files) {
      const sql = readFileSync(join(migrationsDir, file), 'utf8');
      process.stdout.write(`Applying ${file} ... `);
      await client.query(sql);
      console.log('done');
    }
    console.log('\nAll migrations applied successfully.');
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error('\nMigration failed:', err.message);
  process.exit(1);
});
