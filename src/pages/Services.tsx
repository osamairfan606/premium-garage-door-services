import { CalendarCheck } from 'lucide-react';
import Seo from '../components/Seo';
import PageHero from '../components/sections/PageHero';
import Button from '../components/ui/Button';
import CallChooser from '../components/layout/CallChooser';
import ServicesGrid from '../components/sections/ServicesGrid';
import { Process, BrandStrip } from '../components/sections/Highlights';
import { FaqSection, Reviews } from '../components/sections/Faq';
import FinalCta from '../components/sections/FinalCta';
import { generalFaqs } from '../config/content';
import { breadcrumbSchema } from '../lib/seo';

export default function ServicesPage() {
  const crumbs = [{ label: 'Home', to: '/' }, { label: 'Services', to: '/services' }];
  return (
    <>
      <Seo
        title="Garage Door Services | Repair, Springs, Openers & Installation"
        description="Explore our garage door services: repair, broken spring replacement, opener installation, off-track, cable, roller and panel repair, maintenance and new door installation."
        path="/services"
        jsonLd={[breadcrumbSchema(crumbs)]}
      />
      <PageHero
        crumbs={crumbs}
        eyebrow="All services"
        title="Garage door services,"
        accent="handled end to end."
        lead="Repair, installation, opener setup, spring replacement, cable repair, maintenance and full garage door system upgrades — for homeowners in Chicago and Indianapolis."
        image="res-modern-dusk"
        imageAlt="Contemporary home at dusk with a modern garage"
      >
        <Button to="/contact" size="lg"><CalendarCheck className="h-5 w-5" aria-hidden="true" /> Request a Free Estimate</Button>
        <CallChooser align="left" buttonClassName="h-14 px-7 text-base bg-white/10 text-white shadow-none border border-white/25 hover:bg-white/15" />
      </PageHero>
      <ServicesGrid eyebrow="What we do" title={<>Nine core services, <span className="accent-serif text-gold-500">one standard</span></>} lead="Every visit starts with an accurate diagnosis and a free onsite estimate. Choose a service to learn more." />
      <BrandStrip />
      <Process />
      <Reviews />
      <FaqSection faqs={generalFaqs.slice(0, 5)} />
      <FinalCta />
    </>
  );
}
