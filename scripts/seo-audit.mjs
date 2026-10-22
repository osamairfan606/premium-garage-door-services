// On-page SEO audit of the prerendered site in /dist. Run after `npm run build`:
//   npm run seo:audit
// Fails (exit 1) on errors; prints warnings for things worth fixing.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const decode = s => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const pages = [];
(function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (f === 'index.html') pages.push(p);
  }
})(DIST);

const routes = new Set(pages.map(p => '/' + path.relative(DIST, path.dirname(p)).replace(/\\/g, '/')).map(r => (r === '/' ? '/' : r + '/')));
const titles = new Map();
let errors = 0;
let warnings = 0;
const err = (r, m) => { errors++; console.log(`ERROR  ${r}  ${m}`); };
const warn = (r, m) => { warnings++; console.log(`warn   ${r}  ${m}`); };

for (const file of pages) {
  const html = fs.readFileSync(file, 'utf8');
  const rel = path.relative(DIST, path.dirname(file)).replace(/\\/g, '/');
  const route = rel ? `/${rel}/` : '/';
  const title = decode((html.match(/<title[^>]*>([^<]*)<\/title>/) || [])[1] || '');
  const desc = decode((html.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"/) || [])[1] || '');
  const canonical = (html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]*)"/) || [])[1] || '';
  const h1s = (html.match(/<h1[\s>]/g) || []).length;

  if (!title) err(route, 'missing <title>');
  else if (title.length > 60) warn(route, `title is ${title.length} chars (keep ≤ 60): ${title}`);
  if (titles.has(title)) err(route, `duplicate title (also on ${titles.get(title)})`);
  titles.set(title, route);

  if (!desc) err(route, 'missing meta description');
  else if (desc.length > 160 || desc.length < 70) warn(route, `description is ${desc.length} chars (aim for 70–160)`);

  if (!canonical) err(route, 'missing canonical');
  else if (!canonical.endsWith(route)) err(route, `canonical ${canonical} does not match the page URL`);

  if (h1s !== 1) err(route, `${h1s} <h1> tags (need exactly 1)`);

  for (const m of html.matchAll(/<img\b[^>]*>/g)) if (!/\salt="/.test(m[0])) err(route, `image without alt: ${m[0].slice(0, 80)}`);

  for (const m of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch { err(route, 'invalid JSON-LD'); }
  }

  for (const m of html.matchAll(/href="(\/[^"#?]*)/g)) {
    const href = m[1];
    if (/\.[a-z0-9]+$/i.test(href)) continue;
    if (!href.endsWith('/')) warn(route, `internal link without trailing slash (301 hop): ${href}`);
    else if (!routes.has(href)) err(route, `broken internal link: ${href}`);
  }
}

const sitemap = fs.readFileSync(path.join(DIST, 'sitemap.xml'), 'utf8');
for (const r of routes) if (!sitemap.includes(`premiumdoorservices.com${r}<`) && !sitemap.includes(`${r}</loc>`)) warn(r, 'not in sitemap.xml');

console.log(`\n${pages.length} pages checked: ${errors} errors, ${warnings} warnings`);
process.exit(errors ? 1 : 0);
