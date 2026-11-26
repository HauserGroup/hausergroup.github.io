import type { APIRoute } from "astro";
import { profiles } from "../data/profiles";

const pageFiles = Object.keys(import.meta.glob("./**/*.astro"));

function fileToPath(file: string): string | null {
  if (file === "./404.astro" || file.includes("[")) return null;
  if (file === "./index.astro") return "/";
  if (file.endsWith("/index.astro")) {
    return "/" + file.slice(2, -"/index.astro".length) + "/";
  }
  return "/" + file.slice(2, -".astro".length) + "/";
}

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export const GET: APIRoute = ({ site }) => {
  const origin = site ?? new URL("https://hausergroup.org");

  const staticPaths = pageFiles
    .map(fileToPath)
    .filter((p): p is string => p !== null);
  const peoplePaths = profiles.map((person) => `/people/${person.slug}/`);

  const allPaths = Array.from(new Set([...staticPaths, ...peoplePaths])).sort(
    (a, b) => {
      if (a === "/") return -1;
      if (b === "/") return 1;
      return a.localeCompare(b);
    },
  );

  const urls = allPaths
    .map(
      (p) =>
        `  <url>\n    <loc>${escapeXml(new URL(p, origin).href)}</loc>\n  </url>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
