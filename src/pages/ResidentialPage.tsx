import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowRight, CalendarCheck, Phone } from 'lucide-react';
import Seo from '../components/Seo';
import PageHero from '../components/sections/PageHero';
import Button from '../components/ui/Button';
import Img from '../components/ui/Img';
import SectionHeading from '../components/ui/SectionHeading';
import { Reveal, Stagger, StaggerItem, slideIn } from '../components/ui/Reveal';
import CallChooser from '../components/layout/CallChooser';
import LocationSwitcher from '../components/sections/LocationSwitcher';
import { ServiceCard } from '../components/sections/ServicesGrid';
import { Process } from '../components/sections/Highlights';
import { FaqSection, Reviews } from '../components/sections/Faq';
import QuoteSection from '../components/sections/QuoteSection';
import FinalCta from '../components/sections/FinalCta';
import { residentialCopy } from '../config/content';
import { getLocation, otherLocation, type LocationId } from '../config/locations';
import { services } from '../config/services';
import { breadcrumbSchema, faqSchema, locationSchema } from '../lib/seo';

const general = {
  eyebrow: 'Residential services',
  title: 'Residential garage door service',
  accent: 'for the home you love',
  lead: 'Spring replacement, opener repair and installation, off-track doors, cables, rollers, panels and new doors — with free onsite estimates and 24/7 emergency help.',
  intro: [
    'Your garage door is the largest moving part of your home and, for many families, the entrance you use every day. It needs to be safe, secure, quiet and reliable — and it has a big effect on curb appeal.',
    'Our technicians are trained to handle all garage door systems. We diagnose the real problem, explain your options honestly and complete most repairs within a few hours. When repair no longer makes sense, we help you choose and install a new door.',
  ],
};

