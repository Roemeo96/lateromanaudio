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

import { product } from "../src/product-data.js";

const projectRoot = process.cwd();

const templatePath = resolve(
  projectRoot,
  "templates/index.html",
);

const template = await readFile(templatePath, "utf8");
const manual = await readFile(resolve(projectRoot, "templates/weltgeist-manual.html"), "utf8");
const siteUrl = "https://lateromanaudio.de/";
const manualUrl = new URL("weltgeist-manual.html", siteUrl).href;
const organization = {
  "@type": "Organization",
  "@id": new URL("#organization", siteUrl).href,
  name: "Late Roman Audio",
  url: siteUrl,
};

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

function resolveProductTokens(value, context) {
  return String(value).replace(
    /\{(product\.[\w.]+)\}/g,
    (_, token) => {
      const productValue = getNestedValue(context, token);
      if (productValue === undefined) {
        throw new Error(`Missing product data: ${token}`);
      }
      return String(productValue);
    },
  );
}

function escapeAttribute(value) {
  return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
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

      return resolveProductTokens(value, translations);
    },
  );
}

await writeFile(resolve(projectRoot, "weltgeist-manual.html"), renderTemplate(manual, { product, manualUrl }), "utf8");

for (
  const [locale, translationPath]
  of Object.entries(locales)
) {
  const {
    default: translations,
  } = await import(
    pathToFileURL(
      translationPath,
    ).href,
  );

  const productData = {
    ...product,
    uppercaseName: product.name.toUpperCase(),
    decimalPrice: product.price.toFixed(2),
    displayPrice: new Intl.NumberFormat(locale, {
      style: "currency",
      currency: product.currency,
    }).format(product.price),
    itemUrl: translations.links.home,
    purchaseState: product.availability === "OutOfStock" ? "disabled" : "",
    availabilityLabel: translations.purchase.status[product.availability],
    offerUrl: new URL("#pedal", translations.seo.canonical).href,
    supplyRating: `${product.supply.volts} V ${product.supply.type}, ${translations.specifications.powerSupply.polarity[product.supply.polarity]}`,
    current: `${product.currentMilliamps} mA`,
    weight: `${product.weightGrams} g`,
  };

  const context = { ...translations, product: productData };
  const seoText = (value) => resolveProductTokens(value, context);
  const canonical = translations.seo.canonical;
  const productImage = new URL(product.photo, canonical).href;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      organization,
      {
        "@type": "Product",
        name: product.name,
        image: productImage,
        description: seoText(translations.seo.productDescription),
        brand: { "@type": "Brand", name: organization.name },
        offers: {
          "@type": "Offer",
          url: productData.offerUrl,
          priceCurrency: product.currency,
          price: productData.decimalPrice,
          availability: new URL(product.availability, "https://schema.org/").href,
        },
      },
    ],
  };
  const social = {
    title: escapeAttribute(seoText(translations.seo.title)),
    description: escapeAttribute(seoText(translations.seo.description)),
    image: productImage,
    imageAlt: escapeAttribute(seoText(translations.purchase.imageAlt)),
    locale: { en: "en_GB", de: "de_DE", fr: "fr_FR", it: "it_IT", es: "es_ES" }[locale],
  };

  const html =
    renderTemplate(
      template,
      {
        ...context,
        social,
        structuredData: JSON.stringify(structuredData, null, 2).replaceAll("<", "\\u003c"),
      },
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
