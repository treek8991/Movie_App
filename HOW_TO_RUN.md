# How To Run The Movie App Locally

A short, ordered checklist for bringing the entire stack up on your machine. The lesson files explain WHY each step exists. This file is the cheat sheet for HOW.

## Prerequisites

1. Node.js v20 or newer.
2. npm (ships with Node).
3. Docker Desktop running (whale icon in the menu bar).
4. A terminal open in this `code/` folder.

## One Time Setup

### 1. Copy the environment template files

```bash
cd backend
cp .env.example .env
cd ../frontend
cp .env.example .env
cd ..
```

### 2. Install backend dependencies

```bash
cd backend
npm install
cd ..
```

### 3. Install frontend dependencies

```bash
cd frontend
npm install
cd ..
```

## Daily Boot Sequence

Three terminal tabs are easiest, one per layer.

### Terminal 1: Database (Docker)

```bash
docker compose up -d
```

This starts PostgreSQL in the background on port 5432. The first time it runs, it also executes `backend/sql/01_create_table.sql` and `02_seed_movies.sql` automatically.

Confirm it is healthy:

```bash
docker compose ps
docker logs movie_app_db --tail 20
```

### Terminal 2: Backend (Express)

```bash
cd backend
npm run dev
```

You should see:

```
[server] Movie App API listening on http://localhost:4000
[db] PostgreSQL pool connected
```

Smoke test from another terminal:

```bash
curl http://localhost:4000/api/health
curl http://localhost:4000/api/movies
```

### Terminal 3: Frontend (Vite + React)

```bash
cd frontend
npm run dev
```

Vite opens http://localhost:5173 in your browser. You should see the seeded movies on screen.

## Stopping Everything

```bash
# In the frontend and backend terminals, press Ctrl+C.
# Then stop the database container:
docker compose down
```

The database data is preserved in the `postgres_data` volume. Next `docker compose up -d` brings everything back.

## Resetting The Database

If you want a fresh database (will erase all movies you added):

```bash
docker compose down -v
docker compose up -d
```

The `-v` flag also removes the data volume, which triggers the seed scripts to run again on next boot.

## Common Issues

1. **Port 5432 already in use**: an existing PostgreSQL is running on your host. Stop it, or change the host port in `docker-compose.yml`.
2. **`ECONNREFUSED` from the backend**: PostgreSQL is not up yet. Wait a few seconds, or check `docker compose ps`.
3. **CORS errors in the browser console**: backend is not running, or `VITE_API_URL` in `frontend/.env` does not match the backend's port.
4. **Frontend shows "Loading movies..." forever**: open the browser DevTools Network tab and inspect the failed `/api/movies` call.

## API Reference

| Method | Path                | Body                                      | Returns               |
|--------|---------------------|-------------------------------------------|-----------------------|
| GET    | /api/health         | none                                      | `{ status, time }`    |
| GET    | /api/movies         | none                                      | array of movies       |
| GET    | /api/movies/:id     | none                                      | one movie             |
| POST   | /api/movies         | `{ title, genre?, release_year?, ... }`   | created movie (201)   |
| PUT    | /api/movies/:id     | same as POST                              | updated movie         |
| DELETE | /api/movies/:id     | none                                      | 204 No Content        |
