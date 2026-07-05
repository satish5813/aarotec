import Database from "better-sqlite3";
import { existsSync, mkdirSync } from "node:fs";
import path from "node:path";

// SQLite-backed lead storage. The DB file lives in ./data/leads.db (created on
// first use). This is a synchronous, file-based store — perfect for a single
// server / low-volume marketing site. For serverless (Vercel) the filesystem is
// ephemeral; see the note in ADMIN_SETUP.md before relying on it in production.

let _db: Database.Database | null = null;

export type Lead = {
  id: number;
  name: string;
  email: string;
  phone: string;
  city: string;
  source: string;
  userAgent: string;
  createdAt: string; // ISO 8601
};

function getDbPath() {
  const dir = process.env.LEADS_DB_DIR || path.join(process.cwd(), "data");
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  return path.join(dir, "leads.db");
}

export function db(): Database.Database {
  if (_db) return _db;
  const database = new Database(getDbPath());
  database.pragma("journal_mode = WAL");
  database.exec(`
    CREATE TABLE IF NOT EXISTS leads (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      name       TEXT NOT NULL,
      email      TEXT NOT NULL,
      phone      TEXT NOT NULL,
      city       TEXT NOT NULL,
      source     TEXT NOT NULL DEFAULT '',
      userAgent  TEXT NOT NULL DEFAULT '',
      createdAt  TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_leads_createdAt ON leads (createdAt DESC);
  `);
  _db = database;
  return database;
}

export function insertLead(lead: Omit<Lead, "id" | "createdAt">): Lead {
  const createdAt = new Date().toISOString();
  const info = db()
    .prepare(
      `INSERT INTO leads (name, email, phone, city, source, userAgent, createdAt)
       VALUES (@name, @email, @phone, @city, @source, @userAgent, @createdAt)`
    )
    .run({ ...lead, createdAt });
  return { id: Number(info.lastInsertRowid), createdAt, ...lead };
}

export function listLeads(): Lead[] {
  return db()
    .prepare(`SELECT * FROM leads ORDER BY id DESC`)
    .all() as Lead[];
}

export function countLeads(): number {
  const row = db().prepare(`SELECT COUNT(*) AS c FROM leads`).get() as {
    c: number;
  };
  return row.c;
}

export function deleteLead(id: number): void {
  db().prepare(`DELETE FROM leads WHERE id = ?`).run(id);
}
