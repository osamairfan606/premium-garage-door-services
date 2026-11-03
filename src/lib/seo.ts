import { site } from '../config/site';
import { locationList } from '../config/locations';
import { services } from '../config/services';
import type { Location } from '../config/locations';
import type { FaqItem } from '../config/locations';

/** GoDaddy serves every page as a folder (/about/), so canonical URLs end with a slash. */
export const canonicalPath = (path: string) => (path === '/' || path.endsWith('/') || /\.[a-z0-9]+$/i.test(path) ? path : `${path}/`);

export const absoluteUrl = (path: string) => `${site.url}${canonicalPath(path)}`;

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${site.url}/#organization`,
    name: site.name,
    alternateName: site.alternateNames,
    legalName: site.legalName,
    url: site.url + '/',
    logo: `${site.url}/images/logo-480.png`,
    contactPoint: [
      { '@type': 'ContactPoint', telephone: '+1-312-626-5158', contactType: 'customer service', areaServed: 'Chicago, IL', availableLanguage: 'English' },
      { '@type': 'ContactPoint', telephone: '+1-463-262-2862', contactType: 'customer service', areaServed: 'Indianapolis, IN', availableLanguage: 'English' },
    ],
    areaServed: locationList.map(l => ({ '@type': 'City', name: l.city, containedInPlace: { '@type': 'State', name: l.state } })),
    knowsAbout: [...services.map(s => s.name), 'Commercial garage door repair', 'Emergency garage door repair'],
    ...(site.social.length ? { sameAs: site.social.map(s => s.href) } : {}),
  };
}

/** WebSite entity for the home page; helps Google show the brand name for searches like "premium garage door services". */
export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    name: site.brandName,
    alternateName: site.alternateNames,
    url: site.url + '/',
    publisher: { '@id': `${site.url}/#organization` },
  };
}

const allWeek = { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: '00:00', closes: '23:59' };

const cityAreaServed = (loc: Location) => [
  { '@type': 'City', name: loc.city, containedInPlace: { '@type': 'State', name: loc.state } },
  ...loc.serviceAreas.map(name => ({ '@type': 'Place', name: `${name}, ${loc.stateCode}` })),
];

const businessId = (loc: Location) => `${absoluteUrl(`/locations/${loc.id}`)}#business`;

/**
 * The city branch as a LocalBusiness (HomeAndConstructionBusiness) for the city page: phone, 24/7 hours and
 * areaServed. It is a service-area business, so the street address is added only once loc.address is verified.
 */
export function localBusinessSchema(loc: Location, offers: { name: string; path: string }[] = []) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': businessId(loc),
    name: site.brandName,
    alternateName: site.alternateNames.filter(n => n !== site.brandName),
    url: absoluteUrl(`/locations/${loc.id}`),
    telephone: loc.phoneE164,
    image: `${site.url}/og-image.jpg`,
    logo: `${site.url}/images/logo-480.png`,
    openingHoursSpecification: [allWeek],
    areaServed: cityAreaServed(loc),
    ...(loc.address
      ? { address: { '@type': 'PostalAddress', streetAddress: loc.address.street, addressLocality: loc.address.city, addressRegion: loc.address.region, postalCode: loc.address.postalCode, addressCountry: 'US' } }
      : {}),
    ...(offers.length
      ? {
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: `Garage door services in ${loc.city}`,
            itemListElement: offers.map(o => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: o.name, url: absoluteUrl(o.path) } })),
          },
        }
      : {}),
    parentOrganization: { '@id': `${site.url}/#organization` },
  };
}

/** A service offered in one city, provided by that city's LocalBusiness entity. */
export function locationSchema(loc: Location, serviceType = 'Garage door repair and installation', path = `/locations/${loc.id}`) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${serviceType} in ${loc.city}, ${loc.stateCode}`,
    serviceType,
    url: absoluteUrl(path),
    areaServed: cityAreaServed(loc),
    provider: { '@type': 'HomeAndConstructionBusiness', '@id': businessId(loc), name: site.brandName, telephone: loc.phoneE164, url: absoluteUrl(`/locations/${loc.id}`) },
    hoursAvailable: allWeek,
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
