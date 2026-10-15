import { useId, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, m } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';
import { locationList, type LocationId } from '../../config/locations';
import { cn } from '../../lib/cn';

/**
 * Tabbed Chicago / Indianapolis selector for general pages. Each tab shows only
 * that city's phone number and links to its location-specific pages.
 */
export default function LocationSwitcher({ segment, dark = true }: { segment?: 'residential' | 'commercial'; dark?: boolean }) {
  const [active, setActive] = useState<LocationId>('chicago');
  const loc = locationList.find(l => l.id === active)!;
  const uid = useId();
  const pagePath = `/locations/${loc.id}${segment ? `/${segment}` : ''}`;

  return (
    <div className={cn('rounded-lg border p-2', dark ? 'on-dark border-white/10 bg-ink-800/80 backdrop-blur-xl' : 'border-stone-200 bg-white shadow-card')}>
      <div role="tablist" aria-label="Choose your location" className={cn('relative grid grid-cols-2 rounded-md p-1', dark ? 'bg-ink-900/60' : 'bg-stone-100')}>
        <span aria-hidden="true" className={cn('absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded bg-gold-400 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)]', active === 'indianapolis' && 'translate-x-full')} />
        {locationList.map(l => {
          const selected = l.id === active;
          return (
            <button
              key={l.id}
              role="tab"
              type="button"
              id={`${uid}-tab-${l.id}`}
              aria-selected={selected}
              aria-controls={`${uid}-panel-${l.id}`}
              onClick={() => setActive(l.id)}
              className={cn('relative z-10 rounded px-3 py-2.5 text-sm font-semibold transition-colors', selected ? 'text-ink-900' : dark ? 'text-white/70 hover:text-white' : 'text-stone-600 hover:text-ink-900')}
            >
                            {l.label}
            </button>
          );
        })}
      </div>
      <AnimatePresence mode="wait">
        <m.div
          key={loc.id}
          id={`${uid}-panel-${loc.id}`}
          role="tabpanel"
          aria-labelledby={`${uid}-tab-${loc.id}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="p-5"
        >
          <p className={cn('text-[11px] font-semibold uppercase tracking-eyebrow', dark ? 'text-white/50' : 'text-stone-500')}>{loc.city} · Open 24/7</p>
          <a href={loc.phoneHref} data-location={loc.id} className={cn('mt-2 flex items-center gap-3 font-display text-3xl font-semibold tabular-nums transition', dark ? 'text-white hover:text-gold-200' : 'text-ink-900 hover:text-gold-600')} aria-label={`Call ${loc.city}: ${loc.phoneDisplay}`}>
            <Phone className="h-6 w-6 text-gold-400" aria-hidden="true" /> {loc.phoneDisplay}
          </a>
          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            <a href={loc.phoneHref} data-location={loc.id} className="flex items-center justify-center gap-2 rounded-md bg-gold-400 px-4 py-3 text-sm font-semibold text-ink-900 transition hover:bg-gold-300">
              <Phone className="h-4 w-4" aria-hidden="true" /> Call {loc.city}
            </a>
            <Link to={pagePath} className={cn('flex items-center justify-center gap-2 rounded-md border px-4 py-3 text-sm font-semibold transition', dark ? 'border-white/15 text-white hover:border-gold-300' : 'border-stone-300 text-ink-900 hover:border-ink-900')}>
              {loc.city} {segment ?? 'services'} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </m.div>
      </AnimatePresence>
    </div>
  );
}
