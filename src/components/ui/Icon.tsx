import {
  Wrench, Radio, Warehouse, Route, Cable, CircleDot, PanelsTopLeft, Gauge, ShieldCheck, Clock3, Award, ThumbsUp,
  CalendarDays, ScanSearch, ClipboardCheck, CircleCheck, Building2, House, Phone, Tag, type LucideProps,
} from 'lucide-react';
import type { ComponentType } from 'react';
import type { IconName } from '../../config/services';

/** Custom coil-spring glyph drawn in the same style as Lucide icons. */
function SpringIcon({ size = 24, strokeWidth = 1.75, ...props }: LucideProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="M4 12c0-4 2-4 2 0s2 4 2 0 2-4 2 0 2 4 2 0 2-4 2 0 2 4 2 0 2-4 2 0" />
    </svg>
  );
}

const map: Record<IconName, ComponentType<LucideProps>> = {
  wrench: Wrench, spring: SpringIcon, opener: Radio, door: Warehouse, track: Route, cable: Cable, roller: CircleDot,
  panel: PanelsTopLeft, tune: Gauge, shield: ShieldCheck, clock: Clock3, badge: Award, thumbs: ThumbsUp,
  calendar: CalendarDays, search: ScanSearch, clipboard: ClipboardCheck, check: CircleCheck, building: Building2,
  home: House, phone: Phone, tag: Tag,
};

export default function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const C = map[name];
  return <C strokeWidth={1.6} aria-hidden="true" {...props} />;
}
