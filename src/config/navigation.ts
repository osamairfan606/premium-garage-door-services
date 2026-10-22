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
  { label: 'Commercial', to: '/services/commercial', description: 'Overhead door service for businesses in Chicago & Indianapolis' },
];

export const serviceLinks: NavLink[] = services.map(s => ({ label: s.name, to: `/services/${s.slug}` }));

export const locationsMenu = locationList.map(l => ({
  location: l,
  links: [
    { label: `${l.city} Service Area`, to: `/locations/${l.id}` },
    { label: `${l.city} Residential`, to: `/locations/${l.id}/residential` },
    { label: `${l.city} Commercial`, to: `/services/commercial#${l.id}` },
  ],
}));

export const primaryNav = {
  home: { label: 'Home', to: '/' },
  about: { label: 'About', to: '/about' },
  residential: { label: 'Residential', to: '/services/residential' },
  commercial: { label: 'Commercial', to: '/services/commercial' },
  faqs: { label: 'FAQs', to: '/faqs' },
  blog: { label: 'Blog', to: '/blog' },
  contact: { label: 'Contact', to: '/contact' },
};

export const quickLinks: NavLink[] = [
  primaryNav.home, primaryNav.about, { label: 'All Services', to: '/services' }, primaryNav.blog, primaryNav.faqs,
  { label: 'Request a Quote', to: '/contact' },
];
