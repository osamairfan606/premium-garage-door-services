import { useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, MapPin, Quote, Star } from 'lucide-react';
import Img from '../ui/Img';
import SectionHeading from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';
import { googleProfile, reviews as allReviews, type Review } from '../../config/content';
import type { LocationId } from '../../config/locations';
import { cn } from '../../lib/cn';

function GoogleG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

function Stars({ rating, size = 'h-4 w-4' }: { rating: number; size?: string }) {
  return (
    <span className="flex gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={cn(size, i < Math.round(rating) ? 'fill-[#FBBC04] text-[#FBBC04]' : 'fill-stone-200 text-stone-200')} aria-hidden="true" />
      ))}
    </span>
  );
}

const AVATAR_COLORS = ['bg-[#7B61FF]', 'bg-[#1A73E8]', 'bg-[#E8710A]', 'bg-[#188038]', 'bg-[#C5221F]', 'bg-[#9334E6]', 'bg-[#12B5CB]', 'bg-ink-600'];

function ReviewCard({ review, index }: { review: Review; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const long = review.text.length > 220;
  const initials = review.name.split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase();
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-stone-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
      {review.image && (
        <div className="relative aspect-[16/10] overflow-hidden bg-stone-200">
          <Img name={review.image} alt="" sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <span className="absolute inset-0 bg-gradient-to-t from-ink-900/70 via-ink-900/10 to-transparent" aria-hidden="true" />
          {review.service && (
            <span className="absolute bottom-3 left-3 right-3 text-sm font-semibold leading-snug text-white drop-shadow">{review.service}</span>
          )}
          <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-gold-500 shadow-sm" aria-hidden="true">
            <Quote className="h-4 w-4 fill-current" />
          </span>
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
      <header className="flex items-center gap-3">
        <span className="relative shrink-0">
          {review.avatar ? (
            <img src={review.avatar} alt="" width={44} height={44} loading="lazy" className="h-11 w-11 rounded-full object-cover" referrerPolicy="no-referrer" />
          ) : (
            <span className={cn('grid h-11 w-11 place-items-center rounded-full font-semibold text-white', AVATAR_COLORS[index % AVATAR_COLORS.length])} aria-hidden="true">
              {initials}
            </span>
          )}
          {review.source === 'Google' && (
            <span className="absolute -bottom-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-white shadow-sm">
              <GoogleG className="h-3.5 w-3.5" />
            </span>
          )}
        </span>
        <span className="min-w-0">
          <span className="block truncate font-semibold text-ink-900">{review.name}</span>
          {review.location && (
            <span className="flex items-center gap-1 text-[13px] text-stone-500">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              {review.location === 'chicago' ? 'Chicago, IL' : 'Indianapolis, IN'}
            </span>
          )}
          {review.date && <span className="block text-[13px] text-stone-500">{review.date}</span>}
        </span>
      </header>
      <div className="mt-4">
        <Stars rating={review.rating} />
      </div>
      <p className={cn('mt-3 flex-1 text-[15px] leading-relaxed text-stone-700', !expanded && long && 'line-clamp-5')}>{review.text}</p>
      {long && (
        <button type="button" onClick={() => setExpanded(e => !e)} className="mt-2 self-start text-sm font-semibold text-[#1A73E8] hover:underline" aria-expanded={expanded}>
          {expanded ? 'Show less' : 'Read more'}
        </button>
      )}
      {!review.image && review.service && <p className="mt-4 text-xs font-medium uppercase tracking-wide text-stone-500">{review.service}</p>}
      {(review.source === 'Yelp' || review.source === 'Facebook') && <p className="mt-4 text-xs text-stone-500">Posted on {review.source}</p>}
      </div>
    </article>
  );
}

/**
 * Google-style sliding reviews widget. Renders nothing until genuine reviews are added in
 * src/config/content.ts. On a city page it shows that city's reviews plus untagged ones.
 */
export default function Reviews({ locationId, title, eyebrow = 'Customer reviews' }: { locationId?: LocationId; title?: React.ReactNode; eyebrow?: string }) {
  const list = allReviews.filter(r => !locationId || !r.location || r.location === locationId);
  const trackRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(1);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  const measure = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const total = Math.max(1, Math.ceil((el.scrollWidth - 4) / el.clientWidth));
    setPages(total);
    setPage(Math.min(total - 1, Math.round(el.scrollLeft / el.clientWidth)));
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure, list.length]);

  const go = useCallback((dir: 1 | -1 | number, absolute = false) => {
    const el = trackRef.current;
    if (!el) return;
    const current = Math.round(el.scrollLeft / el.clientWidth);
    let next = absolute ? dir : current + dir;
    if (next >= pages) next = 0;
    if (next < 0) next = pages - 1;
    el.scrollTo({ left: next * el.clientWidth, behavior: reduce ? 'auto' : 'smooth' });
  }, [pages, reduce]);

  // Gentle autoplay — paused on hover/focus, when the tab is hidden, or when reduced motion is requested.
  useEffect(() => {
    if (reduce || paused || pages < 2) return;
    const t = window.setInterval(() => !document.hidden && go(1), 5000);
    return () => window.clearInterval(t);
  }, [reduce, paused, pages, go]);

  if (!list.length) return null;

  const average = list.reduce((sum, r) => sum + r.rating, 0) / list.length;
  const rating = googleProfile.rating ?? Math.round(average * 10) / 10;
  const count = googleProfile.reviewCount ?? list.length;
  const allGoogle = list.every(r => r.source === 'Google');

  return (
    <section className="section bg-stone-100" aria-roledescription="carousel" aria-label="Customer reviews">
      <div className="container">
        <SectionHeading align="center" eyebrow={eyebrow} title={title ?? <>What our customers <span className="accent-serif text-gold-500">say</span></>} />
        <Reveal className="mt-12 rounded-2xl border border-stone-200 bg-white p-5 shadow-lift sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="flex items-center gap-2 text-xl font-semibold text-ink-900">
                {allGoogle ? (
                  <>
                    <GoogleG className="h-6 w-6" /> Google Reviews
                  </>
                ) : (
                  'Customer Reviews'
                )}
              </p>
              <p className="mt-1 flex items-center gap-2">
                <span className="font-display text-3xl font-semibold text-ink-900">{rating.toFixed(1)}</span>
                <Stars rating={rating} size="h-5 w-5" />
                <span className="text-sm text-stone-500">({count})</span>
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {googleProfile.profileUrl && (
                <a href={googleProfile.profileUrl} target="_blank" rel="noopener noreferrer" className="rounded-full border border-stone-200 px-5 py-2.5 text-sm font-semibold text-ink-900 transition hover:border-stone-400">
                  See all reviews
                </a>
              )}
              {googleProfile.writeReviewUrl && (
                <a href={googleProfile.writeReviewUrl} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#E8F0FE] px-5 py-2.5 text-sm font-semibold text-[#1A73E8] transition hover:bg-[#D2E3FC]">
                  Write a review
                </a>
              )}
            </div>
          </div>

          <div
            className="relative mt-7"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
          >
            <div
              ref={trackRef}
              onScroll={measure}
              className="-mx-2 flex snap-x snap-mandatory overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              tabIndex={0}
              aria-label="Reviews — scroll or use the arrow buttons"
            >
              {list.map((r, i) => (
                <div key={`${r.name}-${i}`} className="w-full shrink-0 snap-start px-2 md:w-1/2 lg:w-1/3" aria-roledescription="slide" aria-label={`Review ${i + 1} of ${list.length}`}>
                  <ReviewCard review={r} index={i} />
                </div>
              ))}
            </div>
            {pages > 1 && (
              <>
                <button type="button" onClick={() => go(-1)} aria-label="Previous reviews" className="absolute -left-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-stone-200 bg-white text-ink-900 shadow-card transition hover:scale-105 sm:grid lg:-left-6">
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                <button type="button" onClick={() => go(1)} aria-label="Next reviews" className="absolute -right-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-stone-200 bg-white text-ink-900 shadow-card transition hover:scale-105 sm:grid lg:-right-6">
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </>
            )}
          </div>

          {pages > 1 && (
            <div className="mt-6 flex justify-center gap-2">
              {Array.from({ length: pages }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => go(i, true)}
                  aria-label={`Show review page ${i + 1}`}
                  aria-current={page === i}
                  className={cn('h-2 rounded-full transition-all duration-300', page === i ? 'w-6 bg-ink-900' : 'w-2 bg-stone-300 hover:bg-stone-400')}
                />
              ))}
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
