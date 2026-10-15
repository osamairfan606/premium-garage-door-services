// Verifies the quote form's real submission path against a local mock endpoint.
// Build first with:  VITE_FORM_ENDPOINT=http://localhost:4199/quote npm run build
// Then run:          node scripts/qa-form-endpoint.mjs
import http from 'node:http';
import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';

let mode = 'ok';
const received = [];
const mock = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
  if (req.method === 'OPTIONS') return res.writeHead(204).end();
  let body = '';
  req.on('data', c => (body += c));
  req.on('end', () => {
    received.push(JSON.parse(body));
    res.writeHead(mode === 'ok' ? 200 : 500, { 'Content-Type': 'application/json' }).end('{}');
  });
}).listen(4199);

const server = spawn(process.execPath, ['scripts/serve.mjs', '4186'], { stdio: 'pipe' });
await new Promise(r => setTimeout(r, 1200));
const browser = await chromium.launch({ executablePath: process.env.BROWSER_PATH || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' });
const results = [];
const check = (name, ok, d = '') => results.push(`${ok ? 'PASS' : 'FAIL'}  ${name}${d ? ` — ${d}` : ''}`);

async function fillAndSubmit(page) {
  await page.locator('input[data-field="fullName"]').fill('Jordan Test');
  await page.locator('input[data-field="phone"]').fill('3125550199');
  await page.locator('input[type="radio"][value="commercial"]').check();
  await page.locator('select[data-field="service"]').selectOption('Opener Not Working');
  await page.locator('input[data-field="address"]').fill('60601');
  await page.locator('input[data-field="consent"]').check();
  await page.waitForTimeout(2600);
  await page.getByRole('button', { name: /Submit Request/ }).click();
  await page.waitForTimeout(1200);
}

const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await page.goto('http://localhost:4186/locations/chicago', { waitUntil: 'networkidle' });
await page.locator('#quote').scrollIntoViewIfNeeded();
await fillAndSubmit(page);
check('Success state shown after 2xx response', await page.getByText('Request received').isVisible());
check('Payload sent with locked Chicago location', received[0]?.location === 'chicago' && received[0]?.locationPhone === '(312) 626-5158', JSON.stringify(received[0] ?? {}).slice(0, 160));
check('Success state offers Chicago number', (await page.locator('[role="status"] a[href^="tel:"]').getAttribute('href')) === 'tel:+13126265158');

mode = 'fail';
await page.goto('http://localhost:4186/locations/chicago', { waitUntil: 'networkidle' });
await fillAndSubmit(page);
check('Error state shown after 5xx response', await page.getByText('couldn’t send your request').isVisible());

await browser.close();
server.kill();
mock.close();
console.log(results.join('\n'));
if (results.some(r => r.startsWith('FAIL'))) process.exit(1);
