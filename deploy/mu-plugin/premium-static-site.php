<?php
/**
 * Plugin Name: Premium static site router
 * Description: Serves the prerendered React/Vite site (deployed into the web root) for front-end requests.
 *              WordPress admin, login, REST API, cron and files keep working. Delete this file to roll back
 *              to the WordPress front end; nothing in the database is changed.
 *
 * Installed by the GitHub Actions deploy (.github/workflows/deploy-godaddy.yml) into wp-content/mu-plugins/
 * only at cutover. Source: deploy/mu-plugin/premium-static-site.php in the website repository.
 */

if (PHP_SAPI === 'cli' || defined('WP_CLI') || defined('DOING_CRON') || defined('DOING_AJAX')) {
    return;
}

function premium_static_serve(string $file, int $status): void {
    http_response_code($status);
    header('Content-Type: text/html; charset=utf-8');
    header('Cache-Control: public, max-age=0, must-revalidate');
    header('X-Content-Type-Options: nosniff');
    header('X-Served-By: premium-static-site');
    if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'HEAD') {
        readfile($file);
    }
    exit;
}

(static function (): void {
    $method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
    if ($method !== 'GET' && $method !== 'HEAD') {
        return;
    }
    if (isset($_GET['rest_route']) || isset($_GET['preview']) || isset($_GET['doing_wp_cron'])) {
        return;
    }

    $path = rawurldecode((string) parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH));
    if ($path === '' || strpos($path, "\0") !== false || strpos($path, '..') !== false) {
        return;
    }

    // Leave WordPress itself alone.
    if (preg_match('#^/(wp-admin|wp-login\.php|wp-json|wp-content|wp-includes|wp-cron\.php|xmlrpc\.php|wp-signup\.php|wp-activate\.php|api/)#', $path)) {
        return;
    }

    $root = rtrim(ABSPATH, '/');
    $slug = trim($path, '/');

    // The home page is index.html; it is only uploaded at cutover, so before that WordPress keeps serving "/".
    if ($slug === '') {
        $file = $root . '/index.html';
        if (!is_file($file)) {
            return;
        }
        premium_static_serve($file, 200);
    }

    // /about/ -> /about (canonical URLs have no trailing slash)
    if (substr($path, -1) === '/' && is_file("$root/$slug.html")) {
        header('Location: /' . $slug . (empty($_SERVER['QUERY_STRING']) ? '' : '?' . $_SERVER['QUERY_STRING']), true, 301);
        exit;
    }

    foreach (["$root/$slug.html", "$root/$slug/index.html"] as $file) {
        if (is_file($file)) {
            premium_static_serve($file, 200);
        }
    }

    // Anything else that is not a real file: the static site's 404 page instead of the old WordPress pages.
    if (is_file("$root/index.html") && is_file("$root/404.html")) {
        premium_static_serve("$root/404.html", 404);
    }
})();
