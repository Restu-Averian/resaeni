const serializeJsonLd = (data) => JSON.stringify(data).replace(/</g, "\\u003c");

export default function JsonLd({ data }) {
  if (!data) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
