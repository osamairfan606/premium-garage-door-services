// Prerenders every route to static HTML (real titles, meta tags and content for crawlers),
// then writes sitemap.xml, robots.txt and 404.html into /dist.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const template = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');
const { render, allRoutePaths, site } = await import(pathToFileURL(path.join(ROOT, 'dist-ssr', 'entry-server.js')).href);

// GoDaddy serves each page as a folder and 301s /about to /about/, so internal links in the static HTML
// point straight at the trailing-slash URL (no redirect hop for visitors or crawlers).
const routeSet = new Set(allRoutePaths.map(r => r.path));
const withSlash = html =>
  html.replace(/href="(\/[^"#?]*?)([#?][^"]*)?"/g, (m, p, rest = '') => (p !== '/' && !p.endsWith('/') && routeSet.has(p) ? `href="${p}/${rest}"` : m));

// Analytics tags (GA4 + GTM) only for the production build, so local builds and QA never send data.
const analytics = process.env.ENABLE_ANALYTICS === 'true' ? site.analytics : null;
const headTags = analytics
  ? // gtag() and the dataLayer exist immediately, so events are queued; the two Google scripts load after the page
    // has loaded (or on the first interaction), keeping them off the critical rendering path.
    `<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${analytics.ga4MeasurementId}');dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});
(function(){var done=false;function load(){if(done)return;done=true;['https://www.googletagmanager.com/gtag/js?id=${analytics.ga4MeasurementId}','https://www.googletagmanager.com/gtm.js?id=${analytics.gtmContainerId}'].forEach(function(u){var s=document.createElement('script');s.async=true;s.src=u;document.head.appendChild(s);});}
['pointerdown','keydown','touchstart','scroll'].forEach(function(e){addEventListener(e,load,{once:true,passive:true});});
addEventListener('load',function(){setTimeout(load,1500);});})();</script>`
  : '';
const bodyTags = analytics
  ? `<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${analytics.gtmContainerId}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>`
  : '';
const shell = analytics ? template.replace('<!--app-head-->', `${headTags}\n<!--app-head-->`).replace('<div id="root">', `${bodyTags}<div id="root">`) : template;

function page(url) {
  const { html, head } = render(url);
  return withSlash(shell.replace('<!--app-head-->', head).replace('<!--app-html-->', html));
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
  .map(r => `  <url><loc>${site.url}${r.path === '/' ? '/' : `${r.path}/`}</loc><lastmod>${r.lastmod ?? today}</lastmod><priority>${r.priority.toFixed(1)}</priority></url>`)
  .join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(DIST, 'sitemap.xml'), sitemap);
fs.writeFileSync(
  path.join(DIST, 'robots.txt'),
  `User-agent: *\nAllow: /\nDisallow: /wp-admin/\nAllow: /wp-admin/admin-ajax.php\nDisallow: /api/\n\nSitemap: ${site.url}/sitemap.xml\n`,
);
fs.rmSync(path.join(ROOT, 'dist-ssr'), { recursive: true, force: true });
console.log(`sitemap: ${allRoutePaths.length} urls`);
console.log(analytics ? `analytics: GA4 ${analytics.ga4MeasurementId} + GTM ${analytics.gtmContainerId}` : 'analytics: off (ENABLE_ANALYTICS=true turns it on)');
