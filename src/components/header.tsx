import { useCallback, useEffect, useId, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
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

/** Icon tile (services) or two-letter code badge (marketplaces) for a menu item. */
function MenuMark({ link, small = false }: { link: MenuLink; small?: boolean }) {
  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center rounded-xl transition-colors duration-200",
        link.code
          ? "bg-sun-tint font-display font-extrabold text-gold group-hover:bg-deep group-hover:text-sun"
          : "bg-tint text-brand group-hover:bg-brand group-hover:text-white",
        small ? "size-8 text-[11px]" : "size-10 text-[12px]",
      )}
    >
      {link.code ?? (link.icon ? <Icon name={link.icon} size={small ? 17 : 20} /> : null)}
    </span>
  );
}

/** Desktop nav item: plain text, with a green bar along the header's bottom edge when active or hovered. */
function navItemClass(active: boolean) {
  return cn(
    "relative inline-flex h-full items-center gap-1 px-3.5 text-[15px] font-medium whitespace-nowrap transition-colors duration-200 hover:text-deep",
    "after:absolute after:inset-x-3.5 after:bottom-0 after:h-[3px] after:rounded-t-full after:bg-brand after:transition-transform after:duration-300",
    active ? "text-deep after:scale-x-100" : "text-ink/70 after:scale-x-0 hover:after:scale-x-100",
  );
}

/**
 * Desktop dropdown. The open state lives in Header so only one menu is open at a time, and both menus open in the
 * same spot (centred under the nav). Opens on hover (mouse) or click; closes on Escape, outside click or navigation.
 */
