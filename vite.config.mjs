import { defineConfig } from "vite";

export default defineConfig({
  base: "/resume-website/", // REQUIRED for GitHub Pages
  build: {
    outDir: "dist",
    emptyOutDir: true,
    minify: "esbuild",
    cssCodeSplit: true,
    target: "esnext", // Modern browsers only -> smaller code
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["/assets/js/main.js", "/assets/js/src/theme-manager.js"],
        },
      },
    },
  },
  publicDir: "public", // explicitly tell Vite where static pages live
});
