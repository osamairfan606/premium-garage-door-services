import { Link } from 'react-router-dom';
import { ArrowRight, Clock3 } from 'lucide-react';
import type { Location } from '../../config/locations';

/** Hero card with the city's own phone line, so the right number is the first thing visitors see. */
export default function CityCallCard({ loc, links }: { loc: Location; links: { label: string; to: string }[] }) {
  return (
    <div className="on-dark rounded-lg border border-white/10 bg-ink-900/70 p-6 backdrop-blur-xl md:p-7">
      <p className="text-[11px] font-semibold uppercase tracking-eyebrow text-white/50">{loc.city} service line</p>
      <a href={loc.phoneHref} data-location={loc.id} className="mt-2 flex items-center gap-3 font-display text-4xl font-semibold text-white tabular-nums transition hover:text-gold-200" aria-label={`Call ${loc.city}: ${loc.phoneDisplay}`}>
        {loc.phoneDisplay}
      </a>
      <p className="mt-3 flex items-center gap-2 text-sm text-white/60"><Clock3 className="h-4 w-4 text-gold-300" aria-hidden="true" /> Open 24/7 · Same-day service whenever possible</p>
      <div className="mt-6 space-y-2">
        {links.map(l => (
          <Link key={l.to} to={l.to} className="flex items-center justify-between rounded-md border border-white/15 px-4 py-3 text-sm font-semibold text-white transition hover:border-gold-300">
            {l.label} <ArrowRight className="h-4 w-4 text-gold-300" aria-hidden="true" />
          </Link>
        ))}
      </div>
    </div>
  );
}
