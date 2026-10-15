import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Icon from '../ui/Icon';
import SectionHeading from '../ui/SectionHeading';
import { Stagger, StaggerItem } from '../ui/Reveal';
import { services, type Service } from '../../config/services';
import { cn } from '../../lib/cn';

export function ServiceCard({ service, index, dark }: { service: Service; index: number; dark?: boolean }) {
  return (
    <Link
      to={`/services/${service.slug}`}
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-lg border p-7 transition-all duration-500 hover:-translate-y-1',
        dark ? 'border-white/10 bg-ink-800 hover:border-gold-400/40 hover:bg-ink-700' : 'border-stone-200 bg-white shadow-card hover:border-gold-300 hover:shadow-lift',
      )}
    >
      {/* Gold rule that draws across on hover */}
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-gold-500 via-gold-300 to-gold-500 transition-transform duration-500 group-hover:scale-x-100" />
      <div className="flex items-start justify-between">
        <span className={cn('grid h-14 w-14 place-items-center rounded-md border transition-all duration-500 group-hover:rotate-[-4deg] group-hover:scale-105', dark ? 'border-gold-400/25 bg-gold-400/10 text-gold-300' : 'border-gold-200 bg-gold-50 text-gold-600')}>
          <Icon name={service.icon} className="h-7 w-7" />
        </span>
        <span className={cn('font-display text-sm font-semibold tabular-nums', dark ? 'text-white/25' : 'text-stone-300')}>{String(index + 1).padStart(2, '0')}</span>
      </div>
      <h3 className={cn('mt-7 text-xl font-semibold', dark ? 'text-white' : 'text-ink-900')}>{service.name}</h3>
      <p className={cn('mt-3 flex-1 leading-relaxed', dark ? 'text-white/65' : 'text-stone-600')}>{service.summary}</p>
      <ul className="mt-5 flex flex-wrap gap-1.5">
        {service.includes.slice(0, 3).map(i => (
          <li key={i} className={cn('rounded-full px-2.5 py-1 text-[12px] font-medium', dark ? 'bg-white/5 text-white/60' : 'bg-stone-100 text-stone-600')}>{i}</li>
        ))}
      </ul>
      <span className={cn('mt-7 inline-flex items-center gap-1.5 text-sm font-semibold', dark ? 'text-gold-300' : 'text-gold-600')}>
        Learn more <span className="sr-only">about {service.name}</span>
        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </Link>
  );
}

export default function ServicesGrid({
  eyebrow = 'Our services',
  title,
  lead,
  dark,
  limit,
  id,
}: { eyebrow?: string; title?: React.ReactNode; lead?: string; dark?: boolean; limit?: number; id?: string }) {
  const list = limit ? services.slice(0, limit) : services;
  return (
    <section id={id} className={cn('section', dark ? 'on-dark bg-ink-900' : 'bg-stone-50')}>
      <div className="container">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            dark={dark}
            eyebrow={eyebrow}
            title={title ?? <>Every garage door service, <span className="accent-serif text-gold-500">one trusted team</span></>}
            lead={lead ?? 'Free onsite estimates for repair, installation, opener setup, spring replacement, cable repair, maintenance and full garage door system upgrades.'}
          />
          <Link to="/services" className={cn('link-underline shrink-0 pb-1 text-sm font-semibold', dark ? 'text-gold-300' : 'text-ink-900')}>
            View all services →
          </Link>
        </div>
        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
          {list.map((s, i) => (
            <StaggerItem key={s.slug}>
              <ServiceCard service={s} index={i} dark={dark} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