export default function ResidentialPage({ locationId }: { locationId?: LocationId }) {
  const loc = getLocation(locationId);
  const copy = loc?.residential;
  const path = loc ? `/locations/${loc.id}/residential` : '/services/residential';
  const crumbs = loc
    ? [{ label: 'Home', to: '/' }, { label: loc.label, to: `/locations/${loc.id}` }, { label: 'Residential', to: path }]
    : [{ label: 'Home', to: '/' }, { label: 'Services', to: '/services' }, { label: 'Residential', to: path }];
  const faqs = [...(copy?.faqs ?? []), ...residentialCopy.faqs];
  const heroImage = loc ? (loc.id === 'chicago' ? 'res-house-two-storey' : 'res-house-suburban') : 'res-house-dusk';

  return (
    <>
      <Seo
        title={loc ? `${loc.city} Residential Garage Door Repair | ${loc.phoneDisplay}` : 'Residential Garage Door Services | Repair, Openers & Installation'}
        description={
          loc
            ? `Residential garage door repair, spring replacement, opener service and installation in ${loc.label}. Free onsite estimates. Call ${loc.phoneDisplay}.`
            : 'Residential garage door repair, spring replacement, opener installation, off-track repair and new doors in Chicago and Indianapolis. Free onsite estimates.'
        }
        path={path}
        jsonLd={[breadcrumbSchema(crumbs), faqSchema(faqs), ...(loc ? [locationSchema(loc, 'Residential garage door repair and installation', path)] : [])]}
      />
      <PageHero
        crumbs={crumbs}
        eyebrow={loc ? `${loc.label} · Residential` : general.eyebrow}
        title={copy?.heroTitle ?? general.title}
        accent={copy?.heroAccent ?? general.accent}
        lead={copy?.heroLead ?? general.lead}
        image={heroImage}
        imageAlt={loc ? `Residential garage door in ${loc.city}` : 'Craftsman-style home with lit garage doors at dusk'}
        aside={!loc ? <LocationSwitcher segment="residential" /> : undefined}
      >
        <Button to={`/contact${loc ? `?location=${loc.id}` : ''}`} size="lg">
          <CalendarCheck className="h-5 w-5" aria-hidden="true" /> Request a Free Estimate
        </Button>
        {loc ? (
          <Button href={loc.phoneHref} variant="outline-light" size="lg" aria-label={`Call ${loc.city}: ${loc.phoneDisplay}`}>
            <Phone className="h-5 w-5" aria-hidden="true" /> {loc.phoneDisplay}
          </Button>
        ) : (
          <CallChooser align="left" buttonClassName="h-14 px-7 text-base bg-white/10 text-white shadow-none border border-white/25 hover:bg-white/15" />
        )}
      </PageHero>

      {/* Intro */}
      <section className="section overflow-hidden bg-white">
        <div className="container grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow={loc ? `Residential service in ${loc.city}` : 'Residential garage doors'}
              title={<>Safe, quiet and reliable — <span className="accent-serif text-gold-500">every day</span></>}
            />
            <Reveal className="mt-6 space-y-5 text-lg leading-relaxed text-stone-600">
              {(copy?.intro ?? general.intro).map(p => <p key={p.slice(0, 20)}>{p}</p>)}
            </Reveal>
          </div>
          <Reveal variants={slideIn('right')} className="relative">
            <div className="overflow-hidden rounded-lg">
              <Img name="team-van" alt="Premium Garage Door technicians with their service van" sizes="(min-width: 1024px) 40vw, 100vw" className="aspect-[4/3] w-full object-cover" />
            </div>
            {loc && (
              <div className="on-dark absolute -bottom-6 left-6 right-6 rounded-lg bg-ink-900 p-5 text-white shadow-lift sm:left-auto sm:w-80">
                <p className="text-[11px] font-semibold uppercase tracking-eyebrow text-white/50">{loc.city} line · 24/7</p>
                <a href={loc.phoneHref} data-location={loc.id} className="mt-1 flex items-center gap-2 font-display text-2xl font-semibold text-gold-200 tabular-nums">
                  <Phone className="h-5 w-5" aria-hidden="true" /> {loc.phoneDisplay}
                </a>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* Services */}
      <section className="section on-dark bg-ink-900">
        <div className="container">
          <SectionHeading
            dark
            eyebrow="Residential services"
            title={loc ? <>Residential garage door services in <span className="accent-serif text-gold-200">{loc.city}</span></> : <>What we do for <span className="accent-serif text-gold-200">homeowners</span></>}
            lead="Every residential service starts with an honest diagnosis and a free onsite estimate."
          />
          <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
            {services.map((s, i) => (
              <StaggerItem key={s.slug}><ServiceCard service={s} index={i} dark /></StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Common problems */}
      <section className="section bg-stone-50">
        <div className="container">
          <SectionHeading eyebrow="Common problems" title={<>Sound familiar? <span className="accent-serif text-gold-500">We can help.</span></>} lead="These are the residential garage door problems we fix most often." />
          <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
            {residentialCopy.problems.map(p => (
              <StaggerItem key={p.title} className="card group flex gap-4 p-6 transition hover:border-gold-300">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-gold-500" aria-hidden="true" />
                <div>
                  <h3 className="font-sans text-base font-bold tracking-normal text-ink-900">{p.title}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-stone-600">{p.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Door styles */}
      <section className="section bg-white">
        <div className="container">
          <SectionHeading eyebrow="Door styles" title={<>New door? Find a style that <span className="accent-serif text-gold-500">suits your home</span></>} lead="We provide a free onsite estimate on new doors and recommend options that fit your home, budget and climate." />
          <Stagger className="mt-12 grid gap-5 md:grid-cols-3" stagger={0.1}>
            {residentialCopy.styles.map(s => (
              <StaggerItem key={s.title} as="article" className="group overflow-hidden rounded-lg border border-stone-200 bg-white">
                <div className="aspect-[4/3] overflow-hidden">
                  <Img name={s.image} alt={`${s.title} style garage door`} sizes="(min-width: 768px) 33vw, 100vw" className="h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-ink-900">{s.title}</h3>
                  <p className="mt-1.5 text-stone-600">{s.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <p className="mt-5 text-xs text-stone-500">Style imagery is illustrative stock photography.</p>
        </div>
      </section>

      {copy && loc && (
        <section className="section bg-stone-50">
          <div className="container">
            <SectionHeading eyebrow={`Local know-how · ${loc.city}`} title={<>What matters for homes in <span className="accent-serif text-gold-500">{loc.city}</span></>} />
            <Stagger className="mt-12 grid gap-5 md:grid-cols-3" stagger={0.1}>
              {copy.localNotes.map((n, i) => (
                <StaggerItem key={n.title} className="relative overflow-hidden rounded-lg border border-stone-200 bg-white p-7">
                  <span className="font-display text-5xl font-semibold text-gold-200">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="mt-4 text-lg font-semibold text-ink-900">{n.title}</h3>
                  <p className="mt-2 leading-relaxed text-stone-600">{n.body}</p>
                </StaggerItem>
              ))}
            </Stagger>
            <Reveal className="mt-10 flex flex-col gap-4 rounded-lg border border-stone-200 bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-stone-600">Looking for garage door service in {otherLocation(loc.id).city}?</p>
              <Link to={`/locations/${otherLocation(loc.id).id}/residential`} className="inline-flex items-center gap-1 text-sm font-semibold text-gold-600 hover:text-ink-900">
                {otherLocation(loc.id).city} residential services <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      <Reviews locationId={loc?.id} />
      <Process />
      <FaqSection faqs={faqs} location={loc} eyebrow="Residential FAQs" title={<>Residential garage door <span className="accent-serif text-gold-500">questions</span></>} lead={loc ? `Common questions from homeowners in ${loc.city}.` : undefined} />
      <QuoteSection location={loc} />
      <FinalCta location={loc} />
    </>
  );
}
