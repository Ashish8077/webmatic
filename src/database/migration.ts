import fs from "fs";
import path from "path";

import { PoolConnection, RowDataPacket } from "mysql2/promise";

import db from "./connection";

const MIGRATIONS_DIR = path.join(process.cwd(), "src/database/migrations");

interface MigrationRow extends RowDataPacket {
  migration: string;
}

interface BatchRow extends RowDataPacket {
  batch: number;
}

async function ensureMigrationsTable(): Promise<void> {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS migrations (
      id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

      migration VARCHAR(255) NOT NULL UNIQUE,

      batch INT UNSIGNED NOT NULL,

      executed_at TIMESTAMP NOT NULL
      DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

function getMigrationFiles(): string[] {
  return fs
    .readdirSync(MIGRATIONS_DIR)
    .filter((file) => /^\d{3}_.+\.sql$/.test(file))
    .sort();
}

async function getExecutedMigrations(): Promise<Set<string>> {
  const [rows] = await db.execute<MigrationRow[]>(
    `
    SELECT migration
    FROM migrations
    `,
  );

  return new Set(rows.map((row) => row.migration));
}

async function getNextBatchNumber(): Promise<number> {
  const [rows] = await db.execute<BatchRow[]>(
    `
    SELECT COALESCE(MAX(batch), 0) AS batch
    FROM migrations
    `,
  );

  return Number(rows[0]?.batch ?? 0) + 1;
}

async function markMigrationAsExecuted(
  connection: PoolConnection,
  migration: string,
  batch: number,
): Promise<void> {
  await connection.execute(
    `
    INSERT INTO migrations
    (
      migration,
      batch
    )
    VALUES (?, ?)
    `,
    [migration, batch],
  );
}

async function runMigrations(): Promise<void> {
  try {
    console.log("\n🚀 Running database migrations...\n");

    await ensureMigrationsTable();

    const files = getMigrationFiles();

    const executed = await getExecutedMigrations();

    const batch = await getNextBatchNumber();

    for (const file of files) {
      if (executed.has(file)) {
        console.log(`⏭ Skipped: ${file}`);
        continue;
      }

      const sql = fs
        .readFileSync(path.join(MIGRATIONS_DIR, file), "utf8")
        .trim();

      if (!sql) continue;

      const connection = await db.getConnection();

      try {
        await connection.beginTransaction();

        await connection.query(sql);

        await markMigrationAsExecuted(connection, file, batch);

        await connection.commit();

        console.log(`✅ Executed: ${file}`);
      } catch (error) {
        await connection.rollback();
        throw error;
      } finally {
        connection.release();
      }
    }

    console.log("\n🎉 Migrations completed");
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await db.end();
  }
}

runMigrations();
