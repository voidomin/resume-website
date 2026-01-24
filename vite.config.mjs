import { defineConfig } from "vite";

export default defineConfig({
  base: "/resume-website/", // REQUIRED for GitHub Pages
  build: {
    outDir: "dist",
    emptyOutDir: true,
    minify: "esbuild",
    cssCodeSplit: true,
  },
  publicDir: "public", // explicitly tell Vite where static pages live
});
