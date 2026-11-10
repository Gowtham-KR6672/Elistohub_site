import type { IconName } from "@/components/icons";
import { servicePages } from "@/lib/site";

/* ---------- Global ---------- */

export const announcement = ["Your ecommerce growth & support partner"];

/** Options for "What can we take off your plate?". Keep in sync with public/api/contact.php and server/contact-handler.mjs. */
export const contactNeeds = [...servicePages.map((page) => page.need), "Honestly? All of it"];

export const contactPerks = ["Free, no-pressure 30-minute call", "Clear quote before any work starts"];

/* ---------- Home: hero ---------- */

export const heroChecks = ["Dedicated account manager", "Start with one service"];

export const heroFeed = [
  { code: "AZ", title: "Amazon listings optimized", detail: "New titles, bullets & A+ content live", status: "Done", tone: "green" },
  { code: "WM", title: "Walmart inventory synced", detail: "Stock matched across every channel", status: "Done", tone: "green" },
  { code: "PO", title: "Reorder sent to supplier", detail: "Forecast says you’d run out in 3 weeks", status: "Tracking", tone: "yellow" },
  { code: "AI", title: "“Where’s my order?” answered", detail: "AI support agent on Shopify chat", status: "Done", tone: "green" },
  { code: "AD", title: "PPC bids rebalanced", detail: "Budget moved to your best sellers", status: "Live", tone: "yellow" },
] as const;

/* ---------- Home: marketplace strip ---------- */

export const marketplaces = [
  "Amazon",
  "Walmart",
  "Etsy",
  "eBay",
  "Faire",
  "Wayfair",
  "Shopify",
  "Target Plus",
  "The Home Depot",
  "Houzz",
  "Overstock",
  "WooCommerce",
  "BigCommerce",
  "Facebook Shop",
  "Instagram Shop",
  "Google Shopping",
];

/* ---------- Home: results ---------- */

export const homeResults = [
  { value: 40, label: "more Etsy orders", detail: "Handmade jewelry shop, in 6 months" },
  { value: 35, label: "Wayfair revenue", detail: "Furniture brand, in 6 months" },
  { value: 25, label: "Shopify conversion rate", detail: "Clothing label, in 4 months" },
];

/* ---------- Home: who we help ---------- */

export const audiences: { icon: IconName; title: string; detail: string }[] = [
  { icon: "cart", title: "D2C brands", detail: "Selling on your own Shopify or WooCommerce store plus Amazon, Etsy or Walmart." },
  {
    icon: "store",
    title: "B2B & wholesale",
    detail: "Faire, wholesale portals and retailer catalogs that need clean data and fast order handling.",
  },
  { icon: "grid", title: "Multichannel sellers", detail: "Several marketplaces, one catalog, and stock that has to match everywhere." },
  { icon: "users", title: "Lean teams", detail: "Founders and small teams who need an operations team without hiring one." },
];

export const handOverSigns = [
  "You spend more time on listings, orders and emails than on growing the brand",
  "Stock runs out (or piles up) because nobody is watching it",
  "Your ads spend money but you can’t tell what they return",
  "You’re selling on 3+ channels and none of them get full attention",
  "Freelancers come and go and nobody owns the results",
];

/* ---------- Home: services (each links to its own page) ---------- */

export type HomeService = {
  slug: string;
  number: string;
  title: string;
  description: string;
  points: string[];
  cta: string;
  badge?: string;
  tone?: "dark" | "sun";
};

