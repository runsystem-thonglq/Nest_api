import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersTable1677721600000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // const uuid = uuid_generate_v4;
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "email",
            type: "varchar",
            isUnique: true,
          },
          {
            name: "password",
            type: "varchar",
          },
          {
            name: "first_name",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "last_name",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "role",
            type: "enum",
            enum: ["admin", "user"],
            default: "'user'",
          },
          {
            name: "is_active",
            type: "boolean",
            default: false,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      }),
      true
    );

    // Tạo extension uuid-ossp nếu chưa có
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
