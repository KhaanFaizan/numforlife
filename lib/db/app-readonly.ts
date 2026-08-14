import "server-only";

import mysql from "mysql2/promise";

let pool: mysql.Pool | null = null;

function getConfig(): mysql.PoolOptions | null {
  const host = process.env.DB_HOST;
  const user = process.env.DB_USER;
  const password = process.env.DB_PASS;
  const database = process.env.DB_NAME ?? "app_numforlife_com";
  const port = Number(process.env.DB_PORT ?? 3306);

  if (!host || !user || !password) return null;

  return {
    host,
    user,
    password,
    database,
    port,
    connectTimeout: 15_000,
    connectionLimit: 3,
    waitForConnections: true,
  };
}

/** Read-only pool for `app_numforlife_com`. Never write through this connection. */
export function getAppDbPool(): mysql.Pool | null {
  const config = getConfig();
  if (!config) return null;

  pool ??= mysql.createPool(config);
  return pool;
}
