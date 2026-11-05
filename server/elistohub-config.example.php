<?php
/**
 * Elistohub contact form settings.
 *
 * 1. Copy this file and name the copy  elistohub-config.php
 * 2. Fill in the values below.
 * 3. Upload it to your BigRock home folder, ONE LEVEL ABOVE public_html
 *    (e.g. /home/<cpanel-user>/elistohub-config.php), NOT inside public_html.
 *    That keeps the Brevo API key private.
 *
 * public_html/api/contact.php reads this file automatically.
 */

return [
    // Brevo: Settings -> SMTP & API -> API keys
    'BREVO_API_KEY' => '',

    // Sender. Must be a verified sender (or domain) in Brevo.
    'EMAIL_FROM_ADDRESS' => 'dev.elistohub@gmail.com',
    'EMAIL_FROM_NAME' => 'Elistohub',

    // Inbox(es) that receive new enquiries. Comma-separate several addresses.
    'CONTACT_TO_EMAIL' => 'dev.elistohub@gmail.com',

    // Optional: also save each enquiry as a Brevo contact in this list ID ('' to skip).
    'BREVO_LIST_ID' => '',

    // Optional: send the visitor a "we got your message" email ('true' or 'false').
    'CONTACT_SEND_CONFIRMATION' => 'false',

    // Address shown to visitors if the form can't send.
    'SITE_EMAIL' => 'hello@elistohub.com',
];
