import fs from "node:fs/promises";
import path from "node:path";

const DEFAULT_SITE_URL = "https://theone412.com";
const siteUrl = (process.env.SITE_URL || process.env.VITE_SITE_URL || DEFAULT_SITE_URL).replace(
  /\/$/,
  "",
);

const routes = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/about", priority: "0.8", changefreq: "monthly" },
  { path: "/products", priority: "0.9", changefreq: "monthly" },
  { path: "/gallery", priority: "0.8", changefreq: "weekly" },
  { path: "/support", priority: "0.7", changefreq: "monthly" },
];

const publicDir = path.resolve("public");
const buildDate = new Date().toISOString().split("T")[0];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${siteUrl}${route.path}</loc>
    <lastmod>${buildDate}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

await fs.mkdir(publicDir, { recursive: true });
await fs.writeFile(path.join(publicDir, "sitemap.xml"), sitemap, "utf8");
await fs.writeFile(path.join(publicDir, "robots.txt"), robots, "utf8");

console.log(`[seo] Generated sitemap.xml and robots.txt for ${siteUrl}`);

