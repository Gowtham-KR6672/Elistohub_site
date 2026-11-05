import { useEffect, useId, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { Link, useLocation } from "react-router";
import { Icon } from "@/components/icons";
import { Logo } from "@/components/logo";
import { ButtonLink } from "@/components/ui";
import { cn } from "@/lib/cn";
import { announcement } from "@/lib/content";
import { mainNav, servicePages, type NavItem } from "@/lib/site";

export function AnnouncementBar() {
  return (
    <div className="bg-sun text-deep">
      <div className="page-container flex items-center justify-center gap-x-6 gap-y-1 py-2.5 text-[13px] font-semibold sm:text-sm">
        {announcement.map((item, i) => (
          <span key={item} className={cn("items-center gap-6", i === 0 ? "inline-flex" : "hidden sm:inline-flex")}>
            {i > 0 ? <Icon name="bag" size={15} strokeWidth={2.2} className="opacity-70" /> : null}
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

const servicePaths = new Set(servicePages.map((page) => page.path));

/** Desktop "Services" menu: opens on hover or click, closes on Escape, outside click or navigation. */
function ServicesMenu({ item, active }: { item: NavItem; active: boolean }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const panelId = useId();
  const { pathname, hash } = useLocation();

  // Close after any navigation (React's "adjust state while rendering" pattern).
  const location = pathname + hash;
  const [seenLocation, setSeenLocation] = useState(location);
  if (location !== seenLocation) {
    setSeenLocation(location);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Hover-to-open is for real mice only (touch taps also fire "enter" events).
  // A click right after hover opened the menu keeps it open instead of toggling it shut.
  const hoverOpenedAt = useRef(0);

  const onPointerEnter = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    window.clearTimeout(closeTimer.current);
    hoverOpenedAt.current = performance.now();
    setOpen(true);
  };
  const onPointerLeave = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(false), 140);
  };
  const onButtonClick = () => {
    if (performance.now() - hoverOpenedAt.current < 600) {
      setOpen(true);
      return;
    }
    setOpen((v) => !v);
  };

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onButtonClick}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-[15px] font-medium whitespace-nowrap transition-colors hover:bg-tint hover:text-deep",
          active || open ? "bg-tint text-deep" : "text-ink/80",
        )}
      >
        {item.label}
        <Icon name="chevron" size={16} strokeWidth={2.2} className={cn("transition-transform duration-200", open && "rotate-180")} />
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="animate-menu-in absolute top-full left-1/2 z-50 w-[680px] -translate-x-1/2 pt-3"
      >
        <div className="overflow-hidden rounded-[28px] border border-line bg-white p-3 shadow-[0_40px_80px_-30px_rgba(10,74,48,0.45)]">
          <ul className="grid grid-cols-2 gap-1">
            {item.children?.map((page) => (
              <li key={page.slug}>
                <Link
                  to={page.path}
                  aria-current={pathname === page.path ? "page" : undefined}
                  className={cn(
                    "group flex items-center gap-3.5 rounded-2xl p-3 transition-colors hover:bg-tint",
                    pathname === page.path && "bg-tint",
                  )}
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-tint text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                    <Icon name={page.icon} size={21} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[15px] font-semibold text-deep">{page.name}</span>
                    <span className="block truncate text-[13px] text-muted">{page.short}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-2 flex items-center justify-between gap-4 rounded-2xl bg-off px-4 py-3">
            <p className="text-sm text-muted">Most clients hand us two or three services.</p>
            <Link to={item.href} className="group inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
              See all services
              <Icon name="arrow" size={15} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const { pathname, hash } = useLocation();
  const isActive = (href: string) => pathname === href;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu after any navigation (React's "adjust state while rendering" pattern).
  const location = pathname + hash;
  const [seenLocation, setSeenLocation] = useState(location);
  if (location !== seenLocation) {
    setSeenLocation(location);
    setOpen(false);
  }

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
        <Link to="/" aria-label="Elistohub home" className="rounded-xl" onClick={close}>
          <Logo />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-0.5 xl:flex">
          {mainNav.map((item) =>
            item.children ? (
              <ServicesMenu key={item.label} item={item} active={servicePaths.has(pathname)} />
            ) : (
              <Link
                key={item.href}
                to={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "rounded-full px-4 py-2.5 text-[15px] font-medium whitespace-nowrap transition-colors hover:bg-tint hover:text-deep",
                  isActive(item.href) ? "bg-tint text-deep" : "text-ink/80",
                )}
              >
                {item.label}
              </Link>
            ),
          )}
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
            className="animate-menu-in header-pill mt-2 max-h-[calc(100dvh-136px)] overflow-y-auto overscroll-contain rounded-[28px] border border-line bg-white p-3 shadow-[0_30px_60px_-30px_rgba(10,74,48,0.5)] xl:hidden"
          >
            <ul className="flex flex-col">
              {mainNav.map((item, i) =>
                item.children ? (
                  <li key={item.label}>
                    <button
                      type="button"
                      aria-expanded={servicesOpen}
                      aria-controls="mobile-services"
                      onClick={() => setServicesOpen((v) => !v)}
                      className={cn(
                        "flex min-h-14 w-full items-center justify-between rounded-2xl px-4 text-left font-display text-xl font-bold text-deep transition-colors hover:bg-tint",
                        (servicesOpen || servicePaths.has(pathname)) && "bg-tint",
                      )}
                    >
                      {item.label}
                      <Icon
                        name="chevron"
                        size={20}
                        strokeWidth={2.4}
                        className={cn("text-brand transition-transform duration-200", servicesOpen && "rotate-180")}
                      />
                    </button>
                    <ul id="mobile-services" hidden={!servicesOpen} className="mt-1 mb-2 flex flex-col gap-0.5 pl-3">
                      {item.children.map((page) => (
                        <li key={page.slug}>
                          <Link
                            to={page.path}
                            onClick={close}
                            aria-current={isActive(page.path) ? "page" : undefined}
                            className={cn(
                              "flex min-h-12 items-center gap-3 rounded-xl px-3 text-[16px] font-semibold text-deep transition-colors hover:bg-tint",
                              isActive(page.path) && "bg-tint",
                            )}
                          >
                            <Icon name={page.icon} size={19} className="shrink-0 text-brand" />
                            {page.name}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <Link
                          to={item.href}
                          onClick={close}
                          className="flex min-h-12 items-center gap-2 rounded-xl px-3 text-[15px] font-semibold text-brand hover:bg-tint"
                        >
                          See all services
                          <Icon name="arrow" size={16} />
                        </Link>
                      </li>
                    </ul>
                  </li>
                ) : (
                  <li key={item.href}>
                    <Link
                      to={item.href}
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
                ),
              )}
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
