import Link from "next/link";
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
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div className="max-w-sm">
            <Link href="/" aria-label="Elistohub home" className="inline-flex rounded-xl">
              <Logo tone="dark" />
            </Link>
            <p className="mt-5 leading-relaxed">
              Elistohub is your ecommerce growth and support partner: one senior team behind your marketplaces,
              operations, marketing, AI and websites, so your brand can scale with confidence, anywhere in the world.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-[1.25fr_0.8fr_1.1fr_1.3fr]">
            {footerColumns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <p className="mb-4 font-semibold text-white">{col.title}</p>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="transition-colors hover:text-sun">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
            <div>
              <p className="mb-4 font-semibold text-white">Say hi</p>
              <ul className="flex flex-col gap-2.5">
                <li className="flex items-center gap-2">
                  <Icon name="pin" size={16} className="shrink-0 text-mint" />
                  {siteConfig.location}
                </li>
                <li>
                  <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2 [overflow-wrap:anywhere] transition-colors hover:text-sun">
                    <Icon name="mail" size={16} className="shrink-0 text-mint" />
                    {siteConfig.email}
                  </a>
                </li>
                <li>
                  <Link href="/#faq" className="transition-colors hover:text-sun">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="transition-colors hover:text-sun">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
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
            © {siteConfig.copyrightYear} {siteConfig.name}
          </p>
          <p className="flex gap-6">
            <Link href="/privacy" className="transition-colors hover:text-sun">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-sun">
              Terms
            </Link>
          </p>
        </div>
      </Container>
    </footer>
  );
}
