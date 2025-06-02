import { mysqlTable, varchar, text, int, timestamp, json } from "drizzle-orm/mysql-core";

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
  filename: varchar("filename", { length: 255 }).notNull(),
  mimeType: varchar("mime_type", { length: 100 }).notNull(),
  size: int("size").notNull(),
  created_at: timestamp("created_at").defaultNow(),
});

//* PAGES TABLE
export const pages = mysqlTable("pages", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("user_id").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  components: json("components").notNull(),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at"),
});
