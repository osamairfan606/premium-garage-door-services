import type { ReactNode } from 'react';
import { m } from 'framer-motion';
import { cn } from '../../lib/cn';
import { fadeUp } from './Reveal';

interface Props {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: 'left' | 'center';
  dark?: boolean;
  className?: string;
}

export default function SectionHeading({ eyebrow, title, lead, align = 'left', dark, className }: Props) {
  return (
    <m.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
      className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}
    >
      {eyebrow && (
        <m.p variants={fadeUp} className={cn('eyebrow', dark && 'eyebrow-light', align === 'center' && 'justify-center')}>
          {eyebrow}
        </m.p>
      )}
      <m.h2 variants={fadeUp} className={cn('mt-4 text-3xl font-semibold leading-[1.1] sm:text-4xl lg:text-[2.75rem]', dark ? 'text-white' : 'text-ink-900')}>
        {title}
      </m.h2>
      {lead && (
        <m.p variants={fadeUp} className={cn('mt-5 text-lg leading-relaxed', dark ? 'text-white/70' : 'text-stone-600')}>
          {lead}
        </m.p>
      )}
    </m.div>
  );
}
