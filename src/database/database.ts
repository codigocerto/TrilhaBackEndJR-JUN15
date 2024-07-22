import { DataSource } from "typeorm";
import { databaseConfig } from "../config/database.config";

export const AppDataSource = new DataSource({
  type: "better-sqlite3",
  database: databaseConfig.database,
  synchronize: true,
  logging: false,
  entities: [databaseConfig.entities],
});

AppDataSource.initialize()
  .then(() => console.log("Database SQLite is Connected"))
  .catch((err) => console.log("An Error a ocurred ", err));
