import {
  mkdir,
  readFile,
  writeFile,
} from "node:fs/promises";

import {
  dirname,
  resolve,
} from "node:path";

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
  en: "en_GB",
  de: "de_DE",
  fr: "fr_FR",
  it: "it_IT",
  es: "es_ES",
};
const localeUrls = Object.fromEntries(
  Object.keys(locales).map((locale) => [locale, new URL(`${locale}/`, siteUrl)]),
);
const localePaths = Object.fromEntries(
  Object.entries(localeUrls).map(([locale, url]) => [locale, url.pathname]),
);
const languageAlternates = [...Object.entries(localeUrls), ["x-default", localeUrls.en]]
  .map(([locale, url]) => `<link rel="alternate" hreflang="${locale}" href="${url.href}">`)
  .join("\n  ");

function translationKeys(values, prefix = "") {
  return Object.entries(values).flatMap(([key, value]) => {
    const field = prefix + key;
    if (typeof value === "string") return [field];
    if (value && typeof value === "object" && !Array.isArray(value)) {
      return translationKeys(value, field + ".");
    }
    throw new Error(`Invalid translation value: ${field}`);
  });
}

const dictionaries = await Promise.all(Object.keys(locales).map(async (locale) => {
  const { default: dictionary } = await import(`../src/i18n/${locale}.js`);
  if (dictionary.lang !== locale) throw new Error(`Incorrect HTML language for ${locale}`);
  return [locale, dictionary];
}));
const expectedKeys = new Set(translationKeys(dictionaries[0][1]));
for (const [locale, dictionary] of dictionaries) {
  const keys = new Set(translationKeys(dictionary));
  const missing = [...expectedKeys].filter((key) => !keys.has(key));
  const extra = [...keys].filter((key) => !expectedKeys.has(key));
  if (missing.length || extra.length) {
    throw new Error(`Translation keys for ${locale}: missing [${missing}], extra [${extra}]`);
  }
}

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
  const populatedTemplate = template.replace(
    /^[\t ]*<p\b[^>]*>\s*\{\{\s*([\w.-]+)\s*\}\}\s*<\/p>[\t ]*\r?\n/gm,
    (paragraph, key) => getNestedValue(translations, key) === "" ? "" : paragraph,
  );

  return populatedTemplate.replace(
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

for (const [locale, translations] of dictionaries) {
  const url = localeUrls[locale];
  const canonical = url.href;

  const productData = {
    ...product,
    uppercaseName: product.name.toUpperCase(),
    decimalPrice: product.price.toFixed(2),
    displayPrice: new Intl.NumberFormat(locale, {
      style: "currency",
      currency: product.currency,
    }).format(product.price),
    itemUrl: url.pathname,
    purchaseState: product.availability === "OutOfStock" ? "disabled" : "",
    availabilityLabel: translations.purchase.status[product.availability],
    offerUrl: new URL("#pedal", url).href,
    supplyRating: `${product.supply.volts} V ${product.supply.type}, ${translations.specifications.powerSupply.polarity[product.supply.polarity]}`,
    outputImpedance: `${translations.specifications.approximate} ${product.outputImpedanceKiloohms} kΩ`,
    dimensions: `${translations.specifications.approximate} ${product.dimensionsMm.map((dimension) => `${dimension} mm`).join(" × ")}`,
    current: `${product.currentMilliamps} mA`,
    weight: `${product.weightGrams} g`,
  };

  const context = { ...translations, product: productData, canonical, localePaths, languageAlternates };
  const seoText = (value) => resolveProductTokens(value, context);
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
    locale: locales[locale],
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

const sitemapEntries = [...Object.values(localeUrls).map((url) => url.href), manualUrl]
  .map((url) => `  <url>\n    <loc>${url}</loc>\n  </url>`)
  .join("\n");
await writeFile(
  resolve(projectRoot, "public/sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries}\n</urlset>\n`,
  "utf8",
);
