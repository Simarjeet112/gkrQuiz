import sqlite3 from 'sqlite3';
import pg from 'pg';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

export interface DBResult {
  changes: number;
  lastInsertRowid?: number | bigint;
}

export interface IDatabase {
  query<T = any>(sql: string, params?: any[]): Promise<T[]>;
  getOne<T = any>(sql: string, params?: any[]): Promise<T | null>;
  run(sql: string, params?: any[]): Promise<DBResult>;
  transaction<T>(fn: (tx: IDatabase) => Promise<T>): Promise<T>;
  close(): Promise<void>;
  isPostgres(): boolean;
}

class SQLiteDatabase implements IDatabase {
  private db: sqlite3.Database;

  constructor(filePath: string) {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    this.db = new sqlite3.Database(filePath);
    this.db.run('PRAGMA foreign_keys = ON;');
  }

  isPostgres(): boolean {
    return false;
  }

  query<T = any>(sql: string, params: any[] = []): Promise<T[]> {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) return reject(err);
        resolve((rows || []) as T[]);
      });
    });
  }

  getOne<T = any>(sql: string, params: any[] = []): Promise<T | null> {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, row) => {
        if (err) return reject(err);
        resolve((row as T) || null);
      });
    });
  }

  run(sql: string, params: any[] = []): Promise<DBResult> {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function (this: sqlite3.RunResult, err: Error | null) {
        if (err) return reject(err);
        resolve({
          changes: this.changes || 0,
          lastInsertRowid: this.lastID,
        });
      });
    });
  }

  async transaction<T>(fn: (tx: IDatabase) => Promise<T>): Promise<T> {
    await this.run('BEGIN TRANSACTION;');
    try {
      const result = await fn(this);
      await this.run('COMMIT;');
      return result;
    } catch (error) {
      await this.run('ROLLBACK;');
      throw error;
    }
  }

  close(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.close((err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  }
}

class PostgresDatabase implements IDatabase {
  private pool: pg.Pool;

  constructor(connectionString: string) {
    this.pool = new pg.Pool({
      connectionString,
      ssl: process.env.PG_SSL === 'true' ? { rejectUnauthorized: false } : false,
    });
  }

  isPostgres(): boolean {
    return true;
  }

  private convertParams(sql: string): string {
    // Convert ? to $1, $2, ...
    let paramIndex = 1;
    return sql.replace(/\?/g, () => `$${paramIndex++}`);
  }

  async query<T = any>(sql: string, params: any[] = []): Promise<T[]> {
    const pgSql = this.convertParams(sql);
    const res = await this.pool.query(pgSql, params);
    return res.rows as T[];
  }

  async getOne<T = any>(sql: string, params: any[] = []): Promise<T | null> {
    const rows = await this.query<T>(sql, params);
    return rows.length > 0 ? rows[0] : null;
  }

  async run(sql: string, params: any[] = []): Promise<DBResult> {
    const pgSql = this.convertParams(sql);
    const res = await this.pool.query(pgSql, params);
    return {
      changes: res.rowCount || 0,
    };
  }

  async transaction<T>(fn: (tx: IDatabase) => Promise<T>): Promise<T> {
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN');
      const txDb: IDatabase = {
        isPostgres: () => true,
        query: async <R = any>(sql: string, params: any[] = []) => {
          let paramIdx = 1;
          const converted = sql.replace(/\?/g, () => `$${paramIdx++}`);
          const r = await client.query(converted, params);
          return r.rows as R[];
        },
        getOne: async <R = any>(sql: string, params: any[] = []) => {
          let paramIdx = 1;
          const converted = sql.replace(/\?/g, () => `$${paramIdx++}`);
          const r = await client.query(converted, params);
          return (r.rows[0] as R) || null;
        },
        run: async (sql: string, params: any[] = []) => {
          let paramIdx = 1;
          const converted = sql.replace(/\?/g, () => `$${paramIdx++}`);
          const r = await client.query(converted, params);
          return { changes: r.rowCount || 0 };
        },
        transaction: async <R>(subFn: (subTx: IDatabase) => Promise<R>) => subFn(txDb),
        close: async () => {},
      };

      const result = await fn(txDb);
      await client.query('COMMIT');
      return result;
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  }

  async close(): Promise<void> {
    await this.pool.end();
  }
}

let dbInstance: IDatabase | null = null;

export function getDB(): IDatabase {
  if (dbInstance) return dbInstance;

  const databaseUrl = process.env.DATABASE_URL;
  if (databaseUrl && (databaseUrl.startsWith('postgres://') || databaseUrl.startsWith('postgresql://'))) {
    console.log('[DB] Connecting to PostgreSQL database...');
    dbInstance = new PostgresDatabase(databaseUrl);
  } else {
    const dbPath = process.env.SQLITE_PATH || path.resolve(process.cwd(), 'data', 'geekroom_arena.db');
    console.log(`[DB] Using SQLite database at: ${dbPath}`);
    dbInstance = new SQLiteDatabase(dbPath);
  }

  return dbInstance;
}

export function setTestDB(customDb: IDatabase) {
  dbInstance = customDb;
}