export const homeServices: HomeService[] = [
  {
    slug: "marketplace-management",
    number: "01",
    title: "Marketplace Management",
    description:
      "Amazon, Walmart, Etsy, Wayfair and more, plus B2B wholesale on Faire. Listings, catalog and A+ content included.",
    points: ["Amazon & D2C marketplaces", "Faire & B2B wholesale", "Listings, SEO & catalog"],
    cta: "Learn more",
  },
  {
    slug: "order-processing",
    number: "02",
    title: "Order Processing",
    description: "Orders out the door on time, stock that matches the warehouse, and reorders sent before you run out.",
    points: ["Orders, 3PL & returns", "Inventory & forecasting", "POs & suppliers"],
    cta: "Learn more",
  },
  {
    slug: "paid-ads",
    number: "03",
    title: "Paid Ads, on Commission",
    description:
      "Amazon PPC, Walmart Connect, Meta and Google Shopping. Bids tuned weekly. We only charge when we get you sales.",
    points: ["Amazon & marketplace PPC", "Meta & Google ads", "Weekly optimisation"],
    cta: "Learn more",
    badge: "Performance-based",
    tone: "dark",
  },
  {
    slug: "ai-automation",
    number: "04",
    title: "AI Agents & Automation",
    description:
      "AI agents that answer customers at 3am, studio-quality product images without a studio, and automations that clear the busywork.",
    points: ["AI support agents", "AI product images", "Workflow automation"],
    cta: "Learn more",
  },
  {
    slug: "website-development",
    number: "05",
    title: "Website Design & Development",
    description:
      "Shopify and WooCommerce stores designed, built, sped up and looked after, with updates whenever you need them.",
    points: ["Store design & build", "Speed & CRO fixes", "Ongoing maintenance"],
    cta: "Learn more",
  },
  {
    slug: "marketing",
    number: "06",
    title: "Marketing",
    description:
      "Emails and texts people actually open, plus Instagram and Facebook posts that sound like you. One plan, every inbox and feed.",
    points: ["Email & SMS campaigns", "Instagram & Facebook", "Content calendars"],
    cta: "Learn more",
  },
  {
    slug: "virtual-assistant",
    number: "07",
    title: "Ecommerce Virtual Assistant",
    description:
      "Need help now and then, not a full team? Book an ecommerce-trained VA by the hour and pay only for the work you need done. No long-term contract.",
    points: ["Pay by the hour", "Flexible monthly hours", "Cancel anytime"],
    cta: "See how it works",
    badge: "Pay as you go",
    tone: "sun",
  },
];

/* ---------- Home: why brands pick us ---------- */

export const whyItems: { icon: IconName; title: string; detail: string }[] = [
  {
    icon: "users",
    title: "One account manager, a whole team behind them",
    detail: "A single point of contact who knows your store, backed by specialists for listings, ads, design and support.",
  },
  {
    icon: "list",
    title: "Proven ways of working",
    detail:
      "Checklists and SOPs for every channel, so quality doesn’t depend on who’s on shift. Daily updates if your work needs them.",
  },
  {
    icon: "globe",
    title: "Working in your time zone",
    detail: "Teams covering US, UK, EU and IST hours, so work moves while you sleep and you get answers during your day.",
  },
  {
    icon: "file",
    title: "Pricing that fits how you work",
    detail: "Hourly, a monthly retainer, or commission-only on ads. Pick the model that fits your budget.",
  },
  {
    icon: "bolt",
    title: "Start fast, scale when ready",
    detail: "No big setup project. We fix what’s losing you sales first, then add more as you grow.",
  },
];

/* ---------- Home: case studies ---------- */

export type CaseStudy = {
  platform: string;
  category: string;
  title: string;
  problem: string;
  work: string[];
  metric: number;
  metricLabel: string;
  art: "ring" | "sofa" | "hanger";
};

export const caseStudies: CaseStudy[] = [
  {
    platform: "Etsy",
    category: "Handmade jewelry · Etsy",
    title: "A handmade jewelry shop, finally found on Etsy search.",
    problem: "Gorgeous pieces, flat photos and titles nobody was searching for.",
    work: [
      "Etsy SEO - titles, tags & attributes rewritten",
      "AI-enhanced product & lifestyle photos",
      "Etsy Ads on commission",
      "Buyer messages & reviews handled daily",
    ],
    metric: 40,
    metricLabel: "orders in 6 months",
    art: "ring",
  },
  {
    platform: "Wayfair",
    category: "Furniture · Wayfair",
    title: "A furniture brand that made Wayfair a real sales channel.",
    problem: "Hundreds of SKUs, messy specs and stock that never matched the warehouse.",
    work: [
      "Full catalog cleanup & spec fixes",
      "AI room-scene lifestyle images",
      "Inventory sync & reorder forecasting",
      "Wayfair Sponsored Products on commission",
    ],
    metric: 35,
    metricLabel: "Wayfair revenue in 6 months",
    art: "sofa",
  },
  {
    platform: "Shopify",
    category: "Clothing · Shopify",
    title: "A clothing label whose Shopify store finally converts.",
    problem: "Slow pages, sizing questions everywhere and carts left behind.",
    work: [
      "Shopify theme refresh & speed optimization",
      "Klaviyo welcome & abandoned-cart flows",
      "AI + human support for sizing questions",
      "Meta & Instagram ads on commission",
    ],
    metric: 25,
    metricLabel: "conversion rate in 4 months",
    art: "hanger",
  },
];

