import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { Stagger, StaggerItem } from '../ui/Reveal';
import CallChooser from '../layout/CallChooser';
import { activeOffers, OFFER_TERMS, type Offer } from '../../config/offers';
import type { Location } from '../../config/locations';
import { cn } from '../../lib/cn';

export function OfferCard({ offer, location, featured }: { offer: Offer; location?: Location; featured?: boolean }) {
  return (
    <article
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-lg border p-7 transition-all duration-500 hover:-translate-y-1',
        featured ? 'on-dark border-gold-400/40 bg-ink-900 text-white shadow-lift' : 'border-stone-200 bg-white shadow-card hover:shadow-lift',
      )}
    >
      {/* Ticket-style notches */}
      <span aria-hidden="true" className={cn('absolute -left-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full', featured ? 'bg-ink-800' : 'bg-stone-100')} />
      <span aria-hidden="true" className={cn('absolute -right-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full', featured ? 'bg-ink-800' : 'bg-stone-100')} />
      <p className={cn('font-display text-5xl font-semibold leading-none', featured ? 'gold-text animate-shimmer' : 'text-ink-900')}>{offer.value}</p>
      <h3 className={cn('mt-3 text-lg font-semibold', featured ? 'text-white' : 'text-ink-900')}>{offer.title}</h3>
      <p className={cn('mt-2 flex-1 text-[15px] leading-relaxed', featured ? 'text-white/70' : 'text-stone-600')}>{offer.description}</p>
      <div className={cn('mt-6 border-t border-dashed pt-5', featured ? 'border-white/20' : 'border-stone-300')}>
        {location ? (
          <a href={location.phoneHref} data-location={location.id} className={cn('inline-flex items-center gap-2 text-sm font-semibold', featured ? 'text-gold-200' : 'text-gold-600')}>
            <Phone className="h-4 w-4" aria-hidden="true" /> Redeem: {location.phoneDisplay}
          </a>
        ) : (
          <Link to="/special-offers" className={cn('inline-flex items-center gap-2 text-sm font-semibold', featured ? 'text-gold-200' : 'text-gold-600')}>
            How to redeem <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        )}
      </div>
    </article>
  );
}

export default function OffersSection({ location, limit = 4 }: { location?: Location; limit?: number }) {
  const list = activeOffers().slice(0, limit);
  if (!list.length) return null;
  return (
    <section id="offers" className="section bg-stone-100">
      <div className="container">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Special offers"
            title={<>Limited-time <span className="accent-serif text-gold-500">savings</span></>}
            lead="Mention an offer when you call and our team will confirm your eligibility."
          />
          <div className="flex flex-wrap items-center gap-3">
            {location ? (
              <a href={location.phoneHref} data-location={location.id} className="inline-flex h-11 items-center gap-2 rounded-md bg-gold-400 px-5 text-sm font-semibold text-ink-900 shadow-gold hover:bg-gold-300">
                <Phone className="h-4 w-4" aria-hidden="true" /> Call {location.phoneDisplay}
              </a>
            ) : (
              <CallChooser align="left" label="Call to redeem" />
            )}
            <Link to="/special-offers" className="link-underline text-sm font-semibold text-ink-900">All offers →</Link>
          </div>
        </div>
        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
          {list.map((o, i) => (
            <StaggerItem key={o.id}>
              <OfferCard offer={o} location={location} featured={i === 0} />
            </StaggerItem>
          ))}
        </Stagger>
        <p className="mt-6 max-w-3xl text-xs leading-relaxed text-stone-500">{OFFER_TERMS}</p>
      </div>
    </section>
  );
}
