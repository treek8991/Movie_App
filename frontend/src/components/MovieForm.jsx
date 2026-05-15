// =====================================================================
// MovieForm.jsx  (Phase 10: React Fundamentals)
// ---------------------------------------------------------------------
// Controlled form for ADDING a new movie. "Controlled" means every
// input is bound to React state via `value=` and `onChange=`.
// =====================================================================

import { useState } from "react";

// Default empty values for every field. Strings keep React happy
// because controlled inputs should never be `undefined`.
const EMPTY_MOVIE = {
  title: "",
  genre: "",
  release_year: "",
  director: "",
  rating: "",
  description: "",
};

export default function MovieForm({ onCancel, onSubmit }) {
  const [form, setForm] = useState(EMPTY_MOVIE);
  const [submitting, setSubmitting] = useState(false);

  // One handler for every text field. We look at e.target.name to know
  // which field changed, then update only that key in state.
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    // Without preventDefault the browser would reload the page on submit.
    e.preventDefault();
    if (!form.title.trim()) return;

    setSubmitting(true);
    try {
      // Convert numeric fields from strings to numbers (or null).
      const payload = {
        ...form,
        release_year: form.release_year ? Number(form.release_year) : null,
        rating: form.rating ? Number(form.rating) : null,
      };
      await onSubmit(payload);
      setForm(EMPTY_MOVIE);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Add Movie</h2>

      <label>
        Title *
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          placeholder="The Matrix"
        />
      </label>

      <label>
        Genre
        <input
          name="genre"
          value={form.genre}
          onChange={handleChange}
          placeholder="Sci-Fi"
        />
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
          placeholder="1999"
        />
      </label>

      <label>
        Director
        <input
          name="director"
          value={form.director}
          onChange={handleChange}
          placeholder="The Wachowskis"
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
          placeholder="8.7"
        />
      </label>

      <label>
        Description
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          placeholder="A short summary..."
        />
      </label>

      <div className="form__actions">
        <button type="button" onClick={onCancel} disabled={submitting}>
          Cancel
        </button>
        <button type="submit" disabled={submitting || !form.title.trim()}>
          {submitting ? "Saving..." : "Save Movie"}
        </button>
      </div>
    </form>
  );
}
