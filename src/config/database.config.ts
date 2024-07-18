require("dotenv").config({
  path: process.env.NODE_ENV === "development" ? ".env.dev" : ".env.prd",
});

export const databaseConfig = {
  type: "better-sqlite3",
  database: String(process.env.DATA_PATH),
  synchronize: true,
  logging: false,
  entities: String(process.env.ENTITIES),
};
