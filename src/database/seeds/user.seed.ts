// src/database/seeds/user.seed.ts
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { User } from "../../entities/user.entity"; // Adjust path to your User entity
import { v4 as uuidv4 } from "uuid";
import { UserRole } from "../../constants/user";
import * as bcrypt from "bcryptjs";
export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const userRepository = dataSource.getRepository(User);

    // Check if users already exist to prevent duplicates
    const existingUsers = await userRepository.count();
    if (existingUsers > 0) {
      console.log("Users already exist, skipping seed...");
      return;
    }

    // Hash password for all users
    const hashedPassword = await bcrypt.hash("password123", 10);

    // Generate user data
    const users = Array.from({ length: 50 }).map((_, index) => ({
      id: uuidv4(),
      email: `user${index + 1}@example.com`,
      password: hashedPassword,
      first_name: `FirstName${index + 1}`,
      last_name: `LastName${index + 1}`,
      role: index % 2 === 0 ? UserRole.ADMIN : UserRole.USER, // Sử dụng enum
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    }));

    // Insert users into database
    await userRepository.insert(users);

    console.log("✅ Users seeded successfully!");
  }
}
