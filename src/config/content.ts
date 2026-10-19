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

/**
 * Verified customer reviews ONLY. The section stays hidden while this list is empty.
 * Example: { quote: '…', name: 'Jane D.', location: 'chicago', source: 'Google', rating: 5 }
 */
export const reviews: { quote: string; name: string; location?: 'chicago' | 'indianapolis'; source?: string; rating?: number }[] = [];

export const timeSlots = [
  '08:00 AM – 10:00 AM', '10:00 AM – 12:00 PM', '12:00 PM – 02:00 PM', '02:00 PM – 04:00 PM',
  '04:00 PM – 06:00 PM', '06:00 PM – 08:00 PM', '08:00 PM – 10:00 PM', '10:00 PM – 12:00 AM',
];

/** "Type of issue" options from the original booking form. */
export const issueTypes = [
  'Broken Spring', 'Door Off Track', 'Opener Not Working', 'Remote or Keypad Issue', 'Cable Broken or Loose',
  'Roller Noise or Damage', 'Door Won’t Open/Close', 'Panel Damage', 'Sensor Misalignment',
  'Routine Maintenance / Tune-Up', 'New Door Installation', 'General Inquiry', 'Other',
];
