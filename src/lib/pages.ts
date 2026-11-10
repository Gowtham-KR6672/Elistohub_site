import type { IconName } from "@/components/icons";

/** A headline split into a plain part and a highlighted part, e.g. ["Orders out the door", "before your coffee’s cold."] */
export type Headline = [plain: string, highlight: string];

export type QA = { q: string; a: string };
export type Outcome = { title: string; detail: string };
export type Stat = { value: number; label: string };

/* ---------- Service pages (shared layout) ---------- */

export type ServicePageContent = {
  seoTitle: string;
  description: string;
  eyebrow: string;
  title: Headline;
  intro: string;
  pains: string[];
  gets: { icon: IconName; title: string; detail: string }[];
  stat?: Stat;
  outcomes: Outcome[];
  faqs: QA[];
};

export const servicePageContent: Record<string, ServicePageContent> = {
  "marketplace-management": {
    seoTitle: "Marketplace Management",
    description:
      "Amazon, Walmart, Etsy and more for shoppers, Faire and wholesale for retailers. Listings, catalog, SEO and content run like one store by our ecommerce team.",
    eyebrow: "Marketplace management",
    title: ["Selling everywhere?", "We keep it all in line."],
    intro:
      "Amazon, Walmart, Etsy and more for shoppers. Faire and wholesale for retailers. All of it run like one store, without the 14 open browser tabs.",
    pains: [
      "Listings are inconsistent or suppressed across channels",
      "Account health warnings you don’t have time to fix",
      "Wholesale orders and retail orders handled by the same tired person",
      "No one owns marketplace SEO, so you’re invisible in search",
    ],
    gets: [
      { icon: "cart", title: "Account management", detail: "Account health, cases and policy warnings, babysat daily so you can actually sleep." },
      { icon: "list", title: "Listings & catalog", detail: "Bulk uploads, variations, flat files and one clean source of truth for every SKU." },
      { icon: "search", title: "Marketplace SEO", detail: "Keyword-rich titles, bullets and backend terms that make the algorithm blush." },
      { icon: "image", title: "Enhanced content", detail: "A+ content, infographics and AI lifestyle images." },
      { icon: "trend", title: "Pricing & promotions", detail: "Promos, deals and pricing kept competitive and in sync." },
      { icon: "store", title: "B2B & wholesale", detail: "Faire catalogs, wholesale pricing and retailer orders." },
    ],
    stat: { value: 40, label: "more Etsy orders in 6 months" },
    outcomes: [
      { title: "More visibility in search", detail: "Listings rebuilt around what shoppers actually type." },
      { title: "Fewer suppressed listings", detail: "Errors caught and fixed before they cost you sales." },
      { title: "One catalog, every channel", detail: "Change it once, it’s right everywhere." },
    ],
    faqs: [
      {
        q: "Do I need to be on every marketplace?",
        a: "No. We’ll tell you which channels fit your products and margins, and start with the one that will move the needle fastest.",
      },
      { q: "Can you launch us on a new marketplace?", a: "Yes. We handle setup, catalog, content and the first months of optimisation." },
      { q: "Do you handle wholesale too?", a: "Yes. Faire and wholesale portals, including retailer orders and pricing." },
    ],
  },
  "order-processing": {
    seoTitle: "Order Processing & Inventory Management",
    description:
      "Orders, returns, stock and suppliers handled every day: order processing, 3PL coordination, inventory sync, forecasting and purchase orders.",
    eyebrow: "Order processing",
    title: ["Orders out the door", "before your coffee’s cold."],
    intro: "Orders, returns, stock and suppliers handled every day, so “out of stock” becomes a myth you tell new hires.",
    pains: [
      "Late shipments hurting your seller ratings",
      "Stock numbers that never match the warehouse",
      "Best sellers selling out while slow stock piles up",
      "Chasing suppliers for POs eats your whole week",
    ],
    gets: [
      { icon: "box", title: "Order processing", detail: "Orders checked, released and tracked across every channel." },
      { icon: "store", title: "3PL coordination", detail: "We work with your warehouse or 3PL so orders leave on time." },
      { icon: "swap", title: "Returns & refunds", detail: "Handled fast and fairly, to protect your ratings." },
      { icon: "database", title: "Inventory sync", detail: "Stock matched across every channel, every day." },
      { icon: "trend", title: "Forecasting & reorders", detail: "Reorders planned before you run out, not after." },
      { icon: "file", title: "POs & suppliers", detail: "Purchase orders placed, tracked and chased. Politely. Relentlessly." },
    ],
    outcomes: [
      { title: "Fewer late or cancelled orders", detail: "Better seller metrics on every marketplace." },
      { title: "Fewer stock-outs", detail: "Reorders sent with time to spare." },
      { title: "Less cash stuck in slow stock", detail: "You buy what sells, not what you guessed." },
    ],
    faqs: [
      { q: "Do you work with our 3PL or warehouse?", a: "Yes. We work inside your existing setup and tools." },
      {
        q: "Which tools do you use?",
        a: "Whatever you run on, from Seller Central to ShipStation, Linnworks, Cin7 and spreadsheets.",
      },
      { q: "Can you just do forecasting?", a: "Yes. Start with one piece and add more when you’re ready." },
    ],
  },
  "paid-ads": {
    seoTitle: "PPC & Paid Ads Management on Commission",
    description:
      "Amazon PPC, Walmart Connect, Etsy, Wayfair, Meta and Google Shopping ads tuned every week. Commission-based, so we only get paid when your ads make sales.",
    eyebrow: "PPC & paid ads",
    title: ["Ads that pay for themselves.", "Or we don’t get paid."],
    intro:
      "Amazon PPC, Walmart Connect, Etsy, Wayfair, Meta and Google Shopping, tuned every week. Commission-based, so we only win when you do.",
    pains: [
      "Ad spend goes up but sales don’t",
      "You can’t tell which campaigns actually make money",
      "Agencies charge big fees whether ads work or not",
      "Nobody has time to tune bids every week",
    ],
    gets: [
      { icon: "grid", title: "Campaign setup", detail: "Structure, keywords and targeting built around your margins." },
      { icon: "trend", title: "Weekly optimisation", detail: "Bids, budgets and negatives tuned every week. No set-and-forget." },
      { icon: "megaphone", title: "Marketplace ads", detail: "Amazon, Walmart Connect, Etsy Ads and Wayfair Sponsored Products." },
      { icon: "globe", title: "Social & Google", detail: "Meta, Instagram and Google Shopping campaigns." },
      { icon: "image", title: "Creative that converts", detail: "Ad images and copy tested and refreshed." },
      { icon: "file", title: "Monthly report", detail: "Spend, sales and return on ad spend, in plain numbers." },
    ],
    outcomes: [
      { title: "Lower wasted spend", detail: "Money moved from losing keywords to winners." },
      { title: "More sales from the same budget", detail: "Better targeting and better listings behind every ad." },
      { title: "No sales, no fee", detail: "Our commission only comes from ad sales." },
    ],
    faqs: [
      {
        q: "How does commission pricing work?",
        a: "We charge a percentage of the sales our ads bring in. You set the budget and keep full control.",
      },
      { q: "Is there a minimum ad budget?", a: "We’ll suggest a budget on the free call based on your products and goals." },
      { q: "Who owns the ad accounts?", a: "You do. We work inside your accounts." },
    ],
  },
  "ai-automation": {
    seoTitle: "AI Agents & Automation for Ecommerce",
    description:
      "AI support agents trained on your products, studio-quality AI product images and workflow automations, set up and looked after by our ecommerce team.",
    eyebrow: "AI agents & automation",
    title: ["AI that answers customers at 3am.", "So you don’t have to."],
    intro:
      "AI support agents, studio-quality product images and automations that clear the busywork, set up and looked after by our team.",
    pains: [
      "“Where’s my order?” emails eat your whole morning",
      "Product photos cost a fortune and take weeks",
      "Copy-paste jobs between tools every single day",
      "Customers wait hours for answers they could get in seconds",
    ],
    gets: [
      { icon: "bot", title: "AI support agent", detail: "Chat and email support trained on your products and policies." },
      { icon: "users", title: "Human backup", detail: "Our team steps in for anything the AI shouldn’t touch. Robots have limits." },
      { icon: "image", title: "AI product images", detail: "Lifestyle, room-scene and on-model images from your product photos." },
      { icon: "spark", title: "Image editing", detail: "Retouching, backgrounds and marketplace-ready sizes." },
      { icon: "bolt", title: "Workflow automation", detail: "Zapier, Make and n8n flows between your tools." },
      { icon: "trend", title: "Ongoing training", detail: "We review answers weekly and keep improving them." },
    ],
    outcomes: [
      { title: "Instant replies, day and night", detail: "Customers get answers in seconds, not hours." },
      { title: "Fewer tickets for your team", detail: "Repeat questions handled automatically." },
      { title: "New images in days, not weeks", detail: "No studio, no photoshoot." },
    ],
    faqs: [
      {
        q: "Will the AI say something wrong?",
        a: "It only answers from your approved information, and hands anything unclear to a human.",
      },
      { q: "Which helpdesks does it work with?", a: "Shopify chat, Gorgias, Zendesk, email and more." },
      { q: "Can I just order AI images?", a: "Yes. Images can be a one-off project." },
    ],
  },
  "website-development": {
    seoTitle: "Website Design & Development",
    description:
      "Shopify and WooCommerce stores that load fast and sell more: design and build, speed and conversion fixes, apps, maintenance and migrations.",
    eyebrow: "Website design & development",
    title: ["Websites we build, fix &", "lovingly babysit."],
    intro: "Shopify and WooCommerce stores that load fast, sell more and get updated without the three-week wait.",
    pains: [
      "Your store is slow and shoppers leave",
      "Every small change means waiting on a developer",
      "The theme looks dated next to competitors",
      "Lots of traffic, not many orders",
    ],
    gets: [
      { icon: "code", title: "Store design & build", detail: "Shopify, Shopify Plus, WooCommerce and BigCommerce." },
      { icon: "bolt", title: "Speed optimisation", detail: "Faster pages on mobile, so shoppers stop leaving before the photos load." },
      { icon: "cart", title: "Conversion fixes", detail: "Product pages, sizing help and checkout tuned to sell." },
      { icon: "grid", title: "Apps & integrations", detail: "Reviews, subscriptions, Klaviyo, marketplaces and more." },
      { icon: "wrench", title: "Maintenance & updates", detail: "Banners, products, collections and fixes, done quickly." },
      { icon: "swap", title: "Migrations", detail: "Moving platforms without losing products, SEO or orders." },
    ],
    stat: { value: 25, label: "conversion rate in 4 months" },
    outcomes: [
      { title: "Faster pages", detail: "Less waiting, fewer people leaving." },
      { title: "Higher conversion rate", detail: "More of your visitors become customers." },
      { title: "Changes done in days", detail: "No more waiting weeks for small updates." },
    ],
    faqs: [
      {
        q: "Can you fix our existing store?",
        a: "Yes. Most clients start with speed and conversion fixes on their current theme.",
      },
      { q: "Do you offer ongoing support?", a: "Yes, by the hour or on a monthly plan." },
      {
        q: "Which platforms do you build on?",
        a: "Shopify, Shopify Plus, WooCommerce, BigCommerce, Wix and Squarespace.",
      },
    ],
  },
  marketing: {
    seoTitle: "Marketing: Email, SMS & Social Media",
    description:
      "Email flows, SMS campaigns and Instagram and Facebook posts planned, written and sent for you in your brand’s voice, with a monthly report on what they earn.",
    eyebrow: "Marketing",
    title: ["Emails people actually open.", "Wild, we know."],
    intro: "Email, SMS, Instagram and Facebook, planned, written and sent for you. In your brand’s voice, not ours.",
    pains: [
      "Your email list is growing but nobody hears from you",
      "Social posts happen when someone remembers",
      "No welcome or abandoned-cart flows set up",
      "Campaigns look and sound different every time",
    ],
    gets: [
      { icon: "mail", title: "Email flows", detail: "Welcome, abandoned cart, post-purchase and win-back flows in Klaviyo." },
      { icon: "megaphone", title: "Campaigns", detail: "Regular emails and SMS planned around your launches and sales." },
      { icon: "chat", title: "Instagram & Facebook", detail: "Content calendars, posting and replies that actually sound like you." },
      { icon: "image", title: "Design & copy", detail: "On-brand visuals and words that sound like you." },
      { icon: "users", title: "List growth", detail: "Pop-ups and sign-up offers that build your list." },
      { icon: "file", title: "Monthly report", detail: "Opens, clicks and revenue from every channel." },
    ],
    outcomes: [
      { title: "Revenue from email every month", detail: "Flows keep selling while you sleep." },
      { title: "A consistent brand voice", detail: "Every email and post sounds like you." },
      { title: "A steady posting rhythm", detail: "No more weeks of silence on social." },
    ],
    faqs: [
      { q: "Do you use Klaviyo?", a: "Yes, and Mailchimp, Omnisend and others." },
      {
        q: "Can you post on Instagram and Facebook for us?",
        a: "Yes. We plan, create and schedule posts, and reply to comments.",
      },
      { q: "Do we approve content first?", a: "Always, until you’re happy for us to run it." },
    ],
  },
};

