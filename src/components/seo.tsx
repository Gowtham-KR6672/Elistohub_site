import { useEffect } from "react";
import { siteConfig } from "@/lib/site";

function setMeta(attr: "name" | "property", key: string, content: string | null) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (content === null) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href: string | null) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (href === null) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement("link");
    el.rel = "canonical";
    document.head.appendChild(el);
  }
  el.href = href;
}

/** Updates the page title and meta tags in <head> for the current page. */
export function Seo({
  title,
  description = siteConfig.description,
  path = "/",
  noindex = false,
}: {
  title?: string;
  description?: string;
  path?: string;
  noindex?: boolean;
}) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title;
    const url = siteConfig.url ? `${siteConfig.url}${path === "/" ? "" : path}` : null;

    document.title = fullTitle;
    setMeta("name", "description", description);
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", url);
    setMeta("name", "robots", noindex ? "noindex, follow" : null);
    setCanonical(url);
  }, [title, description, path, noindex]);

  return null;
}
