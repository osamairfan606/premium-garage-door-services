import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { m, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, BadgePercent, CalendarCheck, Check, MapPin, Phone } from 'lucide-react';
import Seo from '../components/Seo';
import Img from '../components/ui/Img';
import Button from '../components/ui/Button';
import SectionHeading from '../components/ui/SectionHeading';
import { Reveal } from '../components/ui/Reveal';
import CallChooser from '../components/layout/CallChooser';
import { TrustStrip, StatsBand, WhyChooseUs, Process, BrandStrip } from '../components/sections/Highlights';
import ServicesGrid from '../components/sections/ServicesGrid';
import LocationCards from '../components/sections/LocationCards';
import Gallery from '../components/sections/Gallery';
import { FaqSection, Reviews } from '../components/sections/Faq';
import FinalCta from '../components/sections/FinalCta';
import LatestPosts from '../components/sections/LatestPosts';
import OfferBanner, { OFFER_TERMS_PATH } from '../components/sections/OfferBanner';
import { locationList } from '../config/locations';
import { firstTimeOffer, generalFaqs } from '../config/content';
import { faqSchema, websiteSchema } from '../lib/seo';

const EASE = [0.22, 1, 0.36, 1] as const;
const item = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } } };

function HomeHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="on-dark grain relative isolate flex min-h-[100svh] items-center overflow-hidden bg-ink-900 pb-28 pt-36 text-white">
      <m.div style={{ y, scale }} className="absolute inset-0 -z-20 will-change-transform">
        <Img name="hero-home" alt="Brick home with a white raised-panel garage door lit by warm wall lanterns at dusk" priority sizes="100vw" className="h-full w-full object-cover object-[60%_center]" />
      </m.div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-900 via-ink-900/80 to-ink-900/20" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-900 via-transparent to-ink-900/50" />

      <m.div style={{ opacity: fade }} className="container">
        <m.div initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.35 } } }} className="max-w-3xl">
          <m.div variants={item}>
            <Link to={OFFER_TERMS_PATH} className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold-300/40 bg-gold-400/15 px-4 py-1.5 text-[13px] font-semibold text-gold-100 backdrop-blur transition hover:bg-gold-400/25">
              <BadgePercent className="h-4 w-4 text-gold-300" aria-hidden="true" />
              {firstTimeOffer.headline} <span className="font-normal text-white/60">· T&amp;C apply</span>
            </Link>
          </m.div>
          <m.p variants={item} className="eyebrow eyebrow-light">Chicago, IL · Indianapolis, IN</m.p>
          <h1 className="mt-6 text-[2.75rem] font-semibold leading-[0.98] sm:text-6xl lg:text-[5.25rem]">
            <m.span variants={item} className="block">Garage door repair</m.span>
            <m.span variants={item} className="block">& installation</m.span>
            <m.span variants={item} className="accent-serif block text-gold-200">you can trust.</m.span>
          </h1>
          <m.p variants={item} className="mt-7 max-w-xl text-lg leading-relaxed text-white/75 md:text-xl">
            Broken spring, stuck door or faulty opener? Premium Garage Door Services provides same-day repair, experienced technicians, honest pricing and 24/7 emergency service in Chicago and Indianapolis.
          </m.p>
          <m.div variants={item} className="mt-10 flex flex-wrap items-center gap-3">
            <Button to="/contact" size="lg">
              <CalendarCheck className="h-5 w-5" aria-hidden="true" /> Request a Free Estimate
            </Button>
            <CallChooser align="left" buttonClassName="h-14 px-7 text-base bg-white/10 text-white shadow-none backdrop-blur hover:bg-white/15 border border-white/25" />
          </m.div>
          <m.ul variants={item} className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/70">
            {['24/7 emergency service', 'Same-day service', 'Free onsite estimates', '100% satisfaction guarantee'].map(t => (
              <li key={t} className="flex items-center gap-2"><Check className="h-4 w-4 text-gold-300" aria-hidden="true" /> {t}</li>
            ))}
          </m.ul>
        </m.div>

        {/* Location options */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.05, ease: EASE }}
          className="mt-14 grid max-w-3xl gap-3 sm:grid-cols-2 xl:absolute xl:bottom-32 xl:right-8 xl:mt-0 xl:w-[420px] xl:grid-cols-1 2xl:right-[max(2rem,calc((100vw-1320px)/2+2rem))]"
        >
          {locationList.map(l => (
            <div key={l.id} className="group flex items-center justify-between gap-4 rounded-lg border border-white/12 bg-ink-900/55 p-4 backdrop-blur-xl transition hover:border-gold-400/50">
              <Link to={`/locations/${l.id}`} className="flex min-w-0 items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold-400/15 text-gold-300"><MapPin className="h-4 w-4" aria-hidden="true" /></span>
                <span className="min-w-0">
                  <span className="flex items-center gap-1.5 font-semibold">{l.label} <ArrowRight className="h-3.5 w-3.5 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" aria-hidden="true" /></span>
                  <span className="block text-[13px] text-white/55">Residential garage doors</span>
                </span>
              </Link>
              <a href={l.phoneHref} data-location={l.id} className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-gold-400 px-3 py-2 text-sm font-semibold text-ink-900 tabular-nums transition hover:bg-gold-300" aria-label={`Call ${l.city}: ${l.phoneDisplay}`}>
                <Phone className="h-3.5 w-3.5" aria-hidden="true" /> {l.phoneDisplay}
              </a>
            </div>
          ))}
        </m.div>
      </m.div>

      <m.div aria-hidden="true" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }} className="absolute bottom-24 left-1/2 hidden -translate-x-1/2 md:block xl:bottom-10">
        <span className="block h-10 w-6 rounded-full border border-white/30 p-1">
          <m.span className="block h-2 w-full rounded-full bg-gold-300" animate={{ y: [0, 14, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} />
        </span>
      </m.div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Seo
        title="Premium Garage Door Services | Chicago & Indianapolis"
        description="Premium Garage Door Services: 24/7 garage door repair, spring replacement, openers and new doors in Chicago, IL and Indianapolis, IN. Free onsite estimates."
        path="/"
        jsonLd={[websiteSchema(), faqSchema(generalFaqs.slice(0, 6))]}
      />
      <HomeHero />
      <TrustStrip />
      <OfferBanner />

      <section className="section-tight bg-stone-50">
        <div className="container grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <SectionHeading
            eyebrow="Local garage door experts"
            title={<>Fast, reliable garage door service <span className="accent-serif text-gold-500">for your home</span></>}
            lead="From broken springs and damaged panels to faulty openers and complete door replacements, we provide fast and reliable service — and we don’t leave until your door works perfectly."
          />
          <Reveal>
            <StatsBand />
          </Reveal>
        </div>
      </section>

      <ServicesGrid id="services" />
      <BrandStrip />
      <LocationCards />
      <WhyChooseUs />
      <Reviews />
      <Gallery />
      <Process />
      <LatestPosts />
      <FaqSection faqs={generalFaqs.slice(0, 6)} />
      <FinalCta />
    </>
  );
}
