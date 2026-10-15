// Prerenders every route to static HTML (real titles, meta tags and content for crawlers),
// then writes sitemap.xml, robots.txt and 404.html into /dist.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const template = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');
const { render, allRoutePaths, site } = await import(pathToFileURL(path.join(ROOT, 'dist-ssr', 'entry-server.js')).href);

function page(url) {
  const { html, head } = render(url);
  return template.replace('<!--app-head-->', head).replace('<!--app-html-->', html);
}

for (const { path: route } of allRoutePaths) {
  const out = route === '/' ? path.join(DIST, 'index.html') : path.join(DIST, route.slice(1), 'index.html');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  const html = page(route);
  fs.writeFileSync(out, html);
  // Also emit /route.html so hosts that map clean URLs to .html files serve the right page.
  if (route !== '/') fs.writeFileSync(path.join(DIST, `${route.slice(1)}.html`), html);
  console.log('prerendered', route);
}
fs.writeFileSync(path.join(DIST, '404.html'), page('/__not-found__'));

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutePaths
  .map(r => `  <url><loc>${site.url}${r.path === '/' ? '/' : r.path}</loc><lastmod>${today}</lastmod><priority>${r.priority.toFixed(1)}</priority></url>`)
  .join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(DIST, 'sitemap.xml'), sitemap);
fs.writeFileSync(path.join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`);
fs.rmSync(path.join(ROOT, 'dist-ssr'), { recursive: true, force: true });
console.log(`sitemap: ${allRoutePaths.length} urls`);
