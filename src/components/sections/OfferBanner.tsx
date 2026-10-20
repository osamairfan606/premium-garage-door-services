import { Link } from 'react-router-dom';
import { ArrowRight, BadgePercent } from 'lucide-react';
import Button from '../ui/Button';
import { Reveal } from '../ui/Reveal';
import { firstTimeOffer } from '../../config/content';

export const OFFER_TERMS_PATH = '/terms#first-time-discount';

/** First-time customer discount band (home page). Wording lives in src/config/content.ts. */
export default function OfferBanner() {
  return (
    <section aria-labelledby="first-time-offer" className="bg-stone-50 py-10 md:py-14">
      <div className="container">
        <Reveal className="relative overflow-hidden rounded-2xl bg-gold-400 p-7 text-ink-900 shadow-gold md:p-10">
          <span aria-hidden="true" className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/20" />
          <span aria-hidden="true" className="pointer-events-none absolute -bottom-16 right-24 h-40 w-40 rounded-full bg-white/10" />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex gap-4 md:gap-5">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-ink-900 text-gold-300">
                <BadgePercent className="h-7 w-7" aria-hidden="true" />
              </span>
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-eyebrow text-ink-900/70">First-time customer offer</p>
                <h2 id="first-time-offer" className="mt-1 text-2xl font-semibold leading-tight md:text-3xl">{firstTimeOffer.headline}</h2>
                <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-ink-900/80 md:text-base">{firstTimeOffer.body}</p>
                <Link to={OFFER_TERMS_PATH} className="mt-2 inline-block text-sm font-semibold underline underline-offset-2 hover:text-ink-700">
                  Terms &amp; conditions apply
                </Link>
              </div>
            </div>
            <Button to="/contact" variant="dark" size="lg" className="shrink-0 self-start md:self-center">
              Get my free estimate <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
