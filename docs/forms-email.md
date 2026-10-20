# Quote form → email (GoDaddy)

The quote form posts to `/api/quote.php` on the same server, which comes from `public/api/quote.php` and is deployed with the site. The script loads the WordPress install that is already in `/html` and does the following:

1. **Checks the request.** It only accepts posts from the site itself, runs spam checks (a honeypot field and a minimum time on the page), validates the required fields, and allows 5 requests per IP per hour.
2. **Saves a backup copy.** Each request is stored as a private `premium_lead` record in WordPress, so a lead is not lost if an email fails. To list them, run `wp post list --post_type=premium_lead --post_status=private`.
3. **Sends the email** with WordPress's `wp_mail()`. The subject line is `New estimate request — City — Service — Name`, and Reply-To is set to the customer's email.

There are no passwords or keys in the repository. The mail account is configured inside WordPress.

The endpoint only works on GoDaddy, because it needs PHP and WordPress. On Vercel previews the form says the request was not sent and shows the phone number instead.

## Setup (one time, after the GoDaddy mailbox exists)

1. **Create the mailbox** in GoDaddy (Email & Office), for example `info@premiumdoorservices.com`.
   - The domain has no MX records today, so adding email does not affect anything else.
   - GoDaddy adds the MX, SPF and autodiscover DNS records automatically, because DNS is at GoDaddy.
   - This can be done before or after the website goes live.
2. **Set where requests go.** Use SSH on the site (staging and production separately):
   ```bash
   wp option update premium_quote_to "info@premiumdoorservices.com"
   # optional, to send each city's requests to a different inbox:
   wp option update premium_quote_to_chicago "chicago@premiumdoorservices.com"
   wp option update premium_quote_to_indianapolis "indy@premiumdoorservices.com"
   ```
   If this is not set, emails go to the WordPress admin email.
3. **Make delivery reliable.** Sending through the mailbox itself keeps emails out of spam:
   1. In WordPress admin, install **WP Mail SMTP**.
   2. Choose "Other SMTP" and enter the mailbox's SMTP settings, which are shown in GoDaddy's email settings:
      - GoDaddy Professional Email: `smtpout.secureserver.net`, port 465, SSL.
      - Microsoft 365 from GoDaddy: `smtp.office365.com`, port 587, TLS. SMTP AUTH may first need to be enabled for the mailbox.
   3. Enter the mailbox password in the plugin. It is stored in WordPress only, not in this repository and not in chat.
   4. Use the plugin's **Email Test**, then submit the form on staging.

## Test

- `GET /api/quote.php` should return **405**. That shows PHP is running the file rather than serving it as text, and the deploy smoke test checks it.
- Submit the form on staging for each city. Check that the email arrives, that Reply-To works, and that a `premium_lead` record appears.
