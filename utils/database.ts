import { open } from "sqlite";
import { Database } from "sqlite3";

export const getDatabaseConnection = async () => {
  return open({
    filename: "./database.db",
    driver: Database,
  });
};
