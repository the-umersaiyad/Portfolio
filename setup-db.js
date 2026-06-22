require('dotenv').config({ path: '.env.local' });
const postgres = require('postgres');

const dbUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.SUPABASE_DB_URL;

if (!dbUrl) {
  console.error("❌ No database connection string found in .env.local (checked DATABASE_URL, POSTGRES_URL).");
  process.exit(1);
}

const sql = postgres(dbUrl, { ssl: 'require' });

async function main() {
  try {
    console.log("Connecting to database...");
    console.log("Creating global_settings table if it doesn't exist...");
    
    await sql.unsafe(`
      CREATE TABLE IF NOT EXISTS "global_settings" (
        "id" SERIAL PRIMARY KEY,
        "active_theme" TEXT NOT NULL DEFAULT 'dark',
        "accent_color_dark" TEXT NOT NULL DEFAULT '#10b981',
        "accent_color_light" TEXT NOT NULL DEFAULT '#8b5cf6'
      );
    `);
    
    console.log("✅ Successfully created global_settings table!");
  } catch (err) {
    console.error("❌ Error creating table:", err.message);
  } finally {
    process.exit(0);
  }
}

main();
