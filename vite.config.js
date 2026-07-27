import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(process.cwd(), "index.html"),
        imprint: resolve(process.cwd(), "imprint.html"),
        privacy: resolve(process.cwd(), "privacy.html"),
      },
    },
  },
});