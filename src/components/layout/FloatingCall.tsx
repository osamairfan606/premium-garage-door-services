import { Link } from 'react-router-dom';
import { AnimatePresence, m } from 'framer-motion';
import { CalendarCheck, Phone } from 'lucide-react';
import CallChooser from './CallChooser';
import { useActiveLocation } from '../../hooks/useActiveLocation';
import { useScrolled } from '../../hooks/useScrolled';
import { locationList } from '../../config/locations';

/**
 * Mobile: sticky bottom call bar (always visible).
 * Desktop: floating call button that appears after scrolling.
 * On location pages it dials that location only; elsewhere the visitor chooses a city.
 */
export default function FloatingCall() {
  const location = useActiveLocation();
  const show = useScrolled(560);

  return (
    <>
      {/* Mobile bar */}
      <div className="on-dark fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-ink-900/95 backdrop-blur-lg pb-safe lg:hidden">
        <AnimatePresence mode="wait" initial={false}>
          <m.div key={location?.id ?? 'all'} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} className="flex gap-2 p-2.5">
            {location ? (
              <>
                <a href={location.phoneHref} data-location={location.id} className="flex flex-1 items-center justify-center gap-2 rounded-md bg-gold-400 py-3 font-semibold text-ink-900" aria-label={`Call ${location.city}: ${location.phoneDisplay}`}>
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  <span className="tabular-nums">{location.phoneDisplay}</span>
                </a>
                <Link to={`/contact?location=${location.id}`} className="flex items-center justify-center gap-2 rounded-md border border-white/15 px-4 py-3 text-sm font-semibold text-white">
                  <CalendarCheck className="h-4 w-4" aria-hidden="true" /> Estimate
                </Link>
              </>
            ) : (
              locationList.map(l => (
                <a key={l.id} href={l.phoneHref} data-location={l.id} className="flex flex-1 flex-col items-center justify-center rounded-md bg-gold-400 py-2 text-ink-900" aria-label={`Call ${l.city}: ${l.phoneDisplay}`}>
                  <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider opacity-75">
                    <Phone className="h-3 w-3" aria-hidden="true" /> {l.city}
                  </span>
                  <span className="text-[15px] font-semibold tabular-nums">{l.phoneDisplay}</span>
                </a>
              ))
            )}
          </m.div>
        </AnimatePresence>
      </div>

      {/* Desktop floating button */}
      <AnimatePresence>
        {show && (
          <m.div initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.9 }} className="on-dark fixed bottom-6 right-6 z-30 hidden lg:block">
            {location ? (
              <a href={location.phoneHref} data-location={location.id} className="group flex items-center gap-3 rounded-full bg-gold-400 py-2 pl-2 pr-5 font-semibold text-ink-900 shadow-gold transition hover:bg-gold-300" aria-label={`Call ${location.city}: ${location.phoneDisplay}`}>
                <span className="relative grid h-10 w-10 place-items-center rounded-full bg-ink-900 text-gold-300">
                  <span className="absolute inset-0 animate-pulse-ring rounded-full bg-gold-400/50" aria-hidden="true" />
                  <Phone className="relative h-4 w-4" aria-hidden="true" />
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="text-[10px] font-bold uppercase tracking-wider opacity-70">{location.city} · 24/7</span>
                  <span className="tabular-nums">{location.phoneDisplay}</span>
                </span>
              </a>
            ) : (
              <CallChooser direction="up" buttonClassName="h-12 rounded-full px-6" label="Call 24/7" />
            )}
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
