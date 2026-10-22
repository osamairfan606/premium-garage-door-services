# SEO playbook: premiumdoorservices.com

Goal: rank first for the brand ("premium garage door services") and climb for garage door service keywords in Chicago and Indianapolis.

No one can guarantee a #1 position. Rankings depend on Google, competitors and time. Brand searches usually move first, within weeks of the work below. Competitive city keywords such as "garage door repair chicago" take months of steady reviews, links and content. Local "map pack" results are driven mostly by the Google Business Profile, not by the website.

## 1. Already done on the website (on-page)

- Every page is prerendered HTML, with a unique title (≤ 60 characters), a meta description (≤ 160 characters), one H1, a canonical URL, Open Graph and Twitter tags.
- Canonical URLs, internal links and the sitemap all use the trailing-slash form (`/about/`) that GoDaddy serves, so there are no redirect hops.
- **Structured data:**
  - Organization, with both city phone numbers and alternate brand names;
  - WebSite, with the brand name "Premium Garage Door Services";
  - BreadcrumbList, FAQPage, Service (per city and service), Blog and BlogPosting.
- **Keyword-focused titles:**
  - service pages: "Garage Door Spring Repair | Chicago & Indianapolis";
  - city pages: "Garage Door Repair Chicago, IL | 24/7 · phone".
- **Blog** at `/blog/` with three starter articles. See [blog-guide.md](blog-guide.md).
- `sitemap.xml` includes every page and post with `lastmod`, and `robots.txt` points to it.
- Each deploy clears GoDaddy's cache automatically, so new posts are visible right away.
- `npm run seo:audit` checks titles, descriptions, canonicals, H1s, alt text, schema and internal links on every page.

## 2. One-time setup (do this first)

1. **Google Search Console:**
   1. Add a **Domain** property for `premiumdoorservices.com`.
   2. Verify it with the DNS TXT record (GoDaddy → Domain → DNS → Add TXT).
   3. Submit `https://premiumdoorservices.com/sitemap.xml`.
   4. Remove any old WordPress/Yoast sitemaps (such as `sitemap_index.xml`), because they now return 404.
   5. Use **URL Inspection → Request indexing** for `/`, `/locations/chicago/`, `/locations/indianapolis/` and `/blog/`.
2. **Bing Webmaster Tools:** import the site from Search Console. Bing also feeds ChatGPT search and Copilot.
3. **Analytics:** the old WordPress site used Site Kit and Google Tag Manager. The new site does not track visits yet. Send the GA4 Measurement ID (`G-…`) or GTM container ID so it can be added.
4. **Google Business Profile.** This is the biggest factor for local rankings.
   - Set up one profile per city (Chicago and Indianapolis), each with that city's phone number. If there is no public office, set it up as a service-area business and hide the address.
   - **Name:** exactly the real business name, for example "Premium Garage Door Services". Adding keywords to the name breaks Google's rules and gets profiles suspended.
   - **Website:** the city page (`https://premiumdoorservices.com/locations/chicago/` or `/locations/indianapolis/`).
   - **Category:** the closest garage door category. Add secondary categories for repair and installation where available.
   - Fill in services, service areas (city and nearby suburbs), hours (24/7), a description, and real photos of jobs, vans and the team.
5. **Social profiles.** Create or claim Facebook, Instagram, YouTube and LinkedIn. Send the links so they can be added to `src/config/site.ts → social`, which adds them to the site footer and to schema `sameAs`.

## 3. Keywords to target

