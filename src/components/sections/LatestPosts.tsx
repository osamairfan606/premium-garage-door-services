import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import Img from '../ui/Img';
import { Stagger, StaggerItem } from '../ui/Reveal';
import { blogPosts, formatDate, type BlogPost } from '../../lib/blog';

/** Post cards; used for "Latest tips" on the home page and "Related articles" on service pages. */
export function PostCards({ posts }: { posts: BlogPost[] }) {
  return (
    <Stagger className="grid gap-6 md:grid-cols-3" stagger={0.06}>
      {posts.map(p => (
        <StaggerItem key={p.slug} as="article" className="group flex flex-col overflow-hidden rounded-xl border border-stone-200 bg-white transition hover:-translate-y-1 hover:shadow-card">
          {p.image && (
            <div className="aspect-[16/10] overflow-hidden bg-stone-200">
              <Img name={p.image} alt="" sizes="(min-width: 768px) 33vw, 100vw" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
          )}
          <div className="flex flex-1 flex-col p-6">
            <p className="text-[13px] text-stone-600"><time dateTime={p.date}>{formatDate(p.date)}</time> · {p.readingMinutes} min read</p>
            <h3 className="mt-2 text-lg font-semibold leading-snug text-ink-900">
              <Link to={`/blog/${p.slug}`} className="after:absolute after:inset-0 hover:text-gold-600 [&]:relative">{p.title}</Link>
            </h3>
            <p className="mt-2 line-clamp-3 flex-1 text-[15px] leading-relaxed text-stone-600">{p.description}</p>
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

export default function LatestPosts() {
  const posts = blogPosts.slice(0, 3);
  if (!posts.length) return null;
  return (
    <section className="section bg-stone-50" aria-labelledby="latest-tips">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Garage door tips" title={<span id="latest-tips">Latest from our <span className="accent-serif text-gold-500">blog</span></span>} />
          <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-600 hover:text-ink-900">
            All articles <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-10"><PostCards posts={posts} /></div>
      </div>
    </section>
  );
}
