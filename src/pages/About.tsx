import { CalendarCheck, Check } from 'lucide-react';
import Seo from '../components/Seo';
import PageHero from '../components/sections/PageHero';
import Button from '../components/ui/Button';
import Img from '../components/ui/Img';
import SectionHeading from '../components/ui/SectionHeading';
import { Reveal, slideIn } from '../components/ui/Reveal';
import CallChooser from '../components/layout/CallChooser';
import { StatsBand, WhyChooseUs, Process } from '../components/sections/Highlights';
import LocationCards from '../components/sections/LocationCards';
import FinalCta from '../components/sections/FinalCta';
import { breadcrumbSchema } from '../lib/seo';

const commitments = [
  'We don’t leave until your door works perfectly.',
  'Free onsite estimates and honest, upfront pricing.',
  'Same-day service whenever possible, 24/7 for emergencies.',
  'Recommendations based on your door’s age, condition, safety and cost.',
  'Every repair and installation backed by our satisfaction guarantee.',
];

export default function About() {
  const crumbs = [{ label: 'Home', to: '/' }, { label: 'About', to: '/about' }];
  return (
    <>
      <Seo
        title="About Us | Local Garage Door Experts"
        description="Premium Garage Door provides dependable garage door repair, installation and maintenance with quality workmanship, honest pricing and a 100% satisfaction guarantee."
        path="/about"
        jsonLd={[breadcrumbSchema(crumbs)]}
      />
      <PageHero crumbs={crumbs} eyebrow="About Premium Garage Door" title="Local garage door experts" accent="who finish the job." lead="We’re committed to dependable garage door service with quality workmanship and attention to detail — from repairs to replacements and new installations." image="team-van" imageAlt="Premium Garage Door technicians beside a branded service van">
        <Button to="/contact" size="lg"><CalendarCheck className="h-5 w-5" aria-hidden="true" /> Request a Free Estimate</Button>
        <CallChooser align="left" buttonClassName="h-14 px-7 text-base bg-white/10 text-white shadow-none border border-white/25 hover:bg-white/15" />
      </PageHero>

      <section className="section bg-white">
        <div className="container grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading eyebrow="Who we are" title={<>Reliable service, <span className="accent-serif text-gold-500">without compromise</span></>} />
            <Reveal className="mt-6 space-y-5 text-lg leading-relaxed text-stone-600">
              <p>
                Premium Garage Door is a garage door repair, installation and service company. Our experienced service professionals are trained to handle all garage door systems — diagnosing issues accurately and delivering efficient, long-lasting repair and installation solutions.
              </p>
              <p>
                From broken springs and damaged panels to garage door openers and new installations, we provide practical solutions for a wide range of garage door needs. Garage door problems can’t wait, so we offer same-day service whenever possible and a 24/7 line for emergencies.
              </p>
              <p>Today we serve homeowners and businesses in Chicago, Illinois and Indianapolis, Indiana — each with its own local phone line.</p>
            </Reveal>
          </div>
          <Reveal variants={slideIn('right')} className="relative">
            <Img name="hero-home" alt="Brick home with a white raised-panel garage door at dusk" sizes="(min-width: 1024px) 45vw, 100vw" className="aspect-[4/3] w-full rounded-lg object-cover" />
            <div className="absolute -bottom-8 -left-4 hidden w-64 rounded-lg border border-stone-200 bg-white p-6 shadow-lift sm:block">
              <p className="font-display text-4xl font-semibold text-ink-900">100%</p>
              <p className="mt-1 text-sm text-stone-600">Satisfaction guarantee on every repair and installation.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-tight bg-stone-50">
        <div className="container grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <SectionHeading eyebrow="Our commitments" title={<>What you can <span className="accent-serif text-gold-500">expect</span></>} />
            <Reveal as="ul" className="mt-8 space-y-4">
              {commitments.map(c => (
                <li key={c} className="flex gap-3 text-lg text-stone-700">
                  <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold-400 text-ink-900"><Check className="h-3.5 w-3.5" aria-hidden="true" /></span>
                  {c}
                </li>
              ))}
            </Reveal>
          </div>
          <Reveal className="self-center">
            <StatsBand />
          </Reveal>
        </div>
      </section>

      <WhyChooseUs />
      <Process />
      <LocationCards />
      <FinalCta />
    </>
  );
}
