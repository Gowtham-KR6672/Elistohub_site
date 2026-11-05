import type { IconName } from "@/components/icons";

export const announcement = [
  "Your ecommerce growth & support partner",
  "15+ years in ecommerce",
  "Weekly updates + monthly reports",
];

export const heroFeed = [
  { code: "AZ", title: "Amazon listings optimized", detail: "New titles, bullets & A+ content live", status: "Done", tone: "green" },
  { code: "WM", title: "Walmart inventory synced", detail: "Stock matched across every channel", status: "Done", tone: "green" },
  { code: "PO", title: "Reorder sent to supplier", detail: "Forecast says you’d run out in 3 weeks", status: "Tracking", tone: "yellow" },
  { code: "AI", title: "“Where’s my order?” answered", detail: "AI support agent on Shopify chat", status: "Done", tone: "green" },
  { code: "AD", title: "PPC bids rebalanced", detail: "Budget moved to your best sellers", status: "Live", tone: "yellow" },
] as const;

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

export type Service = {
  icon: IconName;
  title: string;
  description: string;
  tags?: string[];
  variant?: "featured" | "wide" | "dark";
  badge?: string;
};

export const services: Service[] = [
  {
    icon: "cart",
    title: "Amazon Account Management",
    description: "Seller Central, Brand Registry, account health and cases - babysat daily so you can actually sleep.",
    tags: ["Seller Central", "Brand Registry", "Account health", "Cases"],
    variant: "featured",
  },
  {
    icon: "grid",
    title: "Multichannel Marketplace Management",
    description: "Walmart, eBay, Etsy, Faire, Wayfair, Shopify and social shops - without the 14 open browser tabs.",
    variant: "wide",
  },
  {
    icon: "list",
    title: "Product Listing Services",
    description: "Bulk uploads, variations, flat files and feeds. We speak fluent spreadsheet so you don’t have to.",
  },
  {
    icon: "search",
    title: "Listing Optimization & Marketplace SEO",
    description: "Keyword-rich titles, bullets and backend search terms that make the algorithm blush.",
  },
  {
    icon: "image",
    title: "Image Editing & Enhanced Content",
    description: "AI lifestyle images, retouching, infographics and A+ / EBC that stop the scroll.",
  },
  {
    icon: "database",
    title: "Catalog & PIM Management",
    description: "One clean source of truth for every SKU, size and shade. Product data entry, done right.",
  },
  {
    icon: "trend",
    title: "Inventory Management & Forecasting",
    description: "Demand forecasting and stock estimation so “out of stock” becomes a myth you tell new hires.",
  },
  {
    icon: "swap",
    title: "Purchase Orders & Vendor Management",
    description: "Reorders placed, suppliers chased, POs tracked. Politely. Relentlessly.",
  },
  {
    icon: "box",
    title: "Order Management & Fulfilment",
    description: "Order processing, 3PL coordination, returns and refunds - handled before your coffee’s cold.",
  },
  {
    icon: "store",
    title: "Store Management",
    description:
      "Day-to-day store admin: pricing, promos, product updates and account health. Your store, always open for business.",
  },
  {
    icon: "users",
    title: "Team Management",
    description:
      "We manage your in-house or freelance team with SOPs, check-ins and clear priorities. Fewer fires, more finished tasks.",
  },
  {
    icon: "chat",
    title: "Social Media Management",
    description: "Content calendars, posting and community replies that actually sound like you.",
  },
  {
    icon: "megaphone",
    title: "PPC & Paid Ads Management",
    description:
      "Amazon PPC, Walmart Connect, Meta, Instagram and Google Shopping ads. Commission-based - we only charge when we get you sales.",
    variant: "dark",
    badge: "Performance-based",
  },
];

export const webPlatforms = [
  { name: "Shopify & Shopify Plus", detail: "Themes, apps, checkout & Markets" },
  { name: "WooCommerce", detail: "WordPress stores & plugins" },
  { name: "BigCommerce", detail: "B2B & multi-storefront" },
  { name: "Wix & Squarespace", detail: "Fast, pretty, simple stores" },
];

export const webServices = [
  {
    label: "Build",
    title: "Website design & development",
    description: "Custom ecommerce websites designed around how your customers actually shop.",
    points: [
      "Shopify store setup & design",
      "Theme customization",
      "Platform & store migration",
      "Landing pages that convert",
    ],
  },
  {
    label: "Maintain & update",
    title: "Website maintenance & updates",
    description: "Fast, secure and always fresh. Your on-call web team for every “can we just…” moment.",
    points: [
      "Speed optimization, bug fixes & backups",
      "App & integration upkeep",
      "New collections, sale & campaign pages",
      "Content, banner & conversion updates",
    ],
  },
];

export const aiFeatures: { icon: IconName; title: string; detail: string }[] = [
  { icon: "chat", title: "AI chat & email support", detail: "24/7 replies with a smooth handoff to humans." },
  { icon: "spark", title: "AI training", detail: "Taught your catalog, policies and brand voice." },
  { icon: "bolt", title: "AI automations", detail: "Orders, stock and reports moving on their own." },
  { icon: "bot", title: "Custom AI agents", detail: "Listing, research and ops agents, supervised by us." },
];

