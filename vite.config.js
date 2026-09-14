import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(
          process.cwd(),
          "index.html",
        ),

        en: resolve(
          process.cwd(),
          "en/index.html",
        ),

        de: resolve(
          process.cwd(),
          "de/index.html",
        ),

        fr: resolve(
          process.cwd(),
          "fr/index.html",
        ),

        it: resolve(
          process.cwd(),
          "it/index.html",
        ),

        es: resolve(
          process.cwd(),
          "es/index.html",
        ),

        imprint: resolve(
          process.cwd(),
          "imprint.html",
        ),

        privacy: resolve(
          process.cwd(),
          "privacy.html",
        ),
      },
    },
  },
});