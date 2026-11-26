import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const SITE = "https://hausergroup.org";
const DIST = new URL("../dist", import.meta.url).pathname;

const errors = [];
const fail = (msg) => errors.push(msg);

function walk(dir) {
  const results = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      results.push(...walk(full));
    } else {
      results.push(full);
    }
  }
  return results;
}

function getAttr(tag, name) {
  const re = new RegExp(`\\b${name}\\s*=\\s*"([^"]*)"`, "i");
  return tag.match(re)?.[1];
}

function findMeta(html, attrName, attrValue) {
  const tags = html.match(/<meta\b[^>]*>/gi) ?? [];
  for (const tag of tags) {
    if (getAttr(tag, attrName)?.toLowerCase() === attrValue.toLowerCase()) {
      return getAttr(tag, "content");
    }
  }
  return undefined;
}

function findCanonicalLinks(html) {
  const tags = html.match(/<link\b[^>]*>/gi) ?? [];
  return tags
    .filter((tag) => getAttr(tag, "rel")?.toLowerCase() === "canonical")
    .map((tag) => getAttr(tag, "href"));
}

if (!existsSync(DIST)) {
  console.error("dist/ directory not found. Run `npm run build` first.");
  process.exit(1);
}

// 1. Root static assets
const cnamePath = join(DIST, "CNAME");
if (!existsSync(cnamePath)) {
  fail("Missing dist/CNAME");
} else if (readFileSync(cnamePath, "utf8").trim() !== "hausergroup.org") {
  fail(`Unexpected dist/CNAME content: ${readFileSync(cnamePath, "utf8")}`);
}

const robotsPath = join(DIST, "robots.txt");
if (!existsSync(robotsPath)) {
  fail("Missing dist/robots.txt");
} else {
  const robots = readFileSync(robotsPath, "utf8");
  if (!robots.includes(`Sitemap: ${SITE}/sitemap.xml`)) {
    fail(
      "dist/robots.txt does not reference https://hausergroup.org/sitemap.xml",
    );
  }
}

const llmsPath = join(DIST, "llms.txt");
if (!existsSync(llmsPath)) {
  fail("Missing dist/llms.txt");
} else {
  const llms = readFileSync(llmsPath, "utf8");
  if (!llms.includes("# Hauser Group") || !llms.includes(`${SITE}/`)) {
    fail("dist/llms.txt is missing expected Hauser Group summary or URLs");
  }
  if (llms.includes("hausergroup.github.io")) {
    fail("dist/llms.txt contains stale hausergroup.github.io reference");
  }
}

const ogImagePath = join(DIST, "og-image.png");
if (!existsSync(ogImagePath) || statSync(ogImagePath).size === 0) {
  fail("Missing or empty dist/og-image.png");
}

if (existsSync(join(DIST, "research", "index.html"))) {
  fail("Orphaned dist/research/index.html should not be built");
}

// 2. HTML pages & sitemap parity
const allFiles = walk(DIST);
const htmlFiles = allFiles.filter((f) => f.endsWith(".html"));

const notFoundPath = join(DIST, "404.html");
if (!existsSync(notFoundPath)) {
  fail("Missing dist/404.html");
} else {
  const html404 = readFileSync(notFoundPath, "utf8");
  if (findMeta(html404, "name", "robots") !== "noindex") {
    fail('dist/404.html must include <meta name="robots" content="noindex">');
  }
  if (findCanonicalLinks(html404).length > 0) {
    fail("dist/404.html must not emit a canonical link");
  }
}

const indexableFiles = htmlFiles.filter((f) => f !== notFoundPath);
const expectedUrls = new Set();
const seenTitles = new Map();
const seenDescriptions = new Map();

for (const file of indexableFiles) {
  const rel = relative(DIST, file).split(sep).join("/");
  let expectedPath;
  if (rel === "index.html") {
    expectedPath = "/";
  } else if (rel.endsWith("/index.html")) {
    expectedPath = "/" + rel.slice(0, -"/index.html".length) + "/";
  } else {
    expectedPath = "/" + rel;
  }
  const expectedUrl = `${SITE}${expectedPath}`;
  expectedUrls.add(expectedUrl);

  const html = readFileSync(file, "utf8");

  if (html.includes("hausergroup.github.io")) {
    fail(`${rel}: contains stale hausergroup.github.io link`);
  }

  const title = html.match(/<title>([^<]+)<\/title>/i)?.[1]?.trim();
  if (!title) {
    fail(`${rel}: missing <title>`);
  } else if (seenTitles.has(title)) {
    fail(
      `${rel}: duplicate <title> "${title}" (also on ${seenTitles.get(title)})`,
    );
  } else {
    seenTitles.set(title, rel);
  }

  const description = findMeta(html, "name", "description")?.trim();
  if (!description) {
    fail(`${rel}: missing <meta name="description">`);
  } else {
    if (description.length < 50 || description.length > 220) {
      fail(
        `${rel}: meta description length ${description.length} outside 50–220 chars`,
      );
    }
    if (seenDescriptions.has(description)) {
      fail(
        `${rel}: duplicate meta description (also on ${seenDescriptions.get(description)})`,
      );
    } else {
      seenDescriptions.set(description, rel);
    }
  }

  const canonicals = findCanonicalLinks(html);
  if (canonicals.length !== 1) {
    fail(`${rel}: expected 1 canonical link, found ${canonicals.length}`);
  } else if (canonicals[0] !== expectedUrl) {
    fail(`${rel}: canonical "${canonicals[0]}" !== expected "${expectedUrl}"`);
  }

  for (const prop of ["og:title", "og:description", "og:url", "og:image"]) {
    if (!findMeta(html, "property", prop)) {
      fail(`${rel}: missing meta property="${prop}"`);
    }
  }
  if (!findMeta(html, "name", "twitter:card")) {
    fail(`${rel}: missing meta name="twitter:card"`);
  }

  const jsonLdMatches = [
    ...html.matchAll(
      /<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi,
    ),
  ];
  if (jsonLdMatches.length === 0) {
    fail(`${rel}: missing JSON-LD structured data`);
  }
  for (const match of jsonLdMatches) {
    try {
      const parsed = JSON.parse(match[1]);
      if (parsed["@context"] !== "https://schema.org") {
        fail(`${rel}: JSON-LD missing "@context": "https://schema.org"`);
      }
    } catch (err) {
      fail(`${rel}: invalid JSON-LD (${err.message})`);
    }
  }
}

// 3. Validate sitemap.xml
const sitemapPath = join(DIST, "sitemap.xml");
if (!existsSync(sitemapPath)) {
  fail("Missing dist/sitemap.xml");
} else {
  const sitemap = readFileSync(sitemapPath, "utf8");
  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const locSet = new Set(locs);
  if (locs.length !== locSet.size) {
    fail("dist/sitemap.xml contains duplicate <loc> entries");
  }
  for (const url of expectedUrls) {
    if (!locSet.has(url)) {
      fail(`dist/sitemap.xml is missing built page: ${url}`);
    }
  }
  for (const url of locSet) {
    if (!expectedUrls.has(url)) {
      fail(`dist/sitemap.xml lists non-existent page: ${url}`);
    }
  }
}

if (errors.length > 0) {
  console.error(
    "SEO check failed:\n" + errors.map((e) => `  - ${e}`).join("\n"),
  );
  process.exit(1);
}

console.log(
  `SEO check passed: ${indexableFiles.length} indexable pages, sitemap.xml, robots.txt, llms.txt, CNAME, og-image.png.`,
);
