// Minimal static server for the prerendered /dist folder, mirroring how production static hosts
// resolve clean URLs: /about → /about.html → /about/index.html → 404.html (status 404).
// Usage: node scripts/serve.mjs [port]
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const PORT = Number(process.argv[2] || process.env.PORT || 4173);
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.xml': 'application/xml', '.txt': 'text/plain', '.json': 'application/json',
};

function resolve(urlPath) {
  const clean = path.normalize(decodeURIComponent(urlPath)).replace(/^(\.\.[/\\])+/, '');
  const base = path.join(DIST, clean);
  if (!base.startsWith(DIST)) return null;
  for (const c of [base, `${base}.html`, path.join(base, 'index.html')]) {
    if (fs.existsSync(c) && fs.statSync(c).isFile()) return c;
  }
  return null;
}

http
  .createServer((req, res) => {
    const url = new URL(req.url, 'http://localhost');
    const file = resolve(url.pathname);
    const target = file ?? path.join(DIST, '404.html');
    res.writeHead(file ? 200 : 404, {
      'Content-Type': TYPES[path.extname(target)] ?? 'application/octet-stream',
      'Cache-Control': target.includes(`${path.sep}assets${path.sep}`) ? 'public, max-age=31536000, immutable' : 'no-cache',
    });
    fs.createReadStream(target).pipe(res);
  })
  .listen(PORT, () => console.log(`Serving dist at http://localhost:${PORT}`));
