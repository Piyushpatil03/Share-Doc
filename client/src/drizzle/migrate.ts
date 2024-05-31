import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db, client } from "./db";

async function main(){
    await migrate(db, { migrationsFolder: "./src/drizzle/migrations"});

    await client.end();
}

main();