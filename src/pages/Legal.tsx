import type { ReactNode } from 'react';
import Seo from '../components/Seo';
import PageHero from '../components/sections/PageHero';
import { site } from '../config/site';
import { breadcrumbSchema } from '../lib/seo';

export interface LegalSection {
  title: string;
  body: ReactNode;
  /** Anchor id; defaults to s1, s2, … */
  id?: string;
}

export default function Legal({ title, path, description, sections }: { title: string; path: string; description: string; sections: LegalSection[] }) {
  const crumbs = [{ label: 'Home', to: '/' }, { label: title, to: path }];
  return (
    <>
      <Seo title={title} description={description} path={path} jsonLd={[breadcrumbSchema(crumbs)]} />
      <PageHero size="sm" crumbs={crumbs} eyebrow="Legal" title={title} lead={`Effective ${site.legal.effectiveDate}`} />
      <section className="section bg-white">
        <div className="container grid gap-12 lg:grid-cols-[240px_1fr]">
          <nav aria-label="On this page" className="hidden lg:block">
            <ul className="sticky top-28 space-y-2 text-sm">
              {sections.map((s, i) => (
                <li key={s.title}><a href={`#${s.id ?? `s${i + 1}`}`} className="text-stone-600 hover:text-ink-900">{i + 1}. {s.title}</a></li>
              ))}
            </ul>
          </nav>
          <article className="max-w-3xl space-y-10 text-[17px] leading-relaxed text-stone-700">
            {sections.map((s, i) => (
              <section key={s.title} id={s.id ?? `s${i + 1}`} className="scroll-mt-28">
                <h2 className="text-2xl font-semibold text-ink-900">{i + 1}. {s.title}</h2>
                <div className="mt-3 space-y-3 [&_a]:font-semibold [&_a]:text-ink-900 [&_a]:underline [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">{s.body}</div>
              </section>
            ))}
            <p className="rounded-md border border-stone-200 bg-stone-50 p-4 text-sm text-stone-500">
              This document is provided as a general template and should be reviewed by a qualified legal professional before publication.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
