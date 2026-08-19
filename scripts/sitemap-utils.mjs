export const SITE_ORIGIN = "https://resaeni.cc";

const canonicalPath = (urlValue) => {
  try {
    const url = new URL(urlValue, SITE_ORIGIN);
    if (url.pathname.includes("/episode/")) return null;
    if (url.search) url.search = "";
    url.hash = "";

    const pathname =
      url.pathname === "/" ? "/" : `/${url.pathname.replace(/^\/+|\/+$/g, "")}`;

    return `${SITE_ORIGIN}${pathname}`;
  } catch {
    return null;
  }
};

export const normalizeSitemapUrls = (urls) => [
  ...new Set(urls.map(canonicalPath).filter(Boolean)),
];

export const escapeXml = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export const buildSitemapXml = (urls) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${normalizeSitemapUrls(urls)
  .map((url) => `  <url>\n    <loc>${escapeXml(url)}</loc>\n  </url>`)
  .join("\n")}
</urlset>`;

export const shouldFailOnApiError = (nodeEnv, apiBaseUrl) =>
  nodeEnv === "production" && !apiBaseUrl.startsWith("http://localhost");
