import assert from "node:assert/strict";
import test from "node:test";
import {
  buildAnimeDescription,
  buildAnimeSchemas,
  buildAnimeTitle,
  buildCanonicalUrl,
  buildWebsiteSchema,
  normalizeImageUrl,
  truncateText,
} from "../src/lib/seo.js";
import {
  buildSitemapXml,
  normalizeSitemapEntries,
  normalizeSitemapUrls,
  shouldFailOnApiError,
} from "./sitemap-utils.mjs";

test("canonical URLs normalize route paths and drop query/hash", () => {
  assert.equal(buildCanonicalUrl("/"), "https://resaeni.cc/");
  assert.equal(
    buildCanonicalUrl("/anime/123/"),
    "https://resaeni.cc/anime/123",
  );
  assert.equal(
    buildCanonicalUrl("https://resaeni.cc/anime/123?tab=episodes#cast"),
    "https://resaeni.cc/anime/123",
  );
  assert.equal(buildCanonicalUrl("::::"), "https://resaeni.cc/::::");
  assert.equal(buildCanonicalUrl(), null);
});

test("metadata helpers normalize anime title, description, and images", () => {
  assert.equal(
    buildAnimeTitle({
      title_en: "  Yumi's Cells  ",
      title_native: "유미의 세포들",
    }),
    "Yumi's Cells (유미의 세포들)",
  );
  assert.equal(
    buildAnimeDescription({ synopsis: "A ".repeat(100) }).endsWith("..."),
    true,
  );
  assert.equal(truncateText("Short synopsis.", 155), "Short synopsis.");
  assert.equal(
    normalizeImageUrl("/social/resaeni-og-image.png"),
    "https://resaeni.cc/social/resaeni-og-image.png",
  );
  assert.equal(normalizeImageUrl("mailto:test@example.com"), null);
});

test("website schema carries site name and organization identity", () => {
  const schema = buildWebsiteSchema();
  const website = schema["@graph"].find((item) => item["@type"] === "WebSite");
  const organization = schema["@graph"].find(
    (item) => item["@type"] === "Organization",
  );

  assert.equal(website.name, "Resaeni");
  assert.equal(website.url, "https://resaeni.cc/");
  assert.equal(
    organization.logo,
    "https://resaeni.cc/brand/resaeni-icon-square.png",
  );
});

test("anime schema uses truthful visible data only", () => {
  const schemas = buildAnimeSchemas({
    canonicalUrl: "https://resaeni.cc/anime/1",
    anime: {
      title_en: "Leafie",
      title_native: "마당을 나온 암탉",
      type: "Movie",
      synopsis: "A Korean animated film.",
      banner_bg_img: "/leafie.jpg",
      genres: ["Adventure"],
      aired_from: "2011-07-28T00:00:00.000Z",
      episodes_count: 1,
      studio: "Myung Films",
    },
  });

  assert.equal(schemas[0]["@type"], "BreadcrumbList");
  assert.equal(schemas[1]["@type"], "Movie");
  assert.equal(schemas[1].datePublished, "2011-07-28");
  assert.equal(schemas[1].aggregateRating, undefined);
});

test("sitemap keeps canonical indexable URLs, escapes XML, and emits real lastmod", () => {
  const entries = normalizeSitemapEntries([
    "https://resaeni.cc/anime/1?x=1#top",
    { url: "/anime/1", lastmod: "2026-08-18T10:20:30.000Z" },
    { url: "/anime/2", lastmod: "not-a-date" },
    "/anime/2/episode/1",
    "/anime/yumi&cells",
  ]);

  assert.deepEqual(entries, [
    { url: "https://resaeni.cc/anime/1", lastmod: null },
    { url: "https://resaeni.cc/anime/2", lastmod: null },
    { url: "https://resaeni.cc/anime/yumi&cells", lastmod: null },
  ]);

  assert.deepEqual(
    normalizeSitemapUrls(["/", "/anime", "/anime/2/episode/1"]),
    ["https://resaeni.cc/", "https://resaeni.cc/anime"],
  );

  const xml = buildSitemapXml([
    { url: "/anime/yumi&cells", lastmod: "2026-08-18T10:20:30.000Z" },
  ]);

  assert.match(xml, /<loc>https:\/\/resaeni.cc\/anime\/yumi&amp;cells<\/loc>/);
  assert.match(xml, /<lastmod>2026-08-18<\/lastmod>/);
  assert.doesNotMatch(xml, /changefreq|priority|episode/);
});

test("production sitemap and prerender fail when API data is required", () => {
  assert.equal(
    shouldFailOnApiError("production", "https://resaeni.pages.dev"),
    true,
  );
  assert.equal(shouldFailOnApiError("development", "https://resaeni.cc"), true);
  assert.equal(
    shouldFailOnApiError("development", "https://resaeni.pages.dev"),
    false,
  );
});
