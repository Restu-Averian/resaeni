# Resaeni

Korean animation / Aeni discovery project.

## Stack

Frontend:

- React
- Vite
- Chakra UI
- React Router
- TanStack Query
- Axios
- Cloudflare

API:

- Cloudflare Workers
- Hono
- TypeScript

## Development

Frontend:

```bash
npm install
npm run dev
```

```bash
cd worker
npm install
npm run dev
```

## SEO & Production Environment

The production deployment requires the following environment variables:

- `VITE_SITE_URL`: The canonical URL of the production site (e.g., `https://resaeni.cc`). This is required for accurate canonical tags, Open Graph URLs, and the dynamically generated `sitemap.xml` and `robots.txt`.
- `VITE_API_BASE_URL`: The URL of the backend API, required to fetch Aeni data at build time for sitemap generation.

### Google Search Console Setup

Follow these manual steps after deploying to production:

1. Deploy the production Resaeni `*.pages.dev` site.
2. Confirm the production URL does not return an `X-Robots-Tag: noindex` header.
3. Add the **production URL** to Google Search Console as a new property.
4. Submit the sitemap at `/sitemap.xml`.
5. Use the URL Inspection tool on the Home page (`/`), Library page (`/anime`), and one real Detail page (`/anime/:id`).
6. Request indexing where appropriate.
7. **Never** submit Cloudflare preview or branch deployment URLs as the canonical site.
