import { Pool, QueryArrayConfig } from "pg";

const pool = new Pool({
  user: "postgres",
  password: "Huynhi123",
  host: "localhost",
  port: 5432,
  database: "chat-message-database",
});

module.exports = {
  query: (text: QueryArrayConfig<any>, params: any) => pool.query(text, params),
};
