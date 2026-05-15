// =====================================================================
// MovieCard.jsx  (Phase 10: React Fundamentals)
// ---------------------------------------------------------------------
// One movie tile in the grid. Shows title, year, genre, and rating.
// Buttons trigger callbacks the parent passed in.
// =====================================================================

export default function MovieCard({ movie, onSelect, onEdit, onDelete }) {
  return (
    <article className="card">
      <header className="card__header">
        <h2 className="card__title">{movie.title}</h2>
        {movie.rating != null && (
          <span className="card__rating">{Number(movie.rating).toFixed(1)}</span>
        )}
      </header>

      <p className="card__meta">
        {movie.release_year || "Unknown year"} &middot;{" "}
        {movie.genre || "Unspecified genre"}
      </p>

      {movie.director && (
        <p className="card__director">Directed by {movie.director}</p>
      )}

      <div className="card__actions">
        <button onClick={onSelect}>Details</button>
        <button onClick={onEdit}>Edit</button>
        <button className="danger" onClick={onDelete}>
          Delete
        </button>
      </div>
    </article>
  );
}
