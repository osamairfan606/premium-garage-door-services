import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AnimatePresence, m } from 'framer-motion';
import { ChevronDown, Phone, X } from 'lucide-react';
import Logo from './Logo';
import { locationList, type Location } from '../../config/locations';
import { locationsMenu, primaryNav, serviceLinks, servicesMenu } from '../../config/navigation';
import { cn } from '../../lib/cn';

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button type="button" aria-expanded={open} onClick={() => setOpen(o => !o)} className="flex w-full items-center justify-between py-4 text-left text-lg font-semibold text-white">
        {label}
        <ChevronDown className={cn('h-5 w-5 text-gold-300 transition-transform duration-300', open && 'rotate-180')} aria-hidden="true" />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <m.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
            <div className="pb-4">{children}</div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const linkCls = ({ isActive }: { isActive: boolean }) => cn('block border-b border-white/10 py-4 text-lg font-semibold transition', isActive ? 'text-gold-200' : 'text-white');
const subLinkCls = 'block rounded-md px-3 py-2 text-[15px] text-white/70 transition hover:bg-white/5 hover:text-white';

export default function MobileMenu({ open, onClose, location }: { open: boolean; onClose: () => void; location?: Location }) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const t = window.setTimeout(() => panelRef.current?.querySelector<HTMLElement>('button, a')?.focus(), 50);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      // Simple focus trap
      if (e.key === 'Tab' && panelRef.current) {
        const f = panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
      window.clearTimeout(t);
    };
  }, [open, onClose]);

  const callLocations = location ? [location] : locationList;

  return (
    <AnimatePresence>
      {open && (
        <div className="on-dark fixed inset-0 z-50 lg:hidden">
          <m.div className="absolute inset-0 bg-black/60 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} aria-hidden="true" />
          <m.div
            id="mobile-menu"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="panel-lines absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-ink-900 shadow-2xl"
          >
            <div className="flex h-20 items-center justify-between border-b border-white/10 px-5">
              <Logo className="h-11" onClick={onClose} />
              <button type="button" onClick={onClose} aria-label="Close menu" className="grid h-11 w-11 place-items-center rounded-md border border-white/15 text-white hover:border-gold-300">
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <m.nav
              aria-label="Mobile"
              className="flex-1 overflow-y-auto px-5"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04, delayChildren: 0.15 } } }}
            >
              {[
                <NavLink key="home" to="/" end className={linkCls} onClick={onClose}>{primaryNav.home.label}</NavLink>,
                <NavLink key="about" to={primaryNav.about.to} className={linkCls} onClick={onClose}>{primaryNav.about.label}</NavLink>,
                <Group key="services" label="Services">
                  {servicesMenu.map(s => <Link key={s.to} to={s.to} className={cn(subLinkCls, 'font-semibold text-white')} onClick={onClose}>{s.label}</Link>)}
                  <div className="my-2 h-px bg-white/10" />
                  {serviceLinks.map(s => <Link key={s.to} to={s.to} className={subLinkCls} onClick={onClose}>{s.label}</Link>)}
                </Group>,
                <NavLink key="res" to={primaryNav.residential.to} className={linkCls} onClick={onClose}>{primaryNav.residential.label}</NavLink>,
                <NavLink key="com" to={primaryNav.commercial.to} className={linkCls} onClick={onClose}>{primaryNav.commercial.label}</NavLink>,
                <Group key="locations" label="Locations">
                  {locationsMenu.map(({ location: l, links }) => (
                    <div key={l.id} className="mb-3">
                      <p className="px-3 pt-2 text-[11px] font-semibold uppercase tracking-eyebrow text-gold-300">{l.label}</p>
                      {links.map(link => <Link key={link.to} to={link.to} className={subLinkCls} onClick={onClose}>{link.label}</Link>)}
                    </div>
                  ))}
                </Group>,
                <NavLink key="blog" to={primaryNav.blog.to} className={linkCls} onClick={onClose}>{primaryNav.blog.label}</NavLink>,
                <NavLink key="faqs" to={primaryNav.faqs.to} className={linkCls} onClick={onClose}>{primaryNav.faqs.label}</NavLink>,
                <NavLink key="contact" to={primaryNav.contact.to} className={linkCls} onClick={onClose}>{primaryNav.contact.label}</NavLink>,
              ].map((el, i) => (
                <m.div key={i} variants={{ hidden: { opacity: 0, x: 24 }, show: { opacity: 1, x: 0 } }}>
                  {el}
                </m.div>
              ))}
            </m.nav>
            <div className="space-y-2 border-t border-white/10 bg-ink-800 p-5 pb-safe">
              <p className="text-[11px] font-semibold uppercase tracking-eyebrow text-white/50">{location ? `Call ${location.city}` : 'Call your local team · 24/7'}</p>
              {callLocations.map(l => (
                <a key={l.id} href={l.phoneHref} data-location={l.id} className="flex items-center justify-between rounded-md bg-gold-400 px-4 py-3 font-semibold text-ink-900 transition hover:bg-gold-300">
                  <span className="text-sm">{l.label}</span>
                  <span className="flex items-center gap-2 tabular-nums">
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    {l.phoneDisplay}
                  </span>
                </a>
              ))}
              <Link to={location ? `/contact?location=${location.id}` : '/contact'} onClick={onClose} className="block rounded-md border border-white/15 px-4 py-3 text-center font-semibold text-white transition hover:border-gold-300">
                Request a Free Estimate
              </Link>
            </div>
          </m.div>
        </div>
      )}
    </AnimatePresence>
  );
}
