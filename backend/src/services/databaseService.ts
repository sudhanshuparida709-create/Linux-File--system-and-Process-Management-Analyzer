import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";


const databasePath = path.resolve(
  process.env.DATABASE_PATH ||
    path.join(process.cwd(), "data", "app.db")
);

fs.mkdirSync(path.dirname(databasePath), { recursive: true });

const db: Database.Database = new Database(databasePath);

db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");
db.pragma("busy_timeout = 5000");

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE COLLATE NOCASE,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'user'
      CHECK (role IN ('admin', 'user')),
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE INDEX IF NOT EXISTS idx_users_email
  ON users(email);
`);

export interface UserRecord {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  role: "admin" | "user";
  created_at: string;
}

export interface PublicUser {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
  created_at: string;
}

export function findUserByEmail(
  email: string
): UserRecord | undefined {
  return db
    .prepare("SELECT * FROM users WHERE email = ?")
    .get(email.trim().toLowerCase()) as UserRecord | undefined;
}

export function findUserById(
  id: number
): UserRecord | undefined {
  return db
    .prepare("SELECT * FROM users WHERE id = ?")
    .get(id) as UserRecord | undefined;
}

export function createUser(
  name: string,
  email: string,
  passwordHash: string,
  role: "admin" | "user" = "user"
): PublicUser {
  const result = db
    .prepare(`
      INSERT INTO users (name, email, password_hash, role)
      VALUES (?, ?, ?, ?)
    `)
    .run(
      name.trim(),
      email.trim().toLowerCase(),
      passwordHash,
      role
    );

  const user = findUserById(Number(result.lastInsertRowid));

  if (!user) {
    throw new Error("Unable to retrieve the created user.");
  }

  return toPublicUser(user);
}

export function toPublicUser(user: UserRecord): PublicUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    created_at: user.created_at,
  };
}

export function closeDatabase(): void {
  if (db.open) {
    db.close();
  }
}

export default db;