function NavDropdown({
  item,
  active,
  open,
  onOpenChange,
}: {
  item: NavItem;
  active: boolean;
  open: boolean;
  onOpenChange: (label: string, open: boolean) => void;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const hoverOpenedAt = useRef(0);
  const panelId = useId();
  const { pathname } = useLocation();
  const { label } = item;

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) onOpenChange(label, false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onOpenChange(label, false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, label, onOpenChange]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  // Hover-to-open is for real mice only (touch taps also fire "enter" events).
  // A click right after hover opened the menu keeps it open instead of toggling it shut.
  const onPointerEnter = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    window.clearTimeout(closeTimer.current);
    if (!open) hoverOpenedAt.current = performance.now();
    onOpenChange(label, true);
  };
  const onPointerLeave = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => onOpenChange(label, false), 140);
  };
  const onButtonClick = () => {
    if (performance.now() - hoverOpenedAt.current < 600) {
      onOpenChange(label, true);
      return;
    }
    onOpenChange(label, !open);
  };

  const withCodes = item.children?.some((c) => c.code);

  return (
    <div
      ref={wrapperRef}
      className="flex h-full"
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) onOpenChange(label, false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onButtonClick}
        className={navItemClass(active || open)}
      >
        {label}
        <Icon
          name="chevron"
          size={16}
          strokeWidth={2.2}
          className={cn("opacity-60 transition-transform duration-200", open && "rotate-180 opacity-100")}
        />
      </button>

      {/* Positioned against the nav (not this item); the top padding bridges the gap so hover doesn't drop */}
      <div id={panelId} hidden={!open} className="absolute top-full left-1/2 z-50 -translate-x-1/2 pt-3">
        <div
          className={cn(
            "animate-menu-in flex gap-2 rounded-3xl border border-line bg-white p-2 shadow-[0_32px_80px_-32px_rgba(10,74,48,0.45)]",
            withCodes ? "w-[720px]" : "w-[940px]",
          )}
        >
          <ul className="grid flex-1 grid-cols-2 content-start gap-1 p-1">
            {item.children?.map((link) => {
              const current = pathname === link.path;
              return (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    aria-current={current ? "page" : undefined}
                    className={cn(
                      "group flex gap-3 rounded-2xl p-3 transition-colors duration-200 hover:bg-off",
                      link.short ? "items-start" : "items-center",
                      current && "bg-off",
                    )}
                  >
                    <MenuMark link={link} />
                    <span className="min-w-0 flex-1">
                      <span
                        className={cn(
                          "flex items-center gap-1.5 text-[15px] font-semibold transition-colors group-hover:text-brand",
                          current ? "text-brand" : "text-deep",
                        )}
                      >
                        {link.name}
                        <Icon
                          name="arrow"
                          size={14}
                          strokeWidth={2.4}
                          className="-translate-x-1 opacity-0 transition duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                        />
                      </span>
                      {link.short ? (
                        <span className="mt-0.5 block text-[13px] leading-snug text-muted">{link.short}</span>
                      ) : null}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {item.allLink ? (
            <div className="relative isolate flex w-[216px] shrink-0 flex-col justify-between overflow-hidden rounded-2xl bg-deep p-5">
              <div aria-hidden="true" className="absolute -top-14 -right-14 -z-10 size-44 rounded-full bg-fresh/35 blur-2xl" />
              <div aria-hidden="true" className="absolute -bottom-16 -left-10 -z-10 size-36 rounded-full bg-sun/15 blur-2xl" />
              <p className="font-display text-[19px] leading-snug font-bold text-white">{item.allLink.note}</p>
              <Link
                to={item.allLink.href}
                className="group/all mt-8 inline-flex items-center justify-center gap-1.5 rounded-full bg-sun px-4 py-2.5 text-sm font-semibold text-deep transition-colors hover:bg-white"
              >
                {item.allLink.label}
                <Icon name="arrow" size={15} className="transition-transform group-hover/all:translate-x-0.5" />
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
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const { pathname, hash } = useLocation();
  // Closing only applies if that menu is still the open one (a late close timer must not shut the next menu).
  const onMenuChange = useCallback(
    (label: string, next: boolean) => setOpenMenu((cur) => (next ? label : cur === label ? null : cur)),
    [],
  );
  const isActive = (href: string) => pathname === href;
  const groupActive = (item: NavItem) =>
    Boolean(item.children?.some((c) => c.path === pathname)) || pathname === item.href;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menus after any navigation (React's "adjust state while rendering" pattern).
  const location = pathname + hash;
  const [seenLocation, setSeenLocation] = useState(location);
  if (location !== seenLocation) {
    setSeenLocation(location);
    setOpen(false);
    setOpenMenu(null);
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
  const solid = scrolled || open || openMenu !== null;

  return (
    <header className="sticky top-0 z-50">
      {/* Soft dim behind an open desktop menu so the panel stands out from the page */}
      {openMenu ? (
        <div
          aria-hidden="true"
          className="animate-fade-in pointer-events-none fixed inset-0 -z-10 hidden bg-deep/15 backdrop-blur-[2px] xl:block"
        />
      ) : null}

      {/* Full-width bar: blends into the hero at the top of the page, turns solid white once you scroll or open a menu */}
      <div
        className={cn(
          "border-b transition-[background-color,border-color,box-shadow] duration-300",
          solid
            ? "border-line bg-white/95 shadow-[0_12px_32px_-24px_rgba(10,74,48,0.4)] backdrop-blur-xl"
            : "border-transparent bg-transparent",
        )}
      >
        <div className="page-container flex h-[72px] items-center justify-between gap-6 xl:grid xl:grid-cols-[1fr_auto_1fr]">
          <Link to="/" aria-label="Elistohub home" className="justify-self-start rounded-xl" onClick={close}>
            <Logo />
          </Link>

          <nav aria-label="Primary" className="relative hidden h-full items-stretch xl:flex">
            {mainNav.map((item) =>
              item.children ? (
                <NavDropdown
                  key={item.label}
                  item={item}
                  active={groupActive(item)}
                  open={openMenu === item.label}
                  onOpenChange={onMenuChange}
                />
              ) : (
                <Link
                  key={item.href}
                  to={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={navItemClass(isActive(item.href))}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-2 justify-self-end">
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
            className="animate-menu-in absolute inset-x-0 top-full max-h-[calc(100dvh-112px)] overflow-y-auto overscroll-contain border-b border-line bg-white shadow-[0_30px_60px_-30px_rgba(10,74,48,0.5)] xl:hidden"
          >
            <div className="page-container py-3">
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
            </div>
          </nav>
        </>
      ) : null}
    </header>
  );
}
