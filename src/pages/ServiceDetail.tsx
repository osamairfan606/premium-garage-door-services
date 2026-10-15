import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowRight, CalendarCheck, Check, Tag } from 'lucide-react';
import Seo from '../components/Seo';
import PageHero from '../components/sections/PageHero';
import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';
import SectionHeading from '../components/ui/SectionHeading';
import { Reveal, Stagger, StaggerItem, slideIn } from '../components/ui/Reveal';
import CallChooser from '../components/layout/CallChooser';
import LocationSwitcher from '../components/sections/LocationSwitcher';
import { ServiceCard } from '../components/sections/ServicesGrid';
import { FaqSection } from '../components/sections/Faq';
import QuoteSection from '../components/sections/QuoteSection';
import FinalCta from '../components/sections/FinalCta';
import { getService, services } from '../config/services';
import { getOffer, OFFER_TERMS } from '../config/offers';
import { locationList } from '../config/locations';
import { breadcrumbSchema, faqSchema } from '../lib/seo';
import { site } from '../config/site';
import NotFound from './NotFound';

/** Maps service pages to the matching "Service needed" option in the quote form. */
const formService: Record<string, string> = {
  'garage-door-repair': 'Door Won’t Open/Close',
  'broken-spring-repair': 'Broken Spring',
  'garage-door-opener-repair-installation': 'Opener Not Working',
  'garage-door-installation': 'New Door Installation',
  'off-track-repair': 'Door Off Track',
  'cable-repair': 'Cable Broken or Loose',
  'roller-repair': 'Roller Noise or Damage',
  'panel-repair': 'Panel Damage',
  'maintenance-tune-up': 'Routine Maintenance / Tune-Up',
};

