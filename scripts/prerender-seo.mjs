import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  buildAnimeDescription,
  buildAnimeSchemas,
  buildAnimeTitle,
  buildCanonicalUrl,
  buildWebsiteSchema,
  normalizeImageUrl,
} from "../src/lib/seo.js";
import { SITE_ORIGIN, shouldFailOnApiError } from "./sitemap-utils.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const indexPath = path.join(distDir, "index.html");

try {
  process.loadEnvFile(path.join(rootDir, ".env"));
} catch {
  // Ignore, file might not exist in production
}

const apiBaseUrl = process.env.VITE_API_BASE_URL || "http://localhost:8787";
const nodeEnv = process.env.NODE_ENV || "development";
const siteUrl = process.env.VITE_SITE_URL;
const defaultImage = `${SITE_ORIGIN}/social/resaeni-og-image.png`;
const defaultImageAlt = "Resaeni Korean animation and Aeni discovery artwork";

const escapeHtml = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const escapeAttribute = (value) =>
  escapeHtml(value).replace(/"/g, "&quot;").replace(/'/g, "&#39;");

const serializeJsonLd = (data) => JSON.stringify(data).replace(/</g, "\\u003c");

const metaTag = (name, content, attr = "name") =>
  content
    ? `<meta ${attr}="${name}" content="${escapeAttribute(content)}" />`
    : "";

const buildHead = ({
  title,
  description,
  canonicalPath,
  image = defaultImage,
  imageAlt = defaultImageAlt,
  type = "website",
  robots = "index, follow, max-image-preview:large, max-snippet:-1",
  jsonLd,
}) => {
  const canonicalUrl = buildCanonicalUrl(canonicalPath);
  const imageUrl = normalizeImageUrl(image) || defaultImage;
  const tags = [
    `<title>${escapeHtml(title)}</title>`,
    metaTag("description", description),
    metaTag("robots", robots),
    canonicalUrl
      ? `<link rel="canonical" href="${escapeAttribute(canonicalUrl)}" />`
      : "",
    metaTag("og:title", title, "property"),
    metaTag("og:description", description, "property"),
    metaTag("og:type", type, "property"),
    metaTag("og:url", canonicalUrl, "property"),
    metaTag("og:site_name", "Resaeni", "property"),
    metaTag("og:locale", "en_US", "property"),
    metaTag("og:image", imageUrl, "property"),
    metaTag("og:image:alt", imageAlt, "property"),
    imageUrl === defaultImage
      ? '<meta property="og:image:width" content="1731" />'
      : "",
    imageUrl === defaultImage
      ? '<meta property="og:image:height" content="909" />'
      : "",
    metaTag("twitter:card", "summary_large_image"),
    metaTag("twitter:title", title),
    metaTag("twitter:description", description),
    metaTag("twitter:image", imageUrl),
    metaTag("twitter:image:alt", imageAlt),
    jsonLd
      ? `<script type="application/ld+json">${serializeJsonLd(jsonLd)}</script>`
      : "",
  ];

  return tags
    .filter(Boolean)
    .map((tag) => `    ${tag}`)
    .join("\n");
};

const buildNoscript = (title, description, href) => `<noscript>
      <main>
        <h1>${escapeHtml(title)}</h1>
        <p>${escapeHtml(description)}</p>
        <p><a href="${escapeAttribute(href)}">Open this page on Resaeni</a></p>
      </main>
    </noscript>`;

const renderHtml = (template, route) => {
  const withoutTitle = template.replace(/\s*<title>[\s\S]*?<\/title>/, "");
  const withHead = withoutTitle.replace(
    "</head>",
    `${buildHead(route)}\n  </head>`,
  );
  const href = buildCanonicalUrl(route.canonicalPath) || `${SITE_ORIGIN}/`;

  return withHead.replace(
    /<body>\s*/,
    `<body>\n    ${buildNoscript(route.title, route.description, href)}\n    `,
  );
};

const writeRoute = (template, route) => {
  const pathname =
    route.canonicalPath === "/" ? "" : route.canonicalPath.slice(1);
  const filePath =
    route.canonicalPath === "/"
      ? indexPath
      : path.join(distDir, pathname, "index.html");

  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, renderHtml(template, route), "utf-8");
};

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`API returned ${response.status}`);

  return response.json();
}

async function fetchAnimeList() {
  const items = [];
  let page = 1;
  const limit = 50;

  while (true) {
    const url = `${apiBaseUrl}/api/anime?page=${page}&limit=${limit}`;
    const body = await fetchJson(url);
    const pageItems = body.data?.items ?? body.items ?? [];
    items.push(...pageItems);

    const pagination = body.data?.pagination ?? body.pagination;
    if (
      pageItems.length < limit ||
      !pagination ||
      page >= pagination.total_pages
    ) {
      return items;
    }

    page += 1;
  }
}

async function fetchAnimeDetails(id) {
  const body = await fetchJson(`${apiBaseUrl}/api/anime/${id}`);
  return body.data;
}

async function fetchHomeImage() {
  try {
    const body = await fetchJson(`${apiBaseUrl}/api/home`);
    return body.data?.featured?.banner_bg_img;
  } catch {
    return null;
  }
}

async function buildRoutes() {
  const routes = [
    {
      canonicalPath: "/",
      title: "Resaeni — Discover Korean Animation & Aeni",
      description:
        "Resaeni is a curated place to discover and watch Korean animation and Aeni.",
      image: (await fetchHomeImage()) || defaultImage,
      imageAlt: "Featured Aeni artwork on Resaeni",
      jsonLd: buildWebsiteSchema(),
    },
    {
      canonicalPath: "/anime",
      title: "Aeni Library | Resaeni",
      description:
        "Browse Korean animated series and films in the Resaeni Aeni library.",
    },
  ];

  let animeList = [];
  try {
    animeList = await fetchAnimeList();
  } catch (error) {
    const message = `Failed to fetch anime list from ${apiBaseUrl}/api/anime: ${error.message}`;
    if (shouldFailOnApiError(nodeEnv, siteUrl)) {
      throw new Error(
        `${message}. Production prerendering needs anime detail data.`,
      );
    }

    console.warn(`[Prerender SEO] Warning: ${message}`);
    console.warn(
      "[Prerender SEO] Local build will contain static route HTML only.",
    );
  }

  for (const item of animeList) {
    try {
      const anime = await fetchAnimeDetails(item.id);
      const title = buildAnimeTitle(anime);
      const canonicalPath = `/anime/${item.id}`;
      const canonicalUrl = buildCanonicalUrl(canonicalPath);

      routes.push({
        canonicalPath,
        title: `${title} | Resaeni`,
        description: buildAnimeDescription(anime),
        image: anime.banner_bg_img || anime.photo || defaultImage,
        imageAlt: `${title} artwork`,
        jsonLd: buildAnimeSchemas({ anime, canonicalUrl }),
      });
    } catch (error) {
      const message = `Failed to fetch anime detail ${item.id}: ${error.message}`;
      if (shouldFailOnApiError(nodeEnv, siteUrl)) throw new Error(message);

      console.warn(`[Prerender SEO] Warning: ${message}`);
    }
  }

  return routes;
}

async function prerender() {
  const template = fs.readFileSync(indexPath, "utf-8");
  const routes = await buildRoutes();

  for (const route of routes) {
    writeRoute(template, route);
  }

  console.log(
    `[Prerender SEO] Generated route HTML for ${routes.length} URLs.`,
  );
}

prerender().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
