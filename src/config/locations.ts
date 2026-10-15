import type { ImageName } from './images.generated';

/**
 * SINGLE SOURCE OF TRUTH for location phone numbers and service areas.
 * Every header, footer, floating button, CTA and form on a location page reads from here.
 */
export type LocationId = 'chicago' | 'indianapolis';

export interface FaqItem {
  q: string;
  a: string;
}

export interface LocationSegmentCopy {
  heroTitle: string;
  heroAccent: string;
  heroLead: string;
  intro: string[];
  localNotes: { title: string; body: string }[];
  faqs: FaqItem[];
}

export interface Location {
  id: LocationId;
  city: string;
  state: string;
  stateCode: string;
  label: string; // "Chicago, IL"
  phoneDisplay: string;
  phoneHref: string; // tel: link
  phoneE164: string;
  /**
   * Communities served. Intentionally empty until the owner confirms coverage.
   * Example: ['Evanston', 'Oak Park', 'Skokie']
   */
  serviceAreas: string[];
  /** Optional confirmed ZIP codes. Leave empty if unknown. */
  zipCodes: string[];
  /** Verified street address. Leave null — never invent one. */
  address: null | { street: string; city: string; region: string; postalCode: string };
  heroImage: ImageName;
  cardImage: ImageName;
  imageAlt: string;
  tagline: string;
  overview: string[];
  climateNote: { title: string; body: string };
  faqs: FaqItem[];
  residential: LocationSegmentCopy;
  commercial: LocationSegmentCopy;
}

