import { CalendarCheck, Check, Info, MapPin, Phone } from 'lucide-react';
import Seo from '../components/Seo';
import PageHero from '../components/sections/PageHero';
import Button from '../components/ui/Button';
import Img from '../components/ui/Img';
import SectionHeading from '../components/ui/SectionHeading';
import { Reveal, Stagger, StaggerItem } from '../components/ui/Reveal';
import CallChooser from '../components/layout/CallChooser';
import { Process } from '../components/sections/Highlights';
import { FaqSection } from '../components/sections/Faq';
import QuoteSection from '../components/sections/QuoteSection';
import FinalCta from '../components/sections/FinalCta';
import { commercialCopy } from '../config/content';
import { locationList } from '../config/locations';
import { breadcrumbSchema, faqSchema } from '../lib/seo';

const SERVICE = 'Commercial Door Service';
const path = '/services/commercial';
const crumbs = [{ label: 'Home', to: '/' }, { label: 'Services', to: '/services' }, { label: 'Commercial', to: path }];

/** The only commercial page: one section per city, each with that city's phone number only. */
export default function CommercialPage() {
  return (
    <>
      <Seo
        title="Commercial Garage Door Repair | Chicago & Indianapolis"
        description="Commercial garage door repair, opener service, maintenance and door replacement for businesses in Chicago, IL and Indianapolis, IN. Free onsite estimates."
        path={path}
        jsonLd={[breadcrumbSchema(crumbs), faqSchema(commercialCopy.faqs)]}
      />
      <PageHero
        crumbs={crumbs}
        eyebrow="Commercial services · Chicago & Indianapolis"
        title="Commercial garage door service"
        accent="that keeps business moving"
        lead="Repairs, opener service, maintenance and door replacement for storefronts, warehouses, workshops and facilities — planned to minimise disruption."
        image="com-numbered-doors"
        imageAlt="Row of numbered commercial overhead doors"
      >
        <Button to={`/contact?service=${encodeURIComponent(SERVICE)}`} size="lg">
          <CalendarCheck className="h-5 w-5" aria-hidden="true" /> Request a Free Estimate
        </Button>
        <CallChooser align="left" buttonClassName="h-14 px-7 text-base bg-white/10 text-white shadow-none border border-white/25 hover:bg-white/15" />
      </PageHero>

      {/* Intro */}
      <section className="section bg-white">
        <div className="container grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div>
            <SectionHeading eyebrow="Commercial garage doors" title={<>Dependable doors, <span className="accent-serif text-gold-500">less downtime</span></>} />
            <Reveal className="mt-6 space-y-5 text-lg leading-relaxed text-stone-600">
              {commercialCopy.intro.map(p => <p key={p.slice(0, 20)}>{p}</p>)}
            </Reveal>
          </div>
          <Reveal className="flex gap-3 self-start rounded-lg border border-gold-200 bg-gold-50 p-6 text-[15px] leading-relaxed text-ink-800">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" aria-hidden="true" />
            <p>Commercial door types vary. Before we schedule a visit, our team will confirm that we service your specific door and opener system. Call your local line below with the door type, size and opener model if you have it.</p>
          </Reveal>
        </div>
      </section>

      {/* Services */}
      <section className="section on-dark bg-ink-900">
        <div className="container">
          <SectionHeading dark eyebrow="What we do" title={<>Commercial door <span className="accent-serif text-gold-200">services</span></>} lead="Every commercial job starts with an honest diagnosis and a free onsite estimate." />
          <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
            {commercialCopy.services.map(s => (
              <StaggerItem key={s.title} className="rounded-lg border border-white/10 bg-ink-800/60 p-7">
                <Check className="h-6 w-6 text-gold-300" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-semibold text-white">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-white/65">{s.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* One section per city */}
      <section className="section bg-stone-50" id="locations">
        <div className="container">
          <SectionHeading align="center" eyebrow="Service areas" title={<>Commercial service in <span className="accent-serif text-gold-500">Chicago & Indianapolis</span></>} />
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {locationList.map(l => {
              const c = commercialCopy.cities[l.id];
              return (
                <Reveal key={l.id} as="article" id={l.id} className="flex flex-col overflow-hidden rounded-xl border border-stone-200 bg-white shadow-card">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Img name={c.image} alt={c.imageAlt} sizes="(min-width: 1024px) 50vw, 100vw" className="h-full w-full object-cover" />
                    <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-ink-900/80 px-3 py-1.5 text-sm font-semibold text-white backdrop-blur">
                      <MapPin className="h-4 w-4 text-gold-300" aria-hidden="true" /> {l.label}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <h3 className="text-2xl font-semibold text-ink-900">{l.city} commercial garage doors</h3>
                    <p className="mt-3 leading-relaxed text-stone-600">{c.lead}</p>
                    <ul className="mt-5 flex-1 space-y-2.5">
                      {c.points.map(p => (
                        <li key={p} className="flex gap-2.5 text-stone-700"><Check className="mt-0.5 h-5 w-5 shrink-0 text-gold-500" aria-hidden="true" /> {p}</li>
                      ))}
                    </ul>
                    <div className="mt-7 grid gap-3 sm:grid-cols-2">
                      <a href={l.phoneHref} data-location={l.id} className="flex items-center justify-center gap-2 rounded-md bg-gold-400 px-4 py-3 font-semibold text-ink-900 tabular-nums transition hover:bg-gold-300" aria-label={`Call ${l.city}: ${l.phoneDisplay}`}>
                        <Phone className="h-4 w-4" aria-hidden="true" /> {l.phoneDisplay}
                      </a>
                      <Button to={`/contact?location=${l.id}&service=${encodeURIComponent(SERVICE)}`} variant="outline-dark" className="justify-center">
                        Request an estimate
                      </Button>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <Process />
      <FaqSection faqs={commercialCopy.faqs} eyebrow="Commercial FAQs" title={<>Commercial garage door <span className="accent-serif text-gold-500">questions</span></>} />
      <QuoteSection service={SERVICE} title={<>Request a <span className="accent-serif text-gold-500">commercial</span> estimate</>} />
      <FinalCta />
    </>
  );
}
