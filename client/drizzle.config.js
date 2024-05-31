import { defineConfig } from "drizzle-kit";
import "dotenv/config";

export default defineConfig({
    dialect : "postgresql",
    schema: "./src/drizzle/schema.js",
    out: "./src/drizzle/migrations",
    // driver: "pg",
    driver: "turso",
    dbCredentials: {
        connectionString: process.env.DATABASE_URL
    },
    verbose: true,
    strict: true
})