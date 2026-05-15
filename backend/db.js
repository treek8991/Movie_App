// =====================================================================
// db.js  (Phase 5: PostgreSQL Setup)
// ---------------------------------------------------------------------
// What this file does:
//   Creates ONE shared database connection pool that the rest of the
//   backend imports whenever it needs to talk to PostgreSQL.
//
// Why a pool?
//   Opening a brand new database connection for every single API
//   request is slow. A "pool" keeps a small number of connections
//   warm and reuses them. The `pg` library handles all that for us.
// =====================================================================

// Load environment variables from `.env` into process.env BEFORE we
// read DB_HOST, DB_USER, etc. below. Without this line the values
// would be undefined.
require("dotenv").config();

// Import the `Pool` class from the `pg` (node-postgres) package.
const { Pool } = require("pg");

// Build the pool using values from .env. If something is missing,
// process.env.X will be undefined and the connection will fail with
// a clear error, which is what we want during development.
const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Friendly log so the developer can see whether the pool was created.
// We do NOT actually try to connect here; the first real query will
// open a connection.
pool.on("connect", () => {
  console.log("[db] PostgreSQL pool connected");
});

// If something goes wrong in the pool, log it loudly. Without this the
// app could crash silently in production.
pool.on("error", (err) => {
  console.error("[db] Unexpected pool error:", err);
});

// Export the pool so other files (like routes/movies.js) can do:
//   const db = require("../db");
//   db.query("SELECT * FROM movies");
module.exports = pool;
