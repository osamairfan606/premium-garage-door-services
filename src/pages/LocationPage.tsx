import { Link } from 'react-router-dom';
import { ArrowRight, CalendarCheck, Clock3, MapPin, Phone, Snowflake } from 'lucide-react';
import Seo from '../components/Seo';
import PageHero from '../components/sections/PageHero';
import Button from '../components/ui/Button';
import SectionHeading from '../components/ui/SectionHeading';
import { Reveal, slideIn } from '../components/ui/Reveal';
import ServicesGrid from '../components/sections/ServicesGrid';
import { WhyChooseUs, Process } from '../components/sections/Highlights';
import { FaqSection, Reviews } from '../components/sections/Faq';
import QuoteSection from '../components/sections/QuoteSection';
import FinalCta from '../components/sections/FinalCta';
import Img from '../components/ui/Img';
import { locations, otherLocation, type LocationId } from '../config/locations';
import { breadcrumbSchema, faqSchema, locationSchema } from '../lib/seo';

export default function LocationPage({ locationId }: { locationId: LocationId }) {
  const loc = locations[locationId];
  const other = otherLocation(loc.id);
  const path = `/locations/${loc.id}`;
  const crumbs = [{ label: 'Home', to: '/' }, { label: 'Locations', to: '/#locations' }, { label: loc.label, to: path }];

  return (
    <>
      <Seo
        title={`Garage Door Repair ${loc.city}, ${loc.stateCode} | 24/7 Service — ${loc.phoneDisplay}`}
        description={`Garage door repair, spring replacement, opener service and installation for homeowners in ${loc.label}. Same-day service whenever possible. Call ${loc.phoneDisplay}.`}
        path={path}
        jsonLd={[breadcrumbSchema(crumbs), locationSchema(loc), faqSchema(loc.faqs)]}
      />
      <PageHero
        size="lg"
        crumbs={crumbs}
        eyebrow={`${loc.label} · Residential garage doors`}
        title={`Garage door repair in ${loc.city}`}
        accent="done right, day or night."
        lead={`${loc.tagline} Free onsite estimates, honest pricing and 24/7 emergency service for broken springs, stuck doors and opener failures.`}
        image={loc.heroImage}
        imageAlt={loc.imageAlt}
        aside={
          <div className="on-dark rounded-lg border border-white/10 bg-ink-900/70 p-6 backdrop-blur-xl md:p-7">
            <p className="text-[11px] font-semibold uppercase tracking-eyebrow text-white/50">{loc.city} service line</p>
            <a href={loc.phoneHref} data-location={loc.id} className="mt-2 flex items-center gap-3 font-display text-4xl font-semibold text-white tabular-nums transition hover:text-gold-200" aria-label={`Call ${loc.city}: ${loc.phoneDisplay}`}>
              {loc.phoneDisplay}
            </a>
            <p className="mt-3 flex items-center gap-2 text-sm text-white/60"><Clock3 className="h-4 w-4 text-gold-300" aria-hidden="true" /> Open 24/7 · Same-day service whenever possible</p>
            <div className="mt-6">
              <Link to={`${path}/residential`} className="flex items-center justify-between rounded-md border border-white/15 px-4 py-3 text-sm font-semibold text-white transition hover:border-gold-300">
                Residential services <ArrowRight className="h-4 w-4 text-gold-300" aria-hidden="true" />
              </Link>
            </div>
          </div>
        }
      >
        <Button href={loc.phoneHref} size="lg" aria-label={`Call ${loc.city}: ${loc.phoneDisplay}`}>
          <Phone className="h-5 w-5" aria-hidden="true" /> Call {loc.phoneDisplay}
        </Button>
        <Button to={`/contact?location=${loc.id}`} variant="outline-light" size="lg">
          <CalendarCheck className="h-5 w-5" aria-hidden="true" /> Request a Free Estimate
        </Button>
      </PageHero>

      {/* Overview + service area */}
      <section className="section bg-white">
        <div className="container grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div>
            <SectionHeading eyebrow={`Serving ${loc.city}`} title={<>Your local garage door team in <span className="accent-serif text-gold-500">{loc.city}</span></>} />
            <Reveal className="mt-6 space-y-5 text-lg leading-relaxed text-stone-600">
              {loc.overview.map(p => <p key={p.slice(0, 24)}>{p}</p>)}
            </Reveal>
          </div>
          <Reveal variants={slideIn('right')} className="space-y-4">
            <div className="rounded-lg border border-stone-200 bg-stone-50 p-7">
              <h2 className="flex items-center gap-2 font-sans text-sm font-bold uppercase tracking-eyebrow text-ink-900">
                <MapPin className="h-4 w-4 text-gold-500" aria-hidden="true" /> Service area
              </h2>
              {loc.serviceAreas.length ? (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {loc.serviceAreas.map(a => <li key={a} className="rounded-full border border-stone-300 bg-white px-3 py-1 text-sm text-stone-700">{a}</li>)}
                </ul>
              ) : (
                <p className="mt-3 leading-relaxed text-stone-600">
                  {loc.city}, {loc.state} and nearby communities. Call or send a request with your ZIP code and we’ll confirm availability at your address.
                </p>
              )}
              {loc.zipCodes.length > 0 && <p className="mt-3 text-sm text-stone-500">ZIP codes: {loc.zipCodes.join(', ')}</p>}
              <a href={loc.phoneHref} data-location={loc.id} className="mt-6 inline-flex items-center gap-2 font-semibold text-ink-900 hover:text-gold-600">
                <Phone className="h-4 w-4 text-gold-500" aria-hidden="true" /> {loc.phoneDisplay}
              </a>
            </div>
            <div className="on-dark relative overflow-hidden rounded-lg bg-ink-900 p-7 text-white">
              <Img name={loc.cardImage} alt="" sizes="40vw" className="absolute inset-0 h-full w-full object-cover opacity-25" />
              <div className="relative">
                <Snowflake className="h-6 w-6 text-gold-300" aria-hidden="true" />
                <h2 className="mt-4 text-xl font-semibold">{loc.climateNote.title}</h2>
                <p className="mt-2 leading-relaxed text-white/70">{loc.climateNote.body}</p>
                <Link to="/services/maintenance-tune-up" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-200 hover:text-white">
                  Maintenance & tune-ups <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <ServicesGrid dark eyebrow={`Services in ${loc.city}`} title={<>Garage door services in <span className="accent-serif text-gold-200">{loc.city}</span></>} lead={`Every service below is available to homeowners in ${loc.label}. Call ${loc.phoneDisplay} for same-day help whenever possible.`} />
      <WhyChooseUs cityLabel={loc.city} />
      <Reviews locationId={loc.id} />
      <Process />
      <FaqSection faqs={loc.faqs} location={loc} eyebrow={`${loc.city} FAQs`} title={<>Garage door questions in <span className="accent-serif text-gold-500">{loc.city}</span></>} lead={`Answers for homeowners in ${loc.label}.`} />
      <QuoteSection location={loc} />

      <section className="bg-stone-50 py-10">
        <div className="container flex flex-col items-start justify-between gap-3 text-sm sm:flex-row sm:items-center">
          <p className="text-stone-600">Need service in {other.label} instead?</p>
          <Link to={`/locations/${other.id}`} className="inline-flex items-center gap-1.5 font-semibold text-ink-900 hover:text-gold-600">
            Visit our {other.city} page <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
      <FinalCta location={loc} />
    </>
  );
}
