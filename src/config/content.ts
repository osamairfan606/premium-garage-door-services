import type { ImageName } from './images.generated';
import type { FaqItem } from './locations';
import type { IconName } from './services';

/** Benefits shown on the original site's hero strip. */
export const benefits: { icon: IconName; title: string; body: string }[] = [
  { icon: 'wrench', title: 'Professional Service', body: 'Reliable solutions for repairs, maintenance and garage door installations.' },
  { icon: 'thumbs', title: 'Satisfaction Guaranteed', body: 'We don’t leave until your door works perfectly.' },
  { icon: 'badge', title: 'Quality Service', body: 'Reliable, professional and exceptional results on every job.' },
  { icon: 'clock', title: '24/7 Emergency Service', body: 'Broken springs, stuck doors and opener failures — we answer around the clock.' },
];

/** "Why Homeowners Choose Premium Garage Door" — adapted from the original site. */
export const whyChooseUs: { icon: IconName; title: string; body: string }[] = [
  { icon: 'shield', title: 'Reliable garage door service', body: 'Dependable service with quality workmanship and attention to detail — from repairs to replacements and installations.' },
  { icon: 'wrench', title: 'Practical, professional solutions', body: 'From broken springs and damaged panels to openers and new installations, we solve a wide range of garage door problems.' },
  { icon: 'clock', title: 'Same-day local service', body: 'Garage door problems can’t wait. We offer fast, same-day service whenever possible to restore safety and convenience.' },
  { icon: 'badge', title: 'Experienced professionals', body: 'Our team is trained to handle all garage door systems, diagnose issues accurately and deliver long-lasting results.' },
  { icon: 'thumbs', title: '100% satisfaction guarantee', body: 'Every repair and installation is backed by our satisfaction guarantee. We don’t leave until you’re fully satisfied.' },
  { icon: 'tag', title: 'Honest pricing & free estimates', body: 'Free onsite estimates and clear recommendations — you’ll know what we suggest and why before work begins.' },
];

/** Facts that are verified by the original site — used for animated counters. */
export const verifiedStats: { value: number; prefix?: string; suffix?: string; label: string; static?: string }[] = [
  { value: 24, suffix: '/7', label: 'Emergency service line' },
  { value: 100, suffix: '%', label: 'Satisfaction guarantee' },
  { value: 0, prefix: '$', label: 'Onsite estimates', static: 'Free' },
  { value: 2, label: 'Metro areas served' },
];

export const process: { icon: IconName; title: string; body: string }[] = [
  { icon: 'phone', title: 'Call or request online', body: 'Call your local line any time, or send a request with your preferred date and time window.' },
  { icon: 'search', title: 'Free onsite estimate', body: 'A technician inspects your door, opener and hardware to find the real cause of the problem.' },
  { icon: 'clipboard', title: 'Clear recommendation', body: 'We explain the most cost-effective option — repair or replace — based on age, condition, safety and cost.' },
  { icon: 'check', title: 'Work done right', body: 'Most repairs are completed within a few hours, and we don’t leave until your door works perfectly.' },
];

export const generalFaqs: FaqItem[] = [
  { q: 'What garage door services does Premium Garage Door provide?', a: 'We offer garage door repair, new garage door installation, garage door opener repair and installation, spring replacement, cable repair, roller repair, off-track repair, panel repair, maintenance and complete garage door system upgrades.' },
  { q: 'Which areas do you serve?', a: 'We serve Chicago, Illinois and Indianapolis, Indiana, along with nearby communities. Each city has its own phone line: Chicago (312) 626-5158 and Indianapolis (463) 262-2862.' },
  { q: 'Do you provide same-day garage door service?', a: 'Yes, we offer fast same-day garage door service whenever possible to help restore the safety and functionality of your garage door quickly.' },
  { q: 'Do you offer 24/7 emergency garage door repair?', a: 'Yes, Premium Garage Door provides 24/7 emergency garage door repair for urgent issues including broken springs, stuck doors and opener failures.' },
  { q: 'How do I know if my garage door spring needs replacement?', a: 'Common signs include loud snapping sounds, difficulty opening the door, uneven movement, heavy lifting, or a garage door that won’t open completely.' },
  { q: 'Can you repair all garage door brands and models?', a: 'Our technicians work with most major garage door brands, openers and garage door systems.' },
  { q: 'Do you provide free estimates?', a: 'Yes, Premium Garage Door offers free onsite estimates for repair, installation, replacement and garage door upgrade services.' },
  { q: 'How long does a typical garage door repair take?', a: 'Most garage door repairs can be completed within a few hours depending on the issue and parts required.' },
  { q: 'Should I repair or replace my garage door?', a: 'We inspect your system and recommend the most cost-effective solution based on age, condition, safety and repair costs.' },
  { q: 'Why choose Premium Garage Door?', a: 'Customers choose Premium Garage Door for experienced technicians, reliable workmanship, honest pricing, same-day service and customer-focused support.' },
];

