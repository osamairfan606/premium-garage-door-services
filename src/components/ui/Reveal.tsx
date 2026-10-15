import { m, type HTMLMotionProps, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

const EASE = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.9, ease: EASE } },
};

export const slideIn = (dir: 'left' | 'right'): Variants => ({
  hidden: { opacity: 0, x: dir === 'left' ? -40 : 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.85, ease: EASE } },
});

type Tag = 'div' | 'section' | 'li' | 'article' | 'header' | 'ul' | 'ol' | 'dl';

type RevealProps = Omit<HTMLMotionProps<'div'>, 'children'> & {
  children: ReactNode;
  variants?: Variants;
  delay?: number;
  as?: Tag;
};

/** Scroll-triggered reveal. Animates once when 15% of the element is visible. */
export function Reveal({ children, variants = fadeUp, delay = 0, as = 'div', ...rest }: RevealProps) {
  const Comp = m[as] as typeof m.div;
  return (
    <Comp
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={variants}
      transition={delay ? { delay } : undefined}
      {...rest}
    >
      {children}
    </Comp>
  );
}

type StaggerProps = Omit<HTMLMotionProps<'div'>, 'children'> & {
  children: ReactNode;
  stagger?: number;
  as?: Tag;
};

/** Parent container that staggers <StaggerItem> children into view. */
export function Stagger({ children, stagger = 0.09, as = 'div', ...rest }: StaggerProps) {
  const Comp = m[as] as typeof m.div;
  return (
    <Comp
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

export function StaggerItem({ children, as = 'div', variants = fadeUp, ...rest }: Omit<HTMLMotionProps<'div'>, 'children'> & { children: ReactNode; as?: Tag; variants?: Variants }) {
  const Comp = m[as] as typeof m.div;
  return (
    <Comp variants={variants} {...rest}>
      {children}
    </Comp>
  );
}