/* ---------- Marketplace pages (shared layout) ---------- */

export type MarketplacePageContent = {
  title: Headline;
  visitUrl: string;
  tasks: string[];
  stat?: Stat;
  outcomes: Outcome[];
};

export const marketplaceIntro = (name: string) =>
  `We run your ${name} store day to day, from listings to ads to customer messages. You get a weekly update and your evenings back.`;

export const marketplacePageContent: Record<string, MarketplacePageContent> = {
  amazon: {
    title: ["Amazon,", "minus the 2am panic."],
    visitUrl: "https://sell.amazon.com",
    tasks: [
      "Account health and Brand Registry",
      "Listings, A+ content and SEO",
      "Sponsored Products & Brands ads",
      "FBA shipments and inventory planning",
      "Cases, suppressions and reinstatements",
      "Reviews and buyer messages",
    ],
    outcomes: [
      { title: "Higher rank on your main keywords", detail: "Titles, bullets and backend terms rebuilt around real searches." },
      { title: "Healthy account, fewer suppressions", detail: "Problems fixed before they cost you sales." },
      { title: "Lower ad cost per sale", detail: "Bids moved to the keywords that convert." },
    ],
  },
  walmart: {
    title: ["More Buy Box.", "Less Seller Center."],
    visitUrl: "https://marketplace.walmart.com",
    tasks: [
      "Seller Center setup and item setup",
      "Listing content and quality score",
      "Walmart Connect ads",
      "WFS and inventory sync",
      "Pricing and Buy Box",
      "Performance standards",
    ],
    outcomes: [
      { title: "Higher listing quality score", detail: "Complete, accurate content that Walmart ranks higher." },
      { title: "More time in the Buy Box", detail: "Pricing and stock kept competitive." },
      { title: "Profitable Walmart Connect ads", detail: "Spend focused on products that sell." },
    ],
  },
  etsy: {
    title: ["Handmade, gorgeous &", "finally found."],
    visitUrl: "https://www.etsy.com/sell",
    tasks: [
      "Etsy SEO: titles, tags and attributes",
      "Product and lifestyle photos",
      "Etsy Ads",
      "Buyer messages and reviews",
      "Sales, coupons and promotions",
      "Shop policies and sections",
    ],
    stat: { value: 40, label: "more orders in 6 months" },
    outcomes: [
      { title: "Found in Etsy search", detail: "Titles and tags written for what buyers type." },
      { title: "Photos that get clicked", detail: "Clean, styled images that stand out." },
      { title: "Better reviews", detail: "Fast, friendly replies to every buyer." },
    ],
  },
  ebay: {
    title: ["eBay listings that", "actually get found."],
    visitUrl: "https://www.ebay.com/sl/sell",
    tasks: [
      "Listings and item specifics",
      "Store categories and branding",
      "Promoted Listings",
      "Pricing and best offers",
      "Returns and buyer messages",
      "Bulk listing and inventory sync",
    ],
    outcomes: [
      { title: "Better visibility in eBay search", detail: "Complete item specifics and keyword-rich titles." },
      { title: "Top-rated seller standards", detail: "Fast shipping and quick replies protect your rating." },
      { title: "Less admin", detail: "Bulk tools keep hundreds of listings in sync." },
    ],
  },
  faire: {
    title: ["More retailers.", "More reorders."],
    visitUrl: "https://www.faire.com",
    tasks: [
      "Wholesale catalog and pricing",
      "Retailer orders and fulfilment",
      "Faire Direct links for your own retailers",
      "Promotions and Faire events",
      "Retailer messages and reorders",
      "Wholesale-ready product photos",
    ],
    outcomes: [
      { title: "More retailers finding you", detail: "A catalog built to stand out to Faire buyers." },
      { title: "More reorders", detail: "Fast, reliable fulfilment keeps retailers coming back." },
      { title: "Lower commission on your own retailers", detail: "Faire Direct links set up for existing accounts." },
    ],
  },
  wayfair: {
    title: ["Furniture that", "shows up in filters."],
    visitUrl: "https://sell.wayfair.com",
    tasks: [
      "Catalog cleanup and spec data",
      "Room-scene and lifestyle images",
      "Inventory feed sync",
      "Wayfair Sponsored Products",
      "Orders, returns and damages",
      "Pricing and promotions",
    ],
    stat: { value: 35, label: "Wayfair revenue in 6 months" },
    outcomes: [
      { title: "Products that show up in filters", detail: "Complete specs so shoppers can actually find you." },
      { title: "Images that sell furniture", detail: "Room scenes that help buyers picture it at home." },
      { title: "Stock that matches the warehouse", detail: "Fewer cancellations and better partner ratings." },
    ],
  },
  "target-plus": {
    title: ["Target Plus,", "minus the paperwork pile."],
    visitUrl: "https://www.target.com",
    tasks: [
      "Item setup and content",
      "Catalog data to Target’s standards",
      "Inventory and order sync",
      "Pricing and promotions",
      "Performance and service metrics",
      "Returns and guest messages",
    ],
    outcomes: [
      { title: "Listings that pass Target’s standards", detail: "Clean data that goes live faster." },
      { title: "Strong partner metrics", detail: "On-time shipping and fast replies." },
      { title: "More sales from Target shoppers", detail: "Content written to convert on Target.com." },
    ],
  },
  "home-depot": {
    title: ["The Home Depot,", "minus the heavy lifting."],
    visitUrl: "https://www.homedepot.com",
    tasks: [
      "Item setup and spec data",
      "Product images and documents",
      "Inventory and order sync",
      "Pricing and promotions",
      "Returns and customer questions",
      "Performance metrics",
    ],
    outcomes: [
      { title: "Products found in search and filters", detail: "Complete specs and attributes." },
      { title: "Fewer order issues", detail: "Stock and orders kept in sync." },
      { title: "Higher conversion", detail: "Better images, documents and answers to buyer questions." },
    ],
  },
};

