export const SITE_ORIGIN = "https://resaeni.cc";

const normalizeLastmod = (value) => {
  if (!value) return null;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  return date.toISOString().slice(0, 10);
};

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

const normalizeSitemapEntry = (entry) => {
  const rawUrl = typeof entry === "string" ? entry : entry?.url;
  const url = canonicalPath(rawUrl);
  if (!url) return null;

  return {
    url,
    lastmod: normalizeLastmod(
      typeof entry === "string" ? null : entry?.lastmod,
    ),
  };
};

export const normalizeSitemapUrls = (urls) => [
  ...new Set(urls.map(canonicalPath).filter(Boolean)),
];

export const normalizeSitemapEntries = (entries) => {
  const byUrl = new Map();

  for (const entry of entries) {
    const normalized = normalizeSitemapEntry(entry);
    if (!normalized || byUrl.has(normalized.url)) continue;

    byUrl.set(normalized.url, normalized);
  }

  return [...byUrl.values()];
};

export const escapeXml = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export const buildSitemapXml = (
  entries,
) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${normalizeSitemapEntries(entries)
  .map(
    (entry) =>
      `  <url>\n    <loc>${escapeXml(entry.url)}</loc>${entry.lastmod ? `\n    <lastmod>${entry.lastmod}</lastmod>` : ""}\n  </url>`,
  )
  .join("\n")}
</urlset>`;

export const shouldFailOnApiError = (nodeEnv, siteUrl) =>
  nodeEnv === "production" || siteUrl === SITE_ORIGIN;
