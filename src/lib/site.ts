import type { IconName } from "@/components/icons";

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
    name: "D2C & B2B marketplace management",
    short: "Amazon, Walmart, Etsy, Faire & more",
    icon: "grid",
    need: "D2C & B2B marketplace management",
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
    name: "Paid ads on commission",
    short: "Amazon PPC, Meta & Google Shopping",
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

export type NavItem = { label: string; href: string; children?: ServicePage[] };

export const mainNav: NavItem[] = [
  { label: "Services", href: "/#services", children: servicePages },
  { label: "Marketplaces", href: "/marketplace-management" },
  { label: "AI", href: "/ai-automation" },
  { label: "Our process", href: "/our-process" },
  { label: "Case studies", href: "/#work" },
  { label: "FAQ", href: "/#faq" },
];

/** Every live page, used for the sitemap (see vite.config.ts) and internal checks. */
export const livePaths = ["/", ...servicePages.map((page) => page.path), "/our-process", "/contact"];

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
  "/ai-product-images": "/ai-automation#ai-images",
  "/customer-service": "/ai-automation#customer-service",
  "/email-sms-marketing": "/marketing",
  "/process": "/our-process",
};

export const legacyHashRedirects: Record<string, string> = {
  "#websites": "/website-development",
  "#ai": "/ai-automation",
  "#ai-images": "/ai-automation#ai-images",
  "#customer-service": "/ai-automation#customer-service",
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
