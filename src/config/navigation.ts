import { locationList } from './locations';
import { services } from './services';

export interface NavLink {
  label: string;
  to: string;
  description?: string;
}

export const servicesMenu: NavLink[] = [
  { label: 'All Services', to: '/services', description: 'Everything we repair, install and maintain' },
  { label: 'Residential', to: '/services/residential', description: 'Garage door service for homeowners' },
];

export const serviceLinks: NavLink[] = services.map(s => ({ label: s.name, to: `/services/${s.slug}` }));

export const locationsMenu = locationList.map(l => ({
  location: l,
  links: [
    { label: `${l.city} Service Area`, to: `/locations/${l.id}` },
    { label: `${l.city} Residential`, to: `/locations/${l.id}/residential` },
  ],
}));

export const primaryNav = {
  home: { label: 'Home', to: '/' },
  about: { label: 'About', to: '/about' },
  residential: { label: 'Residential', to: '/services/residential' },
  faqs: { label: 'FAQs', to: '/faqs' },
  contact: { label: 'Contact', to: '/contact' },
};

export const quickLinks: NavLink[] = [
  primaryNav.home, primaryNav.about, { label: 'All Services', to: '/services' }, primaryNav.faqs,
  { label: 'Request a Quote', to: '/contact' },
];
