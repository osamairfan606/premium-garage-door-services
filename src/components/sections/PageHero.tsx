import { useRef, type ReactNode } from 'react';
import { m, useScroll, useTransform } from 'framer-motion';
import Img from '../ui/Img';
import Breadcrumbs, { type Crumb } from '../ui/Breadcrumbs';
import type { ImageName } from '../../config/images.generated';
import { cn } from '../../lib/cn';

const EASE = [0.22, 1, 0.36, 1] as const;

interface Props {
  eyebrow?: string;
  title: ReactNode;
  accent?: ReactNode;
  lead?: ReactNode;
  image?: ImageName;
  imageAlt?: string;
  crumbs?: Crumb[];
  children?: ReactNode;
  aside?: ReactNode;
  size?: 'lg' | 'md' | 'sm';
}

/** Full-bleed dark hero with subtle parallax and staggered text entrance. */
export default function PageHero({ eyebrow, title, accent, lead, image, imageAlt = '', crumbs, children, aside, size = 'md' }: Props) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1.04, 1.12]);

  return (
    <section
      ref={ref}
      className={cn(
        'on-dark grain relative isolate flex items-end overflow-hidden bg-ink-900 text-white',
        size === 'lg' && 'min-h-[88svh] pb-20 pt-40 md:pb-24',
        size === 'md' && 'min-h-[68svh] pb-16 pt-40 md:pb-20',
        size === 'sm' && 'pb-14 pt-36 md:pb-16 md:pt-44',
      )}
    >
      {image && (
        <m.div style={{ y, scale }} className="absolute inset-0 -z-20 will-change-transform">
          <Img name={image} alt={imageAlt} priority sizes="100vw" className="h-full w-full object-cover" />
        </m.div>
      )}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-900 via-ink-900/75 to-ink-900/30" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-900/85 via-ink-900/40 to-transparent" />
      {!image && <div aria-hidden="true" className="panel-lines absolute inset-0 -z-10" />}

      <div className="container relative">
        <div className={cn('grid items-end gap-12', !!aside && 'lg:grid-cols-[1.25fr_1fr]')}>
          <m.div initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } } }}>
            {crumbs && (
              <m.div variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.6 } } }} className="mb-8">
                <Breadcrumbs items={crumbs} />
              </m.div>
            )}
            {eyebrow && (
              <m.p variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } }} className="eyebrow eyebrow-light">
                {eyebrow}
              </m.p>
            )}
            <h1 className={cn('mt-5 max-w-4xl font-semibold leading-[1.02]', size === 'sm' ? 'text-4xl sm:text-5xl' : 'text-[2.6rem] sm:text-6xl lg:text-7xl')}>
              <m.span className="block" variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } } }}>
                {title}
              </m.span>
              {accent && (
                <m.span className="accent-serif block text-gold-200" variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } } }}>
                  {accent}
                </m.span>
              )}
            </h1>
            {lead && (
              <m.p variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } } }} className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75 md:text-xl">
                {lead}
              </m.p>
            )}
            {children && (
              <m.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } } }} className="mt-9 flex flex-wrap items-center gap-3">
                {children}
              </m.div>
            )}
          </m.div>
          {aside && (
            <m.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.45, ease: EASE }}>
              {aside}
            </m.div>
          )}
        </div>
      </div>
    </section>
  );
}
