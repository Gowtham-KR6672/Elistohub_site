import { fileURLToPath, URL } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv, type Plugin } from "vite";
import { devContactApi } from "./server/dev-contact.ts";

// Live pages for sitemap.xml (keep in sync with livePaths in src/lib/site.ts)
const ROUTES = [
  "/",
  "/marketplace-management",
  "/order-processing",
  "/paid-ads",
  "/ai-automation",
  "/website-development",
  "/marketing",
  "/virtual-assistant",
  "/our-process",
  "/contact",
];

/** Writes robots.txt and sitemap.xml into the build, using VITE_SITE_URL. */
function seoFiles(siteUrl: string): Plugin {
  return {
    name: "elistohub-seo-files",
    apply: "build",
    generateBundle() {
      const robots = ["User-agent: *", "Allow: /"];
      if (siteUrl) robots.push(`Sitemap: ${siteUrl}/sitemap.xml`);
      this.emitFile({ type: "asset", fileName: "robots.txt", source: `${robots.join("\n")}\n` });

      if (!siteUrl) return;
      const urls = ROUTES.map((route) => `  <url><loc>${siteUrl}${route === "/" ? "/" : route}</loc></url>`).join("\n");
      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const siteUrl = (env.VITE_SITE_URL ?? "").replace(/\/$/, "");

  return {
    plugins: [react(), tailwindcss(), seoFiles(siteUrl), devContactApi(env)],
    resolve: {
      alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
    },
    server: { port: 3000 },
    preview: { port: 3000 },
  };
});
