import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve("index.html"),
        en: resolve("en/index.html"),
        de: resolve("de/index.html"),
        fr: resolve("fr/index.html"),
        it: resolve("it/index.html"),
        es: resolve("es/index.html"),
        imprint: resolve("imprint.html"),
        privacy: resolve("privacy.html"),
        manual: resolve("weltgeist-manual.html"),
      },
    },
  },
});