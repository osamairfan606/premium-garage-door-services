/**
 * Company-wide business facts. Everything here is taken from the original
 * premiumdoorservices.com website unless marked as a configurable placeholder.
 */
export const site = {
  name: 'Premium Garage Door',
  /** Legal name as printed in the original site's footer. Confirm exact capitalisation with the owner. */
  legalName: 'Premium Garage Door Service LLC',
  /** Brand name used in search titles and WebSite schema. */
  brandName: 'Premium Garage Door Services',
  /** Other names customers search for; used as schema alternateName. */
  alternateNames: ['Premium Garage Door Services', 'Premium Garage Door Service', 'Premium Door Services', 'Premium Garage Door Service LLC'],
  tagline: 'Garage Door Repair | Installation | Service',
  /**
   * Production origin used for canonical URLs, Open Graph tags and the sitemap.
   * Override at build time with VITE_SITE_URL (no trailing slash).
   */
  url: (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, '') || 'https://premiumdoorservices.com',
  hours: 'Open 24/7',
  /** Confirmed on the original site: "24/7 emergency services" and "same-day repair". */
  offers24x7Emergency: true,
  offersSameDay: true,
  /** Leave empty until genuine company profiles are supplied. Example: { label: 'Facebook', href: 'https://facebook.com/…' } */
  social: [] as { label: string; href: string }[],
  /** Optional public contact email. Leave empty to hide. */
  email: '',
  /**
   * LocalBusiness structured data requires a verified physical address.
   * Keep false until street addresses are confirmed in locations.ts.
   */
  enableLocalBusinessSchema: false,
  legal: {
    effectiveDate: 'October 15, 2026',
  },
} as const;

export type Site = typeof site;
