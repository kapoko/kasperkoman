# Kasper Koman: WordPress + Astro

This is an isolated replacement for the Strapi and Next.js stack. Persistent Docker data lives exclusively in `data/`:

- `data/mariadb`: WordPress database
- `data/wordpress`: WordPress files and imported media
- `data/import`: source migration data and original Strapi upload variants
- `data/site`: generated Astro site

## Local URLs

- Astro static site: <http://localhost:4321>
- WordPress editor: <http://localhost:8080/wp-admin>

All settings, including credentials and the build-webhook secret, are in `.env`. Replace its initial development values before exposing this stack publicly.

## Dev

```sh
docker compose up -d --build
cd astro
npm run dev -- --host 127.0.0.1 --port 4322
```

## Content model

The `Kasper Koman Content` plugin defines:

- **Releases**: title, subtitle, date, label, original artist, links, and featured cover art.
- **Gigs**: title, date, city, country code, venue, and ticket/event URL.

WordPress creates its standard image sizes, plus a `release-cover` 1200px square crop, whenever cover art is imported or uploaded.

## Build hook

Saving or publishing a release or gig sends an authenticated request from WordPress to Astro's internal `/build` endpoint. Astro fetches the WordPress REST API and regenerates the fully static site in `data/site`.

Astro also schedules one rebuild at the next UTC midnight after startup, then repeats daily. This keeps the upcoming/past gig split current when no WordPress edit occurs.

## Commands

```sh
docker compose up -d --build
docker compose run --rm wpcli kasper import --source=/import
docker compose run --rm wpcli core update
docker compose run --rm wpcli core update-db
```
