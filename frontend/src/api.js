// =====================================================================
// api.js  (Phase 11: Connecting Frontend To Backend)
// ---------------------------------------------------------------------
// One small file that knows how to talk to the Express API. Every
// component imports from here instead of calling fetch() directly.
// Centralizing the API calls means we change the URL in ONE place if
// the backend moves.
// =====================================================================

// Vite injects environment variables prefixed with VITE_ into
// import.meta.env at build time. We fall back to localhost:4000/api
// so the app still runs if the developer forgot to create a .env.
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

// Helper: send a request, parse JSON, throw on error so callers can
// use try/catch instead of checking response.ok everywhere.
async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  // 204 No Content is success but has no body. Return null in that case.
  if (response.status === 204) return null;

  // Try to parse JSON. If the backend returned plain text on error,
  // body will be a string instead of an object.
  const body = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = body?.error || `Request failed: ${response.status}`;
    throw new Error(message);
  }
  return body;
}

// ---------------------------------------------------------------------
// Public functions. Each one matches a backend route.
// ---------------------------------------------------------------------

export function listMovies() {
  return request("/movies");
}

export function getMovie(id) {
  return request(`/movies/${id}`);
}

export function createMovie(movie) {
  return request("/movies", {
    method: "POST",
    body: JSON.stringify(movie),
  });
}

export function updateMovie(id, movie) {
  return request(`/movies/${id}`, {
    method: "PUT",
    body: JSON.stringify(movie),
  });
}

export function deleteMovie(id) {
  return request(`/movies/${id}`, { method: "DELETE" });
}
