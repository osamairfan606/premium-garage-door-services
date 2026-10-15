import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, m } from 'framer-motion';
import { ArrowRight, ArrowLeftRight, ChevronDown, Clock3, Menu, Phone } from 'lucide-react';
import Logo from './Logo';
import CallChooser from './CallChooser';
import MobileMenu from './MobileMenu';
import { useActiveLocation } from '../../hooks/useActiveLocation';
import { useScrolled } from '../../hooks/useScrolled';
import { otherLocation, type Location } from '../../config/locations';
import { locationsMenu, primaryNav, serviceLinks, servicesMenu } from '../../config/navigation';
import { site } from '../../config/site';
import { cn } from '../../lib/cn';

function AnnouncementBar({ location }: { location?: Location }) {
  if (!site.offers24x7Emergency) return null;
  return (
    <div className="border-b border-white/5 bg-ink-900 text-[13px] text-white/75">
      <div className="container flex h-9 items-center justify-center gap-3 sm:justify-between">
        <p className="flex items-center gap-2">
          <Clock3 className="h-3.5 w-3.5 text-gold-300" aria-hidden="true" />
          <span>
            <span className="font-semibold text-white">24/7 emergency garage door service</span>
            <span className="hidden sm:inline"> · Same-day service whenever possible · Free onsite estimates</span>
          </span>
        </p>
        <AnimatePresence mode="wait" initial={false}>
          <m.p key={location?.id ?? 'all'} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }} className="hidden items-center gap-4 sm:flex">
            {location ? (
              <a href={location.phoneHref} data-location={location.id} className="font-semibold text-gold-200 tabular-nums transition hover:text-white">
                {location.city}: {location.phoneDisplay}
              </a>
            ) : (
              locationsMenu.map(({ location: l }) => (
                <a key={l.id} href={l.phoneHref} data-location={l.id} className="tabular-nums transition hover:text-white">
                  <span className="text-white/50">{l.city}</span> <span className="font-semibold text-gold-200">{l.phoneDisplay}</span>
                </a>
              ))
            )}
          </m.p>
        </AnimatePresence>
      </div>
    </div>
  );
}

