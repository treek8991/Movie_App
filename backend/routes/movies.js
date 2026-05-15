// =====================================================================
// routes/movies.js  (Phase 7: Backend API Routes)
// ---------------------------------------------------------------------
// Every CRUD operation lives here:
//   GET    /api/movies        list all movies
//   GET    /api/movies/:id    one movie by id
//   POST   /api/movies        create a new movie
//   PUT    /api/movies/:id    update an existing movie
//   DELETE /api/movies/:id    remove a movie
//
// We use `express.Router()` so this file can define routes that get
// mounted under a prefix (/api/movies) by server.js.
// =====================================================================

const express = require("express");
const db = require("../db"); // the shared PostgreSQL pool

// Create a mini router we will attach to the main app.
const router = express.Router();

// ---------------------------------------------------------------------
// GET /api/movies
// Returns every movie, newest first.
// ---------------------------------------------------------------------
router.get("/", async (_req, res, next) => {
  try {
    // Run a SELECT against the `movies` table.
    // pg returns an object; `.rows` is an array of plain JS objects.
    const result = await db.query(
      "SELECT * FROM movies ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (err) {
    // Pass the error to the Express error handler in server.js.
    next(err);
  }
});

// ---------------------------------------------------------------------
// GET /api/movies/:id
// Returns one movie by its primary key.
// :id is a route parameter, available as req.params.id.
// ---------------------------------------------------------------------
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    // ALWAYS use parameter placeholders ($1, $2, ...) instead of string
    // concatenation. This prevents SQL injection.
    const result = await db.query("SELECT * FROM movies WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: `Movie ${id} not found` });
    }

    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

// ---------------------------------------------------------------------
// POST /api/movies
// Creates a new movie. Expects a JSON body with the movie fields.
// ---------------------------------------------------------------------
router.post("/", async (req, res, next) => {
  try {
    // Pull each expected field out of the body. Anything missing will
    // be `undefined`, which we validate below.
    const { title, genre, release_year, director, rating, description } =
      req.body;

    // Minimum required field: title. The rest can be null.
    if (!title || typeof title !== "string") {
      return res
        .status(400)
        .json({ error: "title is required and must be a string" });
    }

    // INSERT and use RETURNING * to get back the row we just created,
    // including the auto generated id and created_at timestamp.
    const result = await db.query(
      `INSERT INTO movies (title, genre, release_year, director, rating, description)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        title,
        genre || null,
        release_year || null,
        director || null,
        rating || null,
        description || null,
      ]
    );

    // 201 Created is the correct status code for "new resource created".
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

// ---------------------------------------------------------------------
// PUT /api/movies/:id
// Replaces the editable fields of one movie. Returns the updated row.
// ---------------------------------------------------------------------
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, genre, release_year, director, rating, description } =
      req.body;

    if (!title || typeof title !== "string") {
      return res
        .status(400)
        .json({ error: "title is required and must be a string" });
    }

    const result = await db.query(
      `UPDATE movies
         SET title = $1,
             genre = $2,
             release_year = $3,
             director = $4,
             rating = $5,
             description = $6
       WHERE id = $7
       RETURNING *`,
      [
        title,
        genre || null,
        release_year || null,
        director || null,
        rating || null,
        description || null,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: `Movie ${id} not found` });
    }

    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

// ---------------------------------------------------------------------
// DELETE /api/movies/:id
// Removes a movie. Returns 204 No Content on success.
// ---------------------------------------------------------------------
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await db.query(
      "DELETE FROM movies WHERE id = $1 RETURNING id",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: `Movie ${id} not found` });
    }

    // 204 = success, no body to return.
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

// Export so server.js can do `app.use("/api/movies", movieRoutes)`.
module.exports = router;
