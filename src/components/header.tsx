import { useEffect, useId, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { Link, useLocation } from "react-router";
import { Icon } from "@/components/icons";
import { Logo } from "@/components/logo";
import { ButtonLink } from "@/components/ui";
import { cn } from "@/lib/cn";
import { announcement } from "@/lib/content";
import { mainNav, type MenuLink, type NavItem } from "@/lib/site";

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

/** Icon tile or two-letter code badge for a menu item. */
function MenuMark({ link, small = false }: { link: MenuLink; small?: boolean }) {
  if (link.code) {
    return (
      <span
        className={cn(
          "grid shrink-0 place-items-center rounded-xl bg-deep font-display font-extrabold text-sun transition-colors group-hover:bg-brand group-hover:text-white",
          small ? "size-8 text-[11px]" : "size-11 text-[13px]",
        )}
      >
        {link.code}
      </span>
    );
  }
  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center rounded-xl bg-tint text-brand transition-colors group-hover:bg-brand group-hover:text-white",
        small ? "size-8" : "size-11",
      )}
    >
      {link.icon ? <Icon name={link.icon} size={small ? 17 : 21} /> : null}
    </span>
  );
}

/** Desktop dropdown: opens on hover (mouse) or click, closes on Escape, outside click or navigation. */
function NavDropdown({ item, active }: { item: NavItem; active: boolean }) {
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

  const withCodes = item.children?.some((c) => c.code);

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
        className={cn(
          "animate-menu-in absolute top-full left-1/2 z-50 -translate-x-1/2 pt-3",
          withCodes ? "w-[520px]" : "w-[680px]",
        )}
      >
        <div className="overflow-hidden rounded-[28px] border border-line bg-white p-3 shadow-[0_40px_80px_-30px_rgba(10,74,48,0.45)]">
          <ul className="grid grid-cols-2 gap-1">
            {item.children?.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  aria-current={pathname === link.path ? "page" : undefined}
                  className={cn(
                    "group flex items-center gap-3.5 rounded-2xl p-3 transition-colors hover:bg-tint",
                    pathname === link.path && "bg-tint",
                  )}
                >
                  <MenuMark link={link} />
                  <span className="min-w-0">
                    <span className="block text-[15px] font-semibold text-deep">{link.name}</span>
                    {link.short ? <span className="block truncate text-[13px] text-muted">{link.short}</span> : null}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          {item.allLink ? (
            <div className="mt-2 flex items-center justify-between gap-4 rounded-2xl bg-off px-4 py-3">
              <p className="text-sm text-muted">{item.allLink.note}</p>
              <Link to={item.allLink.href} className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brand">
                {item.allLink.label}
                <Icon name="arrow" size={15} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

const dropdownItems = mainNav.filter((item) => item.children);
const companyItems = mainNav.filter((item) => !item.children);

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const { pathname, hash } = useLocation();
  const isActive = (href: string) => pathname === href;
  const groupActive = (item: NavItem) =>
    Boolean(item.children?.some((c) => c.path === pathname)) || pathname === item.href;

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
              <NavDropdown key={item.label} item={item} active={groupActive(item)} />
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
              Book a free call
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
              {dropdownItems.map((item) => {
                const expanded = openGroup === item.label;
                const groupId = `mobile-${item.label.toLowerCase()}`;
                return (
                  <li key={item.label}>
                    <button
                      type="button"
                      aria-expanded={expanded}
                      aria-controls={groupId}
                      onClick={() => setOpenGroup(expanded ? null : item.label)}
                      className={cn(
                        "flex min-h-14 w-full items-center justify-between rounded-2xl px-4 text-left font-display text-xl font-bold text-deep transition-colors hover:bg-tint",
                        (expanded || groupActive(item)) && "bg-tint",
                      )}
                    >
                      {item.label}
                      <Icon
                        name="chevron"
                        size={20}
                        strokeWidth={2.4}
                        className={cn("text-brand transition-transform duration-200", expanded && "rotate-180")}
                      />
                    </button>
                    <ul
                      id={groupId}
                      hidden={!expanded}
                      className={cn("mt-1 mb-2 pl-3", item.children?.some((c) => c.code) ? "grid grid-cols-2 gap-0.5" : "flex flex-col gap-0.5")}
                    >
                      {item.children?.map((link) => (
                        <li key={link.path}>
                          <Link
                            to={link.path}
                            onClick={close}
                            aria-current={isActive(link.path) ? "page" : undefined}
                            className={cn(
                              "group flex min-h-12 items-center gap-3 rounded-xl px-3 text-[15px] font-semibold text-deep transition-colors hover:bg-tint",
                              isActive(link.path) && "bg-tint",
                            )}
                          >
                            <MenuMark link={link} small />
                            {link.name}
                          </Link>
                        </li>
                      ))}
                      {item.allLink ? (
                        <li className="col-span-2">
                          <Link
                            to={item.allLink.href}
                            onClick={close}
                            className="flex min-h-12 items-center gap-2 rounded-xl px-3 text-[15px] font-semibold text-brand hover:bg-tint"
                          >
                            {item.allLink.label}
                            <Icon name="arrow" size={16} />
                          </Link>
                        </li>
                      ) : null}
                    </ul>
                  </li>
                );
              })}
            </ul>

            <p className="mt-3 px-4 text-xs font-bold tracking-[0.12em] text-muted/70 uppercase">Company</p>
            <ul className="mt-1 grid grid-cols-2 gap-0.5">
              {companyItems.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    onClick={close}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "flex min-h-12 items-center rounded-xl px-4 font-display text-lg font-bold text-deep transition-colors hover:bg-tint",
                      isActive(item.href) && "bg-tint",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ButtonLink href="/contact" onClick={close} size="lg" arrow className="mt-3 w-full">
              Book a free call
            </ButtonLink>
          </nav>
        </>
      ) : null}
    </header>
  );
}
