# Elistohub website

Marketing site for Elistohub, an ecommerce growth and support agency.
Built with **Next.js 16** (App Router), **React 19**, **Tailwind CSS v4** and **Brevo** for contact-form email.

## Pages

| Route | Status |
| --- | --- |
| `/` | Live: full home page (hero, services, websites, AI, AI images, support, email, tech stack, reporting, case studies, FAQ, contact) |
| `/contact` | Live: contact form (sends email through Brevo) + FAQ |
| `/services`, `/marketplaces`, `/websites`, `/ai`, `/case-studies`, `/privacy`, `/terms` | Coming soon |

Coming-soon pages are listed in `src/lib/site.ts` (`comingSoonPages`). To launch one, replace its
`src/app/<route>/page.tsx` with the real page content and remove it from `comingSoonPages`. They are marked
`noindex` and are left out of the sitemap until then.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
```

Other scripts: `npm run build` (production build), `npm start` (serve the build), `npm run lint`.

## Contact form (Brevo)

The form on `/` and `/contact` posts to a Server Action (`src/app/actions/contact.ts`), which validates the
input and sends an email through the Brevo transactional email API (`src/lib/brevo.ts`).

1. In Brevo, create an API key: **Settings → SMTP & API → API keys**.
2. Verify the sender address or domain you will send from: **Senders, domains & dedicated IPs**.
3. Fill in `.env.local`:

| Variable | Required | What it does |
| --- | --- | --- |
| `BREVO_API_KEY` | Yes | Brevo API key (keep it secret, never commit it) |
| `CONTACT_TO_EMAIL` | Yes | Inbox that receives new enquiries. Comma-separate several addresses |
| `EMAIL_FROM_ADDRESS` | Yes | Sender address; must be verified in Brevo |
| `EMAIL_FROM_NAME` | No | Sender name (default `Elistohub Website`) |
| `BREVO_LIST_ID` | No | Also saves each enquiry as a Brevo contact in this list |
| `CONTACT_SEND_CONFIRMATION` | No | `true` sends the visitor a "we got your message" email (default `false`) |
| `NEXT_PUBLIC_SITE_URL` | No | Public site URL, used for metadata, sitemap and robots.txt |

Enquiry emails use the visitor's address as **Reply-To**, so you can answer straight from your inbox.
If Brevo isn't configured, the form shows a friendly error with the email address and logs the reason on the server.
A hidden honeypot field filters simple spam bots.

When deploying (Vercel or any Node host), add the same variables in the host's environment settings.

## Project structure

```
src/
  app/
    layout.tsx            Fonts, metadata, header, footer
    page.tsx              Home page (composes the sections)
    contact/page.tsx      Contact page
    actions/contact.ts    Server Action: validate + send via Brevo
    <route>/page.tsx      Coming-soon pages
    globals.css           Brand tokens, Tailwind theme, animations
  components/
    sections/             One file per home page section
    header.tsx, footer.tsx, contact-form.tsx, coming-soon.tsx, ...
  lib/
    content.ts            All page copy and lists (edit text here)
    site.ts               Site name, email, nav and coming-soon pages
    brevo.ts              Brevo API client
    contact-emails.ts     Email templates (team notification + confirmation)
```

## Brand

Colours are defined once in `src/app/globals.css` (`:root`) and exposed to Tailwind as `deep`, `brand`, `fresh`,
`mint`, `tint`, `sun`, `logo-yellow`, `sun-tint`, `gold`, `ink`, `muted`, `line`, `off`.
Fonts: **Bricolage Grotesque** (logo and headings, 700/800) and **Inter** (body, menus, buttons, forms), loaded with `next/font`.
