import {
  mysqlTable,
  varchar,
  text,
  int,
  timestamp,
  json,
  index
} from "drizzle-orm/mysql-core";
import { sql } from 'drizzle-orm';

// USERS TABLE
export const users = mysqlTable("users", {
  id: int("id").autoincrement().notNull().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password_hash: text("password_hash").notNull(),
  created_at: timestamp("created_at").defaultNow(),
});

// MEDIA TABLE
export const media = mysqlTable('media', {
  id: int('id').autoincrement().notNull().primaryKey(), // FIXED
  userId: int('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  fileName: varchar('file_name', { length: 255 }).notNull(),
  filePath: text('file_path').notNull(),
  fileType: varchar('file_type', { length: 50 }).notNull(),
  fileSize: int('file_size').notNull(),
  mimeType: varchar('mime_type', { length: 100 }).notNull(),
  createdAt: timestamp('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`)
    .$onUpdate(() => sql`CURRENT_TIMESTAMP`)
}, (table) => ({
  userIdIdx: index('media_user_id_idx').on(table.userId),
  fileNameIdx: index('media_file_name_idx').on(table.fileName),
}));

// PAGES TABLE
export const pages = mysqlTable("pages", {
  id: int("id").autoincrement().notNull().primaryKey(),
  userId: int("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  components: json("components").notNull(),
  created_at: timestamp("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updated_at: timestamp("updated_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`)
    .$onUpdate(() => sql`CURRENT_TIMESTAMP`),
});
