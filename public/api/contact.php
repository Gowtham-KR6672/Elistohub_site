<?php
/**
 * Elistohub contact form endpoint (runs on BigRock / any PHP 7.4+ host).
 *
 * Receives the contact form as JSON, validates it and sends the enquiry
 * through the Brevo transactional email API.
 *
 * Settings live in elistohub-config.php, kept OUTSIDE public_html
 * (one folder above it), so the Brevo API key is never publicly reachable.
 * See server/elistohub-config.example.php in the project.
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

const CONTACT_NEEDS = [
    'Marketplace management',
    'Order processing',
    'Paid ads (commission-based)',
    'AI agents & automation',
    'Website design & development',
    'Marketing (email, SMS & social)',
    'Virtual assistant (pay as you go)',
    'Honestly? All of it',
];

const RATE_LIMIT_MAX = 5;          // submissions...
const RATE_LIMIT_WINDOW = 600;     // ...per 10 minutes per IP address

function respond(int $status, array $body): void
{
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function load_config(): array
{
    $defaults = [
        'BREVO_API_KEY' => '',
        'EMAIL_FROM_ADDRESS' => '',
        'EMAIL_FROM_NAME' => 'Elistohub',
        'CONTACT_TO_EMAIL' => '',
        'BREVO_LIST_ID' => '',
        'CONTACT_SEND_CONFIRMATION' => 'false',
        'SITE_EMAIL' => 'info@elistohub.com',
    ];

    $config = [];
    // public_html/api/contact.php  ->  <home>/elistohub-config.php
    $file = dirname(__DIR__, 2) . '/elistohub-config.php';
    if (is_file($file)) {
        $loaded = require $file;
        if (is_array($loaded)) {
            $config = $loaded;
        }
    }

    foreach ($defaults as $key => $default) {
        if (!isset($config[$key]) || $config[$key] === '' || $config[$key] === null) {
            $env = getenv($key);
            $config[$key] = ($env !== false && $env !== '') ? $env : $default;
        }
        $config[$key] = is_string($config[$key]) ? trim($config[$key]) : $config[$key];
    }
    return $config;
}

function clip(string $value, int $max): string
{
    $value = trim($value);
    return function_exists('mb_substr') ? mb_substr($value, 0, $max, 'UTF-8') : substr($value, 0, $max);
}

function field(array $input, string $key, int $max): string
{
    $value = $input[$key] ?? '';
    return is_string($value) ? clip($value, $max) : '';
}

function e(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function rate_limited(): bool
{
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $file = rtrim(sys_get_temp_dir(), '/\\') . '/elistohub_contact_' . hash('sha256', $ip) . '.json';
    $now = time();

    $handle = @fopen($file, 'c+');
    if ($handle === false) {
        return false; // never block real visitors because of a storage problem
    }
    flock($handle, LOCK_EX);
    $raw = stream_get_contents($handle);
    $hits = json_decode($raw !== false && $raw !== '' ? $raw : '[]', true);
    $hits = array_values(array_filter(is_array($hits) ? $hits : [], function ($t) use ($now) {
        return is_int($t) && $t > $now - RATE_LIMIT_WINDOW;
    }));

    $limited = count($hits) >= RATE_LIMIT_MAX;
    if (!$limited) {
        $hits[] = $now;
    }
    ftruncate($handle, 0);
    rewind($handle);
    fwrite($handle, (string) json_encode($hits));
    flock($handle, LOCK_UN);
    fclose($handle);
    return $limited;
}

/** Sends a request to the Brevo API. Returns [statusCode, responseBody]. */
function brevo_post(string $apiKey, string $path, array $payload): array
{
    $url = 'https://api.brevo.com/v3' . $path;
    $body = json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    $headers = [
        'api-key: ' . $apiKey,
        'Content-Type: application/json',
        'Accept: application/json',
    ];

    if (function_exists('curl_init')) {
        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => $body,
            CURLOPT_HTTPHEADER => $headers,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CONNECTTIMEOUT => 10,
            CURLOPT_TIMEOUT => 20,
        ]);
        $response = curl_exec($ch);
        $status = (int) curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
        if ($response === false) {
            $response = 'cURL error: ' . curl_error($ch);
        }
        return [$status, (string) $response];
    }

    $context = stream_context_create([
        'http' => [
            'method' => 'POST',
            'header' => implode("\r\n", $headers),
            'content' => $body,
            'timeout' => 20,
            'ignore_errors' => true,
        ],
    ]);
    $response = @file_get_contents($url, false, $context);
    $responseHeaders = function_exists('http_get_last_response_headers')
        ? (http_get_last_response_headers() ?? [])
        : ($http_response_header ?? []);
    $status = 0;
    if (isset($responseHeaders[0]) && preg_match('/\s(\d{3})\s?/', $responseHeaders[0], $m)) {
        $status = (int) $m[1];
    }
    return [$status, $response === false ? '' : $response];
}

