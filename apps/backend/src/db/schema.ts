import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const works = sqliteTable('works', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
});
