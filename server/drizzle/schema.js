const { jsonb, pgTable, uuid, varchar } =  require("drizzle-orm/pg-core");

const productTable = pgTable("product", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", {length : 255 }).notNull()
})

const documentTable = pgTable("document", {
    id: uuid("documentId").primaryKey(),
    data: jsonb("data")
})

module.exports = {
    productTable,
    documentTable
}