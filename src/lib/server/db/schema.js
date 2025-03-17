import { mysqlTable, varchar, text, int, boolean, timestamp } from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";

// 1️⃣ USERS TABLE (Stores user accounts)
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password_hash: text("password_hash").notNull(),
  role: varchar("role", { length: 50 }).default("admin"),
  created_at: timestamp("created_at").defaultNow(),
})

// 2️⃣ WEBSITES TABLE (Each website a user creates)
export const websites = mysqlTable("websites", {
  id: int("id").autoincrement().primaryKey(),
  user_id: int("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  domain: varchar("domain", { length: 255 }),
  title: varchar("title", { length: 255 }).notNull(),
  created_at: timestamp("created_at").defaultNow(),
});

// 3️⃣ PAGES TABLE (Each webpage in a website)
export const pages = mysqlTable("pages", {
  id: int("id").autoincrement().primaryKey(),
  website_id: int("website_id").notNull().references(() => websites.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull(),
  published: boolean("published").default(false),
  created_at: timestamp("created_at").defaultNow(),
});

// 4️⃣ COMPONENTS TABLE (Stores elements inside a page)
export const components = mysqlTable("components", {
  id: int("id").autoincrement().primaryKey(),
  page_id: int("page_id").notNull().references(() => pages.id, { onDelete: "cascade" }),
  type: varchar("type", { length: 50 }).notNull(), // e.g., 'text', 'image', 'button'
  content: text("content"),
  position: int("position").default(0), // Defines the order of components on a page
});

// 5️⃣ THEMES TABLE (Controls website styling)
export const themes = mysqlTable("themes", {
  id: int("id").autoincrement().primaryKey(),
  website_id: int("website_id").notNull().references(() => websites.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 100 }).notNull(),
  primary_color: varchar("primary_color", { length: 10 }),
  font: varchar("font", { length: 100 }),
});

// 🔗 Define Relations
export const usersRelations = relations(users, ({ many }) => ({
  websites: many(websites),
}));

export const websitesRelations = relations(websites, ({ one, many }) => ({
  user: one(users, { fields: [websites.user_id], references: [users.id] }),
  pages: many(pages),
  theme: one(themes, { fields: [themes.website_id], references: [websites.id] }),
}));

export const pagesRelations = relations(pages, ({ one, many }) => ({
  website: one(websites, { fields: [pages.website_id], references: [websites.id] }),
  components: many(components),
}));

export const componentsRelations = relations(components, ({ one }) => ({
  page: one(pages, { fields: [components.page_id], references: [pages.id] }),
}));

export const themesRelations = relations(themes, ({ one }) => ({
  website: one(websites, { fields: [themes.website_id], references: [websites.id] }),
}));
