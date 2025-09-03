import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const streaks = sqliteTable("streaks", {
  id: integer("id").primaryKey(),
  date: text("date").notNull(),
  count: integer("count").notNull().default(1),
  createdAt: text("created_at").notNull(),
});

export const sessions = sqliteTable("sessions", {
  id: integer("id").primaryKey(),
  startTime: text("start_time").notNull(),
  endTime: text("end_time").notNull(),
  duration: integer("duration").notNull(),
  createdAt: text("created_at").notNull(),
});

export type SelectSession = InferSelectModel<typeof sessions>;
export type InsertSession = InferInsertModel<typeof sessions>;
export type SelectStreak = InferSelectModel<typeof streaks>;
export type InsertStreak = InferInsertModel<typeof streaks>;
