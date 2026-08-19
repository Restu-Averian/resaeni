import {
  buildCanonicalUrl,
  normalizeImageUrl,
} from "../../lib/seo";

/**
 * Komponen untuk mengatur meta tags dan SEO halaman.
 *
 * @param {Object} props
 * @param {string} props.title - Judul halaman (tag title & og:title).
 * @param {string} [props.description] - Deskripsi halaman (meta description & og:description).
 * @param {string} [props.canonicalPath] - Path relatif halaman untuk URL canonical (misal: "/anime/1").
 * @param {string} [props.image] - URL gambar untuk meta image (OG & Twitter).
 * @param {string} [props.imageAlt] - Teks alternatif gambar sosial.
 * @param {string} [props.type="website"] - Tipe Open Graph konten (default: "website").
 * @param {string} [props.robots="index, follow"] - Instruksi indexing buat bot crawler.
 */

export default function Seo({
  title,
  description,
  canonicalPath,
  image,
  imageAlt,
  type = "website",
  robots = "index, follow, max-image-preview:large, max-snippet:-1",
}) {
  const canonicalUrl = buildCanonicalUrl(canonicalPath);
  const imageUrl = normalizeImageUrl(image);

  return (
    <>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}

      <meta name="robots" content={robots} />

      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      <meta property="og:title" content={title} />

      {description && <meta property="og:description" content={description} />}

      <meta property="og:type" content={type} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:site_name" content="Resaeni" />
      <meta property="og:locale" content="en_US" />

      {imageUrl && <meta property="og:image" content={imageUrl} />}
      {imageUrl && imageAlt && (
        <meta property="og:image:alt" content={imageAlt} />
      )}

      <meta
        name="twitter:card"
        content={imageUrl ? "summary_large_image" : "summary"}
      />

      <meta name="twitter:title" content={title} />

      {description && <meta name="twitter:description" content={description} />}

      {imageUrl && <meta name="twitter:image" content={imageUrl} />}
      {imageUrl && imageAlt && (
        <meta name="twitter:image:alt" content={imageAlt} />
      )}
    </>
  );
}
