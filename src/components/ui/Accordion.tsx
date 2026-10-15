import { useId, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { Plus } from 'lucide-react';
import type { FaqItem } from '../../config/locations';
import { cn } from '../../lib/cn';

/** Accessible FAQ accordion (button + region pattern) with smooth height animation. */
export default function Accordion({ items, dark, defaultOpen = 0 }: { items: FaqItem[]; dark?: boolean; defaultOpen?: number | null }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const uid = useId();
  return (
    <div className={cn('divide-y border-y', dark ? 'divide-white/10 border-white/10' : 'divide-stone-200 border-stone-200')}>
      {items.map((it, i) => {
        const isOpen = open === i;
        const btnId = `${uid}-b${i}`;
        const panelId = `${uid}-p${i}`;
        return (
          <div key={it.q}>
            <h3 className="font-sans tracking-normal">
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className={cn(
                  'flex w-full items-start justify-between gap-6 py-5 text-left text-[17px] font-semibold transition-colors',
                  dark ? 'text-white hover:text-gold-200' : 'text-ink-900 hover:text-gold-600',
                )}
              >
                <span>{it.q}</span>
                <span
                  className={cn(
                    'mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-all duration-300',
                    isOpen ? 'rotate-45 border-gold-400 bg-gold-400 text-ink-900' : dark ? 'border-white/20 text-white' : 'border-stone-300 text-ink-800',
                  )}
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <m.div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className={cn('max-w-3xl pb-6 pr-4 leading-relaxed sm:pr-12', dark ? 'text-white/70' : 'text-stone-600')}>{it.a}</p>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
