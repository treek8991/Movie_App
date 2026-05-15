# Movie App (Reference Implementation)

A working full stack reference for the Movie App curriculum. Built with:

1. React + Vite (frontend)
2. Express on Node.js (backend)
3. PostgreSQL (database)
4. Docker Compose (runs PostgreSQL locally)

## Folder Layout

```
code/
├── README.md              # this file
├── HOW_TO_RUN.md          # step by step boot instructions
├── .gitignore             # files Git should never track
├── docker-compose.yml     # Phase 6: PostgreSQL container
├── backend/               # Phases 4, 5, 7: Express API
│   ├── package.json
│   ├── .env.example
│   ├── server.js
│   ├── db.js
│   ├── routes/
│   │   └── movies.js
│   └── sql/
│       ├── 01_create_table.sql
│       └── 02_seed_movies.sql
└── frontend/              # Phases 9, 10, 11, 12: React UI
    ├── package.json
    ├── vite.config.js
    ├── index.html
    ├── .env.example
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── App.css
        ├── api.js
        └── components/
            ├── MovieList.jsx
            ├── MovieCard.jsx
            ├── MovieForm.jsx
            ├── MovieDetails.jsx
            └── EditMovieForm.jsx
```

## Architecture

```
Browser ──> React (port 5173) ──> Express (port 4000) ──> PostgreSQL (port 5432, inside Docker)
```

See `HOW_TO_RUN.md` to bring it up locally.
