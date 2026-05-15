-- =====================================================================
-- 02_seed_movies.sql  (Phase 5: PostgreSQL Setup)
-- ---------------------------------------------------------------------
-- Inserts a handful of starter rows so the UI has something to show
-- before the user adds their own.
--
-- Runs automatically on first container boot, after 01_create_table.sql.
-- =====================================================================

INSERT INTO movies (title, genre, release_year, director, rating, description) VALUES
  ('The Matrix',          'Sci-Fi',     1999, 'The Wachowskis',     8.7, 'A hacker discovers reality is a simulation.'),
  ('Inception',           'Sci-Fi',     2010, 'Christopher Nolan',  8.8, 'A thief who steals ideas through dreams must plant one.'),
  ('Spirited Away',       'Animation',  2001, 'Hayao Miyazaki',     8.6, 'A girl wanders into a world of spirits and must find her way home.'),
  ('The Godfather',       'Drama',      1972, 'Francis Ford Coppola', 9.2, 'The aging patriarch of a crime dynasty transfers control to his reluctant son.'),
  ('Parasite',            'Thriller',   2019, 'Bong Joon Ho',       8.6, 'A poor family schemes to work for a wealthy one.'),
  ('Mad Max: Fury Road',  'Action',     2015, 'George Miller',      8.1, 'A high octane chase across a post apocalyptic desert.');
