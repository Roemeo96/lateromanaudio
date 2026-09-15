import {
  mkdir,
  readFile,
  writeFile,
} from "node:fs/promises";

import {
  dirname,
  resolve,
} from "node:path";

import {
  pathToFileURL,
} from "node:url";

const projectRoot = process.cwd();

const templatePath = resolve(
  projectRoot,
  "templates/index.html",
);

const locales = {
  en: resolve(
    projectRoot,
    "src/i18n/en.js",
  ),

  de: resolve(
    projectRoot,
    "src/i18n/de.js",
  ),

  fr: resolve(
    projectRoot,
    "src/i18n/fr.js",
  ),

  it: resolve(
    projectRoot,
    "src/i18n/it.js",
  ),

  es: resolve(
    projectRoot,
    "src/i18n/es.js",
  ),
};

function getNestedValue(
  object,
  path,
) {
  return path
    .split(".")
    .reduce(
      (value, key) => value?.[key],
      object,
    );
}

function renderTemplate(
  template,
  translations,
) {
  return template.replace(
    /\{\{\s*([\w.-]+)\s*\}\}/g,
    (match, key) => {
      const value =
        getNestedValue(
          translations,
          key,
        );

      if (value === undefined) {
        throw new Error(
          `Missing translation: ${key}`,
        );
      }

      return String(value);
    },
  );
}

for (
  const [locale, translationPath]
  of Object.entries(locales)
) {
  const template =
    await readFile(
      templatePath,
      "utf8",
    );

  const {
    default: translations,
  } = await import(
    pathToFileURL(
      translationPath,
    ).href,
  );

  const html =
    renderTemplate(
      template,
      translations,
    );

  const outputPath = resolve(
    projectRoot,
    locale,
    "index.html",
  );

  await mkdir(
    dirname(outputPath),
    {
      recursive: true,
    },
  );

  await writeFile(
    outputPath,
    html,
    "utf8",
  );

  console.log(
    `Generated ${locale}/index.html`,
  );

  if (locale === "en") {
    const rootOutputPath = resolve(
      projectRoot,
      "index.html",
    );

    await writeFile(
      rootOutputPath,
      html,
      "utf8",
    );

    console.log(
      "Generated index.html (English default)",
    );
  }
}