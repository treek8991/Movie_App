-- =====================================================================
-- 01_create_table.sql  (Phase 5: PostgreSQL Setup)
-- ---------------------------------------------------------------------
-- This file is automatically executed by PostgreSQL the FIRST time the
-- Docker container starts (because docker-compose mounts the sql folder
-- into /docker-entrypoint-initdb.d).
--
-- It creates the `movies` table that our backend queries.
-- =====================================================================

-- CREATE TABLE IF NOT EXISTS is safe to run more than once.
CREATE TABLE IF NOT EXISTS movies (
  -- A unique, auto incrementing integer. SERIAL is shorthand for
  -- "create a sequence and use the next value here".
  id SERIAL PRIMARY KEY,

  -- The movie title. NOT NULL means every row MUST have a title.
  title VARCHAR(255) NOT NULL,

  -- Free text genre. Could be normalized into its own table later.
  genre VARCHAR(100),

  -- Release year as an integer. Optional.
  release_year INTEGER,

  -- Director name. Optional.
  director VARCHAR(255),

  -- Numeric rating, for example 7.8. Optional.
  -- NUMERIC(3,1) means up to 3 total digits, 1 after the decimal.
  rating NUMERIC(3, 1),

  -- Long form description.
  description TEXT,

  -- Timestamp of creation. DEFAULT NOW() means PostgreSQL fills this in
  -- automatically when a row is inserted.
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Helpful index for our most common query: list movies newest first.
CREATE INDEX IF NOT EXISTS idx_movies_created_at
  ON movies (created_at DESC);
