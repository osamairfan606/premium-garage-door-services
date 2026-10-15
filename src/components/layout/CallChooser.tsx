import { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { ChevronDown, MapPin, Phone } from 'lucide-react';
import { locationList } from '../../config/locations';
import { cn } from '../../lib/cn';

/**
 * "Call Now" button for general (non-location) pages.
 * Opens a small menu so the visitor picks the correct city line — numbers are never mixed.
 */
export default function CallChooser({ align = 'right', direction = 'down', className, buttonClassName, label = 'Call Now' }: { align?: 'left' | 'right'; direction?: 'up' | 'down'; className?: string; buttonClassName?: string; label?: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className={cn('relative', className)}>
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(o => !o)}
        className={cn(
          'group relative inline-flex h-11 items-center gap-2 overflow-hidden rounded-md bg-gold-400 px-5 text-sm font-semibold text-ink-900 shadow-gold transition hover:bg-gold-300',
          buttonClassName,
        )}
      >
        <span className="relative grid h-5 w-5 place-items-center">
          <span className="absolute inset-0 animate-pulse-ring rounded-full bg-ink-900/25" aria-hidden="true" />
          <Phone className="relative h-4 w-4" aria-hidden="true" />
        </span>
        {label}
        <ChevronDown className={cn('h-4 w-4 transition-transform', open && 'rotate-180')} aria-hidden="true" />
      </button>
      <AnimatePresence>
        {open && (
          <m.div
            id={id}
            initial={{ opacity: 0, y: direction === 'down' ? -8 : 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: direction === 'down' ? -6 : 6, scale: 0.98 }}
            transition={{ duration: 0.22 }}
            className={cn(
              'absolute z-50 w-72 overflow-hidden rounded-lg border border-white/10 bg-ink-800 p-2 text-left shadow-2xl',
              align === 'right' ? 'right-0' : 'left-0',
              direction === 'down' ? 'top-full mt-2' : 'bottom-full mb-2',
            )}
          >
            <p className="px-3 pb-2 pt-1.5 text-[11px] font-semibold uppercase tracking-eyebrow text-white/50">Choose your location</p>
            {locationList.map(l => (
              <a
                key={l.id}
                href={l.phoneHref}
                data-location={l.id}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-md px-3 py-3 text-white transition hover:bg-white/5"
              >
                <span className="grid h-9 w-9 place-items-center rounded-full bg-gold-400/15 text-gold-300">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="flex flex-col">
                  <span className="text-xs text-white/60">{l.label}</span>
                  <span className="font-semibold tabular-nums">{l.phoneDisplay}</span>
                </span>
              </a>
            ))}
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
