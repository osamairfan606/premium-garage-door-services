import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Icon from '../ui/Icon';
import SectionHeading from '../ui/SectionHeading';
import { Stagger, StaggerItem } from '../ui/Reveal';
import { cityServiceKinds, cityServicePath, cityServicesFor, type CityServiceKind } from '../../config/cityServices';
import type { Location } from '../../config/locations';

/** Links to a city's own service pages (e.g. /locations/chicago/broken-spring-repair/). */
export default function CityServiceLinks({ loc, exclude, title }: { loc: Location; exclude?: CityServiceKind; title?: React.ReactNode }) {
  const pages = cityServicesFor(loc.id).filter(p => p.kind !== exclude);
  return (
    <section className="section-tight bg-stone-50" aria-labelledby={`city-services-${loc.id}`}>
      <div className="container">
        <SectionHeading
          eyebrow={`Popular in ${loc.city}`}
          title={<span id={`city-services-${loc.id}`}>{title ?? <>Garage door services in <span className="accent-serif text-gold-500">{loc.city}</span></>}</span>}
        />
        <Stagger as="ul" className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.05}>
          {pages.map(p => {
            const info = cityServiceKinds[p.kind];
            return (
              <StaggerItem as="li" key={p.kind}>
                <Link to={cityServicePath(p)} className="group flex h-full items-center gap-4 rounded-lg border border-stone-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-gold-300 hover:shadow-card">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-ink-900 text-gold-300"><Icon name={info.icon} className="h-5 w-5" /></span>
                  <span className="flex-1 font-semibold leading-snug text-ink-900">{info.name} <span className="font-normal text-stone-600">in {loc.city}</span></span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-gold-500 transition group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
