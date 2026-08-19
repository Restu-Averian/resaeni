import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  SITE_ORIGIN,
  buildSitemapXml,
  normalizeSitemapUrls,
  shouldFailOnApiError,
} from "./sitemap-utils.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

try {
  process.loadEnvFile(path.resolve(__dirname, "../.env"));
} catch {
  // Ignore, file might not exist in production
}

const apiBaseUrl = process.env.VITE_API_BASE_URL || "http://localhost:8787";
const nodeEnv = process.env.NODE_ENV || "development";

const origin = SITE_ORIGIN;

const sitemapPath = path.resolve(__dirname, "../public/sitemap.xml");
const robotsPath = path.resolve(__dirname, "../public/robots.txt");

const staticUrls = [`${origin}/`, `${origin}/anime`];

const dynamicUrls = [];

async function fetchAnimeIds() {
  let page = 1;
  const limit = 50;
  let hasMore = true;

  while (hasMore) {
    try {
      const res = await fetch(
        `${apiBaseUrl}/api/anime?page=${page}&limit=${limit}`,
      );
      if (!res.ok) throw new Error(`API returned ${res.status}`);

      const data = await res.json();
      const items = data.items || [];

      for (const item of items) {
        dynamicUrls.push(`${origin}/anime/${item.id}`);
      }

      if (
        items.length < limit ||
        !data.pagination ||
        page >= data.pagination.total_pages
      ) {
        hasMore = false;
      } else {
        page++;
      }
    } catch (error) {
      const message = `Failed to fetch anime list from ${apiBaseUrl}/api/anime?page=${page}&limit=${limit}: ${error.message}`;
      if (shouldFailOnApiError(nodeEnv, apiBaseUrl)) {
        throw new Error(
          `${message}. Production sitemap generation needs a reachable VITE_API_BASE_URL so detail URLs are complete.`,
        );
      }

      console.warn(`[Sitemap] Warning: ${message}`);
      console.warn("[Sitemap] Local sitemap will contain static routes only.");
      hasMore = false;
    }
  }
}

async function generate() {
  console.log("[Sitemap] Generating sitemap...");
  await fetchAnimeIds();

  const allUrls = normalizeSitemapUrls([...staticUrls, ...dynamicUrls]);
  const sitemapXml = buildSitemapXml(allUrls);

  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${origin}/sitemap.xml
`;

  const publicDir = path.resolve(__dirname, "../public");
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(sitemapPath, sitemapXml, "utf-8");
  fs.writeFileSync(robotsPath, robotsTxt, "utf-8");

  console.log(`[Sitemap] Generated sitemap.xml with ${allUrls.length} URLs.`);
  console.log(`[Sitemap] Generated robots.txt.`);
}

generate().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
