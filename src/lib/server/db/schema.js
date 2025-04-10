import { mysqlTable, varchar, text, int, timestamp } from "drizzle-orm/mysql-core";

// 1️⃣ USERS TABLE (Store user accounts)
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password_hash: text("password_hash").notNull(),
  created_at: timestamp("created_at").defaultNow(),
});