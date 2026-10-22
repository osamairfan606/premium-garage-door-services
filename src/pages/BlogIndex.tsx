import { Link } from 'react-router-dom';
import { ArrowRight, CalendarDays, Clock } from 'lucide-react';
import Seo from '../components/Seo';
import PageHero from '../components/sections/PageHero';
import Img from '../components/ui/Img';
import { Stagger, StaggerItem } from '../components/ui/Reveal';
import FinalCta from '../components/sections/FinalCta';
import { blogPosts, formatDate } from '../lib/blog';
import { absoluteUrl, breadcrumbSchema } from '../lib/seo';
import { site } from '../config/site';

const path = '/blog';
const crumbs = [{ label: 'Home', to: '/' }, { label: 'Blog', to: path }];

export default function BlogIndex() {
  return (
    <>
      <Seo
        title="Garage Door Tips & Guides | Blog"
        description="Garage door repair tips, maintenance checklists and buying guides for homeowners and businesses in Chicago and Indianapolis from Premium Garage Door Services."
        path={path}
        jsonLd={[
          breadcrumbSchema(crumbs),
          {
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: `${site.brandName} Blog`,
            url: absoluteUrl(path),
            publisher: { '@id': `${site.url}/#organization` },
            blogPost: blogPosts.slice(0, 20).map(p => ({ '@type': 'BlogPosting', headline: p.title, url: absoluteUrl(`/blog/${p.slug}`), datePublished: p.date })),
          },
        ]}
      />
      <PageHero size="sm" crumbs={crumbs} eyebrow="Blog" title="Garage door tips" accent="& guides." lead="Practical advice on repairs, maintenance, openers and new doors from our Chicago and Indianapolis technicians." />

      <section className="section bg-stone-50">
        <div className="container">
          {blogPosts.length === 0 ? (
            <p className="text-center text-stone-600">New articles are coming soon.</p>
          ) : (
            <Stagger className="grid gap-7 md:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
              {blogPosts.map(p => (
                <StaggerItem key={p.slug} as="article" className="group flex flex-col overflow-hidden rounded-xl border border-stone-200 bg-white transition hover:-translate-y-1 hover:shadow-card">
                  {p.image && (
                    <Link to={`/blog/${p.slug}`} className="block aspect-[16/10] overflow-hidden bg-stone-200" tabIndex={-1} aria-hidden="true">
                      <Img name={p.image} alt="" sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    </Link>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <p className="flex items-center gap-4 text-[13px] text-stone-500">
                      <span className="flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5" aria-hidden="true" /><time dateTime={p.date}>{formatDate(p.date)}</time></span>
                      <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" aria-hidden="true" />{p.readingMinutes} min read</span>
                    </p>
                    <h2 className="mt-3 text-xl font-semibold leading-snug text-ink-900">
                      <Link to={`/blog/${p.slug}`} className="hover:text-gold-600">{p.title}</Link>
                    </h2>
                    <p className="mt-2 flex-1 leading-relaxed text-stone-600">{p.description}</p>
                    <Link to={`/blog/${p.slug}`} className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-600 hover:text-ink-900" aria-label={`Read: ${p.title}`}>
                      Read article <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          )}
        </div>
      </section>
      <FinalCta />
    </>
  );
}
