import { Link } from 'react-router-dom';
import { ArrowRight, CalendarCheck, CalendarDays, Clock, Phone } from 'lucide-react';
import Seo from '../components/Seo';
import PageHero from '../components/sections/PageHero';
import Button from '../components/ui/Button';
import CallChooser from '../components/layout/CallChooser';
import QuoteSection from '../components/sections/QuoteSection';
import { blogPosts, formatDate, getPost } from '../lib/blog';
import { absoluteUrl, breadcrumbSchema } from '../lib/seo';
import { imageSrc } from '../components/ui/Img';
import { getLocation } from '../config/locations';
import { services } from '../config/services';
import { site } from '../config/site';
import NotFound from './NotFound';

export default function BlogPost({ slug }: { slug: string }) {
  const post = getPost(slug);
  if (!post) return <NotFound />;
  const loc = getLocation(post.city);
  const path = `/blog/${post.slug}`;
  const crumbs = [{ label: 'Home', to: '/' }, { label: 'Blog', to: '/blog' }, { label: post.title, to: path }];
  const image = post.image ? `${site.url}${imageSrc(post.image, 1280)}` : `${site.url}/og-image.jpg`;
  const more = blogPosts.filter(p => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <Seo
        title={post.title}
        description={post.description}
        path={path}
        image={image}
        type="article"
        jsonLd={[
          breadcrumbSchema(crumbs),
          {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.description,
            image,
            datePublished: post.date,
            dateModified: post.updated ?? post.date,
            author: { '@type': 'Organization', name: post.author, url: site.url + '/' },
            publisher: { '@id': `${site.url}/#organization` },
            mainEntityOfPage: absoluteUrl(path),
            keywords: post.tags.join(', ') || undefined,
          },
        ]}
      />
      <PageHero size="sm" crumbs={crumbs} eyebrow={post.tags[0] ?? 'Garage door tips'} title={post.title} image={post.image} imageAlt={post.imageAlt}>
        <p className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-white/70">
          <span className="flex items-center gap-1.5"><CalendarDays className="h-4 w-4" aria-hidden="true" /><time dateTime={post.date}>{formatDate(post.date)}</time></span>
          {post.updated && <span>Updated <time dateTime={post.updated}>{formatDate(post.updated)}</time></span>}
          <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" aria-hidden="true" />{post.readingMinutes} min read</span>
        </p>
      </PageHero>

      <section className="section bg-white">
        <div className="container grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16">
          <article className="article-body max-w-3xl" dangerouslySetInnerHTML={{ __html: post.html }} />

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="on-dark rounded-xl bg-ink-900 p-6 text-white">
              <p className="text-[11px] font-semibold uppercase tracking-eyebrow text-gold-300">Need help now?</p>
              <p className="mt-2 text-lg font-semibold">Free onsite estimates, 24/7 emergency service.</p>
              <div className="mt-5 grid gap-2">
                {loc ? (
                  <a href={loc.phoneHref} data-location={loc.id} className="flex items-center justify-center gap-2 rounded-md bg-gold-400 px-4 py-3 font-semibold text-ink-900 tabular-nums hover:bg-gold-300">
                    <Phone className="h-4 w-4" aria-hidden="true" /> {loc.city}: {loc.phoneDisplay}
                  </a>
                ) : (
                  <CallChooser align="left" buttonClassName="w-full justify-center" />
                )}
                <Button to={`/contact${loc ? `?location=${loc.id}` : ''}`} variant="outline-light" className="w-full">
                  <CalendarCheck className="h-4 w-4" aria-hidden="true" /> Request an estimate
                </Button>
              </div>
            </div>
            <nav aria-label="Our services" className="rounded-xl border border-stone-200 p-6">
              <p className="font-semibold text-ink-900">Our services</p>
              <ul className="mt-3 space-y-1.5 text-[15px]">
                {services.map(s => (
                  <li key={s.slug}><Link to={`/services/${s.slug}`} className="text-stone-600 hover:text-gold-600">{s.name}</Link></li>
                ))}
                <li><Link to="/services/commercial" className="text-stone-600 hover:text-gold-600">Commercial Garage Doors</Link></li>
              </ul>
            </nav>
          </aside>
        </div>
      </section>

      {more.length > 0 && (
        <section className="section-tight bg-stone-50">
          <div className="container">
            <h2 className="text-2xl font-semibold text-ink-900">More garage door tips</h2>
            <ul className="mt-6 grid gap-5 md:grid-cols-3">
              {more.map(p => (
                <li key={p.slug} className="rounded-xl border border-stone-200 bg-white p-6">
                  <Link to={`/blog/${p.slug}`} className="font-semibold leading-snug text-ink-900 hover:text-gold-600">{p.title}</Link>
                  <p className="mt-2 text-sm text-stone-500">{formatDate(p.date)}</p>
                </li>
              ))}
            </ul>
            <Link to="/blog" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-600 hover:text-ink-900">
              All articles <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      )}
      <QuoteSection location={loc} />
    </>
  );
}
