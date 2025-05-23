import { mysqlTable, varchar, text, int, timestamp } from "drizzle-orm/mysql-core";

//* USERS TABLE
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password_hash: text("password_hash").notNull(),
  created_at: timestamp("created_at").defaultNow(),
});

//* MEDIA TABLE
export const media = mysqlTable("media", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("user_id").notNull(),
  media: varchar("media", { length: 255 }).notNull(),
});
