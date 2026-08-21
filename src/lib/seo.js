const normalizePathname = (pathname) => {
  if (!pathname || pathname === "/") return "/";
  return `/${pathname.replace(/^\/+|\/+$/g, "")}`;
};

export const buildCanonicalUrl = (canonicalPath) => {
  if (!canonicalPath) return null;

  try {
    const url = new URL(canonicalPath, "https://resaeni.cc");
    return `https://resaeni.cc${normalizePathname(url.pathname)}`;
  } catch {
    return null;
  }
};

export const normalizeImageUrl = (image) => {
  if (!image) return null;

  try {
    const base =
      image.startsWith("/social") || image.startsWith("/brand")
        ? "https://resaeni.cc"
        : "https://assets.resaeni.cc";
    const url = new URL(image, base);
    return url.protocol === "http:" || url.protocol === "https:"
      ? url.href
      : null;
  } catch {
    return null;
  }
};

export const normalizeText = (value) =>
  typeof value === "string" ? value.replace(/\s+/g, " ").trim() : "";

export const truncateText = (value, maxLength = 155) => {
  const text = normalizeText(value);
  if (text.length <= maxLength) return text;

  const truncated = text.slice(0, maxLength + 1);
  const wordBoundary = truncated.lastIndexOf(" ");
  const clean =
    wordBoundary > 0
      ? truncated.slice(0, wordBoundary)
      : text.slice(0, maxLength);

  return `${clean.replace(/[.,;:!?-]+$/g, "").trim()}...`;
};

export const buildAnimeTitle = (anime) => {
  const primaryTitle =
    normalizeText(anime?.title_en) ||
    normalizeText(anime?.title_romaji) ||
    "Aeni";
  const nativeTitle = normalizeText(anime?.title_native);

  return nativeTitle ? `${primaryTitle} (${nativeTitle})` : primaryTitle;
};

export const buildAnimeDescription = (anime) =>
  truncateText(anime?.synopsis) ||
  "Discover this Aeni and Korean animation title on Resaeni.";

const cleanObject = (object) =>
  Object.fromEntries(
    Object.entries(object).filter(([, value]) => {
      if (Array.isArray(value)) return value.length > 0;
      return value !== null && value !== undefined && value !== "";
    }),
  );

export const buildWebsiteSchema = () => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://resaeni.cc/#website",
      name: "Resaeni",
      alternateName: "Resaeni Aeni",
      url: "https://resaeni.cc/",
      description:
        "Resaeni is a curated place to discover and watch Korean animation and Aeni.",
      publisher: {
        "@id": "https://resaeni.cc/#organization",
      },
    },
    {
      "@type": "Organization",
      "@id": "https://resaeni.cc/#organization",
      name: "Resaeni",
      url: "https://resaeni.cc/",
      logo: "https://resaeni.cc/brand/resaeni-icon-square.png",
    },
  ],
});

export const buildAnimeSchemas = ({ anime, canonicalUrl }) => {
  if (!anime || !canonicalUrl) return [];

  const title = buildAnimeTitle(anime);
  const description = buildAnimeDescription(anime);
  const image = normalizeImageUrl(anime.banner_bg_img || anime.photo);
  const genres = Array.isArray(anime.genres)
    ? anime.genres.filter(Boolean)
    : [];
  const episodesCount = Number(anime.episodes_count);
  const datePublished = normalizeText(anime.aired_from)?.slice(0, 10);
  const schemaType = anime.type === "Movie" ? "Movie" : "TVSeries";

  return [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://resaeni.cc/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Aeni Library",
          item: "https://resaeni.cc/anime",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: title,
          item: canonicalUrl,
        },
      ],
    },
    cleanObject({
      "@context": "https://schema.org",
      "@type": schemaType,
      name: title,
      alternateName: normalizeText(anime.title_native),
      description,
      image,
      genre: genres,
      datePublished: /^\d{4}-\d{2}-\d{2}$/.test(datePublished)
        ? datePublished
        : undefined,
      numberOfEpisodes:
        Number.isSafeInteger(episodesCount) && episodesCount > 0
          ? episodesCount
          : undefined,
      productionCompany: anime.studio
        ? {
            "@type": "Organization",
            name: anime.studio,
          }
        : undefined,
    }),
  ];
};
