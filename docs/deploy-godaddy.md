# Deploying to GoDaddy Managed WordPress (premiumdoorservices.com)

The site is hosted on the client's existing **GoDaddy Managed WordPress Deluxe** plan and domain. The build is plain static files, which are copied into the WordPress web root (`/html`) **next to** WordPress. Nothing of WordPress is changed or deleted, and DNS is not changed.

## Verified server facts (2026-10-20)

- **Production site ID:** `1170222`. Deploys use GoDaddy's CI/CD deploy user `git_deployer_84f1e0116a_1170222` at `1170222.us16.ssh.myftpupload.com`, with SSH key login only.
  - Normal SFTP users need both a key and a password, so they are not used here.
  - The host in GoDaddy's copy-paste snippet (`7bk.cbf.myftpupload.com`) did not answer on port 22.
- **Web root:** `/html` is the WordPress install. WordPress core files are owned by `root`, so a deploy cannot change them.
- **The server is not Apache.** GoDaddy translates `.htaccess`, and `/html/.htaccess.log` shows it skips `RewriteCond -f/-d`. Cutover therefore does not rely on `.htaccess`. It uses a small must-use plugin instead (see below).
- **GoDaddy's official workflow is not used.** It uploads the repository source instead of `dist/`, and its default cleanup deletes server files that are not in the repository. Its ignore list does not cover `wp-config.php`, themes or plugins.

## How it works

- `npm run build` produces `dist/`. None of its files share a name with WordPress files (`index.php`, `wp-*`, `.htaccess`, `xmlrpc.php`).
- **Before cutover:** the static pages already work at their own URLs, for example `/about/` and `/services/`. On production, the home page (`/index.html`) is held back, so the live home page stays WordPress.
- **Cutover:** set `GODADDY_HOME_ENABLED=true` and run the workflow. It does three things:
  1. uploads `/index.html`;
  2. installs [`deploy/mu-plugin/premium-static-site.php`](../deploy/mu-plugin/premium-static-site.php) as `/html/wp-content/mu-plugins/premium-static-site.php`;
  3. flushes the cache.
  The plugin serves the static pages for `/`, `/about`, `/about/` and so on from PHP, so it works without `.htaccess` rewrites. Unknown URLs get the static 404 page. Admin, login, the REST API, cron, `wp-content` and `/api/quote.php` are left to WordPress. Nothing in the database changes.
- **Rollback:** delete `/html/wp-content/mu-plugins/premium-static-site.php`, then flush the cache. WordPress serves the front end again immediately. `/wp-admin` keeps working the whole time.

> GoDaddy's own CI/CD action (`godaddy-wordpress/gd-wordpress-deployer`) is **not** used. It is built for deploying WordPress code, runs WordPress health checks, and by default deletes server files that are not in the repository (`cleanup_deleted_files: yes`). Pointed at `/html`, it would remove WordPress.

## Forms

The quote form emails requests through `/api/quote.php` and WordPress. Setup is in [forms-email.md](forms-email.md).

## Workflow safety rules

The workflows are `.github/workflows/deploy.yml` and `deploy-godaddy.yml`.

- **Every push and pull request:** build and check the site. The build fails if `dist/` contains WordPress-reserved files.
- **Deploys:** run only on `main`, only when `GODADDY_DEPLOY_ENABLED=true`, and each environment waits for your approval:
  1. `staging`
  2. `production`, which only runs if `GODADDY_PRODUCTION_ENABLED=true`.
- **Before uploading:**
  - the target must be the WordPress web root (`wp-config.php` and `wp-content` present);
  - a dry run lists every change, and the deploy stops if any existing server file would be replaced that an earlier deploy of this site did not create. Files created by this site are tracked in `/html/.static-site-manifest`.
- **Upload:** rsync adds and replaces files only. It never deletes (no `--delete`) and never uploads `.htaccess`, `index.php`, `wp-*` or `xmlrpc.php`.
- **After upload, a smoke test checks:** the main routes return 200, `/wp-admin/` redirects to login, and (before cutover) the home page is still WordPress.

## Stage 1: Backups (you, in the GoDaddy dashboard)

GoDaddy keeps automatic daily backups of Managed WordPress sites, covering **files and database**.

1. Go to My Products → Managed WordPress → premiumdoorservices.com → **Settings → Backups**. Check that the latest automatic backup date is recent.
2. Click **Create backup** (manual backup) and note the date and time. Restoring it brings back both files and database.
3. Optional off-site copy:
   - **Files:** download them with SFTP (FileZilla works).
   - **Database:** in Settings → Database, open **phpMyAdmin → Export → Quick → SQL**, or with SSH run `wp db export ~/backup-$(date +%F).sql`. Keep these copies on your own computer, not in the repository.

## Stage 2: Staging site and SSH access (you)

