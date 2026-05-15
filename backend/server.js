// =====================================================================
// server.js  (Phase 4: Backend Setup)
// ---------------------------------------------------------------------
// This is the ENTRY POINT for the backend.
//   1. Load env vars
//   2. Create an Express app
//   3. Add middleware (cors, json parsing, request logging)
//   4. Mount the /api/movies routes
//   5. Listen on a TCP port
// =====================================================================

// 1. Load .env so process.env.PORT etc. are populated.
require("dotenv").config();

// 2. Import the Express framework.
const express = require("express");

// `cors` adds the response headers a browser needs in order to call
// our API from a different origin (e.g. http://localhost:5173).
const cors = require("cors");

// Bring in our movie routes from routes/movies.js.
const movieRoutes = require("./routes/movies");

// Create the Express application instance.
const app = express();

// ---------------------------------------------------------------------
// Middleware
// ---------------------------------------------------------------------
// Middleware are small functions that run BEFORE your route handlers.
// They can read the request, modify it, or short circuit it.

// Allow cross origin requests. For the curriculum we allow everything;
// in production you would lock this to your frontend's domain.
app.use(cors());

// Parse incoming JSON bodies so `req.body` is a usable object.
// Without this, POST /api/movies with a JSON payload would arrive empty.
app.use(express.json());

// Tiny request logger so the developer can see traffic in the terminal.
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// ---------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------

// A simple health check. Hitting GET /api/health should return JSON.
// Great for confirming the server is alive before debugging anything else.
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Mount all movie endpoints under /api/movies.
// (The actual handlers live in routes/movies.js.)
app.use("/api/movies", movieRoutes);

// Catch all 404 for any path we did not define.
app.use((req, res) => {
  res.status(404).json({ error: `Not found: ${req.method} ${req.url}` });
});

// Centralized error handler. Express recognizes a 4-argument function
// as the error handler. Any `next(err)` in a route ends up here.
app.use((err, _req, res, _next) => {
  console.error("[server] Unhandled error:", err);
  res.status(500).json({ error: "Internal server error" });
});

// ---------------------------------------------------------------------
// Start listening
// ---------------------------------------------------------------------
const PORT = Number(process.env.PORT) || 4000;
app.listen(PORT, () => {
  console.log(`[server] Movie App API listening on http://localhost:${PORT}`);
});