/* ---------- Home: how we start ---------- */

export const startSteps = [
  { title: "Intro call", detail: "A 30-minute call. We look at your store and channels and tell you honestly where we’d start." },
  { title: "Clear plan & quote", detail: "A short list of what we’ll fix first, who’ll do it and what it costs." },
  { title: "Quick wins first", detail: "We fix the things that lose you sales today: broken listings, stock gaps, wasted ad spend." },
  { title: "Grow from there", detail: "Add services, hours or channels when you’re ready. Scale down just as easily." },
];

/* ---------- Home: working with us ---------- */

export const clientNotice: { icon: IconName; title: string; detail: string }[] = [
  {
    icon: "check",
    title: "No micro-management needed",
    detail: "Give us the goal, not a to-do list. We plan the work, do it and flag only the decisions that need you.",
  },
  {
    icon: "chat",
    title: "Great communication",
    detail:
      "Quick replies in Slack, ClickUp, Teams or email, in your time zone. You always know who to ask and what’s happening.",
  },
  {
    icon: "file",
    title: "Clear reporting",
    detail: "A short weekly update and a monthly report on sales, ads, inventory and support. Plain numbers, no jargon.",
  },
];

/* ---------- Home: FAQ ---------- */

export const faqs = [
  {
    q: "How much does it cost?",
    a: "It depends on what you need. We work hourly, on a monthly retainer (based on your catalog size or the hours you need), or commission-only for ads. After a free call you get a clear quote before any work starts.",
  },
  {
    q: "Do I have to sign a long contract?",
    a: "No. You can start with one service and scale up, down or pause as your needs change.",
  },
  {
    q: "Who will actually work on my store?",
    a: "Our own trained team, led by a dedicated account manager who is your single point of contact. Specialists handle listings, ads, design and support.",
  },
  {
    q: "How fast will I see results?",
    a: "Quick wins like fixed listings, better images and smarter ad bids usually show within the first few weeks. Bigger growth, like the case studies above, builds over 3 to 6 months.",
  },
  {
    q: "How will we communicate?",
    a: "Wherever you’re comfortable: Slack, ClickUp, Teams or email. You get a weekly update and a monthly report, and daily updates if the work needs it.",
  },
  {
    q: "Which marketplaces and platforms do you handle?",
    a: "Amazon, Walmart, Etsy, eBay, Faire, Wayfair, Target Plus and The Home Depot, plus Shopify, WooCommerce, BigCommerce, social shops and Google Shopping.",
  },
  {
    q: "How does commission-based ads management work?",
    a: "For paid ads we charge on the sales the ads bring in, so we only earn when you do. You keep full control of your budget.",
  },
  {
    q: "We’re a small brand. Is that okay?",
    a: "Yes. Many clients start with a few hours a month or a pay-as-you-go virtual assistant and grow from there.",
  },
];

/* ---------- Footer ---------- */

