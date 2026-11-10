import type { IconName } from "@/components/icons";

export const siteConfig = {
  name: "Elistohub",
  title: "Elistohub - Ecommerce Outsourcing Agency",
  description:
    "We run the day-to-day of your online store: marketplaces, listings, orders, ads, AI support, websites and marketing. More orders, cleaner operations and a team that owns the results.",
  /** Public site URL, e.g. https://www.elistohub.com (set VITE_SITE_URL at build time). */
  url: ((import.meta.env.VITE_SITE_URL as string | undefined) ?? "").replace(/\/$/, ""),
  email: "info@elistohub.com",
  location: "Mumbai, India",
  tagline: "One team for all your ecommerce needs.",
  copyrightYear: 2026,
} as const;

export type ServicePage = {
  slug: string;
  path: string;
  /** Name used in menus, breadcrumbs and the contact form. */
  name: string;
  /** One-line summary for the Services dropdown. */
  short: string;
  icon: IconName;
  /** Matching option in the contact form's "What can we take off your plate?" list. */
  need: string;
};

/** Every service page, in the order shown in menus and on the home page. */
export const servicePages: ServicePage[] = [
  {
    slug: "marketplace-management",
    path: "/marketplace-management",
    name: "Marketplace management",
    short: "Amazon, Walmart, Etsy, Faire & more",
    icon: "grid",
    need: "Marketplace management",
  },
  {
    slug: "order-processing",
    path: "/order-processing",
    name: "Order processing",
    short: "Orders, inventory & suppliers",
    icon: "box",
    need: "Order processing",
  },
  {
    slug: "paid-ads",
    path: "/paid-ads",
    name: "Paid ads",
    short: "Commission-based PPC, Meta & Google",
    icon: "megaphone",
    need: "Paid ads (commission-based)",
  },
  {
    slug: "ai-automation",
    path: "/ai-automation",
    name: "AI agents & automation",
    short: "AI support, product images & automations",
    icon: "bot",
    need: "AI agents & automation",
  },
  {
    slug: "website-development",
    path: "/website-development",
    name: "Website design & development",
    short: "Shopify & WooCommerce stores",
    icon: "code",
    need: "Website design & development",
  },
  {
    slug: "marketing",
    path: "/marketing",
    name: "Marketing",
    short: "Email, SMS & social media",
    icon: "mail",
    need: "Marketing (email, SMS & social)",
  },
  {
    slug: "virtual-assistant",
    path: "/virtual-assistant",
    name: "Virtual assistant",
    short: "Ecommerce help by the hour",
    icon: "users",
    need: "Virtual assistant (pay as you go)",
  },
];

export const servicePageBySlug = Object.fromEntries(servicePages.map((page) => [page.slug, page])) as Record<
  string,
  ServicePage
>;

export type MarketplacePage = {
  slug: string;
  path: string;
  name: string;
  /** Two-letter badge used in menus and cards, e.g. "AZ". */
  code: string;
};

export const marketplacePages: MarketplacePage[] = [
  { slug: "amazon", name: "Amazon", code: "AZ" },
  { slug: "walmart", name: "Walmart", code: "WM" },
  { slug: "etsy", name: "Etsy", code: "ET" },
  { slug: "ebay", name: "eBay", code: "EB" },
  { slug: "faire", name: "Faire", code: "FA" },
  { slug: "wayfair", name: "Wayfair", code: "WF" },
  { slug: "target-plus", name: "Target Plus", code: "T+" },
  { slug: "home-depot", name: "The Home Depot", code: "HD" },
].map((m) => ({ ...m, path: `/marketplaces/${m.slug}` }));

export const marketplaceByName = Object.fromEntries(marketplacePages.map((m) => [m.name, m])) as Record<
  string,
  MarketplacePage
>;

/** An item inside a header dropdown. */
export type MenuLink = { path: string; name: string; short?: string; icon?: IconName; code?: string };

export type NavItem = {
  label: string;
  href: string;
  children?: MenuLink[];
  /** Link shown at the bottom of a dropdown. */
  allLink?: { label: string; href: string; note: string };
};

export const mainNav: NavItem[] = [
  {
    label: "Services",
    href: "/#services",
    children: [
      ...servicePages,
      { path: "/our-process", name: "Our process", short: "How we work, step by step", icon: "spark" },
    ],
    allLink: { label: "See all services", href: "/#services", note: "Pick one service or hand us the whole back office." },
  },
  {
    label: "Marketplaces",
    href: "/marketplace-management",
    children: marketplacePages,
    allLink: { label: "All marketplaces", href: "/marketplace-management", note: "D2C marketplaces and B2B wholesale." },
  },
  { label: "Results", href: "/#results" },
  { label: "Our process", href: "/our-process" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/#faq" },
];

/**
 * Old addresses that moved. Page paths redirect on load; home-page #anchors
 * (e.g. /#ai, /#email) are forwarded by the router so old links keep working.
 */
export const legacyPathRedirects: Record<string, string> = {
  "/services": "/#services",
  "/marketplaces": "/marketplace-management",
  "/websites": "/website-development",
  "/ai": "/ai-automation",
  "/case-studies": "/#work",
  "/ai-customer-support": "/ai-automation",
  "/ai-product-images": "/ai-automation",
  "/customer-service": "/ai-automation",
  "/email-sms-marketing": "/marketing",
  "/process": "/our-process",
  "/about-us": "/about",
};

export const legacyHashRedirects: Record<string, string> = {
  "#websites": "/website-development",
  "#ai": "/ai-automation",
  "#ai-images": "/ai-automation",
  "#customer-service": "/ai-automation",
  "#email": "/marketing",
  "#tools": "/our-process#tools",
  "#reporting": "/our-process#tools",
};

/**
 * Pages that are planned but not built yet. Each renders the shared "Coming soon" screen.
 */
export const comingSoonPages = {
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
