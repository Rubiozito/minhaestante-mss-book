import { config } from "dotenv";

config();

export const enviroments = {
  connectStr: process.env.CONNECTION_STRING,
  db_name: process.env.DB_NAME,
  eventURL: process.env.EVENTBUS_URL,
};
