// QA crawler: visits every prerendered route in a real browser (Edge via playwright-core) and checks
// console errors, failed requests, broken internal links, horizontal overflow and phone routing.
// Usage: npm run build && node scripts/qa.mjs [screenshotDir]
import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const PORT = 4179;
const BASE = `http://localhost:${PORT}`;
const shotDir = process.argv[2];
const EDGE = process.env.BROWSER_PATH || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';

const sitemap = fs.readFileSync('dist/sitemap.xml', 'utf8');
const routes = [...sitemap.matchAll(/<loc>https?:\/\/[^/]+(\/[^<]*)<\/loc>/g)].map(m => m[1]);

const CHI = { tel: 'tel:+13126265158', text: '(312) 626-5158' };
const IND = { tel: 'tel:+14632622862', text: '(463) 262-2862' };
const FORBIDDEN = [/columbus/i, /380\)?\s*270-1545/, /513\)?\s*586-6166/, /\bOhio\b/, /Florida/i];

const server = spawn(process.execPath, ['scripts/serve.mjs', String(PORT)], { stdio: 'pipe' });
await new Promise(r => setTimeout(r, 2500));

const browser = await chromium.launch({ executablePath: EDGE, headless: true });
const problems = [];
const report = (route, msg) => problems.push(`${route}: ${msg}`);
const internalLinks = new Set();

async function autoScroll(page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += 350) {
      window.scrollTo(0, y);
      await new Promise(r => setTimeout(r, 160));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1200);
}

for (const vp of [{ name: 'desktop', width: 1440, height: 900 }, { name: 'mobile', width: 390, height: 844 }]) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: 1 });
  for (const route of routes) {
    const page = await ctx.newPage();
    const errs = [];
    page.on('console', m => (m.type() === 'error' || m.type() === 'warning') && errs.push(`[console.${m.type()}] ${m.text()}`));
    page.on('pageerror', e => errs.push(`[pageerror] ${e.message}`));
    page.on('response', r => r.status() >= 400 && errs.push(`[http ${r.status()}] ${r.url()}`));
    page.on('requestfailed', r => !r.url().includes('fonts.g') && errs.push(`[failed] ${r.url()} ${r.failure()?.errorText}`));
    const res = await page.goto(BASE + route, { waitUntil: 'networkidle' });
    if (!res || res.status() !== 200) report(route, `status ${res?.status()}`);
    await autoScroll(page);
    errs.forEach(e => report(`${route} [${vp.name}]`, e));

    if (vp.name === 'desktop') {
      const data = await page.evaluate(() => ({
        text: document.body.innerText,
        html: document.documentElement.outerHTML,
        tels: [...document.querySelectorAll('a[href^="tel:"]')].map(a => a.getAttribute('href')),
        links: [...document.querySelectorAll('a[href]')].map(a => a.getAttribute('href')),
        h1: document.querySelectorAll('h1').length,
        title: document.title,
        desc: document.querySelector('meta[name="description"]')?.getAttribute('content'),
        canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href'),
        emptyLinks: [...document.querySelectorAll('a')].filter(a => !a.getAttribute('href') || a.getAttribute('href') === '#').length,
        imgsNoAlt: [...document.querySelectorAll('img')].filter(i => !i.hasAttribute('alt')).length,
        brokenImgs: [...document.querySelectorAll('img')].filter(i => i.complete && i.naturalWidth === 0).map(i => i.src),
      }));
      data.links.filter(h => h.startsWith('/')).forEach(h => internalLinks.add(h.split(/[?#]/)[0] || '/'));
      if (data.h1 !== 1) report(route, `${data.h1} <h1> elements`);
      if (!data.desc) report(route, 'missing meta description');
      if (!data.canonical?.endsWith(route === '/' ? '/' : route)) report(route, `canonical mismatch ${data.canonical}`);
      if (data.emptyLinks) report(route, `${data.emptyLinks} empty links`);
      if (data.imgsNoAlt) report(route, `${data.imgsNoAlt} images without alt`);
      data.brokenImgs.forEach(s => report(route, `broken image ${s}`));
      for (const re of FORBIDDEN) if (re.test(data.html)) report(route, `forbidden content ${re}`);
      const isChi = route.startsWith('/locations/chicago');
      const isInd = route.startsWith('/locations/indianapolis');
      if (isChi) {
        if (!data.tels.includes(CHI.tel)) report(route, 'missing Chicago tel link');
        if (data.tels.includes(IND.tel) || data.text.includes(IND.text)) report(route, 'Indianapolis number on Chicago page');
      }
      if (isInd) {
        if (!data.tels.includes(IND.tel)) report(route, 'missing Indianapolis tel link');
        if (data.tels.includes(CHI.tel) || data.text.includes(CHI.text)) report(route, 'Chicago number on Indianapolis page');
      }
      const badTel = data.tels.filter(t => t !== CHI.tel && t !== IND.tel);
      if (badTel.length) report(route, `unexpected tel links ${badTel}`);
      console.log(`✓ ${route}  "${data.title}"  tel:${[...new Set(data.tels)].join(',')}`);
    } else {
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      if (overflow > 1) report(`${route} [mobile]`, `horizontal overflow ${overflow}px`);
    }

    if (shotDir) {
      fs.mkdirSync(shotDir, { recursive: true });
      const name = (route === '/' ? 'home' : route.slice(1).replace(/\//g, '_')) + `-${vp.name}.jpg`;
      await page.screenshot({ path: path.join(shotDir, name), fullPage: true, type: 'jpeg', quality: 60 });
    }
    await page.close();
  }
  await ctx.close();
}

const routeSet = new Set(routes);
for (const l of internalLinks) if (!routeSet.has(l)) problems.push(`broken internal link target: ${l}`);

await browser.close();
server.kill();
console.log(`\nChecked ${routes.length} routes × 2 viewports, ${internalLinks.size} unique internal link targets.`);
if (problems.length) {
  console.log(`\n${problems.length} PROBLEM(S):\n` + [...new Set(problems)].join('\n'));
  process.exit(1);
} else console.log('No problems found.');
