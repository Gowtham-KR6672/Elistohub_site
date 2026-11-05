# Elistohub website

Marketing site for Elistohub, an ecommerce growth and support agency.
Built with **React 19 + Vite**, **React Router** and **Tailwind CSS v4**. Contact-form enquiries are sent
through **Brevo**. The same code deploys two ways:

- **PHP / cPanel hosting (BigRock):** upload the static build; `api/contact.php` handles the form.
- **Node hosting (Render, Railway, a VPS):** `npm start` runs `server/serve.mjs`, which serves the build and
  handles the form.

## Pages

| Route | Page |
| --- | --- |
| `/` | Home: hero, marketplaces, 7 service cards, case studies, FAQ, contact |
| `/marketplace-management` | D2C & B2B marketplace management |
| `/order-processing` | Order processing |
| `/paid-ads` | Paid ads on commission |
| `/ai-automation` | AI agents & automation (AI support, AI product images, customer service) |
| `/website-development` | Website design & development |
| `/marketing` | Marketing: email, SMS & social |
| `/virtual-assistant` | Ecommerce virtual assistant |
| `/our-process` | Our process + tools & reporting |
| `/contact` | Contact form + FAQ |
| `/privacy`, `/terms` | Coming soon |

Service pages are listed in `src/lib/site.ts` (`servicePages`, which also drives the Services menu) and routed in
`src/App.tsx`. Old addresses keep working: `legacyPathRedirects` (e.g. `/websites`) and `legacyHashRedirects`
(e.g. `/#ai`, `/#email`) in `src/lib/site.ts` forward them to the new pages. When you add a page, also add it to
`ROUTES` in `vite.config.ts` for the sitemap.

## Local development

```bash
npm install
cp .env.example .env.local   # add your Brevo values for local form testing
npm run dev                  # http://localhost:3000
```

`npm run dev` can't run PHP, so it handles `/api/contact.php` with the Node version of the form logic
(`server/contact-handler.mjs`) and sends through Brevo using `.env.local`.

Other scripts: `npm run build` (production build into `dist/`), `npm start` (production Node server on `PORT`,
default 3000), `npm run preview`, `npm run lint`.

## Deploy to Render (Node web service)

| Setting | Value |
| --- | --- |
| Service type | **Web Service** (not Static Site, since the contact form needs the server) |
| Build Command | `npm ci && npm run build` |
| Start Command | `npm start` |

Environment variables:

| Key | Value |
| --- | --- |
| `NODE_VERSION` | `22` |
| `BREVO_API_KEY` | Brevo API key |
| `EMAIL_FROM_ADDRESS` | Verified Brevo sender, e.g. `dev.elistohub@gmail.com` |
| `EMAIL_FROM_NAME` | `Elistohub` |
| `CONTACT_TO_EMAIL` | Inbox(es) for enquiries, comma-separated |
| `VITE_SITE_URL` | Public URL, e.g. `https://elistohub-site.onrender.com` (used at build time) |
| `BREVO_LIST_ID`, `CONTACT_SEND_CONFIRMATION` | Optional, same meaning as below |

The server listens on Render's `PORT` automatically. It serves `/assets/*` with long-term caching, sends page URLs
like `/contact` to the app, blocks hidden files and PHP sources, and limits each visitor to 5 messages per 10 minutes.

## Deploy to BigRock (Linux hosting with cPanel)

### One-time setup

1. **Brevo settings file.** Copy `server/elistohub-config.example.php` to `elistohub-config.php`, fill in the
   values (Brevo API key, sender, inbox), and upload it with cPanel **File Manager** to your **home folder, one
   level above `public_html`** (for example `/home/<cpanel-user>/elistohub-config.php`).
   Never put it inside `public_html`.
2. **Site URL.** In `.env.production`, set `VITE_SITE_URL` to your domain (e.g. `https://www.elistohub.com`).
   It's used for canonical links, `sitemap.xml` and `robots.txt`.
3. **SSL.** In cPanel, open **SSL/TLS Status** and run AutoSSL (or install the free certificate BigRock offers).
   Once HTTPS works, you can force it by removing the `#` from the two HTTPS lines in `public/.htaccess`.

### Every deploy

1. Build:
   ```bash
   npm run build
   ```
2. In cPanel **File Manager**, open `public_html` and delete the old site files (keep `.well-known` and `cgi-bin`
   if present).
3. Upload **everything inside `dist/`** into `public_html`, including the hidden `.htaccess` file and the
   `api/` folder. Easiest: zip the contents of `dist/`, upload the zip, then use **Extract** in File Manager.
   Turn on **Settings → Show Hidden Files** to see `.htaccess`.
4. Open the site and send one test enquiry from the contact page.

Your `public_html` should look like:

```
public_html/
  .htaccess        page routing (/contact etc.), caching
  index.html
  favicon.svg
  robots.txt
  sitemap.xml      (only when VITE_SITE_URL is set)
  assets/          JS, CSS, fonts
  api/contact.php  contact form → Brevo
```

## Contact form

- The form (`src/components/contact-form.tsx`) checks the fields in the browser, then posts JSON to
  `/api/contact.php`.
- `public/api/contact.php` validates again, blocks spam bots (hidden honeypot field), limits each visitor to
  5 messages per 10 minutes, and sends the enquiry through the Brevo API with the visitor as **Reply-To**.
- Settings (in `elistohub-config.php`):

| Setting | Required | What it does |
| --- | --- | --- |
| `BREVO_API_KEY` | Yes | Brevo API key (Settings → SMTP & API → API keys) |
| `EMAIL_FROM_ADDRESS` | Yes | Sender; must be verified in Brevo |
| `EMAIL_FROM_NAME` | No | Sender name (default `Elistohub`) |
| `CONTACT_TO_EMAIL` | Yes | Inbox(es) for enquiries, comma-separated |
| `BREVO_LIST_ID` | No | Also saves each enquiry as a Brevo contact in this list |
| `CONTACT_SEND_CONFIRMATION` | No | `'true'` emails the visitor a "we got your message" note |
| `SITE_EMAIL` | No | Address shown to visitors if sending fails |

Needs PHP 7.4 or newer with the cURL extension (standard on BigRock). PHP errors are written to the
`error_log` file in `public_html/api/`.

## Project structure

```
index.html                 HTML shell
vite.config.ts             Vite config (+ robots/sitemap generation, local contact API)
public/
  .htaccess                Apache rules for BigRock
  api/contact.php          Production contact endpoint (Brevo)
server/
  serve.mjs                Production Node server (npm start) for Render and other Node hosts
  contact-handler.mjs      Contact form logic for Node (used by serve.mjs and npm run dev)
  dev-contact.ts           Hooks the handler into `npm run dev`
  elistohub-config.example.php   Settings template for the PHP version
src/
  main.tsx, App.tsx        Entry point and routes
  index.css                Brand tokens, Tailwind theme, animations
  pages/                   Home, Contact, 404
  components/sections/     One file per home page section
  components/              Header, footer, form, coming soon, SEO, UI pieces
  lib/content.ts           All page copy and lists (edit text here)
  lib/site.ts              Site name, email, nav, coming-soon pages
```

## Brand

Colours are defined once in `src/index.css` (`:root`) and exposed to Tailwind as `deep`, `brand`, `fresh`, `mint`,
`tint`, `sun`, `logo-yellow`, `sun-tint`, `gold`, `ink`, `muted`, `line`, `off`.
Fonts: **Bricolage Grotesque** (logo and headings) and **Inter** (body), self-hosted via Fontsource.
