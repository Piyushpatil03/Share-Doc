import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const productTable = pgTable("product", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", {length : 255 }).notNull()
})