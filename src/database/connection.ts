import mysql from "mysql2/promise";
import { env } from "@/config/env.server";


const globalForDb = globalThis as unknown as {
  db: mysql.Pool | undefined;
};

const db =
  globalForDb.db ??
  mysql.createPool({
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USER,
    password: env.DB_PASSWORD!,
    database: env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
    ssl: {
      minVersion: "TLSv1.2",
      rejectUnauthorized: true,
    },
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.db = db;
}

if (!globalForDb.db) {
  (async () => {
    try {
      const conn = await db.getConnection();
      console.log("✅ MySQL Connected");
      conn.release();
    } catch (error) {
      console.error("❌ MySQL Error", error);
    }
  })();
}

export default db;