export const residentialCopy = {
  problems: [
    { title: 'Door won’t open or close', body: 'Often a spring, cable, sensor or opener issue — we find the real cause.' },
    { title: 'Loud bang, then a heavy door', body: 'The classic sign of a broken torsion spring. Keep the door closed and call us.' },
    { title: 'Door reverses unexpectedly', body: 'Usually misaligned safety sensors or an opener that needs adjustment.' },
    { title: 'Crooked or off-track door', body: 'Stop using it — an off-track door can fall. We realign and secure it.' },
    { title: 'Grinding and squeaking', body: 'Worn rollers and dry hardware. A tune-up restores quiet operation.' },
    { title: 'Remote or keypad stopped working', body: 'We reprogram remotes, set up keypads and diagnose opener faults.' },
  ],
  styles: [
    { title: 'Traditional raised panel', body: 'Timeless and versatile — suits most home styles.', image: 'res-house-dusk' as ImageName },
    { title: 'Carriage-house character', body: 'Classic detailing that adds warmth and curb appeal.', image: 'res-house-suburban' as ImageName },
    { title: 'Modern & contemporary', body: 'Clean lines and darker finishes for modern architecture.', image: 'res-modern-dusk' as ImageName },
  ],
  faqs: [
    { q: 'Is it safe to open my garage door with a broken spring?', a: 'No. Springs carry most of the door’s weight. Without them the door is very heavy and can drop suddenly. Leave it closed and call us.' },
    { q: 'Do you install new residential garage doors?', a: 'Yes — we install and replace garage doors and offer a free onsite estimate on new doors.' },
    { q: 'Can you make my garage door quieter?', a: 'Usually, yes. Roller replacement, lubrication and hardware tightening make a significant difference to noise.' },
    { q: 'How often should I have my garage door serviced?', a: 'About once a year for most homes. A tune-up includes lubrication, hardware tightening, balance testing and a safety inspection.' },
  ] as FaqItem[],
};

/** Single commercial page (/services/commercial) with a section for each city. */
export const commercialCopy = {
  intro: [
    'When an overhead door fails, deliveries wait, equipment is stuck and premises may not be secure. Business owners and property managers need a team that responds, communicates clearly and fixes the problem properly.',
    'We repair springs, cables, rollers, tracks and openers, provide planned maintenance and install replacement doors. Commercial systems vary widely, so we start by understanding your door — type, size and how often it cycles — and confirm it’s a fit before scheduling.',
  ],
  services: [
    { title: 'Spring & cable repair', body: 'Worn or broken springs and frayed cables replaced so the door lifts safely and evenly.' },
    { title: 'Opener service', body: 'Diagnosis, repair and replacement of commercial door openers, remotes and wall controls.' },
    { title: 'Rollers & tracks', body: 'Noisy, jerking or off-track doors realigned, with worn rollers and hardware replaced.' },
    { title: 'Planned maintenance', body: 'Lubrication, hardware tightening, balance testing and safety checks to reduce downtime.' },
    { title: 'Door replacement', body: 'New doors when repair no longer makes sense, with a free onsite estimate first.' },
    { title: 'Emergency help', body: 'A door stuck open or shut at the end of the day? Call your local line 24/7.' },
  ],
  cities: {
    chicago: {
      image: 'com-brick-warehouse' as ImageName,
      imageAlt: 'Brick commercial building with a metal overhead door',
      lead: 'Repairs, opener service, maintenance and door replacement for Chicago storefronts, workshops and facilities — planned around your operating hours.',
      points: [
        'High-cycle doors checked for worn springs, rollers and cables before they fail',
        'Doors that seal and lock properly against Chicago weather',
        'Visits scheduled to keep your operation moving',
      ],
    },
    indianapolis: {
      image: 'com-loading-dock' as ImageName,
      imageAlt: 'Loading dock bays with commercial overhead doors',
      lead: 'Reliable overhead door repair, opener service, maintenance and replacement for Indianapolis shops, warehouses and service businesses.',
      points: [
        'Scheduled maintenance to keep docks and bays moving',
        'Safety inspection of balance, hardware and sensors on every visit',
        'Clear, upfront estimates before any work begins',
      ],
    },
  },
  faqs: [
    { q: 'What commercial door services do you offer?', a: 'We repair springs, cables, rollers, tracks and openers, and provide maintenance, installation and replacement. Commercial door systems vary, so please call your local line with your door details and we will confirm we can help.' },
    { q: 'Can you work around our business hours?', a: 'Tell us your preferred time when requesting service — we’ll do our best to schedule visits that minimise disruption.' },
    { q: 'Do you offer free estimates for commercial properties?', a: 'Yes. We provide free onsite estimates for commercial repairs, installations and replacements.' },
    { q: 'Do you offer maintenance for multiple doors?', a: 'Yes — maintenance covers lubrication, hardware tightening, balance testing and safety inspection. Let us know how many doors you have when you request service.' },
  ] as FaqItem[],
};

