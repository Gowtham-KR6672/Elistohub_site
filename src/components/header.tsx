"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "@/components/icons";
import { Logo } from "@/components/logo";
import { ButtonLink } from "@/components/ui";
import { cn } from "@/lib/cn";
import { announcement } from "@/lib/content";
import { mainNav } from "@/lib/site";

export function AnnouncementBar() {
  return (
    <div className="bg-sun text-deep">
      <div className="page-container flex items-center justify-center gap-x-6 gap-y-1 py-2.5 text-[13px] font-semibold sm:text-sm">
        {announcement.map((item, i) => (
          <span key={item} className={cn("items-center gap-6", i === 0 ? "inline-flex" : "hidden md:inline-flex")}>
            {i > 0 ? <Icon name="bag" size={15} strokeWidth={2.2} className="opacity-70" /> : null}
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 1280 && setOpen(false);
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="header-shell sticky top-0 z-50 pt-3">
      <div
        className={cn(
          "header-pill flex items-center justify-between gap-4 rounded-full border py-2 pr-2 pl-4 transition-[background-color,box-shadow,border-color] duration-300",
          scrolled || open
            ? "border-line/80 bg-white/85 shadow-[0_16px_40px_-24px_rgba(10,74,48,0.45)] backdrop-blur-xl"
            : "border-transparent bg-transparent",
        )}
      >
        <Link href="/" aria-label="Elistohub home" className="rounded-xl" onClick={close}>
          <Logo />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-0.5 xl:flex">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "rounded-full px-4 py-2.5 text-[15px] font-medium whitespace-nowrap transition-colors hover:bg-tint hover:text-deep",
                isActive(item.href) ? "bg-tint text-deep" : "text-ink/80",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <ButtonLink href="/contact" size="sm" arrow>
              Book a call
            </ButtonLink>
          </div>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-11 place-items-center rounded-full border border-line bg-white text-deep transition-colors hover:bg-tint xl:hidden"
          >
            <Icon name={open ? "close" : "menu"} size={22} strokeWidth={2.2} />
          </button>
        </div>
      </div>

      {open ? (
        <>
          <div
            className="fixed inset-0 top-0 -z-10 bg-deep/30 backdrop-blur-sm xl:hidden"
            aria-hidden="true"
            onClick={close}
          />
          <nav
            id="mobile-menu"
            aria-label="Mobile"
            className="animate-menu-in header-pill mt-2 overflow-hidden rounded-[28px] border border-line bg-white p-3 shadow-[0_30px_60px_-30px_rgba(10,74,48,0.5)] xl:hidden"
          >
            <ul className="flex flex-col">
              {mainNav.map((item, i) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={close}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "flex min-h-14 items-center justify-between rounded-2xl px-4 font-display text-xl font-bold text-deep transition-colors hover:bg-tint",
                      isActive(item.href) && "bg-tint",
                    )}
                  >
                    {item.label}
                    <span className="text-sm font-semibold text-muted/60">0{i + 1}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <ButtonLink href="/contact" onClick={close} size="lg" arrow className="mt-3 w-full">
              Book a call
            </ButtonLink>
          </nav>
        </>
      ) : null}
    </header>
  );
}
