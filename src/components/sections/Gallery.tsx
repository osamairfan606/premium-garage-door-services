import Img from '../ui/Img';
import SectionHeading from '../ui/SectionHeading';
import { Stagger, StaggerItem } from '../ui/Reveal';
import { gallery } from '../../config/content';
import { imageManifest } from '../../config/images.generated';
import { cn } from '../../lib/cn';

export default function Gallery() {
  const hasStock = gallery.some(g => imageManifest[g.image].source === 'stock');
  return (
    <section className="section bg-white">
      <div className="container">
        <SectionHeading
          eyebrow="Garage doors we service"
          title={<>Residential & commercial <span className="accent-serif text-gold-500">door systems</span></>}
          lead="From raised-panel doors on family homes to overhead doors on warehouses and service bays — our team repairs, maintains and installs a wide range of garage door systems."
        />
        <Stagger className="mt-14 grid auto-rows-[220px] grid-cols-2 gap-3 md:auto-rows-[260px] md:grid-cols-3 md:gap-4" stagger={0.06}>
          {gallery.map((g, i) => (
            <StaggerItem key={g.image} className={cn('group relative overflow-hidden rounded-lg bg-stone-200', g.tall && 'row-span-2', i === 0 && 'col-span-2 md:col-span-1')}>
              <Img name={g.image} alt={g.alt} sizes="(min-width: 768px) 33vw, 50vw" className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.07]" />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink-900/70 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink-900 backdrop-blur">{g.caption}</span>
            </StaggerItem>
          ))}
        </Stagger>
        {hasStock && (
          <p className="mt-5 text-xs text-stone-500">
            Some images are licensed stock photography shown for illustration and are not photos of specific Premium Garage Door projects.
          </p>
        )}
      </div>
    </section>
  );
}
