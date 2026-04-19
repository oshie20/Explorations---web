import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    strictPort: true,
    // If edits don’t trigger reloads (iCloud/Dropbox, some network volumes, aggressive AV),
    // run: VITE_WATCH_POLLING=1 npm run dev
    watch:
      process.env.VITE_WATCH_POLLING === "1"
        ? { usePolling: true, interval: 100 }
        : undefined,
    fs: {
      // Allow serving the locally stored avatar file via "/@fs/..."
      allow: [
        "/Users/user/Downloads/Avatar",
        // Keep the project itself accessible (Vite uses "/@fs/..." behind the scenes).
        __dirname,
        // And node_modules explicitly (some requests resolve into node_modules paths).
        path.resolve(__dirname, "node_modules"),
      ],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
