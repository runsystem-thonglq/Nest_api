import { DataSource, DataSourceOptions } from "typeorm";
import { config } from "dotenv";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { SeederOptions } from "typeorm-extension";
config();
console.log("Connecting to databasezzz...", process.env.DATABASE_HOST);
console.log("DATABASE_PORT", process.env.DATABASE_PORT);
console.log("DATABASE_NAME", process.env.DATABASE_NAME);
console.log("NODE_ENV", process.env.NODE_ENV);
console.log("DATABASE_SSL", process.env.DATABASE_SSL);
console.log("DATABASE_USERNAME", process.env.DATABASE_USERNAME);
export const dataSourceOptions: DataSourceOptions & SeederOptions = {
  type: "postgres",
  host: process.env.DATABASE_HOST || "db",
  port: parseInt(process.env.DATABASE_PORT || "5432"),
  username: process.env.DATABASE_USERNAME || "postgres",
  password: process.env.DATABASE_PASSWORD || "postgres",
  database: process.env.DATABASE_NAME || "db_nest_api",
  entities: ["src/**/*.entity.ts"], // thay vì "dist/**/*.entity{.ts,.js}"
  migrations: ["src/database/migrations/*{.ts,.js}"],
  // synchronize: false,
  synchronize: process.env.NODE_ENV !== "production",
  namingStrategy: new SnakeNamingStrategy(),
  ssl:
    process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: false } : false,
  connectTimeoutMS: 10000,
  maxQueryExecutionTime: 10000,
  logging: process.env.NODE_ENV !== "production",
  migrationsRun: true,
  migrationsTableName: "migrations",
  migrationsTransactionMode: "each",
  extra: {
    trustServerCertificate: true,
  },
  seeds: ["src/database/seeds/**/*{.ts,.js}"],
};

export const dataSource = new DataSource(dataSourceOptions);
