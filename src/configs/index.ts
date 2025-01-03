import { config } from "dotenv";

config({
  path: ".env",
});

export const { PORT, SECRET_KEY, DATABASE_URL } = process.env;
