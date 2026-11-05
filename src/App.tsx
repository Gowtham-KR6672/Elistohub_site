import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import { ComingSoon } from "@/components/coming-soon";
import { Footer } from "@/components/footer";
import { AnnouncementBar, Header } from "@/components/header";
import { comingSoonPages, type ComingSoonSlug } from "@/lib/site";
import ContactPage from "@/pages/contact";
import HomePage from "@/pages/home";
import NotFoundPage from "@/pages/not-found";

/** Scrolls to `#section` links (e.g. /#services) and to the top on page changes. */
function ScrollManager() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (target) {
        target.scrollIntoView({ block: "start" });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash, key]);

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
            <Route path="/contact" element={<ContactPage />} />
            {comingSoonSlugs.map((slug) => (
              <Route key={slug} path={`/${slug}`} element={<ComingSoon slug={slug} />} />
            ))}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
