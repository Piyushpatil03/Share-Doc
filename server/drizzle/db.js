const { drizzle } = require("drizzle-orm/postgres-js");
const postgres = require("postgres");
const { schema } = require("./schema");

const dotenv = require("dotenv");
dotenv.config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) throw new Error("Database url not defined");

const client = postgres(connectionString, {prepare: false});
const db = drizzle(client, { schema, logger : true})

module.exports = {
    client,
    db
}