function email_layout(string $title, string $inner): string
{
    return '<!doctype html><html><body style="margin:0;padding:24px;background:#FAFBF9;font-family:Inter,Arial,sans-serif;color:#0F1F1A">'
        . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#FFFFFF;border:1px solid #E6EBE8;border-radius:16px;overflow:hidden">'
        . '<tr><td style="background:#0A4A30;padding:22px 28px;font-size:22px;font-weight:800;letter-spacing:-0.5px;color:#FFFFFF">'
        . 'Elist<span style="color:#F5C518">o</span><span style="color:#3DD68C">hub</span></td></tr>'
        . '<tr><td style="padding:28px"><h1 style="margin:0 0 16px;font-size:22px;line-height:1.3;color:#0A4A30">' . $title . '</h1>'
        . $inner . '</td></tr></table></body></html>';
}

// ---------------------------------------------------------------------------

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, ['ok' => false, 'message' => 'Method not allowed.']);
}

// Only accept submissions coming from this website.
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '') {
    $originHost = strtolower((string) parse_url($origin, PHP_URL_HOST));
    $requestHost = strtolower((string) preg_replace('/:\d+$/', '', (string) ($_SERVER['HTTP_HOST'] ?? '')));
    if ($originHost !== $requestHost) {
        respond(403, ['ok' => false, 'message' => 'Forbidden.']);
    }
}

$config = load_config();
$siteEmail = $config['SITE_EMAIL'];

$contentType = $_SERVER['CONTENT_TYPE'] ?? '';
if (stripos($contentType, 'application/json') !== false) {
    $decoded = json_decode((string) file_get_contents('php://input'), true);
    $input = is_array($decoded) ? $decoded : [];
} else {
    $input = $_POST;
}

$values = [
    'name' => field($input, 'name', 120),
    'email' => field($input, 'email', 254),
    'store' => field($input, 'store', 300),
    'need' => field($input, 'need', 80),
    'message' => field($input, 'message', 3000),
];

// Honeypot: real visitors never fill this hidden field.
if (field($input, 'company_website', 200) !== '') {
    respond(200, ['ok' => true]);
}

