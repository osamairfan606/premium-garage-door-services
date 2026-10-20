<?php
/**
 * Quote-request endpoint for GoDaddy Managed WordPress.
 *
 * The static site posts JSON here (VITE_FORM_ENDPOINT=/api/quote.php). The request is checked,
 * saved as a private "premium_lead" record in WordPress as a backup, and emailed with wp_mail(),
 * so delivery uses whatever mail setup WordPress has (e.g. the WP Mail SMTP plugin with the
 * GoDaddy mailbox). No credentials live in this file.
 *
 * Recipients (set once with WP-CLI, see docs/forms-email.md):
 *   premium_quote_to               e.g. "info@premiumdoorservices.com" (comma-separated for several)
 *   premium_quote_to_chicago       optional, overrides for Chicago requests
 *   premium_quote_to_indianapolis  optional, overrides for Indianapolis requests
 * Falls back to the WordPress admin email.
 */

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

function respond(int $code, array $body): void {
    http_response_code($code);
    echo json_encode($body);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, ['ok' => false, 'error' => 'method_not_allowed']);
}

// Only accept posts from this site's own pages.
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$host = strtolower($_SERVER['HTTP_HOST'] ?? '');
if ($origin !== '' && strtolower((string) parse_url($origin, PHP_URL_HOST)) !== $host) {
    respond(403, ['ok' => false, 'error' => 'forbidden']);
}

$raw = file_get_contents('php://input', false, null, 0, 20000);
$data = json_decode((string) $raw, true);
if (!is_array($data)) {
    respond(400, ['ok' => false, 'error' => 'invalid_json']);
}

define('WP_USE_THEMES', false);
require dirname(__DIR__) . '/wp-load.php';

$str = static function (string $key, int $max) use ($data): string {
    $v = isset($data[$key]) && is_scalar($data[$key]) ? (string) $data[$key] : '';
    return mb_substr(trim(sanitize_textarea_field($v)), 0, $max);
};

// Spam checks: honeypot must be empty, and a human takes more than a couple of seconds.
if ($str('website', 200) !== '' || (isset($data['elapsedMs']) && (int) $data['elapsedMs'] < 2500)) {
    respond(200, ['ok' => true]); // look successful to bots
}

$locations = ['chicago' => 'Chicago, IL', 'indianapolis' => 'Indianapolis, IN'];
$locationId = is_string($data['location'] ?? null) && isset($locations[$data['location']]) ? $data['location'] : '';
$lead = [
    'Name'           => $str('fullName', 100),
    'Phone'          => $str('phone', 30),
    'Email'          => sanitize_email($str('email', 150)),
    'Location'       => $locations[$locationId] ?? '',
    'Service'        => $str('service', 100),
    'Address / ZIP'  => $str('address', 200),
    'Preferred date' => $str('preferredDate', 30),
    'Time slot'      => $str('timeSlot', 40),
    'Details'        => $str('description', 3000),
    'Page'           => $str('page', 200),
];

$errors = [];
if (mb_strlen($lead['Name']) < 2) $errors[] = 'fullName';
if (strlen(preg_replace('/\D+/', '', $lead['Phone'])) < 10) $errors[] = 'phone';
if ($lead['Location'] === '') $errors[] = 'location';
if ($lead['Service'] === '') $errors[] = 'service';
if (mb_strlen($lead['Address / ZIP']) < 5) $errors[] = 'address';
if (empty($data['consent'])) $errors[] = 'consent';
if ($str('email', 150) !== '' && !is_email($lead['Email'])) $errors[] = 'email';
if ($errors) {
    respond(422, ['ok' => false, 'error' => 'validation', 'fields' => $errors]);
}

// Rate limit: 5 requests per hour per IP.
$ip = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? '';
$ip = trim(explode(',', $ip)[0]);
$rateKey = 'premium_quote_' . md5($ip);
$count = (int) get_transient($rateKey);
if ($count >= 5) {
    respond(429, ['ok' => false, 'error' => 'too_many_requests']);
}
set_transient($rateKey, $count + 1, HOUR_IN_SECONDS);

$body = "New estimate request from the website\n\n";
foreach ($lead as $label => $value) {
    if ($value !== '') $body .= str_pad($label . ':', 16) . $value . "\n";
}
$body .= str_pad('Received:', 16) . wp_date('M j, Y g:i A T') . "\n";

// Backup copy in WordPress (private, not shown on the site).
wp_insert_post([
    'post_type'    => 'premium_lead',
    'post_status'  => 'private',
    'post_title'   => sprintf('%s — %s — %s', $lead['Location'], $lead['Service'], $lead['Name']),
    'post_content' => $body,
]);

$to = get_option("premium_quote_to_{$locationId}") ?: get_option('premium_quote_to') ?: get_option('admin_email');
$to = array_filter(array_map('trim', explode(',', (string) $to)), 'is_email');

$subject = sprintf('New estimate request — %s — %s — %s', $lead['Location'], $lead['Service'], $lead['Name']);
$headers = [];
if ($lead['Email'] !== '') {
    $headers[] = 'Reply-To: ' . str_replace(["\r", "\n", '<', '>', '"'], '', $lead['Name']) . ' <' . $lead['Email'] . '>';
}

$sent = $to && wp_mail($to, $subject, $body, $headers);
if (!$sent) {
    error_log('premium quote: email could not be sent; lead saved as premium_lead');
    respond(502, ['ok' => false, 'error' => 'mail_failed']);
}

respond(200, ['ok' => true]);
