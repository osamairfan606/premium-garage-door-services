import type { ImgHTMLAttributes } from 'react';
import { imageManifest, type ImageName } from '../../config/images.generated';

interface ImgProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet' | 'width' | 'height'> {
  name: ImageName;
  alt: string;
  sizes?: string;
  /** Above-the-fold images load eagerly with high priority. */
  priority?: boolean;
}

export function imageSrc(name: ImageName, preferWidth = 1280) {
  const m = imageManifest[name];
  const w = [...m.widths].reverse().find(x => x <= preferWidth) ?? m.widths[0];
  return `/images/${name}-${w}.webp`;
}

/** Responsive WebP image with intrinsic dimensions (no layout shift) and lazy loading by default. */
export default function Img({ name, alt, sizes = '100vw', priority, className, ...rest }: ImgProps) {
  const m = imageManifest[name];
  const srcSet = m.widths.map(w => `/images/${name}-${w}.webp ${w}w`).join(', ');
  const extra = priority ? { fetchpriority: 'high' } : {};
  return (
    <img
      src={imageSrc(name)}
      srcSet={srcSet}
      sizes={sizes}
      width={m.width}
      height={m.height}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      className={className}
      {...extra}
      {...rest}
    />
  );
}