export const aiChat = [
  { from: "customer", text: "hiii my order still hasn’t shown up 😭 it’s been a week" },
  { from: "agent", text: "So sorry, Maya! Order #40218 is with UPS and out for delivery today. Want the tracking link by email?" },
  { from: "customer", text: "yes!! and can I swap the size on my other order?" },
  { from: "agent", text: "Done ✓ Tracking sent, exchange started - our team has the details and will confirm shortly." },
] as const;

export const aiImageFeatures = [
  { title: "AI image creation", detail: "New angles, colorways and variations from the photos you already have." },
  { title: "AI lifestyle images", detail: "Your product in a styled room, on a model or at the beach - no photoshoot." },
  {
    title: "Image editing & retouching",
    detail: "Background removal, white-background marketplace images, color and shadow fixes.",
  },
  {
    title: "Image enhancement & upscaling",
    detail: "Sharpen, upscale and relight old or low-res photos so they look brand new.",
  },
  { title: "Infographics & size charts", detail: "Features, dimensions and comparisons shoppers get at a glance." },
  { title: "Enhanced content (A+ / EBC)", detail: "Amazon A+, Walmart rich media and Shopify page visuals that sell." },
];

export const supportPoints = [
  "Email & live chat support",
  "Amazon, Walmart & Etsy buyer messages",
  "Returns, refunds & exchanges",
  "Review & feedback management",
  "Social DMs & comment replies",
  "Helpdesk setup, macros & workflows",
];

export const helpdesks = [
  "Gorgias",
  "Zendesk",
  "Freshdesk",
  "Intercom",
  "Help Scout",
  "eDesk",
  "Re:amaze",
  "Gladly",
  "Kustomer",
  "Richpanel",
  "Tidio",
  "LiveChat",
];

export const emailPoints = [
  "Welcome, abandoned cart & win-back flows",
  "Campaign calendars & copywriting",
  "Email template design",
  "List growth & segmentation",
  "SMS marketing",
  "A/B testing & deliverability",
];

export const emailPlatforms = [
  "Klaviyo",
  "Mailchimp",
  "GoHighLevel",
  "Omnisend",
  "Attentive",
  "Postscript",
  "HubSpot",
  "ActiveCampaign",
  "Brevo",
  "Drip",
  "Constant Contact",
  "Sendlane",
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

export const commTools = [
  "Slack",
  "ClickUp",
  "Trello",
  "Asana",
  "Microsoft Teams",
  "Google Workspace",
  "Notion",
  "Email",
];

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

export const faqs = [
  {
    q: "Which marketplaces do you manage?",
    a: "Amazon, Walmart, Etsy, eBay, Faire, Wayfair, Target Plus and The Home Depot - plus Shopify, WooCommerce, BigCommerce, Facebook Shop, Instagram Shop and Google Shopping - for brands selling anywhere in the world.",
  },
  {
    q: "How does your Amazon PPC and paid ads management work?",
    a: "Our ads work is performance-based: we only do well when your sales do. We plan, launch and optimise campaigns on Amazon, Walmart, Meta, Instagram and Google Shopping, and report on results every month.",
  },
  {
    q: "Do you build and maintain Shopify and WooCommerce websites?",
    a: "Yes - Shopify, Shopify Plus, WooCommerce, BigCommerce, Wix and Squarespace. We handle design, development, maintenance and the steady stream of updates a growing store needs.",
  },
  {
    q: "How will we communicate, and how often will I hear from you?",
    a: "We use whatever you’re comfortable with - Slack, ClickUp, Trello, Asana, Teams or email. You get a weekly summarized update and a full monthly report. Need more? We can email or message you daily, depending on the tasks.",
  },
  {
    q: "Can you set up AI customer support for my store?",
    a: "Absolutely. We set up AI chat and email support, train it on your products and policies, connect it to your helpdesk and keep improving it every week.",
  },
];

export const contactNeeds = [
  "Marketplace management",
  "Listings & catalog",
  "Inventory, orders & vendors",
  "Paid ads (commission-based)",
  "AI product images",
  "Social media",
  "Customer service",
  "Email & SMS marketing",
  "AI support & automation",
  "Website build or updates",
  "Honestly? All of it",
];

export const contactPerks = ["Weekly updates and monthly reporting", "Teams covering US, UK, EU & IST hours"];

export const footerColumns = [
  {
    title: "Services",
    links: [
      { label: "Amazon account management", href: "/services" },
      { label: "Product listing services", href: "/services" },
      { label: "Inventory management", href: "/services" },
      { label: "Order management", href: "/services" },
      { label: "PPC management", href: "/services" },
      { label: "Social media management", href: "/services" },
      { label: "Customer service outsourcing", href: "/services" },
      { label: "Klaviyo email marketing", href: "/services" },
    ],
  },
  {
    title: "Marketplaces",
    links: ["Amazon", "Walmart", "Etsy", "eBay", "Faire", "Wayfair"].map((label) => ({
      label,
      href: "/marketplaces",
    })),
  },
  {
    title: "Websites & AI",
    links: [
      { label: "Shopify development", href: "/websites" },
      { label: "Website maintenance", href: "/websites" },
      { label: "Website updates", href: "/websites" },
      { label: "AI customer support", href: "/ai" },
      { label: "AI automations", href: "/ai" },
      { label: "AI agents", href: "/ai" },
      { label: "AI product images", href: "/ai" },
    ],
  },
];
