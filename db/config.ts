import { drizzle } from "drizzle-orm/expo-sqlite";
import * as SQLite from "expo-sqlite";
import { sessions, streaks } from "./schemas";

const sqliteDB = SQLite.openDatabaseSync("app.db");

export const db = drizzle(sqliteDB, {
  schema: {
    streaks,
    sessions,
  },
});

async function initTables(db: SQLite.SQLiteDatabase) {
  try {
    await db.execAsync(`
		PRAGMA journal_mode = WAL;
		CREATE TABLE IF NOT EXISTS sessions (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			start_time TEXT NOT NULL,
			end_time TEXT,
			duration INTEGER NOT NULL,
			created_at TEXT NOT NULL
		);
		CREATE TABLE IF NOT EXISTS streaks (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			date TEXT NOT NULL UNIQUE,
			count INTEGER NOT NULL DEFAULT 1,
			created_at TEXT NOT NULL
		);
	`);
  } catch (error) {
    console.log("Error initializing db: ", error);
    throw error;
  }
}