export const locations: Record<LocationId, Location> = {
  chicago: {
    id: 'chicago',
    city: 'Chicago',
    state: 'Illinois',
    stateCode: 'IL',
    label: 'Chicago, IL',
    phoneDisplay: '(312) 626-5158',
    phoneHref: 'tel:+13126265158',
    phoneE164: '+13126265158',
    serviceAreas: [],
    zipCodes: [],
    address: null,
    heroImage: 'chicago-dusk',
    cardImage: 'chicago-night',
    imageAlt: 'Chicago skyline at dusk',
    tagline: 'Garage door repair and installation for Chicago homes and businesses.',
    overview: [
      'Premium Garage Door brings the same promise to Chicago that customers have come to expect from us: honest pricing, free onsite estimates and a team that does not leave until your door works the way it should.',
      'Whether a spring has snapped on a cold morning, your opener has stopped responding, or you are ready to replace a tired door with something new, one call to our Chicago line connects you with a technician who can help — 24 hours a day, 7 days a week.',
    ],
    climateNote: {
      title: 'Built for Chicago winters',
      body: 'Sub-freezing mornings make metal contract and lubricants stiffen, which puts extra strain on torsion springs, cables and openers. A seasonal tune-up before winter is one of the simplest ways to avoid being stuck with a door that will not open.',
    },
    faqs: [
      {
        q: 'Which phone number should I call for garage door service in Chicago?',
        a: 'Call our Chicago line at (312) 626-5158. It is available 24/7 for emergencies such as broken springs, stuck doors and opener failures.',
      },
      {
        q: 'Do you offer same-day garage door repair in Chicago?',
        a: 'Yes — we offer same-day service whenever possible. Call (312) 626-5158 and we will confirm the earliest available appointment for your address.',
      },
      {
        q: 'Is the onsite estimate really free in Chicago?',
        a: 'Yes. We provide free onsite estimates for repairs, installations, replacements and upgrades, so you know your options before any work begins.',
      },
      {
        q: 'Does cold weather cause garage door problems?',
        a: 'Cold temperatures can make springs more brittle, stiffen lubricants and slow openers down. If your door is noisy, heavy or reverses unexpectedly in winter, it is worth having it inspected before a part fails completely.',
      },
      {
        q: 'Do you serve my neighborhood or suburb?',
        a: 'We serve Chicago and nearby communities. Call (312) 626-5158 or send a request with your ZIP code and we will confirm availability at your address.',
      },
    ],
    residential: {
      heroTitle: 'Residential garage door service',
      heroAccent: 'for Chicago homes',
      heroLead: 'Spring replacement, opener repair, off-track doors and new installations for Chicago homeowners — with free onsite estimates and 24/7 emergency help.',
      intro: [
        'Your garage door is often the largest moving object in your home and, for many Chicago households, the front door you actually use. When it stops working, everything from the morning commute to home security is affected.',
        'Our Chicago technicians handle the full range of residential garage door work — from a single broken cable to a complete door and opener replacement — and we explain every recommendation before we pick up a tool.',
      ],
      localNotes: [
        { title: 'Winter-ready springs', body: 'Torsion springs work hardest when temperatures drop. If yours are near the end of their life, replacing them before winter avoids a door that will not lift on the coldest day of the year.' },
        { title: 'Quiet, reliable openers', body: 'Many Chicago homes have living space above or beside the garage. We set up and tune openers for smooth, quiet operation and properly aligned safety sensors.' },
        { title: 'Curb appeal that lasts', body: 'Planning a new door? We provide a free onsite estimate and recommend a door that suits your home, your budget and the weather it will face.' },
      ],
      faqs: [
        { q: 'How quickly can you fix a broken spring in Chicago?', a: 'Broken springs are one of our most common emergency calls. We aim to get your door working again within hours, and same-day service is offered whenever possible. Call (312) 626-5158.' },
        { q: 'Should I try to open a door with a broken spring?', a: 'No. Springs carry most of the door’s weight; without them the door is extremely heavy and can fall. Leave it closed, keep people and vehicles clear, and call us.' },
        { q: 'Can you program my new remote or keypad?', a: 'Yes. Remote programming and keypad setup are part of our opener service, along with motor replacement and sensor alignment.' },
        { q: 'Do you install new residential garage doors in Chicago?', a: 'Yes. We offer new door installation and replacement, starting with a free onsite estimate on new doors.' },
      ],
    },
    commercial: {
      heroTitle: 'Commercial garage door service',
      heroAccent: 'for Chicago businesses',
      heroLead: 'Repairs, opener service, maintenance and door replacement for Chicago storefronts, workshops and facilities — planned around your operating hours.',
      intro: [
        'A door that will not open can stop deliveries, trap equipment or leave a building unsecured. Our Chicago team helps business owners and property managers keep overhead doors working reliably and safely.',
        'Commercial door systems vary widely. Tell us what you have — size, door type, opener and how often it cycles — and we will confirm whether it is a fit for our team before scheduling a visit.',
      ],
      localNotes: [
        { title: 'High-cycle wear', body: 'Doors that open dozens of times a day wear springs, rollers and cables much faster than residential doors. Planned maintenance helps catch worn parts before they fail.' },
        { title: 'Weather and security', body: 'A door that does not seal or lock properly lets cold air in and puts stock at risk. We check alignment, balance and hardware as part of every service visit.' },
        { title: 'Minimal disruption', body: 'We work with you to schedule visits at times that keep your operation moving, and explain recommended repairs and costs before work starts.' },
      ],
      faqs: [
        { q: 'What types of commercial doors do you service in Chicago?', a: 'We repair springs, cables, rollers, tracks and openers and provide maintenance, installation and replacement. Because commercial systems vary, call (312) 626-5158 with your door details and we will confirm we can help.' },
        { q: 'Can you schedule work outside business hours?', a: 'Tell us your preferred time when you request service. We will do our best to schedule around your operation.' },
        { q: 'Do you provide estimates for commercial work?', a: 'Yes. We provide free onsite estimates so you can review recommendations and costs before approving any work.' },
      ],
    },
  },

  indianapolis: {
    id: 'indianapolis',
    city: 'Indianapolis',
    state: 'Indiana',
    stateCode: 'IN',
    label: 'Indianapolis, IN',
    phoneDisplay: '(463) 262-2862',
    phoneHref: 'tel:+14632622862',
    phoneE164: '+14632622862',
    serviceAreas: [],
    zipCodes: [],
    address: null,
    heroImage: 'indy-sunset',
    cardImage: 'indy-skyline',
    imageAlt: 'Indianapolis skyline at sunset',
    tagline: 'Garage door repair and installation for Indianapolis homes and businesses.',
    overview: [
      'Premium Garage Door serves Indianapolis homeowners and businesses with fast, dependable garage door repair, opener service and new door installation — backed by free onsite estimates and our satisfaction guarantee.',
      'From a door that has slipped off its track to a full replacement, our Indianapolis line is answered 24/7, and same-day service is offered whenever possible.',
    ],
    climateNote: {
      title: 'Ready for Indiana’s seasons',
      body: 'Freeze–thaw cycles in winter and humid summers both take a toll on garage doors: springs and cables fatigue, rollers wear, and weather seals harden. Regular maintenance keeps your door balanced and quiet year-round.',
    },
    faqs: [
      {
        q: 'Which phone number should I call for garage door service in Indianapolis?',
        a: 'Call our Indianapolis line at (463) 262-2862. It is available 24/7 for urgent problems such as broken springs, stuck doors and opener failures.',
      },
      {
        q: 'Do you offer same-day garage door repair in Indianapolis?',
        a: 'Yes — same-day service is offered whenever possible. Call (463) 262-2862 to check the earliest appointment for your address.',
      },
      {
        q: 'Do you provide free estimates in Indianapolis?',
        a: 'Yes. We offer free onsite estimates for repair, installation, replacement and upgrade work.',
      },
      {
        q: 'My door is noisy and shaky. Is that a problem?',
        a: 'Grinding, squeaking or shaking often points to worn rollers, loose hardware or a door that is out of balance. A tune-up — lubrication, hardware tightening and balance testing — usually resolves it and prevents bigger repairs.',
      },
      {
        q: 'Do you serve areas outside downtown Indianapolis?',
        a: 'We serve Indianapolis and nearby communities. Call (463) 262-2862 or send a request with your ZIP code and we will confirm availability.',
      },
    ],
    residential: {
      heroTitle: 'Residential garage door service',
      heroAccent: 'for Indianapolis homes',
      heroLead: 'Broken springs, opener problems, off-track doors and new garage doors for Indianapolis homeowners — free onsite estimates, 24/7 emergency service.',
      intro: [
        'When your garage door will not open, you need someone who answers the phone, shows up and fixes it properly. That is what our Indianapolis team is here to do.',
        'We repair and replace springs, cables, rollers and openers, realign off-track doors, and install new residential doors — and we always recommend the most cost-effective option for your door’s age and condition.',
      ],
      localNotes: [
        { title: 'Freeze–thaw protection', body: 'Repeated freezing and thawing stresses springs and cables. Annual maintenance catches fatigue early and keeps the door balanced.' },
        { title: 'Smooth summer operation', body: 'Heat and humidity can dry out lubricants and swell weather seals. A tune-up keeps rollers and hinges moving quietly.' },
        { title: 'Upgrade with confidence', body: 'Thinking about a new door or opener? Get a free onsite estimate and honest advice on whether repair or replacement makes more sense.' },
      ],
      faqs: [
        { q: 'How fast can you repair my garage door in Indianapolis?', a: 'Most repairs are completed within a few hours, depending on the issue and parts required. Same-day service is offered whenever possible — call (463) 262-2862.' },
        { q: 'My door came off its track — can I keep using it?', a: 'Please do not. An off-track door can fall or cause more damage. Stop using it, keep the area clear and call us for track realignment.' },
        { q: 'Do you work on all opener brands?', a: 'Our technicians work with most major garage door and opener brands. Tell us what you have when you call.' },
        { q: 'Should I repair or replace my door?', a: 'We inspect your system and recommend the most cost-effective solution based on age, condition, safety and repair costs.' },
      ],
    },
    commercial: {
      heroTitle: 'Commercial garage door service',
      heroAccent: 'for Indianapolis businesses',
      heroLead: 'Reliable overhead door repair, opener service, maintenance and replacement for Indianapolis shops, warehouses and service businesses.',
      intro: [
        'Overhead doors are part of how your business runs. When one fails, deliveries wait, equipment sits and security suffers. Our Indianapolis team helps keep your doors dependable.',
        'Because commercial systems differ, we start by understanding your door type, size and usage. If it is a system we service, we will schedule an onsite visit and give you a clear estimate.',
      ],
      localNotes: [
        { title: 'Keep docks and bays moving', body: 'Frequent cycling wears rollers, cables and springs quickly. Scheduled maintenance reduces surprise breakdowns.' },
        { title: 'Safety first', body: 'Every visit includes a safety inspection of balance, hardware and sensors so your staff and customers are protected.' },
        { title: 'Clear, upfront estimates', body: 'You will know what we recommend and why before any work begins — no surprises on the invoice.' },
      ],
      faqs: [
        { q: 'What commercial door work do you handle in Indianapolis?', a: 'We repair springs, cables, rollers, tracks and openers and provide maintenance, installation and replacement. Call (463) 262-2862 with your door details so we can confirm we service your system.' },
        { q: 'Can maintenance be scheduled around our hours?', a: 'Yes — let us know your preferred times when you request service and we will work to minimise disruption.' },
        { q: 'Do you offer free estimates for businesses?', a: 'Yes. Free onsite estimates are available for commercial repair, installation and replacement.' },
      ],
    },
  },
};

export const locationList: Location[] = [locations.chicago, locations.indianapolis];

export function getLocation(id: string | undefined): Location | undefined {
  return id && id in locations ? locations[id as LocationId] : undefined;
}

export function otherLocation(id: LocationId): Location {
  return id === 'chicago' ? locations.indianapolis : locations.chicago;
}
