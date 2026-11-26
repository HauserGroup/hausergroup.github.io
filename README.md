# hausergroup.github.io

The website of the **Hauser Group** (Pharmacoinformatics) at the Department of
Drug Design and Pharmacology, University of Copenhagen, studying how human
genetic variation changes the way G protein-coupled receptors (GPCRs) respond to
drugs. Built with [Astro](https://astro.build) and published at
<https://hausergroup.org>.

## Run it locally

You need Node.js 24 or newer (`.nvmrc` pins 24 — run `nvm use` if you use nvm).

```bash
npm install
npm run dev
```

The site is then at <http://localhost:4321> and reloads as you edit.
`npm run build` builds the production site into `dist/`, and `npm run check:seo`
verifies sitemaps, canonical links, metadata, Open Graph tags, JSON-LD and
`llms.txt` in `dist/`.
`npm run format` formats your changes with Prettier. The **Build site** check
fails on unformatted files or failed SEO checks, so run both before you push.

## Where things live

- `src/pages/` — one file per page (`src/pages/people/` becomes `/people/`,
  plus build-time endpoints for `sitemap.xml`, `robots.txt` and `llms.txt`).
- `src/data/site.ts` — research scales, statement and ways to join.
- `src/data/profiles.ts` — people, roles, portraits and external profile links.
- `src/data/publications.ts` — curated publications with DOIs.
- `src/data/structuredData.ts` — Schema.org JSON-LD builders.
- `src/layouts/Base.astro` — page head, metadata, header and footer.
- `src/styles/site.css` — colors, type and components.
- `src/components/` — the logo, particle receptor and page sections.
- `public/` — files served as-is (`CNAME`, `favicon.svg`, `og-image.png`,
  portraits).
- `scripts/check-seo.mjs` — automated build-output SEO verification run in CI.
- `astro.config.mjs` — site configuration.
- `design/DESIGN.md` — the design choices behind the site. Read it before
  changing how things look.
- `design/SEO.md` — search discoverability guide and checklist.

VS Code will suggest the Astro and Prettier extensions when you open the folder;
install them for autocomplete in `.astro` files and formatting from the editor.

## Making changes

`main` is protected, so changes go through a pull request:

1. Create a branch: `git switch -c my-change`
2. Commit your changes and push the branch.
3. Open a pull request into `main`.
4. Wait for the **Build site** check to pass and for one approval.
5. Squash and merge.

Merging to `main` deploys the site automatically within a minute or two.
