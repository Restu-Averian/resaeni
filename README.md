<p align="center">
  <img src="./public/brand/resaeni-logo-horizontal.png" alt="Resaeni" width="260" />
</p>

<p align="center">
  A free, ad-free streaming and discovery platform dedicated to Korean animation - Aeni.
</p>

<p align="center">
  <a href="https://resaeni.cc">Live Application</a>
</p>

## About Resaeni

Resaeni is a focused catalogue and watch experience for Korean animation, also known as Aeni. Instead of becoming another broad anime index, the project is intentionally scoped around helping people discover, explore, choose an episode, and watch Korean animated titles in one place.

The product philosophy is simple: watching should stay clean and interruption-free. Resaeni does not intentionally place advertisements around common playback interactions such as play, pause, seeking forward, or rewinding.

## Why This Project

Korean animation is harder to discover than mainstream Japanese anime, so Resaeni treats focus as a product decision. The app prioritizes a narrow catalogue, direct navigation, and a quiet viewing surface over extra social or engagement features.

Current flow:

```text
Discover -> Explore -> Choose Episode -> Watch
```

## Core Experience

- **Home discovery**: featured Aeni and curated tonight picks from the Worker `/api/home` endpoint.
- **Aeni Library**: searchable, filterable, paginated catalogue at `/anime`.
- **Aeni details**: title metadata, synopsis, genres, status, episode count, episodes, characters, and voice actor data.
- **Streaming page**: native HTML video playback with previous/next episode navigation and an episode list.
- **Responsive interface**: desktop navigation plus a mobile bottom navigation and responsive layouts across catalogue, detail, and watch pages.
- **Loading and fallback states**: skeleton screens, image placeholders, image error assets, empty states, and API error states.

## Engineering Highlights

- **Separate frontend and API packages**: the React/Vite application lives at the repository root, while the Hono API is maintained as a separate `worker/` package. This keeps UI code and edge API code independently runnable.
- **Cloudflare-oriented deployment**: the frontend uses the Cloudflare Vite plugin and deploys built assets through Wrangler; the API runs as a Cloudflare Worker with explicit Worker config scripts.
- **Turso-backed API reads**: Worker routes use `@libsql/client` to query Turso/libSQL tables for anime metadata, episodes, episode links, characters, and voice actors.
- **Route-focused API design**: `/api/home`, `/api/anime`, and `/api/anime/:mal_id` are split into route folders with handlers and utilities that match their domain.
- **Pragmatic data fetching**: TanStack Query handles client-side request caching, retry behavior, and loading state ownership for the React app.
- **SEO basics are implemented, but kept honest**: route-level meta tags, canonical URLs, Open Graph/Twitter metadata, JSON-LD helpers, sitemap generation, robots.txt generation, and build-time HTML prerendering are present. SEO still deserves separate review as the project evolves.

## Tech Stack

### Frontend

- React 19
- Vite
- Chakra UI v3
- React Router
- TanStack Query
- Axios
- Lucide React

### Backend

- Cloudflare Workers
- Hono
- TypeScript
- `@libsql/client`

### Data and Media

- Turso/libSQL for catalogue, episode, character, and voice actor data
- Environment-configured video base URL with episode link paths returned by the API

### Infrastructure and Quality

- Wrangler
- Cloudflare Vite plugin
- ESLint
- Prettier
- Node test runner for SEO helper coverage
- Vitest configured for Worker tests

## Local Development

Requires Node.js 24 or newer.

Install and run the frontend:

```bash
npm install
npm run dev
```

Install and run the API Worker:

```bash
cd worker
npm install
npm run dev
```

Frontend environment variables:

```text
VITE_API_BASE_URL      # Backend API base URL
VITE_SITE_URL          # Canonical site URL used by SEO build scripts
VITE_BASE_VIDEO_URL    # Base URL for video playback sources
```

Worker environment variables:

```text
TURSO_DATABASE_URL     # Turso/libSQL database URL
TURSO_AUTH_TOKEN       # Turso auth token
```

## Useful Scripts

Root application:

```bash
npm run dev
npm run build
npm run test
npm run lint
npm run format:check
npm run deploy
```

Worker:

```bash
cd worker
npm run dev
npm run typecheck
npm test
npm run deploy
```

## Active Maintenance

Resaeni is maintained as an evolving product rather than a finished demo. The codebase and dependencies are reviewed regularly, with dependency maintenance planned as part of a monthly maintenance cycle.

Catalogue freshness is currently a maintenance responsibility, not an automatic synchronization feature in this repository. If automated content updates are added later, they should be documented from the implementation rather than implied.
