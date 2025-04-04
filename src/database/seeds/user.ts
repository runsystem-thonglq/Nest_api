import { DataSource } from "typeorm";
import { v4 as uuidv4 } from "uuid";

export async function seedUsers(dataSource: DataSource): Promise<void> {
  const queryRunner = dataSource.createQueryRunner();

  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const users = Array.from({ length: 50 }).map((_, index) => ({
      id: uuidv4(),
      email: `user${index + 1}@example.com`,
      password: "hashed_password", // Replace with actual hashed password
      first_name: `FirstName${index + 1}`,
      last_name: `LastName${index + 1}`,
      role: index % 2 === 0 ? "admin" : "user",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    }));

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into("users")
      .values(users)
      .execute();

    await queryRunner.commitTransaction();
  } catch (error) {
    await queryRunner.rollbackTransaction();
    console.error("Error seeding users:", error);
  } finally {
    await queryRunner.release();
  }
}
