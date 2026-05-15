// =====================================================================
// main.jsx  (Phase 9: Frontend Setup)
// ---------------------------------------------------------------------
// The entry point for the React application. Vite executes this file
// because index.html points to it.
//
// Job:
//   1. Find <div id="root"></div> in index.html
//   2. Render the <App /> component into it
// =====================================================================

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./App.css";

// React 18 uses createRoot() instead of the old ReactDOM.render().
// StrictMode helps catch bugs by intentionally double invoking effects
// in development. Safe to leave in.
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
