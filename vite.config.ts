import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Served from https://han-sen.github.io/bit-easel/
  base: "/bit-easel/",
  plugins: [react()],
});
