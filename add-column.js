const postgres = require("postgres");
const dotenv = require("dotenv");

dotenv.config({ path: ".env.local" });

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("No DATABASE_URL found in .env.local");
  process.exit(1);
}

const sql = postgres(connectionString, { prepare: false });

async function main() {
  try {
    console.log("Adding column 'show_hero_image' to 'profiles' table...");
    await sql`ALTER TABLE profiles ADD COLUMN IF NOT EXISTS show_hero_image BOOLEAN DEFAULT true NOT NULL;`;
    console.log("Column added successfully!");
  } catch (error) {
    console.error("Error adding column:", error);
  } finally {
    await sql.end();
  }
}

main();
