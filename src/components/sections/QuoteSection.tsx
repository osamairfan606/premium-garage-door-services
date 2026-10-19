import { Check, Clock3, Phone } from 'lucide-react';
import QuoteForm from '../forms/QuoteForm';
import SectionHeading from '../ui/SectionHeading';
import { Reveal, slideIn } from '../ui/Reveal';
import { locationList, type Location } from '../../config/locations';

interface Props {
  location?: Location;
  service?: string;
  title?: React.ReactNode;
  lead?: string;
  id?: string;
}

export default function QuoteSection({ location, service, title, lead, id = 'quote' }: Props) {
  const contacts = location ? [location] : locationList;
  return (
    <section id={id} className="section relative overflow-hidden bg-stone-100">
      <div aria-hidden="true" className="panel-lines-dark absolute inset-0" />
      <div className="container relative grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Schedule service"
            title={title ?? <>Schedule your <span className="accent-serif text-gold-500">same-day</span> garage door repair</>}
            lead={lead ?? `Get a free onsite estimate from local garage door experts${location ? ` in ${location.label}` : ''}. Send a request, or call for the fastest response.`}
          />
          <Reveal variants={slideIn('left')} className="mt-10 space-y-4">
            {contacts.map(l => (
              <a key={l.id} href={l.phoneHref} data-location={l.id} className="group flex items-center gap-4 rounded-lg border border-stone-200 bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:border-gold-300">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-ink-900 text-gold-300 transition group-hover:bg-gold-400 group-hover:text-ink-900">
                  <Phone className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-[13px] text-stone-500">{l.label} · 24/7</span>
                  <span className="font-display text-2xl font-semibold text-ink-900 tabular-nums">{l.phoneDisplay}</span>
                </span>
              </a>
            ))}
            <ul className="space-y-3 pt-4">
              {['Free onsite estimates', 'Same-day service whenever possible', 'Most repairs completed within a few hours', '100% satisfaction guarantee'].map(p => (
                <li key={p} className="flex items-center gap-3 text-stone-700">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-gold-400/20 text-gold-600"><Check className="h-3.5 w-3.5" aria-hidden="true" /></span>
                  {p}
                </li>
              ))}
              <li className="flex items-center gap-3 text-stone-700">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-gold-400/20 text-gold-600"><Clock3 className="h-3.5 w-3.5" aria-hidden="true" /></span>
                Appointment windows from 8:00 AM to midnight
              </li>
            </ul>
          </Reveal>
        </div>
        <Reveal variants={slideIn('right')}>
          <QuoteForm defaultLocation={location?.id} lockLocation={!!location} defaultService={service} />
        </Reveal>
      </div>
    </section>
  );
}
