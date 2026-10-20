# Deploying to GoDaddy Managed WordPress (premiumdoorservices.com)

The site is hosted on the client's existing **GoDaddy Managed WordPress Deluxe** plan and domain. The build is plain static files, which are copied into the WordPress web root (`/html`) **next to** WordPress. Nothing of WordPress is changed or deleted, and DNS is not changed.

## How it works

- `npm run build` produces `dist/`. None of its files share a name with WordPress files (`index.php`, `wp-*`, `.htaccess`, `xmlrpc.php`).
- **Before cutover:** the static pages already work at their own URLs, for example `/about/` and `/services/`. On production, the home page (`/index.html`) is held back, so the live home page stays WordPress.
- **Cutover:**
  1. Upload the home page by setting `GODADDY_HOME_ENABLED=true`.
  2. Paste the rules from [`deploy/htaccess-cutover.txt`](../deploy/htaccess-cutover.txt) at the top of `/html/.htaccess`.
- **Rollback:** delete that rules block from `.htaccess`, and the WordPress home page returns immediately. `/wp-admin` keeps working the whole time.

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
4. On staging only, apply the cutover rules to staging's `.htaccess`. Then test the home page, clean URLs, the 404 page, `/wp-admin`, and flushing GoDaddy's cache (dashboard → Flush cache).

## Stage 5: Production, without touching the home page

1. Take a fresh manual backup (stage 1).
2. Set `GODADDY_PRODUCTION_ENABLED=true` and approve the production deploy.
   - The home page is held back, so `/` stays WordPress.
   - The new pages work at `/about/`, `/services/` and so on. They are public but not linked from anywhere.
3. Check the smoke test output, then spot-check a few pages and `/wp-admin` by hand.

## Stage 6: Cutover (only with explicit approval)

1. Set `GODADDY_HOME_ENABLED=true` and re-run the workflow, approving staging and then production. This uploads `/index.html`.
2. With SFTP, download `/html/.htaccess` and keep a copy named `htaccess-before-cutover`.
3. Paste the block from `deploy/htaccess-cutover.txt` above `# BEGIN WordPress` and upload the file.
4. Flush GoDaddy's cache in the dashboard, then test the home page, all routes, the 404 page and `/wp-admin`.
5. Submit `https://premiumdoorservices.com/sitemap.xml` in Google Search Console.

## Rollback

| Situation | What to do |
|---|---|
| Home page or routing is wrong after cutover | Upload `htaccess-before-cutover` as `/html/.htaccess` (or delete the Premium block), then flush the cache. The WordPress home page is back. |
| Anything worse | Dashboard → Backups → restore the manual backup from stage 6. It restores files and database. |
| Stop automatic deploys | Set `GODADDY_DEPLOY_ENABLED` to anything other than `true`. |

The static files can stay on the server after a rollback. They do not affect WordPress.
