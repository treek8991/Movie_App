// =====================================================================
// EditMovieForm.jsx  (Phase 10: React Fundamentals)
// ---------------------------------------------------------------------
// Same shape as MovieForm but preloaded with an existing movie's data.
// We could DRY this up by reusing MovieForm with an `initialValues`
// prop; for clarity we keep two small components in the beginner build.
// =====================================================================

import { useState } from "react";

export default function EditMovieForm({ movie, onCancel, onSubmit }) {
  // Initialize state from the movie passed in. We coerce nulls to
  // empty strings because controlled inputs cannot accept null.
  const [form, setForm] = useState({
    title: movie.title ?? "",
    genre: movie.genre ?? "",
    release_year: movie.release_year ?? "",
    director: movie.director ?? "",
    rating: movie.rating ?? "",
    description: movie.description ?? "",
  });
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim()) return;
    setSubmitting(true);
    try {
      const payload = {
        ...form,
        release_year: form.release_year ? Number(form.release_year) : null,
        rating: form.rating ? Number(form.rating) : null,
      };
      await onSubmit(payload);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Edit Movie</h2>

      <label>
        Title *
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Genre
        <input name="genre" value={form.genre} onChange={handleChange} />
      </label>

      <label>
        Release year
        <input
          name="release_year"
          value={form.release_year}
          onChange={handleChange}
          type="number"
          min="1888"
          max="2100"
        />
      </label>

      <label>
        Director
        <input
          name="director"
          value={form.director}
          onChange={handleChange}
        />
      </label>

      <label>
        Rating (0 to 10)
        <input
          name="rating"
          value={form.rating}
          onChange={handleChange}
          type="number"
          step="0.1"
          min="0"
          max="10"
        />
      </label>

      <label>
        Description
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={4}
        />
      </label>

      <div className="form__actions">
        <button type="button" onClick={onCancel} disabled={submitting}>
          Cancel
        </button>
        <button type="submit" disabled={submitting || !form.title.trim()}>
          {submitting ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
