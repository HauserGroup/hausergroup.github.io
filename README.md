# hausergroup.github.io

The Hauser Group website, built with [Astro](https://astro.build) and published at
<https://hausergroup.github.io>.

## Run it locally

You need Node.js 24 or newer (`.nvmrc` pins 24 — run `nvm use` if you use nvm).

```bash
npm install
npm run dev
```

The site is then at <http://localhost:4321> and reloads as you edit.
`npm run build` builds the production site into `dist/`.
`npm run format` formats your changes with Prettier. The **Build site** check
fails on unformatted files, so run it before you push.

## Where things live

- `src/pages/` — one file per page. `src/pages/people.astro` becomes `/people`.
- `public/` — files served as-is, such as images and PDFs.
- `astro.config.mjs` — site configuration.

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
