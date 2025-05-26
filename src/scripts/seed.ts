// scripts/seed.ts
import { config } from "dotenv";
import { runAllSeeds } from "../database/seeds";

// Load environment variables
config();

async function main() {
  try {
    console.log("🌱 Starting database seeding...");
    await runAllSeeds();
    console.log("✅ Database seeding completed!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

main();
