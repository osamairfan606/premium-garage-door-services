// Interaction QA: dropdown menus, mobile drawer, FAQ accordion, location switcher and quote-form behaviour.
// Usage: npm run build && node scripts/qa-interactions.mjs
import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';

const PORT = 4184;
const BASE = `http://localhost:${PORT}`;
const EDGE = process.env.BROWSER_PATH || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const server = spawn(process.execPath, ['scripts/serve.mjs', String(PORT)], { stdio: 'pipe' });
await new Promise(r => setTimeout(r, 1500));
const browser = await chromium.launch({ executablePath: EDGE });
const results = [];
const check = (name, ok, detail = '') => results.push(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ` — ${detail}` : ''}`);
const errors = [];

// Desktop
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  page.setDefaultTimeout(90000);
  page.on('pageerror', e => errors.push(e.message));
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });

  await page.getByRole('button', { name: 'Services', exact: true }).hover();
  await page.waitForTimeout(400);
  check('Services dropdown opens on hover', await page.getByRole('link', { name: 'Broken Spring Repair' }).first().isVisible());
  await page.keyboard.press('Escape');
  await page.waitForTimeout(400);

  await page.getByRole('button', { name: 'Locations', exact: true }).click();
  await page.waitForTimeout(400);
  const chiRes = page.getByRole('link', { name: 'Chicago Residential' });
  check('Locations dropdown opens on click', await chiRes.isVisible());
  await chiRes.click();
  await page.waitForURL('**/locations/chicago/residential');
  check('Dropdown link navigates (client-side)', page.url().endsWith('/locations/chicago/residential'));
  await page.waitForTimeout(800);
  const headerTel = await page.locator('header a[href^="tel:"]').evaluateAll(as => [...new Set(as.map(a => a.getAttribute('href')))]);
  check('Header shows only Chicago number after navigation', headerTel.length === 1 && headerTel[0] === 'tel:+13126265158', headerTel.join(','));
  check('Page title updated on navigation', (await page.title()).includes('Residential Garage Door Repair Chicago'));

  // Call chooser on a general page
  await page.goto(BASE + '/services', { waitUntil: 'networkidle' });
  await page.locator('header').getByRole('button', { name: /Call Now/ }).click();
  await page.waitForTimeout(300);
  const chooser = await page.locator('header a[href="tel:+14632622862"]').count();
  check('Header Call Now chooser lists Indianapolis line', chooser > 0);
  await page.keyboard.press('Escape');

  // Location switcher tabs
  await page.goto(BASE + '/services/residential', { waitUntil: 'networkidle' });
  const tabpanel = page.locator('[role="tabpanel"]').first();
  const before = await tabpanel.locator('a[href^="tel:"]').first().getAttribute('href');
  await page.getByRole('tab', { name: 'Indianapolis, IN' }).first().click();
  await page.waitForTimeout(700);
  const after = await page.locator('[role="tabpanel"]').first().locator('a[href^="tel:"]').first().getAttribute('href');
  check('Location switcher swaps number', before === 'tel:+13126265158' && after === 'tel:+14632622862', `${before} → ${after}`);

  // FAQ accordion
  await page.goto(BASE + '/faqs', { waitUntil: 'networkidle' });
  const q = page.getByRole('button', { name: 'Which areas do you serve?' });
  await q.click();
  await page.waitForTimeout(500);
  check('FAQ accordion expands', (await q.getAttribute('aria-expanded')) === 'true');
  await page.getByRole('tablist', { name: 'FAQ topics' }).getByRole('tab', { name: /Indianapolis/ }).click();
  await page.waitForTimeout(400);
  check('FAQ topic tabs switch', await page.getByRole('heading', { name: /Indianapolis questions/ }).isVisible());

  // Form: empty submit shows errors
  await page.goto(BASE + '/contact', { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: /Submit Request/ }).click();
  await page.waitForTimeout(400);
  const errCount = await page.locator('.field-error').count();
  check('Empty submit shows validation errors', errCount >= 5, `${errCount} errors`);
  const focused = await page.evaluate(() => document.activeElement?.getAttribute('data-field'));
  check('First invalid field receives focus', focused === 'location', `focused=${focused}`);

  // Invalid phone / email
  await page.locator('input[data-field="phone"]').fill('123');
  await page.locator('input[data-field="email"]').fill('not-an-email');
  await page.getByRole('button', { name: /Submit Request/ }).click();
  await page.waitForTimeout(300);
  check('Invalid phone rejected', await page.getByText('valid 10-digit US phone').isVisible());
  check('Invalid email rejected', await page.getByText('valid email address').isVisible());

  // Valid submission (no endpoint configured → honest "not sent" message, never fake success)
  await page.locator('input[type="radio"][value="indianapolis"]').check();
  await page.locator('input[data-field="fullName"]').fill('Test Customer');
  await page.locator('input[data-field="phone"]').fill('3175550123');
  check('Phone input auto-formats', (await page.locator('input[data-field="phone"]').inputValue()) === '(317) 555-0123');
  await page.locator('input[data-field="email"]').fill('test@example.com');
  await page.locator('select[data-field="service"]').selectOption('Broken Spring');
  await page.locator('input[data-field="address"]').fill('46204');
  await page.locator('input[data-field="consent"]').check();
  await page.waitForTimeout(2600); // time-trap spam protection
  await page.getByRole('button', { name: /Submit Request/ }).click();
  await page.waitForTimeout(600);
  const notice = page.getByText('your details have not been sent');
  check('Unconfigured endpoint shows honest notice', await notice.isVisible());
  const noticeTel = await page.locator('[role="alert"] a[href^="tel:"]').first().getAttribute('href', { timeout: 3000 }).catch(async () => 'none: ' + (await page.locator('[role="alert"]').allInnerTexts()).join(' / '));
  check('Notice uses selected location number', noticeTel === 'tel:+14632622862', noticeTel);
  check('No fake success message', !(await page.getByText('Request received').isVisible()));

  // Location preselect via query string
  await page.goto(BASE + '/contact?location=chicago&service=Broken%20Spring', { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  check('Query string preselects location', await page.locator('input[type="radio"][value="chicago"]').isChecked());
  check('Query string preselects service', (await page.locator('select[data-field="service"]').inputValue()) === 'Broken Spring');

  // Location page form is locked to that city
  await page.goto(BASE + '/locations/indianapolis/residential', { waitUntil: 'networkidle' });
  const radios = await page.locator('#quote input[type="radio"][value]').evaluateAll(r => r.map(x => `${x.value}:${x.checked}`));
  check('Location page form preselects & locks city', radios.includes('indianapolis:true') && !radios.some(r => r.startsWith('chicago')) && !radios.some(r => r.startsWith('commercial')), radios.join(','));

  // 404
  const res = await page.goto(BASE + '/does-not-exist', { waitUntil: 'networkidle' });
  check('Unknown route returns 404 page', res.status() === 404 && (await page.getByText('come off its track').isVisible()));
  await page.close();
}

// Mobile
{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
  page.setDefaultTimeout(90000);
  page.on('pageerror', e => errors.push(e.message));
  await page.goto(BASE + '/locations/chicago', { waitUntil: 'networkidle' });
  const bar = await page.locator('div.fixed.bottom-0 a[href^="tel:"]').evaluateAll(as => as.map(a => a.getAttribute('href')));
  check('Mobile call bar uses Chicago number only', bar.length === 1 && bar[0] === 'tel:+13126265158', bar.join(','));
  await page.getByRole('button', { name: 'Open menu' }).click();
  await page.waitForTimeout(600);
  const dialog = page.getByRole('dialog', { name: 'Site menu' });
  check('Mobile drawer opens', await dialog.isVisible());
  const drawerTel = await dialog.locator('a[href^="tel:"]').evaluateAll(as => as.map(a => a.getAttribute('href')));
  check('Drawer shows Chicago number only', drawerTel.length === 1 && drawerTel[0] === 'tel:+13126265158', drawerTel.join(','));
  await dialog.getByRole('button', { name: 'Services' }).click();
  await page.waitForTimeout(400);
  await dialog.getByRole('link', { name: 'Cable Repair' }).click();
  await page.waitForURL('**/services/cable-repair');
  await page.waitForTimeout(600);
  check('Drawer link navigates and closes drawer', !(await page.getByRole('dialog', { name: 'Site menu' }).isVisible()));
  const generalBar = await page.locator('div.fixed.bottom-0 a[href^="tel:"]').evaluateAll(as => as.map(a => a.getAttribute('href')));
  check('Mobile bar on general page offers both city lines', generalBar.length === 2, generalBar.join(','));
  await page.close();
}

// Reduced motion
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  page.setDefaultTimeout(90000);
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  const loaderHidden = await page.evaluate(() => getComputedStyle(document.querySelector('.animate-loader-out')).display === 'none');
  check('Reduced motion: page loader skipped', loaderHidden);
  await ctx.close();
}

// Blog: post HTML is reused from the prerendered page, then loaded per post on client-side navigation
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  page.setDefaultTimeout(90000);
  page.on('pageerror', e => errors.push(e.message));
  const consoleErrors = [];
  page.on('console', m => { if (m.type() === 'error') consoleErrors.push(m.text()); });
  const first = '/blog/nylon-vs-steel-garage-door-rollers/';
  await page.goto(BASE + first, { waitUntil: 'networkidle' });
  const firstText = await page.locator('article[data-post]').innerText();
  check('Blog post body present after hydration', firstText.includes('Nylon rollers') && firstText.length > 1000, `${firstText.length} chars`);
  check('Blog post hydrates without console errors', consoleErrors.length === 0, consoleErrors.join(' | '));
  // A React link outside the article (links inside the Markdown body are plain <a> and reload the page).
  const next = page.locator(`main a[href^="/blog/"]:not(article a):not([href="/blog/"]):not([href="${first}"])`).first();
  await page.evaluate(() => { window.__noReload = true; });
  const href = await next.getAttribute('href');
  await next.click();
  await page.waitForURL(u => u.pathname.replace(/\/$/, '') === href.replace(/\/$/, ''));
  await page.waitForFunction(slug => (document.querySelector(`article[data-post="${slug}"]`)?.textContent ?? '').length > 500, href.split('/')[2]);
  const nextText = await page.locator('article[data-post]').innerText();
  const clientSide = await page.evaluate(() => window.__noReload === true);
  check('Blog post body loads after client-side navigation', clientSide && nextText.length > 500 && !nextText.includes('Nylon rollers have a nylon wheel'), href);
  await page.close();
}

check('No runtime errors during interactions', errors.length === 0, errors.join(' | '));
await browser.close();
server.kill();
console.log(results.join('\n'));
if (results.some(r => r.startsWith('FAIL'))) process.exit(1);