| Group | Keywords | Page |
|---|---|---|
| Brand | premium garage door services, premium garage door service, premium door services, premium garage door chicago, premium garage door indianapolis | Home, About |
| Chicago core | garage door repair chicago, emergency garage door repair chicago, garage door service chicago | /locations/chicago/ |
| Indianapolis core | garage door repair indianapolis, emergency garage door repair indianapolis, garage door service indianapolis | /locations/indianapolis/ |
| Springs | garage door spring repair (chicago / indianapolis), broken garage door spring, torsion spring replacement | /services/broken-spring-repair/ + blog |
| Openers | garage door opener repair, garage door opener installation, liftmaster / genie opener repair | /services/garage-door-opener-repair-installation/ |
| Installation | new garage door installation, garage door replacement, insulated / carriage-style garage doors | /services/garage-door-installation/ |
| Repairs | garage door off track, garage door cable repair, garage door roller replacement, garage door panel repair, garage door won't close | matching service pages + blog |
| Maintenance | garage door maintenance, garage door tune-up | /services/maintenance-tune-up/ |
| Commercial | commercial garage door repair chicago / indianapolis, overhead door repair | /services/commercial/ |
| Residential | residential garage door repair (city) | /locations/*/residential/ |

## 4. Off-page work

### Citations

List the business with the **same name, phone and website** on every site. Use the Chicago number on Chicago listings and the Indianapolis number on Indianapolis listings, and never mix them. Work through these:

- Google Business Profile, Bing Places, Apple Business Connect
- Yelp, BBB, Angi, HomeAdvisor, Thumbtack, Nextdoor, Houzz, Porch
- Facebook, Yellow Pages, Manta, Hotfrog, MapQuest (via Yext or a free listing)
- Local chambers of commerce (Chicagoland Chamber, Indy Chamber) and neighborhood or suburb directories

### Reviews

Reviews are the strongest local ranking signal you can control.

- Ask **every** happy customer, with a short link or QR code to the Google review page.
- Reply to every review within 24 hours, and mention the service and city naturally in the reply.
- Never buy, write or incentivise reviews. Fake reviews are illegal under the FTC rule (16 CFR Part 465), and Google removes them.
- When real Google reviews exist, add the profile link and rating in `src/config/content.ts → googleProfile`. Only genuine reviews may be shown on the site.

### Links

- Manufacturer dealer locators (LiftMaster, Clopay, Amarr, Genie and others), if the company is an authorized dealer or installer.
- Suppliers, home builders, realtors and property managers who refer work, by exchanging a mention on a partners page.
- Local sponsorships (youth sports, community events) and local news or "home tips" features.
- Guest articles on home-improvement blogs. Avoid paid link schemes and private blog networks.

## 5. Daily and weekly routine

**Daily, about 30–45 minutes:**
- Publish or update one blog post, using the calendar below.
- Make one Google Business Profile post for each city: a tip, a job photo or the first-time customer offer.
- Reply to new reviews and questions.
- Build one new citation or outreach link.

**Weekly:**
- In Search Console → Performance, check which queries get impressions but have positions 8–20. Strengthen those pages or write a post that targets them.
- Add three to five real job photos to each Business Profile.

**Monthly:**
- Run `npm run build && npm run seo:audit`.
- Refresh one older post (update content and set `updated:`).
- Check the Search Console Coverage report for errors.

## 6. Blog calendar: first 30 topics

1. Garage Door Spring Repair Cost: What Affects the Price
2. Torsion vs. Extension Springs: Which Does Your Door Have?
3. Why Garage Door Springs Break in Cold Weather
4. Garage Door Opener Not Working? 6 Things to Check
5. How to Reprogram a Garage Door Remote (LiftMaster, Genie, Chamberlain)
6. Belt vs. Chain vs. Wall-Mount Garage Door Openers
7. When to Replace Your Garage Door Opener
8. Garage Door Off Track: Causes and Why Not to Use It
9. Noisy Garage Door? How to Quiet It Down
10. Garage Door Cable Snapped: What to Do
11. Nylon vs. Steel Garage Door Rollers
12. Repair or Replace Your Garage Door? How to Decide
13. Insulated Garage Doors: Are They Worth It in Chicago?
14. Carriage-Style vs. Modern Garage Doors for Midwest Homes
15. How Long Does Garage Door Installation Take?
16. Garage Door Safety Sensors Explained
17. Garage Door Reverses Before Closing: Fixes
18. Garage Door Weatherstripping: Keep Out Cold and Water
19. Spring Garage Door Maintenance Checklist
20. Emergency Garage Door Repair: What Counts and What to Do
21. Garage Door Security Tips for Homeowners
22. How to Choose a Garage Door Company in Chicago
23. How to Choose a Garage Door Company in Indianapolis
24. Commercial Overhead Door Maintenance for Businesses
25. Signs Your Commercial Door Needs Repair
26. Garage Door Panel Damage: Repair or Replace the Section?
27. Smart Garage Door Openers: Features to Look For
28. Garage Door Balance Test: How to Do It Safely
29. What Is Included in a Garage Door Tune-Up?
30. First-Time Customer Guide: What to Expect from an Onsite Estimate
