/**
 * Komponen untuk mengatur meta tags dan SEO halaman.
 *
 * @param {Object} props
 * @param {string} props.title - Judul halaman (tag title & og:title).
 * @param {string} [props.description] - Deskripsi halaman (meta description & og:description).
 * @param {string} [props.canonicalPath] - Path relatif halaman untuk URL canonical (misal: "/anime/1").
 * @param {string} [props.image] - URL gambar untuk meta image (OG & Twitter).
 * @param {string} [props.type="website"] - Tipe Open Graph konten (default: "website").
 * @param {string} [props.robots="index, follow"] - Instruksi indexing buat bot crawler.
 */
export default function Seo({
  title,
  description,
  canonicalPath,
  image,
  type = "website",
  robots = "index, follow",
}) {
  const siteUrl = import.meta.env.VITE_SITE_URL || window.location.origin;

  // Normalize URL logic
  const formattedPath = canonicalPath?.startsWith("/")
    ? canonicalPath
    : `/${canonicalPath || ""}`;
  const origin = siteUrl.replace(/\/+$/, "");
  const canonicalUrl = `${origin}${formattedPath}`;

  return (
    <>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}

      <meta name="robots" content={robots} />

      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:title" content={title} />

      {description && <meta property="og:description" content={description} />}

      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="Resaeni" />

      {image && <meta property="og:image" content={image} />}

      <meta
        name="twitter:card"
        content={image ? "summary_large_image" : "summary"}
      />

      <meta name="twitter:title" content={title} />

      {description && <meta name="twitter:description" content={description} />}

      {image && <meta name="twitter:image" content={image} />}
    </>
  );
}
