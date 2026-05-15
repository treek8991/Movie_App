// =====================================================================
// App.jsx  (Phase 10: React Fundamentals + Phase 11: Frontend/Backend)
// ---------------------------------------------------------------------
// The root component. It is the "page controller": it decides whether
// to show the list, the detail view, the add form, or the edit form.
//
// We keep this simple by using a single `view` state variable instead
// of installing a router library. Good enough for a beginner project.
// =====================================================================

import { useEffect, useState } from "react";
import {
  listMovies,
  createMovie,
  updateMovie,
  deleteMovie,
} from "./api.js";

import MovieList from "./components/MovieList.jsx";
import MovieDetails from "./components/MovieDetails.jsx";
import MovieForm from "./components/MovieForm.jsx";
import EditMovieForm from "./components/EditMovieForm.jsx";

export default function App() {
  // ---------- State ----------
  // The list of movies loaded from the API.
  const [movies, setMovies] = useState([]);

  // Which screen are we on? "list" | "details" | "add" | "edit"
  const [view, setView] = useState("list");

  // The movie currently selected for details or edit.
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Loading and error flags so we can show feedback in the UI.
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ---------- Data loading ----------
  // useEffect with an empty dependency array runs ONCE on mount.
  // Perfect for "load data when the page first opens".
  useEffect(() => {
    refreshMovies();
  }, []);

  async function refreshMovies() {
    try {
      setLoading(true);
      const data = await listMovies();
      setMovies(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // ---------- Handlers passed down to child components ----------

  function handleSelectMovie(movie) {
    setSelectedMovie(movie);
    setView("details");
  }

  function handleStartAdd() {
    setSelectedMovie(null);
    setView("add");
  }

  function handleStartEdit(movie) {
    setSelectedMovie(movie);
    setView("edit");
  }

  async function handleCreate(payload) {
    try {
      await createMovie(payload);
      await refreshMovies();
      setView("list");
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleUpdate(id, payload) {
    try {
      await updateMovie(id, payload);
      await refreshMovies();
      setView("list");
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    // Confirm with the user before destructive actions.
    const ok = window.confirm("Delete this movie? This cannot be undone.");
    if (!ok) return;
    try {
      await deleteMovie(id);
      await refreshMovies();
      setView("list");
    } catch (err) {
      setError(err.message);
    }
  }

  // ---------- Render ----------

  return (
    <div className="app">
      <header className="app__header">
        <h1>Movie App</h1>
        <nav className="app__nav">
          <button onClick={() => setView("list")}>All Movies</button>
          <button onClick={handleStartAdd}>+ Add Movie</button>
        </nav>
      </header>

      {error && <div className="banner banner__error">{error}</div>}
      {loading && <div className="banner">Loading movies...</div>}

      <main className="app__main">
        {view === "list" && (
          <MovieList
            movies={movies}
            onSelect={handleSelectMovie}
            onEdit={handleStartEdit}
            onDelete={handleDelete}
          />
        )}

        {view === "details" && selectedMovie && (
          <MovieDetails
            movie={selectedMovie}
            onBack={() => setView("list")}
            onEdit={() => handleStartEdit(selectedMovie)}
            onDelete={() => handleDelete(selectedMovie.id)}
          />
        )}

        {view === "add" && (
          <MovieForm
            onCancel={() => setView("list")}
            onSubmit={handleCreate}
          />
        )}

        {view === "edit" && selectedMovie && (
          <EditMovieForm
            movie={selectedMovie}
            onCancel={() => setView("list")}
            onSubmit={(payload) => handleUpdate(selectedMovie.id, payload)}
          />
        )}
      </main>
    </div>
  );
}
