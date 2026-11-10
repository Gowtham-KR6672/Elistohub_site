import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from "react-router";
import { ComingSoon } from "@/components/coming-soon";
import { Footer } from "@/components/footer";
import { AnnouncementBar, Header } from "@/components/header";
import {
  comingSoonPages,
  legacyHashRedirects,
  legacyPathRedirects,
  marketplacePages,
  servicePages,
  type ComingSoonSlug,
} from "@/lib/site";
import AboutPage from "@/pages/about";
import ContactPage from "@/pages/contact";
import HomePage from "@/pages/home";
import MarketplacePage from "@/pages/marketplace-page";
import NotFoundPage from "@/pages/not-found";
import OurProcessPage from "@/pages/our-process";
import ServicePage from "@/pages/services/service-page";
import VirtualAssistantPage from "@/pages/services/virtual-assistant";

/**
 * Scrolls to `#section` links (e.g. /#services) and to the top on page changes.
 * Old home-page anchors that moved to their own pages (e.g. /#ai) are forwarded there.
 */
function ScrollManager() {
  const { pathname, hash, key } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname === "/" && hash && legacyHashRedirects[hash]) {
      navigate(legacyHashRedirects[hash], { replace: true });
      return;
    }
    if (hash) {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (target) {
        target.scrollIntoView({ block: "start" });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash, key, navigate]);

  return null;
}

const comingSoonSlugs = Object.keys(comingSoonPages) as ComingSoonSlug[];

export default function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <div className="flex min-h-dvh flex-col bg-white">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-deep focus:px-5 focus:py-3 focus:text-white"
        >
          Skip to content
        </a>
        <AnnouncementBar />
        <Header />
        <main id="main" className="flex-1 overflow-x-clip">
          <Routes>
            <Route path="/" element={<HomePage />} />
            {servicePages.map((page) => (
              <Route
                key={page.path}
                path={page.path}
                element={
                  page.slug === "virtual-assistant" ? <VirtualAssistantPage /> : <ServicePage key={page.slug} slug={page.slug} />
                }
              />
            ))}
            {marketplacePages.map((m) => (
              <Route key={m.path} path={m.path} element={<MarketplacePage key={m.slug} slug={m.slug} />} />
            ))}
            <Route path="/our-process" element={<OurProcessPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            {comingSoonSlugs.map((slug) => (
              <Route key={slug} path={`/${slug}`} element={<ComingSoon slug={slug} />} />
            ))}
            {Object.entries(legacyPathRedirects).map(([from, to]) => (
              <Route key={from} path={from} element={<Navigate to={to} replace />} />
            ))}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
