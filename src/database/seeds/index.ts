// src/database/seeds/index.ts
import { runSeeders, SeederOptions } from "typeorm-extension";
import { dataSource } from "../data-source";
import UserSeeder from "./user.seed";

export const seedConfig: SeederOptions = {
  seeds: [UserSeeder],
  // factories: [], // Add factories if you use them
};

// Function to run all seeds
export async function runAllSeeds() {
  try {
    // Initialize data source if not already initialized
    if (!dataSource.isInitialized) {
      await dataSource.initialize();
    }

    await runSeeders(dataSource, seedConfig);

    console.log("🌱 All seeds completed successfully!");
  } catch (error) {
    console.error("❌ Error running seeds:", error);
    throw error;
  } finally {
    // Close connection if you want to exit after seeding
    if (dataSource.isInitialized) {
      await dataSource.destroy();
    }
  }
}
