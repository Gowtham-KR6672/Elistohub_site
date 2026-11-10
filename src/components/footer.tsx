import { Link } from "react-router";
import { Icon } from "@/components/icons";
import { Logo } from "@/components/logo";
import { Container } from "@/components/ui";
import { footerColumns } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-deep text-[15px] text-frost/80">
      <div className="bg-grid-dark pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" aria-hidden="true" />
      <Container className="relative pt-20 pb-10">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_2fr]">
          <div className="max-w-sm">
            <Link to="/" aria-label="Elistohub home" className="inline-flex rounded-xl">
              <Logo tone="dark" />
            </Link>
            <p className="mt-5 font-display text-[22px] leading-snug font-bold text-white">{siteConfig.tagline}</p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-5 inline-flex items-center gap-2 font-semibold text-sun transition-colors hover:text-white"
            >
              <Icon name="mail" size={17} />
              {siteConfig.email}
            </a>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3">
            {footerColumns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <p className="mb-4 font-semibold text-white">{col.title}</p>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link to={link.href} className="transition-colors hover:text-sun">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <p
          aria-hidden="true"
          className="pointer-events-none mt-16 select-none text-center font-display text-[clamp(4rem,17vw,15rem)] font-extrabold leading-[0.8] tracking-[-0.06em] text-white/[0.06]"
        >
          Elistohub
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-white/10 pt-6 text-sm">
          <p>
            © {siteConfig.copyrightYear} {siteConfig.name} · {siteConfig.location}
          </p>
          <p className="flex gap-6">
            <Link to="/privacy" className="transition-colors hover:text-sun">
              Privacy
            </Link>
            <Link to="/terms" className="transition-colors hover:text-sun">
              Terms
            </Link>
          </p>
        </div>
      </Container>
    </footer>
  );
}