function NavDropdown({ label, active, children, panelClassName }: { label: string; active: boolean; children: ReactNode; panelClassName?: string }) {
  const [open, setOpen] = useState(false);
  const timer = useRef<number>();
  // True when the panel was opened by mouse hover, so the click that follows does not immediately close it.
  const hoverOpened = useRef(false);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        ref.current?.querySelector('button')?.focus();
      }
    };
    const onDown = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onDown);
    };
  }, [open]);

  const enter = () => {
    window.clearTimeout(timer.current);
    if (!open) hoverOpened.current = true;
    setOpen(true);
  };
  const leave = () => {
    timer.current = window.setTimeout(() => {
      hoverOpened.current = false;
      setOpen(false);
    }, 140);
  };

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={enter}
      onMouseLeave={leave}
      onBlur={e => !e.currentTarget.contains(e.relatedTarget as Node) && setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => {
          if (hoverOpened.current) {
            hoverOpened.current = false;
            return;
          }
          setOpen(o => !o);
        }}
        className={cn('flex items-center gap-1 rounded px-3 py-2 text-[14px] font-medium transition-colors', active || open ? 'text-gold-200' : 'text-white/80 hover:text-white')}
      >
        {label}
        <ChevronDown className={cn('h-3.5 w-3.5 transition-transform duration-300', open && 'rotate-180')} aria-hidden="true" />
      </button>
      <AnimatePresence>
        {open && (
          <m.div
            id={id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className={cn('absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3', panelClassName)}
          >
            <div className="overflow-hidden rounded-xl border border-white/10 bg-ink-800/[0.98] shadow-2xl backdrop-blur-xl">{children}</div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const navItem = ({ isActive }: { isActive: boolean }) =>
  cn('relative rounded px-3 py-2 text-[14px] font-medium transition-colors', isActive ? 'text-gold-200' : 'text-white/80 hover:text-white');

export default function Header() {
  const location = useActiveLocation();
  const { pathname } = useLocation();
  const scrolled = useScrolled(40);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => setMenuOpen(false), [pathname]);

  // Equivalent page in the other city (used by the location switcher).
  const switchTo = location ? pathname.replace(`/locations/${location.id}`, `/locations/${otherLocation(location.id).id}`) : '/';

  return (
    <>
      <header className="on-dark fixed inset-x-0 top-0 z-40">
        <div className={cn('grid transition-[grid-template-rows] duration-500 ease-out', scrolled ? 'grid-rows-[0fr]' : 'grid-rows-[1fr]')}>
          <div className="overflow-hidden">
            <AnnouncementBar location={location} />
          </div>
        </div>
        <div
          className={cn(
            'border-b transition-all duration-500',
            scrolled ? 'border-white/10 bg-ink-900/90 shadow-[0_10px_30px_-15px_rgba(0,0,0,.6)] backdrop-blur-xl' : 'border-transparent bg-gradient-to-b from-ink-900/70 to-transparent',
          )}
        >
          <div className={cn('container flex items-center justify-between gap-4 transition-all duration-500', scrolled ? 'h-[68px]' : 'h-[80px]')}>
            <Logo className={cn('transition-all duration-500', scrolled ? 'h-10' : 'h-12')} />

            <nav aria-label="Primary" className="hidden items-center lg:flex">
              <NavLink to="/" end className={p => cn(navItem(p), 'hidden xl:block')}>{primaryNav.home.label}</NavLink>
              <NavLink to={primaryNav.about.to} className={navItem}>{primaryNav.about.label}</NavLink>
              <NavDropdown label="Services" active={pathname.startsWith('/services')} panelClassName="w-[min(760px,92vw)]">
                <div className="grid grid-cols-[1fr_1.35fr]">
                  <div className="border-r border-white/10 bg-white/[0.02] p-4">
                    {servicesMenu.map(s => (
                      <Link key={s.to} to={s.to} className="group/item block rounded-lg p-3 transition hover:bg-white/5">
                        <span className="flex items-center justify-between font-semibold text-white">
                          {s.label}
                          <ArrowRight className="h-4 w-4 -translate-x-1 text-gold-300 opacity-0 transition group-hover/item:translate-x-0 group-hover/item:opacity-100" aria-hidden="true" />
                        </span>
                        <span className="mt-0.5 block text-[13px] text-white/55">{s.description}</span>
                      </Link>
                    ))}
                  </div>
                  <div className="p-4">
                    <p className="px-3 pb-2 pt-1 text-[11px] font-semibold uppercase tracking-eyebrow text-white/40">Popular services</p>
                    <ul className="grid grid-cols-1 gap-0.5">
                      {serviceLinks.map(s => (
                        <li key={s.to}>
                          <Link to={s.to} className="block rounded-md px-3 py-2 text-[14px] text-white/80 transition hover:bg-white/5 hover:text-gold-200">{s.label}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </NavDropdown>
              <NavLink to={primaryNav.residential.to} className={cn(navItem({ isActive: pathname === primaryNav.residential.to }), 'hidden xl:block')}>{primaryNav.residential.label}</NavLink>
              <NavLink to={primaryNav.commercial.to} className={cn(navItem({ isActive: pathname === primaryNav.commercial.to }), 'hidden xl:block')}>{primaryNav.commercial.label}</NavLink>
              <NavDropdown label="Locations" active={pathname.startsWith('/locations')} panelClassName="w-[min(560px,92vw)]">
                <div className="grid grid-cols-2 divide-x divide-white/10">
                  {locationsMenu.map(({ location: l, links }) => (
                    <div key={l.id} className="p-5">
                      <p className="font-display text-lg font-semibold text-white">{l.label}</p>
                      <a href={l.phoneHref} data-location={l.id} className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-300 tabular-nums hover:text-gold-200">
                        <Phone className="h-3.5 w-3.5" aria-hidden="true" /> {l.phoneDisplay}
                      </a>
                      <ul className="mt-4 space-y-0.5">
                        {links.map(link => (
                          <li key={link.to}>
                            <Link to={link.to} className="-mx-2 block rounded-md px-2 py-1.5 text-[14px] text-white/75 transition hover:bg-white/5 hover:text-white">{link.label}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </NavDropdown>
              <NavLink to={primaryNav.offers.to} className={navItem}>{primaryNav.offers.label}</NavLink>
              <NavLink to={primaryNav.faqs.to} className={navItem}>{primaryNav.faqs.label}</NavLink>
              <NavLink to={primaryNav.contact.to} className={navItem}>{primaryNav.contact.label}</NavLink>
            </nav>

            <div className="flex items-center gap-2">
              {location ? (
                <div className="hidden items-center gap-3 sm:flex">
                  <Link to={switchTo} className="hidden items-center gap-1.5 text-[12px] text-white/55 transition hover:text-white 2xl:flex" title={`Switch to ${otherLocation(location.id).label}`}>
                    <ArrowLeftRight className="h-3.5 w-3.5" aria-hidden="true" />
                    {otherLocation(location.id).city}
                  </Link>
                  <AnimatePresence mode="wait">
                    <m.a
                      key={location.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      href={location.phoneHref}
                      data-location={location.id}
                      className="group relative inline-flex h-11 items-center gap-2.5 overflow-hidden rounded-md bg-gold-400 px-4 text-sm font-semibold text-ink-900 shadow-gold transition hover:bg-gold-300"
                      aria-label={`Call ${location.city}: ${location.phoneDisplay}`}
                    >
                      <Phone className="h-4 w-4" aria-hidden="true" />
                      <span className="flex flex-col leading-none">
                        <span className="text-[10px] font-semibold uppercase tracking-wider opacity-70">Call {location.city}</span>
                        <span className="tabular-nums">{location.phoneDisplay}</span>
                      </span>
                    </m.a>
                  </AnimatePresence>
                </div>
              ) : (
                <CallChooser className="hidden sm:block" />
              )}
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                className="grid h-11 w-11 place-items-center rounded-md border border-white/15 text-white transition hover:border-gold-300 hover:text-gold-200 lg:hidden"
              >
                <Menu className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} location={location} />
    </>
  );
}