export default function ServiceDetail({ slug }: { slug: string }) {
  const s = getService(slug);
  if (!s) return <NotFound />;
  const path = `/services/${s.slug}`;
  const crumbs = [{ label: 'Home', to: '/' }, { label: 'Services', to: '/services' }, { label: s.name, to: path }];
  const offer = getOffer(s.offerId);
  const related = s.related.map(r => services.find(x => x.slug === r)!).filter(Boolean);

  return (
    <>
      <Seo
        title={`${s.name} in Chicago & Indianapolis`}
        description={s.metaDescription}
        path={path}
        jsonLd={[
          breadcrumbSchema(crumbs),
          faqSchema(s.faqs),
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: s.name,
            serviceType: s.name,
            description: s.metaDescription,
            url: `${site.url}${path}`,
            provider: { '@type': 'Organization', '@id': `${site.url}/#organization`, name: site.name },
            areaServed: locationList.map(l => ({ '@type': 'City', name: `${l.city}, ${l.stateCode}` })),
          },
        ]}
      />
      <PageHero crumbs={crumbs} eyebrow="Garage door services" title={s.headline} lead={s.summary} image={s.image} imageAlt={s.imageAlt} aside={<LocationSwitcher />}>
        <Button to={`/contact?service=${encodeURIComponent(formService[s.slug] ?? '')}`} size="lg">
          <CalendarCheck className="h-5 w-5" aria-hidden="true" /> Request a Free Estimate
        </Button>
        <CallChooser align="left" buttonClassName="h-14 px-7 text-base bg-white/10 text-white shadow-none border border-white/25 hover:bg-white/15" />
      </PageHero>

      <section className="section bg-white">
        <div className="container grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div>
            <span className="grid h-16 w-16 place-items-center rounded-lg bg-ink-900 text-gold-300"><Icon name={s.icon} className="h-8 w-8" /></span>
            <SectionHeading className="mt-8" eyebrow={s.name} title={<>What’s <span className="accent-serif text-gold-500">included</span></>} />
            <Reveal className="mt-6 space-y-5 text-lg leading-relaxed text-stone-600">
              {s.intro.map(p => <p key={p.slice(0, 20)}>{p}</p>)}
            </Reveal>
            <Stagger as="ul" className="mt-8 grid gap-3 sm:grid-cols-2" stagger={0.06}>
              {s.includes.map(i => (
                <StaggerItem as="li" key={i} className="flex items-center gap-3 rounded-md border border-stone-200 bg-stone-50 px-4 py-3.5 font-medium text-ink-900">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold-400 text-ink-900"><Check className="h-3.5 w-3.5" aria-hidden="true" /></span>
                  {i}
                </StaggerItem>
              ))}
            </Stagger>
          </div>
          <Reveal variants={slideIn('right')} className="space-y-5 lg:pt-24">
            <div className="rounded-lg border border-stone-200 bg-stone-50 p-7">
              <h2 className="flex items-center gap-2 font-sans text-sm font-bold uppercase tracking-eyebrow text-ink-900">
                <AlertTriangle className="h-4 w-4 text-gold-500" aria-hidden="true" /> Signs you need this service
              </h2>
              <ul className="mt-5 space-y-3">
                {s.signs.map(sign => (
                  <li key={sign} className="flex gap-3 text-stone-700"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" aria-hidden="true" />{sign}</li>
                ))}
              </ul>
            </div>
            {offer && (
              <div className="on-dark rounded-lg border border-gold-400/40 bg-ink-900 p-7 text-white">
                <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-eyebrow text-gold-300"><Tag className="h-3.5 w-3.5" aria-hidden="true" /> Current offer</p>
                <p className="mt-3 font-display text-4xl font-semibold text-gold-200">{offer.value}</p>
                <p className="mt-1 font-semibold">{offer.title}</p>
                <p className="mt-2 text-sm text-white/65">{offer.description}</p>
                <p className="mt-4 text-[11px] leading-relaxed text-white/45">{OFFER_TERMS}</p>
                <Link to="/special-offers" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-200 hover:text-white">All offers <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* Available in both locations */}
      <section className="section-tight on-dark bg-ink-900">
        <div className="container">
          <SectionHeading dark eyebrow="Where we offer it" title={<>{s.name} in <span className="accent-serif text-gold-200">Chicago & Indianapolis</span></>} />
          <Stagger className="mt-10 grid gap-5 md:grid-cols-2" stagger={0.12}>
            {locationList.map(l => (
              <StaggerItem key={l.id} className="rounded-lg border border-white/10 bg-ink-800 p-7">
                <h3 className="text-2xl font-semibold text-white">{l.label}</h3>
                <a href={l.phoneHref} data-location={l.id} className="mt-2 inline-block font-display text-2xl font-semibold text-gold-200 tabular-nums hover:text-white" aria-label={`Call ${l.city}: ${l.phoneDisplay}`}>{l.phoneDisplay}</a>
                <div className="mt-5 flex flex-wrap gap-2">
                  {s.segments.map(seg => (
                    <Link key={seg} to={`/locations/${l.id}/${seg}`} className="inline-flex items-center gap-1.5 rounded-md border border-white/15 px-4 py-2.5 text-sm font-semibold capitalize text-white transition hover:border-gold-300">
                      {l.city} {seg} <ArrowRight className="h-4 w-4 text-gold-300" aria-hidden="true" />
                    </Link>
                  ))}
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <FaqSection faqs={s.faqs} eyebrow={`${s.short} FAQs`} title={<>{s.name} <span className="accent-serif text-gold-500">questions</span></>} lead="Quick answers about this service. Can’t find yours? Call your local team any time." />

      <section className="section bg-stone-50">
        <div className="container">
          <SectionHeading eyebrow="Related services" title={<>You may also <span className="accent-serif text-gold-500">need</span></>} />
          <Stagger className="mt-10 grid gap-5 md:grid-cols-3" stagger={0.08}>
            {related.map(r => (
              <StaggerItem key={r.slug}><ServiceCard service={r} index={services.indexOf(r)} /></StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <QuoteSection service={formService[s.slug]} />
      <FinalCta />
    </>
  );
}
