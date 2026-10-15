import { Phone } from 'lucide-react';
import type { Location } from '../../config/locations';
import { cn } from '../../lib/cn';

/** Click-to-call link for a specific location. Always uses that location's configured number. */
export default function PhoneLink({ location, className, showIcon = true, label }: { location: Location; className?: string; showIcon?: boolean; label?: string }) {
  return (
    <a
      href={location.phoneHref}
      className={cn('inline-flex items-center gap-2 font-semibold tabular-nums', className)}
      aria-label={`Call ${location.city}: ${location.phoneDisplay}`}
      data-location={location.id}
    >
      {showIcon && <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />}
      <span>{label ?? location.phoneDisplay}</span>
    </a>
  );
}
