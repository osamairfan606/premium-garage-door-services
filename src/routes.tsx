import type { ReactElement } from 'react';
import Home from './pages/Home';
import About from './pages/About';
import ServicesPage from './pages/Services';
import ResidentialPage from './pages/ResidentialPage';
import CommercialPage from './pages/CommercialPage';
import LocationPage from './pages/LocationPage';
import ServiceDetail from './pages/ServiceDetail';
import Faqs from './pages/Faqs';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import BlogIndex from './pages/BlogIndex';
import BlogPost from './pages/BlogPost';
import { blogPosts } from './lib/blog';
import { locationList } from './config/locations';
import { services } from './config/services';

export interface AppRoute {
  path: string;
  element: ReactElement;
  /** Sitemap priority */
  priority: number;
  /** Sitemap lastmod (YYYY-MM-DD); defaults to the build date */
  lastmod?: string;
}

export const appRoutes: AppRoute[] = [
  { path: '/', element: <Home />, priority: 1.0 },
  { path: '/about', element: <About />, priority: 0.6 },
  { path: '/services', element: <ServicesPage />, priority: 0.9 },
  { path: '/services/residential', element: <ResidentialPage />, priority: 0.9 },
  { path: '/services/commercial', element: <CommercialPage />, priority: 0.85 },
  ...services.map(s => ({ path: `/services/${s.slug}`, element: <ServiceDetail slug={s.slug} />, priority: 0.8 })),
  ...locationList.flatMap(l => [
    { path: `/locations/${l.id}`, element: <LocationPage locationId={l.id} />, priority: 0.95 },
    { path: `/locations/${l.id}/residential`, element: <ResidentialPage locationId={l.id} />, priority: 0.9 },
  ]),
  { path: '/blog', element: <BlogIndex />, priority: 0.7, lastmod: blogPosts[0]?.date },
  ...blogPosts.map(p => ({ path: `/blog/${p.slug}`, element: <BlogPost slug={p.slug} />, priority: 0.6, lastmod: p.updated ?? p.date })),
  { path: '/faqs', element: <Faqs />, priority: 0.6 },
  { path: '/contact', element: <Contact />, priority: 0.8 },
  { path: '/privacy-policy', element: <PrivacyPolicy />, priority: 0.2 },
  { path: '/terms', element: <Terms />, priority: 0.2 },
];

export const allRoutePaths = appRoutes.map(r => ({ path: r.path, priority: r.priority, lastmod: r.lastmod }));
