import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import PageHero from '../components/sections/PageHero';
import Button from '../components/ui/Button';
import { serviceLinks } from '../config/navigation';

export default function NotFound() {
  return (
    <>
      <Seo title="Page Not Found" description="The page you were looking for could not be found." path="/404" noindex />
      <PageHero size="md" eyebrow="404" title="This page has" accent="come off its track." lead="The page you’re looking for doesn’t exist or has moved. Try one of these instead.">
        <Button to="/" size="lg">Back to home</Button>
        <Button to="/contact" variant="outline-light" size="lg">Request a quote</Button>
      </PageHero>
      <section className="section-tight bg-white">
        <div className="container">
          <h2 className="text-2xl font-semibold text-ink-900">Popular pages</h2>
          <ul className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {[{ label: 'Chicago service area', to: '/locations/chicago' }, { label: 'Indianapolis service area', to: '/locations/indianapolis' }, ...serviceLinks].map(l => (
              <li key={l.to}><Link to={l.to} className="block rounded-md border border-stone-200 px-4 py-3 font-medium text-ink-900 transition hover:border-gold-300 hover:bg-stone-50">{l.label}</Link></li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
