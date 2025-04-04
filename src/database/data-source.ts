"use strict";

import { DataSource, DataSourceOptions } from "typeorm";
import { config } from "dotenv";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

config();

export const dataSourceOptions: DataSourceOptions = {
  type: "postgres",
  host: process.env.DATABASE_HOST || "localhost",
  port: parseInt(process.env.DATABASE_PORT || "5432"),
  username: process.env.DATABASE_USERNAME || "postgres",
  password: process.env.DATABASE_PASSWORD || "postgres",
  database: process.env.DATABASE_NAME || "db_nest_api",
  entities: ["dist/**/*.entity{.ts,.js}"],
  migrations: ["dist/database/migrations/*{.ts,.js}"],
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
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
