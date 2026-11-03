import { Link } from 'react-router-dom';
import { ArrowRight, CalendarCheck, Check, MapPin, Phone } from 'lucide-react';
import Seo from '../components/Seo';
import PageHero from '../components/sections/PageHero';
import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';
import SectionHeading from '../components/ui/SectionHeading';
import { Reveal, Stagger, StaggerItem, slideIn } from '../components/ui/Reveal';
import CityCallCard from '../components/sections/CityCallCard';
import CityServiceLinks from '../components/sections/CityServiceLinks';
import { Process } from '../components/sections/Highlights';
import { FaqSection } from '../components/sections/Faq';
import QuoteSection from '../components/sections/QuoteSection';
import FinalCta from '../components/sections/FinalCta';
import { PostCards } from '../components/sections/LatestPosts';
import { cityServiceKinds, cityServicePath, getCityServicePage, type CityServiceKind } from '../config/cityServices';
import { locations, otherLocation, type LocationId } from '../config/locations';
import { blogPosts, postsForService } from '../lib/blog';
import { breadcrumbSchema, faqSchema, locationSchema } from '../lib/seo';
import NotFound from './NotFound';

/** One service in one city, e.g. /locations/chicago/broken-spring-repair/. */
export default function CityServicePage({ city, kind }: { city: LocationId; kind: CityServiceKind }) {
  const page = getCityServicePage(city, kind);
  if (!page) return <NotFound />;
  const loc = locations[city];
  const other = otherLocation(city);
  const info = cityServiceKinds[kind];
  const path = cityServicePath(page);
  const cityPath = `/locations/${loc.id}`;
  const crumbs = [{ label: 'Home', to: '/' }, { label: 'Locations', to: '/#locations' }, { label: loc.label, to: cityPath }, { label: info.name, to: path }];
  const posts = info.baseService ? postsForService(info.baseService) : blogPosts.filter(p => p.slug.includes('commercial')).slice(0, 3);
  const estimate = `/contact?location=${loc.id}&service=${encodeURIComponent(info.formService)}`;

  return (
    <>
      <Seo
        title={page.title}
        description={page.description}
        path={path}
        jsonLd={[breadcrumbSchema(crumbs), locationSchema(loc, info.name, path), faqSchema(page.faqs)]}
      />
      <PageHero
        crumbs={crumbs}
        eyebrow={`${loc.label} · ${info.name}`}
        title={page.h1}
        accent={page.accent}
        lead={page.lead}
        image={page.image}
        imageAlt={page.imageAlt}
        aside={<CityCallCard loc={loc} links={[{ label: `Garage door repair in ${loc.city}`, to: cityPath }]} />}
      >
        <Button href={loc.phoneHref} size="lg" aria-label={`Call ${loc.city}: ${loc.phoneDisplay}`}>
          <Phone className="h-5 w-5" aria-hidden="true" /> Call {loc.phoneDisplay}
        </Button>
        <Button to={estimate} variant="outline-light" size="lg">
          <CalendarCheck className="h-5 w-5" aria-hidden="true" /> Request a Free Estimate
        </Button>
      </PageHero>

      <section className="section bg-white">
        <div className="container grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div>
            <span className="grid h-16 w-16 place-items-center rounded-lg bg-ink-900 text-gold-300"><Icon name={info.icon} className="h-8 w-8" /></span>
            <SectionHeading className="mt-8" eyebrow={`${info.name} · ${loc.city}`} title={<>How we handle it in <span className="accent-serif text-gold-500">{loc.city}</span></>} />
            <Reveal className="mt-6 space-y-5 text-lg leading-relaxed text-stone-600">
              {page.intro.map(p => <p key={p.slice(0, 24)}>{p}</p>)}
            </Reveal>
            <h2 className="mt-10 font-sans text-sm font-bold uppercase tracking-eyebrow text-ink-900">What the service covers</h2>
            <Stagger as="ul" className="mt-4 grid gap-3 sm:grid-cols-2" stagger={0.05}>
              {info.includes.map(i => (
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
                <MapPin className="h-4 w-4 text-gold-500" aria-hidden="true" /> What to know in {loc.city}
              </h2>
              <div className="mt-5 space-y-5">
                {page.local.map(n => (
                  <div key={n.title}>
                    <h3 className="font-semibold text-ink-900">{n.title}</h3>
                    <p className="mt-1 leading-relaxed text-stone-600">{n.body}</p>
                  </div>
                ))}
              </div>
              <a href={loc.phoneHref} data-location={loc.id} className="mt-6 inline-flex items-center gap-2 font-semibold text-ink-900 hover:text-gold-600">
                <Phone className="h-4 w-4 text-gold-500" aria-hidden="true" /> {loc.city}: {loc.phoneDisplay}
              </a>
            </div>
            {info.baseService && (
              <Link to={`/services/${info.baseService}`} className="flex items-center justify-between rounded-lg border border-stone-200 px-5 py-4 text-sm font-semibold text-ink-900 transition hover:border-gold-300">
                More about this service <ArrowRight className="h-4 w-4 text-gold-500" aria-hidden="true" />
              </Link>
            )}
            {kind === 'commercial' && (
              <Link to={`/services/commercial#${loc.id}`} className="flex items-center justify-between rounded-lg border border-stone-200 px-5 py-4 text-sm font-semibold text-ink-900 transition hover:border-gold-300">
                Commercial door services <ArrowRight className="h-4 w-4 text-gold-500" aria-hidden="true" />
              </Link>
            )}
          </Reveal>
        </div>
      </section>

      <Process />
      <FaqSection faqs={page.faqs} location={loc} eyebrow={`${info.name} FAQs`} title={<>Questions from <span className="accent-serif text-gold-500">{loc.city}</span> customers</>} lead={`${info.name} in ${loc.label}: answers to the questions we hear most.`} />
      <CityServiceLinks loc={loc} exclude={kind} title={<>More services in <span className="accent-serif text-gold-500">{loc.city}</span></>} />
      {posts.length > 0 && (
        <section className="section-tight bg-white" aria-labelledby="related-articles">
          <div className="container">
            <SectionHeading eyebrow="Helpful guides" title={<span id="related-articles">Related <span className="accent-serif text-gold-500">articles</span></span>} />
            <div className="mt-8"><PostCards posts={posts} /></div>
          </div>
        </section>
      )}
      <QuoteSection location={loc} service={info.formService} />

      <section className="bg-stone-50 py-10">
        <div className="container flex flex-col items-start justify-between gap-3 text-sm sm:flex-row sm:items-center">
          <p className="text-stone-600">Need {info.name.toLowerCase()} in {other.label} instead?</p>
          <Link to={cityServicePath({ city: other.id, kind })} className="inline-flex items-center gap-1.5 font-semibold text-ink-900 hover:text-gold-600">
            {info.name} in {other.city} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
      <FinalCta location={loc} />
    </>
  );
}
