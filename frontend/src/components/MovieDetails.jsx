// =====================================================================
// MovieDetails.jsx  (Phase 10: React Fundamentals)
// ---------------------------------------------------------------------
// Full screen view of a single movie.
// =====================================================================

export default function MovieDetails({ movie, onBack, onEdit, onDelete }) {
  return (
    <section className="details">
      <button className="link" onClick={onBack}>
        &laquo; Back to list
      </button>

      <h2 className="details__title">{movie.title}</h2>

      <p className="details__meta">
        {movie.release_year || "Unknown year"} &middot;{" "}
        {movie.genre || "Unspecified genre"}
      </p>

      {movie.director && (
        <p>
          <strong>Director:</strong> {movie.director}
        </p>
      )}

      {movie.rating != null && (
        <p>
          <strong>Rating:</strong> {Number(movie.rating).toFixed(1)} / 10
        </p>
      )}

      {movie.description && (
        <p className="details__description">{movie.description}</p>
      )}

      <div className="details__actions">
        <button onClick={onEdit}>Edit</button>
        <button className="danger" onClick={onDelete}>
          Delete
        </button>
      </div>
    </section>
  );
}
