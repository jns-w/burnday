import { format, fromZonedTime } from "date-fns-tz";
import { sql, eq } from "drizzle-orm";
import { db } from "./config";
import { InsertSession, sessions, streaks } from "./schemas";
import { startOfDay, subDays } from "date-fns";

function getUTCDateString(date: Date): string {
  return format(date, "yyyy-MM-dd", { timeZone: "UTC" });
}

export function createSession(session: InsertSession) {
  return db.insert(sessions).values(session).returning().get();
}

export function getTotalSessionTimeByDate(date: string) {
  const utcDate = getUTCDateString(new Date(date));
  const result = db
    .select({
      total: sql<number>`SUM($sessions.duration)`,
    })
    .from(sessions)
    .where(sql`DATE(${sessions.createdAt}) = ${utcDate}`)
    .get();

  return result?.total || 0;
}

export function createOrUpdateStreak(date: Date) {
  const utcDate = getUTCDateString(date);
  const existingStreak = db
    .select()
    .from(streaks)
    .where(eq(streaks.date, utcDate))
    .get();

  if (existingStreak) {
    return db.update(streaks).set({
      count: existingStreak.count + 1,
      createdAt: fromZonedTime(new Date(), "UTC").toISOString(),
    });
  } else {
    return db
      .insert(streaks)
      .values({
        date: utcDate,
        count: 1,
        createdAt: fromZonedTime(new Date(), "UTC").toISOString(),
      })
      .returning()
      .get();
  }
}

export function getCurrentStreak() {
  const today = getUTCDateString(new Date());
  const todayStreak = db
    .select()
    .from(streaks)
    .where(eq(streaks.date, today))
    .get();

  let streakCount = 0;
  if (todayStreak) {
    streakCount = todayStreak.count;
    let currentDate = startOfDay(new Date());
    let previousDay = subDays(currentDate, 1);

    while (previousDay >= new Date("1970-01-01")) {
      const prevDateStr = getUTCDateString(previousDay);
      const prevStreak = db
        .select()
        .from(streaks)
        .where(eq(streaks.date, prevDateStr))
        .get();
      if (!prevStreak) break;
      streakCount += prevStreak.count;
      previousDay = subDays(previousDay, 1);
    }
  }

  return streakCount;
}