$errors = [];
if ($values['name'] === '') {
    $errors['name'] = 'Please tell us your name.';
}
if (!filter_var($values['email'], FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = 'Please enter a valid email address.';
}
if (!in_array($values['need'], CONTACT_NEEDS, true)) {
    $errors['need'] = 'Please pick an option.';
}
if ($errors) {
    respond(422, ['ok' => false, 'message' => 'Please check the highlighted fields.', 'fieldErrors' => $errors]);
}

if (rate_limited()) {
    respond(429, ['ok' => false, 'message' => 'Too many messages in a short time. Please try again in a few minutes.']);
}

$recipients = [];
foreach (explode(',', (string) $config['CONTACT_TO_EMAIL']) as $address) {
    $address = trim($address);
    if (filter_var($address, FILTER_VALIDATE_EMAIL)) {
        $recipients[] = ['email' => $address];
    }
}

if ($config['BREVO_API_KEY'] === '' || $config['EMAIL_FROM_ADDRESS'] === '' || !$recipients) {
    error_log('[elistohub contact] Not configured: set BREVO_API_KEY, EMAIL_FROM_ADDRESS and CONTACT_TO_EMAIL in elistohub-config.php');
    respond(503, ['ok' => false, 'message' => "Our contact form isn’t available right now. Please email us at {$siteEmail}."]);
}

$sender = ['email' => $config['EMAIL_FROM_ADDRESS'], 'name' => $config['EMAIL_FROM_NAME'] ?: 'Elistohub'];

// --- Team notification -------------------------------------------------------
$storeHref = $values['store'] === '' ? '' : (preg_match('#^https?://#i', $values['store']) ? $values['store'] : 'https://' . $values['store']);
$rows = [
    ['Name', e($values['name'])],
    ['Email', '<a href="mailto:' . e($values['email']) . '" style="color:#08884A">' . e($values['email']) . '</a>'],
    ['Store / brand', $values['store'] === '' ? '<em style="color:#4B5B55">Not provided</em>' : '<a href="' . e($storeHref) . '" style="color:#08884A">' . e($values['store']) . '</a>'],
    ['Needs help with', e($values['need'])],
    ['Message', $values['message'] === '' ? '<em style="color:#4B5B55">No message</em>' : nl2br(e($values['message']))],
];
$table = '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:15px">';
foreach ($rows as [$label, $value]) {
    $table .= '<tr><td style="padding:10px 12px 10px 0;border-top:1px solid #E6EBE8;color:#4B5B55;width:150px;vertical-align:top">' . $label
        . '</td><td style="padding:10px 0;border-top:1px solid #E6EBE8;vertical-align:top">' . $value . '</td></tr>';
}
$table .= '</table><p style="margin:20px 0 0;font-size:13px;color:#4B5B55">Reply to this email to answer ' . e($values['name']) . ' directly.</p>';

$text = "New enquiry from the website\n\n"
    . "Name: {$values['name']}\n"
    . "Email: {$values['email']}\n"
    . 'Store / brand: ' . ($values['store'] !== '' ? $values['store'] : 'Not provided') . "\n"
    . "Needs help with: {$values['need']}\n\n"
    . "Message:\n" . ($values['message'] !== '' ? $values['message'] : 'No message');

[$status, $response] = brevo_post($config['BREVO_API_KEY'], '/smtp/email', [
    'sender' => $sender,
    'to' => $recipients,
    'replyTo' => ['email' => $values['email'], 'name' => $values['name']],
    'subject' => "New enquiry: {$values['need']} - {$values['name']}",
    'htmlContent' => email_layout('New enquiry from the website', $table),
    'textContent' => $text,
    'tags' => ['website-contact'],
]);

if ($status < 200 || $status >= 300) {
    error_log("[elistohub contact] Brevo send failed ({$status}): " . substr($response, 0, 500));
    respond(502, ['ok' => false, 'message' => "Sorry, we couldn’t send your message. Please try again or email us at {$siteEmail}."]);
}

// --- Optional extras (failures are logged only; the team already has the enquiry) ---
$firstName = preg_split('/\s+/', $values['name'])[0] ?? $values['name'];

$listId = (int) $config['BREVO_LIST_ID'];
if ($listId > 0) {
    [$listStatus, $listResponse] = brevo_post($config['BREVO_API_KEY'], '/contacts', [
        'email' => $values['email'],
        'attributes' => ['FIRSTNAME' => $firstName],
        'listIds' => [$listId],
        'updateEnabled' => true,
    ]);
    if ($listStatus < 200 || $listStatus >= 300) {
        error_log("[elistohub contact] Brevo contact save failed ({$listStatus}): " . substr($listResponse, 0, 300));
    }
}

if (strtolower((string) $config['CONTACT_SEND_CONFIRMATION']) === 'true') {
    $inner = '<p style="margin:0 0 14px;font-size:16px;line-height:1.6">Hi ' . e($firstName) . ',</p>'
        . '<p style="margin:0 0 14px;font-size:16px;line-height:1.6">Thanks for reaching out. We’ve got your request about <strong>' . e($values['need'])
        . '</strong> and our team will get back to you to book your free 30-minute call.</p>'
        . '<p style="margin:0 0 14px;font-size:16px;line-height:1.6">Want to add anything? Just reply to this email.</p>'
        . '<p style="margin:24px 0 0;font-size:16px;line-height:1.6">- The Elistohub team</p>';
    [$confirmStatus, $confirmResponse] = brevo_post($config['BREVO_API_KEY'], '/smtp/email', [
        'sender' => $sender,
        'to' => [['email' => $values['email'], 'name' => $values['name']]],
        'replyTo' => $recipients[0],
        'subject' => 'Thanks for reaching out to Elistohub',
        'htmlContent' => email_layout('We’ve got your message', $inner),
        'textContent' => "Hi {$firstName},\n\nThanks for reaching out. We've got your request about \"{$values['need']}\" and our team will get back to you to book your free 30-minute call.\n\nWant to add anything? Just reply to this email.\n\n- The Elistohub team",
        'tags' => ['website-contact-confirmation'],
    ]);
    if ($confirmStatus < 200 || $confirmStatus >= 300) {
        error_log("[elistohub contact] Brevo confirmation failed ({$confirmStatus}): " . substr($confirmResponse, 0, 300));
    }
}

respond(200, ['ok' => true]);