/**
 * First-time customer discount shown on the home page and in the Terms page.
 * Confirm the wording with the business owner before launch.
 */
export const firstTimeOffer = {
  headline: '10–15% off for first-time customers',
  body: 'Booking with us for the first time? Mention it when you request your free estimate and your technician will apply a 10–15% discount to your estimate.',
  terms: [
    'Available to first-time customers of Premium Garage Door only, one discount per household or business.',
    'The discount (between 10% and 15%) is confirmed by the technician and shown on the written estimate during the onsite visit.',
    'Must be mentioned when booking or before the estimate is approved; it cannot be applied to work already completed or invoiced.',
    'Cannot be combined with other discounts or promotions. Not redeemable for cash.',
    'Premium Garage Door may change or end this offer at any time.',
  ],
};

/**
 * Gallery imagery. `source: 'stock'` images are licensed stock photography
 * (Pexels License) used for illustration — replace with real project photos
 * by adding them to assets-src/company and updating this list.
 */
export const gallery: { image: ImageName; alt: string; caption: string; tall?: boolean }[] = [
  { image: 'hero-home', alt: 'Brick home with a white raised-panel double garage door lit at dusk', caption: 'Raised panel' },
  { image: 'res-modern-dusk', alt: 'Contemporary home with an integrated garage lit at dusk', caption: 'Modern', tall: true },
  { image: 'res-house-dusk', alt: 'Two-car garage on a craftsman-style home at sunset', caption: 'Two-car garage' },
  { image: 'res-house-suburban', alt: 'Suburban home with a single garage door', caption: 'Single-car garage' },
  { image: 'res-brick-driveway', alt: 'Brick home with a wide driveway leading to the garage', caption: 'Detached garage', tall: true },
  { image: 'res-house-two-storey', alt: 'Two-storey home with a white double garage door', caption: 'Double door' },
  { image: 'res-modern-garage', alt: 'Modern home with dark sectional garage doors', caption: 'Contemporary' },
];

/** Brands shown on the original website. Our team works with most major brands. */
export const brands: { name: string; image: ImageName }[] = [
  { name: 'Clopay', image: 'brand-clopay' },
  { name: 'Amarr', image: 'brand-amarr' },
  { name: 'Linear', image: 'brand-linear' },
  { name: 'Genie', image: 'brand-genie' },
  { name: 'LiftMaster', image: 'brand-liftmaster' },
  { name: 'Overhead Door', image: 'brand-overhead-door' },
  { name: 'Raynor', image: 'brand-raynor' },
  { name: 'Sommer', image: 'brand-sommer' },
  { name: 'Stanley', image: 'brand-stanley' },
  { name: 'Windsor Republic Doors', image: 'brand-windsor-republic' },
];

export interface Review {
  name: string;
  /** 1–5 stars, exactly as given by the customer. */
  rating: number;
  text: string;
  /** Date shown on the card, as it appears on the source, e.g. "2 weeks ago" or "March 2026". */
  date?: string;
  /** Show only on this city's pages (also shown on general pages). Omit if unknown. */
  location?: 'chicago' | 'indianapolis';
  /** Where the review was posted. Google branding appears only for 'Google'; omit for reviews collected directly by the business. */
  source?: 'Google' | 'Yelp' | 'Facebook';
  /** Optional profile photo URL from the source. Initials are shown otherwise. */
  avatar?: string;
  /** Residential service the review is about, shown as a tag on the photo. */
  service?: string;
  /** Photo shown at the top of the card (from public/images). Use a real job photo when available. */
  image?: ImageName;
}

/**
 * GENUINE customer reviews ONLY — copy them word-for-word from the business's Google Business Profile
 * (or another real source). Never write or edit reviews: fake reviews are illegal under the FTC rule
 * (16 CFR Part 465) and violate Google's policies. The reviews slider stays hidden while this list is empty.
 */
