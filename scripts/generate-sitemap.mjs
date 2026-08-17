import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

try {
  process.loadEnvFile(path.resolve(__dirname, "../.env"));
} catch {
  // Ignore, file might not exist in production
}

const siteUrl = process.env.VITE_SITE_URL || "https://resaeni.pages.dev";
const apiBaseUrl = process.env.VITE_API_BASE_URL || "http://localhost:8787";

const origin = siteUrl.replace(/\/+$/, "");

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
    } catch (err) {
      console.warn(
        `[Sitemap] Warning: Failed to fetch anime list from API: ${err.message}`,
      );
      console.warn(
        "[Sitemap] Sitemap will only contain static routes and any fetched so far.",
      );
      hasMore = false;
    }
  }
}

async function generate() {
  console.log("[Sitemap] Generating sitemap...");
  await fetchAnimeIds();

  const allUrls = [...staticUrls, ...dynamicUrls];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map((url) => `  <url>\n    <loc>${url}</loc>\n  </url>`).join("\n")}
</urlset>`;

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

generate().catch(console.error);
