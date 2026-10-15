import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Phone } from 'lucide-react';
import Img from '../ui/Img';
import SectionHeading from '../ui/SectionHeading';
import { Stagger, StaggerItem } from '../ui/Reveal';
import { locationList } from '../../config/locations';

export default function LocationCards({ id = 'locations' }: { id?: string }) {
  return (
    <section id={id} className="section on-dark panel-lines relative overflow-hidden bg-ink-900">
      <div className="container">
        <SectionHeading
          dark
          align="center"
          eyebrow="Service locations"
          title={<>Two cities. <span className="accent-serif text-gold-200">Two direct lines.</span></>}
          lead="Call the team for your city and you’ll reach local technicians who know the area. Each location has its own dedicated phone number."
        />
        <Stagger className="mt-14 grid gap-6 md:grid-cols-2" stagger={0.15}>
          {locationList.map(l => (
            <StaggerItem key={l.id} as="article" className="group relative overflow-hidden rounded-lg border border-white/10 bg-ink-800">
              <div className="relative aspect-[16/9] overflow-hidden">
                <Img name={l.cardImage} alt={l.imageAlt} sizes="(min-width: 768px) 50vw, 100vw" className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105" />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink-800 via-ink-800/20 to-transparent" />
                <p className="absolute left-6 top-6 inline-flex items-center gap-1.5 rounded-full bg-ink-900/70 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
                  <MapPin className="h-3.5 w-3.5 text-gold-300" aria-hidden="true" /> {l.state}
                </p>
              </div>
              <div className="relative -mt-10 p-7 md:p-8">
                <h3 className="text-3xl font-semibold text-white">{l.label}</h3>
                <p className="mt-3 leading-relaxed text-white/65">{l.tagline}</p>
                <a href={l.phoneHref} data-location={l.id} className="mt-6 inline-flex items-center gap-3 font-display text-3xl font-semibold text-gold-200 tabular-nums transition hover:text-white" aria-label={`Call ${l.city}: ${l.phoneDisplay}`}>
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-gold-400 text-ink-900">
                    <Phone className="h-5 w-5" aria-hidden="true" />
                  </span>
                  {l.phoneDisplay}
                </a>
                <div className="mt-7 grid gap-2 border-t border-white/10 pt-6 sm:grid-cols-3">
                  {[
                    { label: 'Overview', to: `/locations/${l.id}` },
                    { label: 'Residential', to: `/locations/${l.id}/residential` },
                    { label: 'Commercial', to: `/locations/${l.id}/commercial` },
                  ].map(link => (
                    <Link key={link.to} to={link.to} className="group/l flex items-center justify-between rounded-md border border-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:border-gold-400/50 hover:bg-white/5">
                      {link.label}
                      <ArrowRight className="h-4 w-4 text-gold-300 transition-transform group-hover/l:translate-x-1" aria-hidden="true" />
                      <span className="sr-only"> — {l.city}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