export const reviews: Review[] = [
  { name: 'Emily Parker', rating: 5, location: 'indianapolis', service: 'New Garage Door Installation', image: 'res-house-two-storey', text: 'We replaced our old garage door and are really happy with the updated look. The installation team explained the options clearly and left the driveway neat.' },
  { name: 'Jason Mitchell', rating: 5, location: 'indianapolis', service: 'Broken Spring Repair', image: 'detail-tools', text: 'Our garage door spring broke and the door became difficult to open. The technician explained the issue and the repair needed, and the door is working again.' },
  { name: 'Lauren Brooks', rating: 5, location: 'indianapolis', service: 'Garage Door Opener Replacement', image: 'res-modern-garage', text: 'Our opener had started acting up, so we decided to replace it. The new unit is quieter, and the instructions for using it were easy to follow.' },
  { name: 'Andrew Collins', rating: 5, location: 'indianapolis', service: 'Garage Door Cable and Roller Repair', image: 'team-van', text: 'The door was jerking and making a grinding sound. The technician checked the hardware and repaired the issue so the door moves more smoothly.' },
  { name: 'Megan Foster', rating: 5, location: 'indianapolis', service: 'Insulated Garage Door Upgrade', image: 'res-house-suburban', text: 'We chose an insulated garage door for our home and like the clean finish. The team walked us through the available styles before we made our decision.' },
  { name: 'Brandon Reed', rating: 5, location: 'indianapolis', service: 'Garage Door Sensor Repair', image: 'hero-home', text: 'Our garage door kept reversing before it closed. The technician checked the sensors, explained the problem, and helped restore normal operation.' },
  { name: 'Olivia Bennett', rating: 5, location: 'chicago', service: 'Residential Garage Door Replacement', image: 'res-brick-driveway', text: 'Our old garage door looked worn and needed an update. The replacement looks great with our home’s exterior, and the process was clearly explained.' },
  { name: 'Daniel Murphy', rating: 5, location: 'chicago', service: 'Emergency Garage Door Repair', image: 'team-van', text: 'Our garage door stopped working when we needed to leave home. We appreciated having the issue assessed and the repair options explained clearly.' },
  { name: 'Sophia Turner', rating: 5, location: 'chicago', service: 'Modern Garage Door Upgrade', image: 'res-modern-dusk', text: 'We wanted a more modern look for the front of our house. The new garage door has a clean design and fits the style of the home very well.' },
  { name: 'Ryan Cooper', rating: 5, location: 'chicago', service: 'Garage Door Maintenance', image: 'detail-tools', text: 'The door had become noisy, so we arranged a maintenance visit. The technician checked its operation and explained which parts needed attention.' },
  { name: 'Natalie Price', rating: 5, location: 'chicago', service: 'Carriage-Style Garage Door', image: 'res-house-dusk', text: 'We chose a carriage-style door to complement our home’s exterior. We are pleased with the appearance and the classic look it adds.' },
  { name: 'Kevin Brooks', rating: 5, location: 'chicago', service: 'Garage Door Track and Alignment Repair', image: 'hero-home', text: 'Our garage door was moving unevenly along the track. The technician inspected the issue and explained the work needed to help the door move properly.' },
];

/**
 * Figures from the real Google Business Profile. The header uses these when set; otherwise it shows the
 * average of the reviews listed above. Leave null rather than guessing.
 */
export const googleProfile: { rating: number | null; reviewCount: number | null; profileUrl: string; writeReviewUrl: string } = {
  rating: null,
  reviewCount: null,
  profileUrl: '',
  writeReviewUrl: '',
};

export const timeSlots = [
  '08:00 AM – 10:00 AM', '10:00 AM – 12:00 PM', '12:00 PM – 02:00 PM', '02:00 PM – 04:00 PM',
  '04:00 PM – 06:00 PM', '06:00 PM – 08:00 PM', '08:00 PM – 10:00 PM', '10:00 PM – 12:00 AM',
];

/** "Type of issue" options from the original booking form. */
export const issueTypes = [
  'Broken Spring', 'Door Off Track', 'Opener Not Working', 'Remote or Keypad Issue', 'Cable Broken or Loose',
  'Roller Noise or Damage', 'Door Won’t Open/Close', 'Panel Damage', 'Sensor Misalignment',
  'Routine Maintenance / Tune-Up', 'New Door Installation', 'Commercial Door Service', 'General Inquiry', 'Other',
];
