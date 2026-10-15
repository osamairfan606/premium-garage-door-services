import { Link } from 'react-router-dom';
import type { ReactNode, MouseEventHandler } from 'react';
import { cn } from '../../lib/cn';

type Variant = 'gold' | 'dark' | 'outline-light' | 'outline-dark' | 'white';
type Size = 'sm' | 'md' | 'lg';

const base =
  'group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-md font-semibold tracking-[0.01em] transition-[background-color,color,box-shadow,transform,border-color] duration-300 ease-out active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60 whitespace-nowrap';

const variants: Record<Variant, string> = {
  gold: 'bg-gold-400 text-ink-900 shadow-gold hover:bg-gold-300 hover:-translate-y-0.5',
  dark: 'bg-ink-900 text-white hover:bg-ink-700 shadow-lift hover:-translate-y-0.5',
  white: 'bg-white text-ink-900 hover:bg-stone-100 shadow-card hover:-translate-y-0.5',
  'outline-light': 'border border-white/30 bg-white/[0.04] text-white backdrop-blur-sm hover:border-gold-300 hover:text-gold-100',
  'outline-dark': 'border border-ink-900/20 bg-transparent text-ink-900 hover:border-ink-900',
};

const sizes: Record<Size, string> = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-12 px-6 text-[15px]',
  lg: 'h-14 px-7 text-base',
};

interface Props {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  to?: string;
  href?: string;
  type?: 'button' | 'submit';
  onClick?: MouseEventHandler;
  disabled?: boolean;
  'aria-label'?: string;
}

/** Light sweep shown on hover for the primary (gold) button. */
const Sheen = () => (
  <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/40 opacity-0 transition-all duration-700 ease-out group-hover:left-[120%] group-hover:opacity-100" />
);

export default function Button({ children, variant = 'gold', size = 'md', className, to, href, type = 'button', onClick, disabled, ...aria }: Props) {
  const cls = cn(base, variants[variant], sizes[size], className);
  const inner = (
    <>
      {variant === 'gold' && <Sheen />}
      <span className="relative inline-flex items-center gap-2.5">{children}</span>
    </>
  );
  if (to) return <Link to={to} className={cls} onClick={onClick} {...aria}>{inner}</Link>;
  if (href) return <a href={href} className={cls} onClick={onClick} {...aria}>{inner}</a>;
  return <button type={type} className={cls} onClick={onClick} disabled={disabled} {...aria}>{inner}</button>;
}
