// =====================================================================
// MovieList.jsx  (Phase 10: React Fundamentals)
// ---------------------------------------------------------------------
// A "presentational" component. It does not own any data; it just
// receives `movies` as a prop and renders a grid of MovieCard items.
// =====================================================================

import MovieCard from "./MovieCard.jsx";

export default function MovieList({ movies, onSelect, onEdit, onDelete }) {
  if (!movies || movies.length === 0) {
    return (
      <div className="empty">
        <p>No movies yet. Click "+ Add Movie" to add the first one.</p>
      </div>
    );
  }

  return (
    <div className="movie-grid">
      {/*
        .map() turns the array of movie objects into an array of
        MovieCard components. The `key` prop is REQUIRED so React
        can efficiently update the DOM when the list changes.
      */}
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onSelect={() => onSelect(movie)}
          onEdit={() => onEdit(movie)}
          onDelete={() => onDelete(movie.id)}
        />
      ))}
    </div>
  );
}
