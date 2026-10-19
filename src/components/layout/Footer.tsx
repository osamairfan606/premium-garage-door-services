import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock3, MapPin, Phone } from 'lucide-react';
import Logo from './Logo';
import { locationList, otherLocation } from '../../config/locations';
import { useActiveLocation } from '../../hooks/useActiveLocation';
import { quickLinks, serviceLinks } from '../../config/navigation';
import { site } from '../../config/site';

export default function Footer() {
  const year = new Date().getFullYear();
  // On a location page only that location's number is shown, so numbers are never mixed.
  const active = useActiveLocation();
  const footerLocations = active ? [active] : locationList;
  const other = active ? otherLocation(active.id) : undefined;
  return (
    <footer className="on-dark panel-lines relative overflow-hidden bg-ink-900 text-white/70">
      <div aria-hidden="true" className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-gold-400/10 blur-3xl" />
      <div className="container relative pb-28 pt-20 lg:pb-12">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo className="h-16" />
            <p className="mt-6 max-w-sm leading-relaxed">
              Garage door repair, installation and maintenance for homeowners in Chicago and Indianapolis. Free onsite estimates, honest pricing and a 100% satisfaction guarantee.
            </p>
            <p className="mt-5 flex items-center gap-2 text-sm text-white/60">
              <Clock3 className="h-4 w-4 text-gold-300" aria-hidden="true" /> {site.hours} · 24/7 emergency service
            </p>
            {site.social.length > 0 && (
              <ul className="mt-6 flex gap-3">
                {site.social.map(s => (
                  <li key={s.href}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-gold-200">{s.label}</a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <nav aria-label="Quick links" className="lg:col-span-2">
            <h2 className="font-sans text-xs font-semibold uppercase tracking-eyebrow text-white">Company</h2>
            <ul className="mt-5 space-y-3 text-[15px]">
              {quickLinks.map(l => (
                <li key={l.to}><Link to={l.to} className="link-underline transition hover:text-white">{l.label}</Link></li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Services" className="lg:col-span-3">
            <h2 className="font-sans text-xs font-semibold uppercase tracking-eyebrow text-white">Services</h2>
            <ul className="mt-5 grid grid-cols-1 gap-3 text-[15px] sm:grid-cols-2 lg:grid-cols-1">
              <li><Link to="/services/residential" className="link-underline transition hover:text-white">Residential Services</Link></li>
              {serviceLinks.slice(0, 8).map(l => (
                <li key={l.to}><Link to={l.to} className="link-underline transition hover:text-white">{l.label}</Link></li>
              ))}
            </ul>
          </nav>

          <div className="space-y-8 lg:col-span-3">
            {footerLocations.map(l => (
              <div key={l.id}>
                <h2 className="flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-eyebrow text-white">
                  <MapPin className="h-3.5 w-3.5 text-gold-300" aria-hidden="true" /> {l.label}
                </h2>
                <a href={l.phoneHref} data-location={l.id} className="mt-3 flex items-center gap-2 font-display text-2xl font-semibold text-gold-200 tabular-nums transition hover:text-white">
                  <Phone className="h-5 w-5" aria-hidden="true" /> {l.phoneDisplay}
                </a>
                <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                  <li><Link to={`/locations/${l.id}`} className="inline-flex items-center gap-1 hover:text-white">Service area <ArrowUpRight className="h-3 w-3" aria-hidden="true" /></Link></li>
                  <li><Link to={`/locations/${l.id}/residential`} className="hover:text-white">Residential</Link></li>
                </ul>
              </div>
            ))}
            {other && (
              <p className="text-sm">
                Also serving{' '}
                <Link to={`/locations/${other.id}`} className="font-semibold text-white hover:text-gold-200">{other.label} →</Link>
              </p>
            )}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {site.legalName}. All rights reserved.</p>
          <ul className="flex gap-6">
            <li><Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-white">Terms &amp; Conditions</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
