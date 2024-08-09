import pg from "pg";
const { Pool } = pg;

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  password: "Huynhi123",
  database: "hotel_database",
  port: 5432,
});
