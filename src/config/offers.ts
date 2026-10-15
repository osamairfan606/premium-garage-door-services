import type { ImageName } from './images.generated';

/**
 * Offers published on the original premiumdoorservices.com website.
 * No expiry dates or fine print were listed on the source site, so each offer
 * is shown as "mention when you call" and must be confirmed by phone.
 *
 * To retire an offer, set `active: false`. To add an expiry, set `expires` (YYYY-MM-DD);
 * offers past their expiry date are hidden automatically.
 */
export interface Offer {
  id: string;
  active: boolean;
  value: string; // big display value
  title: string;
  description: string;
  image?: ImageName;
  expires?: string;
}

export const offers: Offer[] = [
  { id: 'repairs-20', active: true, value: 'Up to 20%', title: 'Off garage door repairs', description: 'Limited-time savings on garage door repairs. Mention this offer when you call.' },
  { id: 'new-customer-18', active: true, value: '18%', title: 'Off for new customers', description: 'Exclusive savings for first-time customers — call now to redeem.', image: 'offer-1' },
  { id: 'opener-15', active: true, value: '15%', title: 'Off opener repair or replacement', description: 'Upgrade or repair your garage door opener and save.', image: 'offer-2' },
  { id: 'spring-15', active: true, value: '15%', title: 'Off spring services', description: 'Save on garage door spring repair and replacement.', image: 'offer-3' },
  { id: 'cable-10', active: true, value: '10%', title: 'Off cable repair or replacement', description: 'Restore performance and save on cable repair.', image: 'offer-4' },
  { id: 'new-door-estimate', active: true, value: 'Free', title: 'Estimate on new doors', description: 'Get a free onsite estimate for your new garage door.', image: 'offer-5' },
  { id: 'tune-up-49', active: true, value: '$49', title: 'Garage door tune-up', description: 'Keep your door running smoothly — book your tune-up today.', image: 'offer-6' },
];

export const OFFER_TERMS =
  'Offers are subject to availability and eligibility, which our team will confirm when you call. Please mention the offer when booking. Offers may change or end without notice.';

export function activeOffers(today = new Date()) {
  const iso = today.toISOString().slice(0, 10);
  return offers.filter(o => o.active && (!o.expires || o.expires >= iso));
}

export function getOffer(id: string | undefined) {
  return activeOffers().find(o => o.id === id);
}
