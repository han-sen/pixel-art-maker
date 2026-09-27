import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Served from https://han-sen.github.io/pixel-art-maker/
  base: "/pixel-art-maker/",
  plugins: [react()],
});
