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

- `VITE_SITE_URL`: The canonical URL of the production site. Use `https://resaeni.cc`.
- `VITE_API_BASE_URL`: The URL of the backend API, required to fetch Aeni data at build time for sitemap generation.

### Google Search Console Setup

Follow these manual steps after deploying to production:

1. Use `https://resaeni.cc` as the production canonical domain.
2. Permanently redirect the legacy Cloudflare Pages domain to `https://resaeni.cc` with HTTP 301.
3. Preserve the path and query string in that redirect.
4. Keep Cloudflare Pages preview deployments noindex.
5. Add `https://resaeni.cc` to Google Search Console.
6. Submit `https://resaeni.cc/sitemap.xml`.
7. Inspect `/`, `/anime`, and at least one real `/anime/:id`.
8. Request indexing where appropriate.
