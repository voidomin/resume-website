import { defineConfig } from "vite";

export default defineConfig({
  root: ".",
  base: "/resume-website/",
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
