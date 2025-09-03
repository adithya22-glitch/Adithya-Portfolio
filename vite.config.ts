// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === "build" ? "/Adithya-Portfolio/" : "/",
  server: {
    host: true,
    port: 8000,
    strictPort: true,
    allowedHosts: true,
    hmr: { protocol: "wss", clientPort: 443 },
  },
  preview: {
    host: true,
    port: 8000,
    strictPort: true,
    allowedHosts: true,
  },
}));