export const footerColumns = [
  {
    title: "Services",
    links: servicePages.map((page) => ({ label: page.name, href: page.path })),
  },
  {
    title: "Marketplaces",
    links: [
      { label: "Amazon", href: "/marketplaces/amazon" },
      { label: "Walmart", href: "/marketplaces/walmart" },
      { label: "Etsy", href: "/marketplaces/etsy" },
      { label: "eBay", href: "/marketplaces/ebay" },
      { label: "Faire", href: "/marketplaces/faire" },
      { label: "Wayfair", href: "/marketplaces/wayfair" },
      { label: "Target Plus", href: "/marketplaces/target-plus" },
      { label: "The Home Depot", href: "/marketplaces/home-depot" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Home", href: "/" },
      { label: "About us", href: "/about" },
      { label: "Our process", href: "/our-process" },
      { label: "Results", href: "/#results" },
      { label: "FAQ", href: "/#faq" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

/* ---------- Our process page ---------- */

export const processSteps = [
  { title: "Free 30-minute call", detail: "We look at your store and channels and tell you honestly where we’d start." },
  { title: "Plan & scope", detail: "You get a clear list of what we’ll take off your plate, in what order." },
  { title: "Plug into your setup", detail: "We work inside your tools and talk wherever you’re comfortable. No new apps." },
  {
    title: "Weekly updates, monthly reports",
    detail: "What we shipped, what’s next and what needs your call, plus a full monthly report.",
  },
];

export const techStack = [
  {
    category: "PIM & product data",
    tools: ["Salsify", "Akeneo", "Plytix", "Pimcore", "inriver", "Syndigo", "Productsup", "Feedonomics"],
  },
  {
    category: "ERP & CRM",
    tools: ["NetSuite", "Salesforce", "SAP Business One", "Microsoft Dynamics 365", "Odoo", "Zoho", "QuickBooks"],
  },
  {
    category: "Channels, inventory & shipping",
    tools: ["Rithum (ChannelAdvisor)", "Linnworks", "SellerCloud", "Cin7", "Extensiv", "ShipStation", "ShipBob"],
  },
  {
    category: "Marketplace & ads tools",
    tools: ["Helium 10", "Jungle Scout", "Pacvue", "Perpetua", "Google Merchant Center", "Meta Commerce Manager"],
  },
  {
    category: "Automation",
    tools: ["Zapier", "Make", "n8n"],
    extra: "+ whatever you use",
  },
];

export const commTools = ["Slack", "ClickUp", "Trello", "Asana", "Microsoft Teams", "Google Workspace", "Notion", "Email"];

export const reportingCadence = [
  {
    label: "Every week",
    title: "Weekly summarized update",
    detail: "What we shipped, what’s next and anything that needs your call - readable in 30 seconds.",
    tone: "green",
  },
  {
    label: "Every month",
    title: "Monthly reporting",
    detail: "Sales, ads, inventory and support performance across every channel - plus next month’s plan.",
    tone: "yellow",
  },
] as const;

export const weeklyUpdate = [
  { tag: "Done", text: "Amazon & Walmart listings refreshed", tone: "green" },
  { tag: "Done", text: "Reorder placed with two suppliers", tone: "green" },
  { tag: "Next", text: "Holiday email flow + Google Shopping feed", tone: "yellow" },
  { tag: "Needs you", text: "Approve new bundle pricing", tone: "outline" },
] as const;

/* ---------- Virtual assistant page ---------- */

export const vaPlans = [
  {
    label: "Off and on",
    title: "Pay as you go",
    description: "Book hours only when something comes up. You pay for the time logged, nothing more.",
    points: ["Billed by the hour", "No minimum each month", "Same VA when they’re available"],
  },
  {
    label: "Most popular",
    title: "Monthly hours",
    description: "A set number of hours each month at a lower hourly rate. Change the hours whenever you like.",
    points: ["Pick your monthly hours", "Unused hours roll over for a month", "A regular VA who learns your store"],
    featured: true,
  },
  {
    label: "Part-time or full-time",
    title: "Dedicated VA",
    description: "Your own assistant on a fixed schedule, working in your time zone.",
    points: ["Part-time or full-time", "US, UK, EU or IST hours", "Managed by our senior team"],
  },
];

export const vaTasks = [
  "Listing uploads & product updates",
  "Order updates, tracking & returns",
  "Customer emails & marketplace messages",
  "Data entry & spreadsheet clean-up",
  "Competitor & product research",
  "Social media scheduling",
  "Supplier follow-ups",
  "Inbox & calendar admin",
];

export const vaSteps = [
  { title: "Tell us the tasks", detail: "A quick call or a message with what you need done." },
  { title: "Get matched", detail: "We pair you with a VA who knows your platforms." },
  { title: "Pay for hours used", detail: "Simple time logs and a clear invoice. Pause anytime." },
];
