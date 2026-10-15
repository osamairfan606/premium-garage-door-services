import Icon from '../ui/Icon';
import Img from '../ui/Img';
import Counter from '../ui/Counter';
import SectionHeading from '../ui/SectionHeading';
import { Reveal, Stagger, StaggerItem, slideIn } from '../ui/Reveal';
import { benefits, brands, process, verifiedStats, whyChooseUs } from '../../config/content';
import { cn } from '../../lib/cn';

/** Four verified benefits — overlaps the bottom of the hero. */
export function TrustStrip() {
  return (
    <section aria-label="Why customers trust us" className="relative z-10 -mt-14">
      <div className="container">
        <Stagger className="grid overflow-hidden rounded-lg border border-stone-200 bg-white shadow-lift sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
          {benefits.map((b, i) => (
            <StaggerItem key={b.title} className={cn('group flex gap-4 p-6 lg:p-7', i > 0 && 'border-t border-stone-200 sm:border-t-0', i % 2 === 1 && 'sm:border-l', i >= 2 && 'sm:border-t lg:border-t-0', i > 0 && 'lg:border-l')}>
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-md bg-ink-900 text-gold-300 transition-transform duration-500 group-hover:-translate-y-0.5">
                <Icon name={b.icon} className="h-6 w-6" />
              </span>
              <div>
                <h3 className="font-sans text-[15px] font-bold tracking-normal text-ink-900">{b.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-stone-600">{b.body}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/** Animated counters — verified figures only (see config/content.ts). */
export function StatsBand({ dark }: { dark?: boolean }) {
  return (
    <div className={cn('grid grid-cols-2 gap-px overflow-hidden rounded-lg border sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4', dark ? 'border-white/10 bg-white/10' : 'border-stone-200 bg-stone-200')}>
      {verifiedStats.map(s => (
        <div key={s.label} className={cn('px-4 py-6 text-center md:py-8', dark ? 'bg-ink-900' : 'bg-white')}>
          <p className={cn('whitespace-nowrap font-display text-4xl font-semibold xl:text-[2.6rem]', dark ? 'text-gold-200' : 'text-ink-900')}>
            {s.static ?? <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />}
          </p>
          <p className={cn('mt-2 text-sm', dark ? 'text-white/60' : 'text-stone-600')}>{s.label}</p>
        </div>
      ))}
    </div>
  );
}

export function WhyChooseUs({ cityLabel }: { cityLabel?: string }) {
  return (
    <section className="section bg-stone-100">
      <div className="container grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow="Why choose us"
            title={<>Why {cityLabel ? `${cityLabel} customers` : 'homeowners'} choose <span className="accent-serif text-gold-500">Premium Garage Door</span></>}
            lead="When it comes to garage door repair and installation, choosing Premium Garage Door is the smart choice. Here’s why customers trust us for reliable, safe and long-lasting solutions."
          />
          <Reveal variants={slideIn('left')} className="relative mt-10 hidden overflow-hidden rounded-lg lg:block">
            <Img name="team-van" alt="Premium Garage Door technicians standing beside a branded service van" sizes="40vw" className="aspect-[5/4] w-full object-cover" />
          </Reveal>
        </div>
        <Stagger className="grid gap-px overflow-hidden rounded-lg border border-stone-200 bg-stone-200 sm:grid-cols-2" stagger={0.08}>
          {whyChooseUs.map(w => (
            <StaggerItem key={w.title} className="group bg-white p-7 transition-colors duration-500 hover:bg-stone-50 md:p-8">
              <span className="grid h-12 w-12 place-items-center rounded-full border border-gold-200 bg-gold-50 text-gold-600 transition-all duration-500 group-hover:bg-gold-400 group-hover:text-ink-900">
                <Icon name={w.icon} className="h-6 w-6" />
              </span>
              <h3 className="mt-6 text-lg font-semibold text-ink-900">{w.title}</h3>
              <p className="mt-2.5 leading-relaxed text-stone-600">{w.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

export function Process({ dark = true }: { dark?: boolean }) {
  return (
    <section className={cn('section relative overflow-hidden', dark ? 'on-dark bg-ink-900' : 'bg-white')}>
      <div className="container">
        <SectionHeading
          dark={dark}
          align="center"
          eyebrow="How it works"
          title={<>From first call to a door that <span className={cn('accent-serif', dark ? 'text-gold-200' : 'text-gold-500')}>works perfectly</span></>}
        />
        <Stagger as="ol" className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-6" stagger={0.15}>
          <span aria-hidden="true" className={cn('absolute left-0 right-0 top-7 hidden h-px md:block', dark ? 'bg-gradient-to-r from-transparent via-white/15 to-transparent' : 'bg-gradient-to-r from-transparent via-stone-300 to-transparent')} />
          {process.map((p, i) => (
            <StaggerItem as="li" key={p.title} className="relative text-center">
              <span className={cn('relative mx-auto grid h-14 w-14 place-items-center rounded-full border', dark ? 'border-gold-400/40 bg-ink-800 text-gold-300' : 'border-gold-300 bg-gold-50 text-gold-600')}>
                <Icon name={p.icon} className="h-6 w-6" />
                <span className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-gold-400 font-display text-[11px] font-bold text-ink-900">{i + 1}</span>
              </span>
              <h3 className={cn('mt-6 text-lg font-semibold', dark ? 'text-white' : 'text-ink-900')}>{p.title}</h3>
              <p className={cn('mx-auto mt-2 max-w-xs text-[15px] leading-relaxed', dark ? 'text-white/65' : 'text-stone-600')}>{p.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/** Logos of brands shown on the original site (we work with most major brands). */
export function BrandStrip() {
  const row = [...brands, ...brands];
  return (
    <section aria-label="Brands we work with" className="border-y border-stone-200 bg-white py-10">
      <div className="container">
        <p className="text-center text-[11px] font-semibold uppercase tracking-eyebrow text-stone-500">We work with most major garage door & opener brands</p>
      </div>
      <div className="relative mt-7 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
        <ul className="flex w-max animate-marquee items-center gap-14 hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center">
          {row.map((b, i) => (
            <li key={`${b.name}-${i}`} aria-hidden={i >= brands.length || undefined} className={cn(i >= brands.length && 'motion-reduce:hidden')}>
              <Img name={b.image} alt={i >= brands.length ? '' : b.name} sizes="140px" className="h-10 w-auto opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
