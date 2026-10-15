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
}

export default function Seo({ title, description, path, image = '/og-image.jpg', jsonLd = [], noindex }: SeoProps) {
  const fullTitle = title.includes(site.name) || title.length > 52 ? title : `${title} | ${site.name}`;
  const url = absoluteUrl(path);
  const img = image.startsWith('http') ? image : `${site.url}${image}`;
  return (
    <Helmet prioritizeSeoTags>
      <html lang="en" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, follow" />}
      <meta property="og:type" content="website" />
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
