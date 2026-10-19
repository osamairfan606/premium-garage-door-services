# Premium Garage Door — Chicago & Indianapolis website

A multi-page marketing site for Premium Garage Door, focused on residential garage door service. It is built with React 18, TypeScript, Vite, Tailwind CSS, Framer Motion and Lucide icons. Every route is **prerendered to static HTML**, so each page ships with its own title, meta description, canonical URL, Open Graph tags and structured data. The site then hydrates into a single-page app for fast navigation and animation.

## Quick start

```bash
npm install
npm run dev        # local dev server (http://localhost:5173)
npm run build      # typecheck, client and SSR build, prerender all routes, sitemap.xml and robots.txt
npm run preview    # serve /dist exactly like a static host (http://localhost:4173)
```

Requires Node 18+.

## Where to change things

| What | File |
|---|---|
| **Phone numbers, service areas, ZIP codes, addresses, city copy and FAQs** | `src/config/locations.ts` |
| Company name, legal name, hours, social links, email, site URL | `src/config/site.ts` |
| Services: names, descriptions, inclusions and FAQs | `src/config/services.ts` |
| Benefits, “why choose us”, process steps, general FAQs, gallery, brands, **customer reviews** | `src/config/content.ts` |
| Navigation menus | `src/config/navigation.ts` |

### Phone routing (single source of truth)

- `src/config/locations.ts` holds each city's display number and its `tel:` link.
- On any `/locations/chicago/*` page, every number on the page is Chicago only: header, announcement bar, footer, mobile drawer, floating call bar, CTAs and form. The same rule applies to Indianapolis.
- On general pages, visitors pick a city through the "Call Now" chooser, the Chicago/Indianapolis tabs, or the two buttons in the mobile call bar.
- `npm run qa` checks this automatically on every route.

## Content that still needs owner input

These items are deliberately left empty or configurable. The original site did not provide them, so none of them have been invented:

- **Service areas, ZIP codes and street addresses** (`locations.ts`). While these are empty, the site says "Chicago and nearby communities — call to confirm".
- **Customer reviews** (`content.ts → reviews`). A reviews section is placed on the Home, About, Services, Residential, Location and Service pages. It stays hidden until genuine reviews are added, and reviews tagged with a `location` only show on that city’s pages.
- **Social media profiles** (`site.ts → social`). These stay hidden while the list is empty.
- **LocalBusiness schema** (`site.ts → enableLocalBusinessSchema`). This is off until verified addresses exist. In the meantime, location pages emit `Service` and `Organization` schema with the location-specific phone numbers.
- **Legal pages.** These are general templates and should be reviewed by a lawyer.
- **Photography.** Images marked `stock` in `src/config/images.generated.ts` are Pexels-licensed stock photos (disclosed in the Terms page). To replace them with real project photos:
  1. Drop the photos into `assets-src/company/`.
  2. Run `npm run images`.
  3. Update the image names in the config files.

## Connecting the forms

The quote form validates input and includes spam protection (a honeypot field and a minimum time on the page). It sends a JSON `POST` to the URL in `VITE_FORM_ENDPOINT`:

```bash
# .env.production
VITE_FORM_ENDPOINT=https://your-endpoint.example.com/quote
```

Any endpoint works if it accepts JSON and returns a 2xx response on success. Options include a serverless function, a Supabase Edge Function, or a form service such as Formspree. The payload fields are listed in `src/lib/submitQuote.ts`. They include `location`, `locationLabel` and `locationPhone`, so requests can be routed to the right city team.

- **When no endpoint is configured**, the form does not pretend to succeed. It tells the visitor that their details were not sent and shows the phone number for the city they selected.
- **Never put secret API keys in `VITE_*` variables.** They are bundled into the browser. Keep secrets on the server behind the endpoint.
- For stronger spam protection, add Cloudflare Turnstile or reCAPTCHA and verify the token on the server.

## SEO

- There are 21 prerendered routes, each with a unique title, description, canonical URL and Open Graph/Twitter tags.
- Structured data:
  - Organization schema, with both city phone numbers, on every page.
  - BreadcrumbList on inner pages.
  - FAQPage where FAQs appear.
  - Service schema on service and location pages.
- `dist/sitemap.xml` and `dist/robots.txt` are generated at build time from `VITE_SITE_URL`. The default is `https://premiumdoorservices.com`. Set `VITE_SITE_URL` to the production domain before you deploy.

## Deployment

For premiumdoorservices.com on GoDaddy, see [docs/deploy-godaddy.md](docs/deploy-godaddy.md). The site is deployed next to WordPress on the existing Managed WordPress plan.

Otherwise, upload `/dist` to any static host, for example Netlify, Vercel, Cloudflare Pages or S3 with CloudFront.

- Each route exists both as `route/index.html` and as `route.html`, so clean URLs such as `/about` resolve on any host.
- Configure the host to serve `404.html` for unknown paths.
- Files in `/assets` are content-hashed, so they can be cached long-term.

## Quality checks

```bash
npm run build
npm run qa                          # every route × desktop/mobile: console errors, failed requests, broken links/images,
                                    # h1/meta/canonical, horizontal overflow, phone-number routing, leftover Columbus content
node scripts/qa-interactions.mjs    # dropdowns, mobile drawer, accordion, location tabs, form validation and states
# Form submission path against a mock endpoint:
VITE_FORM_ENDPOINT=http://localhost:4199/quote npm run build && node scripts/qa-form-endpoint.mjs && npm run build
```

The QA scripts drive Microsoft Edge through `playwright-core`. To use a different Chromium-based browser, set `BROWSER_PATH`.

## Accessibility and motion

- The site has:
  - A skip link and semantic landmarks.
  - Visible focus rings.
  - Keyboard-operable dropdowns and accordions.
  - A focus-trapped mobile drawer.
  - Labelled form fields with inline errors announced through ARIA.
- When the visitor has set "reduce motion", the site disables transform animations and CSS motion, and skips the intro loader.
- Every animation either runs once on scroll or responds to hover. The only exceptions are a few subtle ambient effects.

## Image credits

- **Company assets:** the logo, home hero and team photo are from premiumdoorservices.com.
- **Stock photography:** from [Pexels](https://www.pexels.com/license/), used under the Pexels License. Attribution is not required.
- **Brand logos:** shown on the original site to indicate brands the team services.
