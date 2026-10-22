# Publishing a blog post

Posts are Markdown files in `content/blog/`. Pushing a new file to `main` builds the site, deploys it to GoDaddy after you approve the production deploy, and clears GoDaddy's cache. The post then appears at `https://premiumdoorservices.com/blog/<file-name>/`, on the blog page, and in `sitemap.xml`.

## Option A: in the browser (no tools needed)

1. Open the repository on GitHub, go to `content/blog/`, open `_template.md` and copy its contents.
2. In `content/blog/`, click **Add file → Create new file**.
3. Name the file after the topic, in lowercase words joined by dashes, for example `garage-door-opener-not-working.md`. This name becomes the URL.
4. Paste the template, fill in the fields (see the table below), **delete the `draft: true` line**, and write the post.
5. Click **Commit changes** and commit directly to `main`.
6. Go to **Actions → Build and deploy** and **approve** the production deploy. After about 3–5 minutes the post is live.

If a field is wrong, the build fails with a message explaining what to fix, and nothing is deployed.

## Option B: in VS Code

```bash
cp content/blog/_template.md content/blog/my-new-post.md   # edit it
npm run build && npm run seo:audit                         # optional check
git add content/blog && git commit -m "Blog: my new post" && git push
```

## Frontmatter fields

| Field | Required | Notes |
|---|---|---|
| `title` | yes | Up to 60 characters. Put the main keyword near the start, for example "Garage Door Spring Repair Cost: What Affects the Price". |
| `description` | yes | 120–160 characters. Shown under the title in Google. |
| `date` | yes | `YYYY-MM-DD`. Newest posts are listed first. |
| `updated` | no | Set when you revise an old post. |
| `image` | no | Name of a site image: `hero-home`, `team-van`, `detail-tools`, `res-house-dusk`, `res-house-suburban`, `res-house-two-storey`, `res-brick-driveway`, `res-modern-dusk`, `res-modern-garage`, `com-numbered-doors`, `com-brick-warehouse`, `com-loading-dock`, `chicago-dusk`, `chicago-night`, `chicago-river`, `indy-dusk`, `indy-skyline`, `indy-sunset`. To add your own photos, see "Adding new images". |
| `imageAlt` | no | Describe the photo. |
| `tags` | no | Comma separated, for example `Openers, Chicago`. The first tag is shown above the title. |
| `city` | no | `chicago` or `indianapolis`. The post's call buttons then show only that city's number. |
| `draft` | no | `true` keeps the post unpublished. |

## Writing rules that help ranking

- **One topic per post.** Answer the question in the first two or three sentences.
- **Use the keyword naturally** in the title, the first paragraph and one heading. Do not repeat it unnaturally.
- **Headings:** `##` for sections and `###` for sub-points. Never use `#`, because the title is already the page's H1.
- **Aim for 700–1,500 words** of useful, original content. Never copy text from other sites.
- **Link to two or three pages on the site**, such as a service page (`/services/broken-spring-repair/`), a city page (`/locations/chicago/`) or `/contact/`. Always include the trailing slash.
- **Write only what is true.** Do not invent prices, years in business, awards, reviews or guarantees the company does not offer.
- **Safety first.** Spring and cable work is dangerous, so advise readers to call a professional.

## Adding new images

1. Put a JPG or PNG in `assets-src/company/`, using a lowercase file name like `job-spring-chicago.jpg`.
2. Run `npm run images`. This creates optimised WebP files and registers the name.
3. Use that name (without the extension) in `image:`.
