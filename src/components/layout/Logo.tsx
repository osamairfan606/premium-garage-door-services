import { Link } from 'react-router-dom';
import { imageManifest } from '../../config/images.generated';
import { site } from '../../config/site';
import { cn } from '../../lib/cn';

export default function Logo({ className, onClick }: { className?: string; onClick?: () => void }) {
  const { width, height } = imageManifest.logo;
  return (
    <Link to="/" onClick={onClick} className={cn('inline-flex shrink-0 items-center', className)} aria-label={`${site.name} — home`}>
      <img src="/images/logo-480.webp" width={width} height={height} alt={site.name} className="h-full w-auto" decoding="async" />
    </Link>
  );
}
