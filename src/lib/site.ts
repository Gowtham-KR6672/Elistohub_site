export const siteConfig = {
  name: "Elistohub",
  title: "Elistohub - Ecommerce Outsourcing Agency",
  description:
    "Elistohub is your ecommerce growth and support partner. Marketplaces, listings, inventory, ads, AI support and websites, all run by one senior team.",
  /** Public site URL, e.g. https://www.elistohub.com (set VITE_SITE_URL at build time). */
  url: ((import.meta.env.VITE_SITE_URL as string | undefined) ?? "").replace(/\/$/, ""),
  email: "hello@elistohub.com",
  location: "Mumbai, India",
  copyrightYear: 2026,
} as const;

export const mainNav = [
  { label: "Services", href: "/services" },
  { label: "Marketplaces", href: "/marketplaces" },
  { label: "Websites", href: "/websites" },
  { label: "AI", href: "/ai" },
  { label: "Case studies", href: "/case-studies" },
  { label: "Contact us", href: "/contact" },
] as const;

/**
 * Pages that are planned but not built yet. Each renders the shared "Coming soon" screen.
 * To launch one, replace its page.tsx with the real content.
 */
export const comingSoonPages = {
  services: {
    title: "Services",
    blurb: "A full breakdown of every ecommerce service we run, from Amazon account management to PPC.",
    preview: "/#services",
  },
  marketplaces: {
    title: "Marketplaces",
    blurb: "Everything about how we run Amazon, Walmart, Etsy, eBay, Faire, Wayfair and the rest.",
    preview: "/#marketplaces",
  },
  websites: {
    title: "Websites",
    blurb: "Shopify, WooCommerce, BigCommerce, Wix and Squarespace builds, fixes and care plans.",
    preview: "/#websites",
  },
  ai: {
    title: "AI",
    blurb: "AI customer support, automations, custom agents and AI product photography.",
    preview: "/#ai",
  },
  "case-studies": {
    title: "Case studies",
    blurb: "Detailed stories from brands that stopped doing it all themselves.",
    preview: "/#work",
  },
  privacy: {
    title: "Privacy policy",
    blurb: "How we collect, use and protect your information.",
    preview: undefined,
  },
  terms: {
    title: "Terms of service",
    blurb: "The terms that apply when you use this website and our services.",
    preview: undefined,
  },
} as const;

export type ComingSoonSlug = keyof typeof comingSoonPages;