/* ---------- About page ---------- */

export const about = {
  intro:
    "We’re a team of ecommerce professionals from India who have been geeking out over marketplaces, listings, spreadsheets and stores for over 20 years. Yes, we get excited about clean catalogs. No, we’re not sorry.",
  quote: "We’d rather work with honest, kind people than chase multi-million deals.",
  quoteBody:
    "Making money is good, and we like it as much as anyone. But building real relationships, learning about each other’s cultures, treating each other with respect and helping people grow? That’s what keeps us doing this.",
  beliefs: [
    {
      title: "People over paychecks",
      detail: "We pick clients we like working with. Kindness and honesty matter more to us than the size of the deal.",
    },
    {
      title: "Relationships, not transactions",
      detail: "Most of our clients stay for years. We’d rather grow with you than sell to you.",
    },
    {
      title: "Respect across cultures",
      detail: "We work with founders all over the world, and we love learning how other people live, sell and celebrate.",
    },
    {
      title: "Grow together",
      detail: "Your growth, our team’s growth, the people around us. If we’re winning, everyone should be.",
    },
  ],
  whoWeAre:
    "Our team is based in India and works across time zones, so your store keeps moving while you sleep. Between us we’ve run listings, catalogs, ads, orders and websites for brands of every size, from first-time sellers to established names.",
  whoWeArePoints: [
    "Over 20 years of ecommerce experience",
    "Ecommerce professionals, not generalists",
    "Working in US, UK, EU and IST hours",
  ],
  standFor: "We proudly support both, and we love working with founders who do too.",
  sayHi:
    "We love meeting people from all over the world. Even if you’re not ready to hire, drop us a note. We’re always up for a good ecommerce chat.",
};
