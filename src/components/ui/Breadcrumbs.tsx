import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export interface Crumb {
  label: string;
  to: string;
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-[13px]">
      <ol className="flex flex-wrap items-center gap-1.5 text-white/60">
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={c.to} className="flex items-center gap-1.5">
              {last ? (
                <span aria-current="page" className="text-gold-200">{c.label}</span>
              ) : (
                <>
                  <Link to={c.to} className="transition hover:text-white">{c.label}</Link>
                  <ChevronRight className="h-3.5 w-3.5 opacity-50" aria-hidden="true" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
