import { useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import PageHero from '../components/sections/PageHero';
import Accordion from '../components/ui/Accordion';
import { Reveal } from '../components/ui/Reveal';
import LocationSwitcher from '../components/sections/LocationSwitcher';
import FinalCta from '../components/sections/FinalCta';
import { commercialCopy, generalFaqs, residentialCopy } from '../config/content';
import { locations } from '../config/locations';
import { breadcrumbSchema, faqSchema } from '../lib/seo';
import { cn } from '../lib/cn';
import type { FaqItem } from '../config/locations';

const groups: { id: string; label: string; faqs: FaqItem[]; link?: { to: string; label: string } }[] = [
  { id: 'general', label: 'General', faqs: generalFaqs },
  { id: 'residential', label: 'Residential', faqs: residentialCopy.faqs, link: { to: '/services/residential', label: 'Residential services' } },
  { id: 'commercial', label: 'Commercial', faqs: commercialCopy.faqs, link: { to: '/services/commercial', label: 'Commercial services' } },
  { id: 'chicago', label: 'Chicago', faqs: locations.chicago.faqs, link: { to: '/locations/chicago', label: 'Chicago service area' } },
  { id: 'indianapolis', label: 'Indianapolis', faqs: locations.indianapolis.faqs, link: { to: '/locations/indianapolis', label: 'Indianapolis service area' } },
];

export default function Faqs() {
  const [active, setActive] = useState('general');
  const crumbs = [{ label: 'Home', to: '/' }, { label: 'FAQs', to: '/faqs' }];
  const group = groups.find(g => g.id === active)!;
  return (
    <>
      <Seo
        title="Garage Door FAQs | Repair, Springs, Openers & Estimates"
        description="Answers to common questions about garage door repair, spring replacement, openers, emergency service, free estimates and service in Chicago and Indianapolis."
        path="/faqs"
        jsonLd={[breadcrumbSchema(crumbs), faqSchema(generalFaqs)]}
      />
      <PageHero size="sm" crumbs={crumbs} eyebrow="FAQs" title="Frequently asked" accent="questions." lead="Find answers about garage door repair, installation, maintenance, emergency service, estimates and our service areas." aside={<LocationSwitcher />} />

      <section className="section bg-white">
        <div className="container grid gap-10 lg:grid-cols-[260px_1fr] lg:gap-16">
          <Reveal className="min-w-0">
            <div role="tablist" aria-label="FAQ topics" className="flex gap-2 overflow-x-auto pb-2 lg:sticky lg:top-28 lg:flex-col lg:overflow-visible">
              {groups.map(g => (
                <button
                  key={g.id}
                  role="tab"
                  type="button"
                  aria-selected={active === g.id}
                  aria-controls="faq-panel"
                  onClick={() => setActive(g.id)}
                  className={cn('shrink-0 rounded-md px-4 py-3 text-left text-sm font-semibold transition', active === g.id ? 'bg-ink-900 text-white' : 'bg-stone-100 text-stone-700 hover:bg-stone-200')}
                >
                  {g.label} <span className={cn('ml-1 text-xs', active === g.id ? 'text-gold-300' : 'text-stone-400')}>{g.faqs.length}</span>
                </button>
              ))}
            </div>
          </Reveal>
          <div id="faq-panel" className="min-w-0" role="tabpanel" aria-label={`${group.label} questions`}>
            <h2 className="mb-6 text-3xl font-semibold text-ink-900">{group.label} <span className="accent-serif text-gold-500">questions</span></h2>
            <Accordion key={group.id} items={group.faqs} />
            {group.link && (
              <Link to={group.link.to} className="link-underline mt-6 inline-block font-semibold text-gold-600">{group.link.label} →</Link>
            )}
          </div>
        </div>
      </section>
      <FinalCta title="Still have a question?" body="Our team is available 24/7. Call the line for your city or send us a request and we’ll get back to you." />
    </>
  );
}
