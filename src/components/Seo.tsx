import { Helmet } from 'react-helmet-async';
import { site } from '../config/site';
import { absoluteUrl, organizationSchema } from '../lib/seo';

interface SeoProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  jsonLd?: object[];
  noindex?: boolean;
  /** og:type, e.g. "article" for blog posts */
  type?: 'website' | 'article';
}

export default function Seo({ title, description, path, image = '/og-image.jpg', jsonLd = [], noindex, type = 'website' }: SeoProps) {
  // Add the brand only while the whole title stays within ~60 characters (Google truncates longer titles).
  const suffix = ` | ${site.name}`;
  const fullTitle = title.includes(site.name) || title.length + suffix.length > 60 ? title : `${title}${suffix}`;
  const url = absoluteUrl(path);
  const img = image.startsWith('http') ? image : `${site.url}${image}`;
  return (
    <Helmet prioritizeSeoTags>
      <html lang="en" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, follow" />}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_US" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />
      {[organizationSchema(), ...jsonLd].map((d, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(d)}</script>
      ))}
    </Helmet>
  );
}
