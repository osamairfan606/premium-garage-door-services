import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import Img from '../ui/Img';
import SectionHeading from '../ui/SectionHeading';
import { Reveal, slideIn } from '../ui/Reveal';
import type { Location } from '../../config/locations';
import type { ImageName } from '../../config/images.generated';

interface Card {
  key: 'residential' | 'commercial';
  label: string;
  title: string;
  body: string;
  points: string[];
  image: ImageName;
  alt: string;
}

const cards: Card[] = [
  {
    key: 'residential',
    label: 'For homeowners',
    title: 'Residential garage doors',
    body: 'Your garage door is part of your home’s appearance, security and daily routine. We keep it safe, quiet and reliable — and help you choose a new one when it’s time.',
    points: ['Spring, cable & roller repair', 'Opener repair & installation', 'New door installation & replacement', 'Annual tune-ups & safety checks'],
    image: 'res-house-dusk',
    alt: 'Craftsman home with a lit two-car garage at sunset',
  },
  {
    key: 'commercial',
    label: 'For businesses',
    title: 'Commercial overhead doors',
    body: 'Deliveries, equipment and security depend on doors that open on time, every time. We help businesses reduce disruption with dependable repairs and planned maintenance.',
    points: ['Repairs for business properties', 'Opener service', 'Installation & replacement', 'Planned maintenance'],
    image: 'com-loading-dock',
    alt: 'Commercial loading dock with overhead doors',
  },
];

export default function SegmentSplit({ location }: { location?: Location }) {
  const base = location ? `/locations/${location.id}` : '/services';
  return (
    <section className="section overflow-hidden bg-white">
      <div className="container">
        <SectionHeading
          align="center"
          eyebrow="Residential & commercial"
          title={<>Service built around <span className="accent-serif text-gold-500">your property</span></>}
          lead={location ? `Dedicated residential and commercial garage door service in ${location.label}.` : 'Homes and businesses have different needs. We tailor every visit to the door, the property and how you use it.'}
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {cards.map((c, i) => (
            <Reveal key={c.key} variants={slideIn(i === 0 ? 'left' : 'right')}>
              <Link
                to={`${base}/${c.key}`}
                className="on-dark group relative flex min-h-[560px] flex-col justify-end overflow-hidden rounded-lg bg-ink-900 p-8 text-white md:p-10"
              >
                <Img name={c.image} alt={c.alt} sizes="(min-width: 1024px) 50vw, 100vw" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.06]" />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/70 to-ink-900/10" />
                <div className="relative">
                  <p className="eyebrow eyebrow-light">{c.label}</p>
                  <h3 className="mt-4 text-3xl font-semibold md:text-4xl">{c.title}</h3>
                  <p className="mt-4 max-w-lg leading-relaxed text-white/75">{c.body}</p>
                  <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                    {c.points.map(p => (
                      <li key={p} className="flex items-center gap-2 text-sm text-white/85">
                        <Check className="h-4 w-4 shrink-0 text-gold-300" aria-hidden="true" /> {p}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-8 inline-flex items-center gap-2 rounded-md bg-white/10 px-5 py-3 text-sm font-semibold backdrop-blur transition group-hover:bg-gold-400 group-hover:text-ink-900">
                    Explore {c.key} services{location ? ` in ${location.city}` : ''}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
