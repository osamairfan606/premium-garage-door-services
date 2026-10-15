import { site } from '../config/site';
import type { Location } from '../config/locations';
import type { FaqItem } from '../config/locations';

export const absoluteUrl = (path: string) => `${site.url}${path === '/' ? '/' : path}`;

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${site.url}/#organization`,
    name: site.name,
    legalName: site.legalName,
    url: site.url + '/',
    logo: `${site.url}/images/logo-480.png`,
    contactPoint: [
      { '@type': 'ContactPoint', telephone: '+1-312-626-5158', contactType: 'customer service', areaServed: 'Chicago, IL', availableLanguage: 'English' },
      { '@type': 'ContactPoint', telephone: '+1-463-262-2862', contactType: 'customer service', areaServed: 'Indianapolis, IN', availableLanguage: 'English' },
    ],
    ...(site.social.length ? { sameAs: site.social.map(s => s.href) } : {}),
  };
}

/**
 * Location-level structured data. Uses a Service entity (no address required).
 * A full LocalBusiness entity is emitted only when site.enableLocalBusinessSchema is true
 * AND the location has a verified address.
 */
export function locationSchema(loc: Location, serviceType = 'Garage door repair and installation', path = `/locations/${loc.id}`) {
  if (site.enableLocalBusinessSchema && loc.address) {
    return {
      '@context': 'https://schema.org',
      '@type': 'HomeAndConstructionBusiness',
      name: `${site.name} — ${loc.city}`,
      url: absoluteUrl(path),
      telephone: loc.phoneE164,
      image: `${site.url}/og-image.jpg`,
      openingHours: 'Mo-Su 00:00-23:59',
      address: { '@type': 'PostalAddress', streetAddress: loc.address.street, addressLocality: loc.address.city, addressRegion: loc.address.region, postalCode: loc.address.postalCode, addressCountry: 'US' },
      areaServed: { '@type': 'City', name: `${loc.city}, ${loc.stateCode}` },
      parentOrganization: { '@id': `${site.url}/#organization` },
    };
  }
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${serviceType} in ${loc.city}, ${loc.stateCode}`,
    serviceType,
    url: absoluteUrl(path),
    areaServed: { '@type': 'City', name: loc.city, containedInPlace: { '@type': 'State', name: loc.state } },
    provider: { '@type': 'Organization', '@id': `${site.url}/#organization`, name: site.name, telephone: loc.phoneE164 },
    hoursAvailable: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: '00:00', closes: '23:59' },
  };
}

export function faqSchema(faqs: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
}

export function breadcrumbSchema(items: { label: string; to: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.label, item: absoluteUrl(it.to) })),
  };
}
