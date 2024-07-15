require("dotenv").config();

export const databaseConfig = {
  type: "better-sqlite3",
  database:
    process.env.NODE_ENV === "development"
      ? String(process.env.DATA_PATH_DEV)
      : String(process.env.DATA_PATH_PROD),
  synchronize: true,
  logging: false,
  entities: String(process.env.ENTITIES),
};