1. In the dashboard, create the **staging site** if it does not exist. Staging is a copy of production on a temporary GoDaddy domain.
2. For **both** staging and production, go to Settings → **SSH/SFTP**, enable SSH and note the **hostname, port and username**. Do not share the password.
3. Create a deploy key on this computer, in PowerShell:
   ```powershell
   ssh-keygen -t ed25519 -C "github-deploy premiumdoorservices" -f "$HOME\.ssh\gd_premium_deploy"
   ```
   Press Enter at the passphrase prompt to leave it empty, because GitHub Actions cannot type one.
4. In GoDaddy, add the **public** key (`gd_premium_deploy.pub`) where the dashboard allows SSH keys: SSH/SFTP settings or the CI/CD Integration panel.
   - If the dashboard has no place for SSH keys, connect once with SFTP using the password and append the public key to `~/.ssh/authorized_keys`.
5. Test from this computer:
   ```powershell
   ssh -i "$HOME\.ssh\gd_premium_deploy" USER@HOST "ls -la /html | head"
   ```

## Stage 3: GitHub settings

Go to GitHub → repository → **Settings**.

### Environments
Create `staging` and `production`. For both, add yourself as a **required reviewer** and limit deployments to the `main` branch.

### Environment variables and secrets
Add these in **each** environment, with values for that environment:

| Name | Type | Value |
|---|---|---|
| `GODADDY_SSH_HOST` | variable | hostname or IP from SSH/SFTP settings |
| `GODADDY_SSH_PORT` | variable | `22` |
| `GODADDY_SSH_USER` | variable | SSH username |
| `GODADDY_REMOTE_DIR` | variable | `/html` (confirm in stage 4) |
| `SITE_PUBLIC_URL` | variable | staging: the temporary domain; production: `https://premiumdoorservices.com` |
| `GODADDY_KNOWN_HOSTS` | secret | output of `ssh-keyscan -p 22 HOST` |
| `GODADDY_SSH_KEY` | secret | full contents of the **private** key file `gd_premium_deploy` |

To copy the private key without showing it on screen, run `Get-Content "$HOME\.ssh\gd_premium_deploy" -Raw | Set-Clipboard` in PowerShell, then paste it into the GitHub secret.

### Repository variables
Add these under Secrets and variables → Actions → Variables:

| Name | Value |
|---|---|
| `VITE_SITE_URL` | `https://premiumdoorservices.com` |
| `VITE_FORM_ENDPOINT` | leave unset (defaults to `/api/quote.php`) |
| `GODADDY_DEPLOY_ENABLED` | set to `true` only when staging is ready to receive deploys |
| `GODADDY_PRODUCTION_ENABLED` | leave unset until staging has passed testing |
| `GODADDY_HOME_ENABLED` | leave unset until the approved cutover |

## Stage 4: Inspect and deploy to staging

1. Inspect the server read-only with SSH:
   - confirm `/html` holds WordPress (`wp-config.php`, `wp-content`);
   - read the existing `.htaccess`;
   - check whether the static files' names collide with anything already there.
2. Set `GODADDY_DEPLOY_ENABLED=true`, then run Actions → Build and deploy → Run workflow, and approve the `staging` deploy.
3. Test on the staging domain:
   - every route, with and without a trailing slash;
   - assets, images and the mobile layout;
   - phone links for both cities and the quote form;
   - `/wp-admin` login.
4. On staging only, set `GODADDY_HOME_ENABLED=true` and run the staging deploy. Then test the home page, clean URLs, the 404 page, `/wp-admin`, and flushing GoDaddy's cache.

## Stage 5: Production, without touching the home page

1. Take a fresh manual backup (stage 1).
2. Set `GODADDY_PRODUCTION_ENABLED=true` and approve the production deploy.
   - The home page is held back, so `/` stays WordPress.
   - The new pages work at `/about/`, `/services/` and so on. They are public but not linked from anywhere.
3. Check the smoke test output, then spot-check a few pages and `/wp-admin` by hand.

## Stage 6: Cutover (only with explicit approval)

1. Set the repository variable `GODADDY_HOME_ENABLED=true`, run the workflow and approve it. This uploads `/index.html`, installs the router plugin and flushes the cache. The smoke test then checks that `/` is the new site.
2. If the old home page still shows, flush GoDaddy's cache in the dashboard. Then test the home page, all routes, the 404 page and `/wp-admin`.
3. Submit `https://premiumdoorservices.com/sitemap.xml` in Google Search Console.

## Rollback

| Situation | What to do |
|---|---|
| Home page or routing is wrong after cutover | Delete `/html/wp-content/mu-plugins/premium-static-site.php` (SFTP or the WP File Manager plugin), then flush the cache. The WordPress front end is back. Also set `GODADDY_HOME_ENABLED` to `false`, so the next deploy does not reinstall the plugin. |
| Anything worse | Dashboard → Backups → restore the manual backup from stage 6. It restores files and database. |
| Stop automatic deploys | Set `GODADDY_DEPLOY_ENABLED` to anything other than `true`. |

The static files can stay on the server after a rollback. They do not affect WordPress.
