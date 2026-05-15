// =====================================================================
// vite.config.js  (Phase 9: Frontend Setup)
// ---------------------------------------------------------------------
// Configuration for the Vite dev server and build pipeline.
// Vite is the modern replacement for create-react-app: faster, smaller,
// uses native ES modules in the browser.
// =====================================================================

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // The official React plugin handles JSX and Fast Refresh.
  plugins: [react()],

  server: {
    // Run the dev server on 5173 by default. Change here if 5173 is taken.
    port: 5173,

    // Open the browser automatically when `npm run dev` starts.
    open: true,
  },
});
