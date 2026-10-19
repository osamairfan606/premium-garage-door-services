import { Link } from 'react-router-dom';
import Accordion from '../ui/Accordion';
import SectionHeading from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';
import type { FaqItem, Location } from '../../config/locations';
import { locationList } from '../../config/locations';

export function FaqSection({ faqs, title, eyebrow = 'FAQs', lead, location, id = 'faqs' }: { faqs: FaqItem[]; title?: React.ReactNode; eyebrow?: string; lead?: string; location?: Location; id?: string }) {
  const contacts = location ? [location] : locationList;
  return (
    <section id={id} className="section bg-white">
      <div className="container grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <SectionHeading
            eyebrow={eyebrow}
            title={title ?? <>Frequently asked <span className="accent-serif text-gold-500">questions</span></>}
            lead={lead ?? 'Answers to common questions about garage door repair, installation, maintenance, emergency service and estimates.'}
          />
          <Reveal className="mt-8 rounded-lg border border-stone-200 bg-stone-50 p-6">
            <p className="font-semibold text-ink-900">Still have a question?</p>
            <p className="mt-1 text-sm text-stone-600">Talk to a real person, 24/7.</p>
            <ul className="mt-4 space-y-2">
              {contacts.map(l => (
                <li key={l.id}>
                  <a href={l.phoneHref} data-location={l.id} className="flex items-center justify-between text-sm">
                    <span className="text-stone-600">{l.label}</span>
                    <span className="font-semibold text-ink-900 tabular-nums hover:text-gold-600">{l.phoneDisplay}</span>
                  </a>
                </li>
              ))}
            </ul>
            <Link to="/faqs" className="link-underline mt-4 inline-block text-sm font-semibold text-gold-600">See all FAQs</Link>
          </Reveal>
        </div>
        <Reveal>
          <Accordion items={faqs} />
        </Reveal>
      </div>
    </section>
  );
}

export { default as Reviews } from './Reviews';
