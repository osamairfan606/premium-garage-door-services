import { Phone } from 'lucide-react';
import Seo from '../components/Seo';
import PageHero from '../components/sections/PageHero';
import Img from '../components/ui/Img';
import SectionHeading from '../components/ui/SectionHeading';
import { Reveal, Stagger, StaggerItem } from '../components/ui/Reveal';
import CallChooser from '../components/layout/CallChooser';
import { OfferCard } from '../components/sections/Offers';
import LocationSwitcher from '../components/sections/LocationSwitcher';
import QuoteSection from '../components/sections/QuoteSection';
import FinalCta from '../components/sections/FinalCta';
import { activeOffers, OFFER_TERMS } from '../config/offers';
import { locationList } from '../config/locations';
import { breadcrumbSchema } from '../lib/seo';

export default function SpecialOffers() {
  const crumbs = [{ label: 'Home', to: '/' }, { label: 'Special Offers', to: '/special-offers' }];
  const list = activeOffers();
  const flyers = list.filter(o => o.image);
  return (
    <>
      <Seo
        title="Special Offers | Garage Door Repair Savings"
        description="Current garage door offers from Premium Garage Door, including savings on repairs, springs, openers and cables, a $49 tune-up and free estimates on new doors."
        path="/special-offers"
        jsonLd={[breadcrumbSchema(crumbs)]}
      />
      <PageHero size="sm" crumbs={crumbs} eyebrow="Special offers" title="Save on your next" accent="garage door service." lead="Mention an offer when you call your local team. We’ll confirm eligibility before any work begins." aside={<LocationSwitcher />}>
        <CallChooser align="left" label="Call to redeem" buttonClassName="h-14 px-7 text-base" />
      </PageHero>

      <section className="section bg-stone-100">
        <div className="container">
          {list.length ? (
            <>
              <SectionHeading eyebrow="Current offers" title={<>Limited-time <span className="accent-serif text-gold-500">savings</span></>} />
              <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
                {list.map((o, i) => (
                  <StaggerItem key={o.id}><OfferCard offer={o} featured={i === 0} /></StaggerItem>
                ))}
              </Stagger>
            </>
          ) : (
            <p className="text-center text-lg text-stone-600">There are no active offers right now — call your local team to ask about current pricing.</p>
          )}

          <Reveal className="mt-12 grid gap-6 rounded-lg border border-stone-200 bg-white p-7 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h2 className="text-xl font-semibold text-ink-900">How to redeem</h2>
              <p className="mt-2 max-w-2xl leading-relaxed text-stone-600">Call the line for your city and mention the offer. {OFFER_TERMS}</p>
            </div>
            <ul className="flex flex-col gap-2 sm:flex-row">
              {locationList.map(l => (
                <li key={l.id}>
                  <a href={l.phoneHref} data-location={l.id} className="flex items-center gap-3 rounded-md bg-ink-900 px-5 py-3 text-white transition hover:bg-ink-700" aria-label={`Call ${l.city}: ${l.phoneDisplay}`}>
                    <Phone className="h-4 w-4 text-gold-300" aria-hidden="true" />
                    <span className="flex flex-col leading-tight">
                      <span className="text-[11px] text-white/60">{l.label}</span>
                      <span className="font-semibold tabular-nums">{l.phoneDisplay}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {flyers.length > 0 && (
        <section className="section bg-white">
          <div className="container">
            <SectionHeading eyebrow="Offer flyers" title={<>From our <span className="accent-serif text-gold-500">promotions</span></>} />
            <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
              {flyers.map(o => (
                <StaggerItem key={o.id} className="group overflow-hidden rounded-lg border border-stone-200 bg-stone-50">
                  <Img name={o.image!} alt={`Premium Garage Door promotion: ${o.value} ${o.title.toLowerCase()}`} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="w-full transition-transform duration-700 group-hover:scale-[1.03]" />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      <QuoteSection title={<>Book your service and <span className="accent-serif text-gold-500">save</span></>} />
      <FinalCta />
    </>
  );
}
