import { m } from 'framer-motion';
import { CalendarCheck, Phone } from 'lucide-react';
import Button from '../ui/Button';
import Img from '../ui/Img';
import { Reveal } from '../ui/Reveal';
import { locationList, type Location } from '../../config/locations';

export default function FinalCta({ location, title, body }: { location?: Location; title?: string; body?: string }) {
  const contactTo = location ? `/contact?location=${location.id}` : '/contact';
  return (
    <section className="on-dark relative isolate overflow-hidden bg-ink-900 py-24 md:py-32">
      <Img name="hero-home" alt="" sizes="100vw" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-30" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-900 via-ink-900/90 to-ink-900/60" />
      {/* Slow ambient glow */}
      <m.div
        aria-hidden="true"
        className="absolute -right-32 top-1/2 -z-10 h-[30rem] w-[30rem] -translate-y-1/2 rounded-full bg-gold-400/20 blur-3xl"
        animate={{ scale: [1, 1.12, 1], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="container">
        <Reveal className="max-w-3xl">
          <p className="eyebrow eyebrow-light">Fast garage door service</p>
          <h2 className="mt-5 text-4xl font-semibold leading-[1.05] text-white sm:text-5xl lg:text-6xl">
            {title ?? 'Fast garage door service when you need it most.'}
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
            {body ??
              `From emergency repairs to routine service, get the help you need for your garage door. We handle broken springs, damaged panels, opener problems and more${location ? ` throughout ${location.label}` : ' in Chicago and Indianapolis'}.`}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button to={contactTo} size="lg">
              <CalendarCheck className="h-5 w-5" aria-hidden="true" /> Request a Free Quote
            </Button>
            {(location ? [location] : locationList).map(l => (
              <Button key={l.id} href={l.phoneHref} variant="outline-light" size="lg" aria-label={`Call ${l.city}: ${l.phoneDisplay}`}>
                <Phone className="h-5 w-5" aria-hidden="true" />
                <span className="flex flex-col items-start leading-none">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white/60">{l.city}</span>
                  <span className="tabular-nums">{l.phoneDisplay}</span>
                </span>
              </Button>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
