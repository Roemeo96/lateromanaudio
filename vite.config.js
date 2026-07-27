import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rolldownOptions: {
      input: {
        main: resolve(import.meta.dirname, "index.html"),
        imprint: resolve(import.meta.dirname, "imprint.html"),
        privacy: resolve(import.meta.dirname, "privacy.html"),
      },
    },
  },
});
