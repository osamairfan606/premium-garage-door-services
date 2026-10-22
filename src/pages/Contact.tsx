import { Clock3, MapPin, Phone } from 'lucide-react';
import Seo from '../components/Seo';
import PageHero from '../components/sections/PageHero';
import QuoteForm from '../components/forms/QuoteForm';
import { Reveal, Stagger, StaggerItem, slideIn } from '../components/ui/Reveal';
import { locationList } from '../config/locations';
import { breadcrumbSchema } from '../lib/seo';
import { site } from '../config/site';
import { Link } from 'react-router-dom';

export default function Contact() {
  const crumbs = [{ label: 'Home', to: '/' }, { label: 'Contact', to: '/contact' }];
  return (
    <>
      <Seo
        title="Contact Us | Free Garage Door Estimate"
        description="Request a free onsite garage door estimate or call 24/7: Chicago (312) 626-5158, Indianapolis (463) 262-2862."
        path="/contact"
        jsonLd={[breadcrumbSchema(crumbs)]}
      />
      <PageHero size="sm" crumbs={crumbs} eyebrow="Contact & quotes" title="Request a" accent="free estimate." lead="Tell us about your garage door and choose a time that works. For emergencies, call your local line — we’re available 24/7." />

      <section className="relative bg-stone-100 pb-24 pt-16 md:pt-20">
        <div className="container grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <div className="space-y-5">
            <Stagger className="space-y-4" stagger={0.1}>
              {locationList.map(l => (
                <StaggerItem key={l.id} as="article" className="on-dark relative overflow-hidden rounded-lg bg-ink-900 p-7 text-white">
                  <div aria-hidden="true" className="panel-lines absolute inset-0" />
                  <div className="relative">
                    <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-eyebrow text-gold-300"><MapPin className="h-3.5 w-3.5" aria-hidden="true" /> {l.label}</p>
                    <a href={l.phoneHref} data-location={l.id} className="mt-3 flex items-center gap-3 font-display text-3xl font-semibold tabular-nums transition hover:text-gold-200" aria-label={`Call ${l.city}: ${l.phoneDisplay}`}>
                      <Phone className="h-6 w-6 text-gold-300" aria-hidden="true" /> {l.phoneDisplay}
                    </a>
                    <p className="mt-3 flex items-center gap-2 text-sm text-white/60"><Clock3 className="h-4 w-4" aria-hidden="true" /> {site.hours} · Emergency service</p>
                    <div className="mt-5 flex gap-4 text-sm font-semibold">
                      <Link to={`/locations/${l.id}/residential`} className="text-white/80 hover:text-gold-200">Residential services →</Link>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
            <Reveal className="rounded-lg border border-stone-200 bg-white p-7">
              <h2 className="text-lg font-semibold text-ink-900">What happens next?</h2>
              <ol className="mt-4 space-y-3 text-[15px] text-stone-600">
                <li><span className="font-semibold text-ink-900">1.</span> Our local team reviews your request and contacts you to confirm a time.</li>
                <li><span className="font-semibold text-ink-900">2.</span> A technician visits for a free onsite estimate.</li>
                <li><span className="font-semibold text-ink-900">3.</span> You approve the recommended work — most repairs are finished within a few hours.</li>
              </ol>
              {site.email && <p className="mt-5 text-sm">Email: <a href={`mailto:${site.email}`} className="font-semibold underline">{site.email}</a></p>}
            </Reveal>
          </div>
          <Reveal variants={slideIn('right')}>
            <QuoteForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
