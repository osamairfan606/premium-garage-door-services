import type { ImageName } from './images.generated';
import type { FaqItem } from './locations';

export type IconName =
  | 'wrench' | 'spring' | 'opener' | 'door' | 'track' | 'cable' | 'roller' | 'panel' | 'tune'
  | 'shield' | 'clock' | 'badge' | 'thumbs' | 'calendar' | 'search' | 'clipboard' | 'check' | 'home' | 'phone' | 'tag';

export interface Service {
  slug: string;
  name: string;
  short: string;
  icon: IconName;
  image: ImageName;
  imageAlt: string;
  /** Card summary — short, benefit-led. */
  summary: string;
  /** Detail page */
  metaDescription: string;
  headline: string;
  intro: string[];
  /** Service elements listed on the original website. */
  includes: string[];
  signs: string[];
  faqs: FaqItem[];
  related: string[];
}

export const services: Service[] = [
  {
    slug: 'garage-door-repair',
    name: 'Garage Door Repair',
    short: 'Door Repair',
    icon: 'wrench',
    image: 'res-house-two-storey',
    imageAlt: 'Two-storey home with a white double garage door',
    summary: 'Doors that will not open, close, or move smoothly — diagnosed accurately and fixed properly.',
    metaDescription: 'Garage door repair for doors that won’t open or close, sensor problems, noisy operation and more. Free onsite estimates and 24/7 emergency service.',
    headline: 'Garage door repair, done right the first time',
    intro: [
      'A garage door is a system of springs, cables, rollers, tracks and an opener working together. When one part fails, the whole door suffers — and guessing at the cause wastes time and money.',
      'Our technicians are trained to handle all garage door systems. We diagnose the real problem, explain your options and complete most repairs within a few hours.',
    ],
    includes: ['Door won’t open or close', 'Sensor misalignment', 'Remote or keypad issues', 'Hardware and hinge repair', 'Door balancing', 'Safety inspection'],
    signs: ['The door reverses before it reaches the floor', 'It opens partway and stops', 'Grinding, scraping or banging noises', 'The door looks uneven or crooked', 'The opener runs but the door doesn’t move'],
    faqs: [
      { q: 'How long does a typical garage door repair take?', a: 'Most garage door repairs can be completed within a few hours, depending on the issue and parts required.' },
      { q: 'Can you repair all garage door brands?', a: 'Our technicians work with most major garage door brands, openers and garage door systems.' },
    ],
    related: ['broken-spring-repair', 'off-track-repair', 'garage-door-opener-repair-installation'],
  },
  {
    slug: 'broken-spring-repair',
    name: 'Broken Spring Repair',
    short: 'Spring Repair',
    icon: 'spring',
    image: 'detail-tools',
    imageAlt: 'Wrenches on a dark workbench',
    summary: 'Torsion and extension spring replacement and adjustment — get your door working again within hours.',
    metaDescription: 'Broken garage door spring repair and replacement — torsion and extension springs, spring adjustment and system conversion. Same-day service whenever possible.',
    headline: 'Broken spring? We’ll have your door lifting again within hours',
    intro: [
      'Springs counterbalance the weight of your garage door. When one breaks — often with a loud bang — the door becomes extremely heavy and the opener can no longer lift it safely.',
      'We replace torsion and extension springs, adjust spring tension for proper balance, and can convert older extension-spring systems where it makes sense.',
    ],
    includes: ['Spring replacement', 'Torsion & extension springs', 'Spring adjustment', 'System conversion'],
    signs: ['A loud snap or bang from the garage', 'The door is suddenly very heavy', 'It lifts unevenly or only a few inches', 'A visible gap in the spring above the door', 'The door won’t open completely'],
    faqs: [
      { q: 'How do I know if my garage door spring needs replacement?', a: 'Common signs include loud snapping sounds, difficulty opening the door, uneven movement, heavy lifting, or a garage door that won’t open completely.' },
      { q: 'Is it safe to replace a spring myself?', a: 'We strongly advise against it. Springs are under high tension and can cause serious injury. Leave the door closed and call a professional.' },
    ],
    related: ['cable-repair', 'maintenance-tune-up', 'garage-door-repair'],
  },
  {
    slug: 'garage-door-opener-repair-installation',
    name: 'Opener Installation & Repair',
    short: 'Openers',
    icon: 'opener',
    image: 'res-modern-garage',
    imageAlt: 'Modern home with dark garage doors',
    summary: 'Motor replacement, remote programming, keypad setup and sensor alignment for smooth, quiet operation.',
    metaDescription: 'Garage door opener repair and installation — motor replacement, remote programming, keypad setup and safety sensor alignment.',
    headline: 'Smooth, quiet, reliable garage door openers',
    intro: [
      'If your opener hums but nothing happens, reverses for no reason or has simply reached the end of its life, we can repair it or install a new one.',
      'We handle motor replacement, remote programming, keypad setup and safety sensor alignment — so your door opens at the touch of a button, every time.',
    ],
    includes: ['Motor replacement', 'Remote programming', 'Keypad setup', 'Sensor alignment'],
    signs: ['Remote or keypad stopped working', 'The opener hums but doesn’t lift', 'The door reverses unexpectedly', 'Blinking sensor lights', 'Loud or rough operation'],
    faqs: [
      { q: 'Can you program a new remote or keypad?', a: 'Yes — remote programming and keypad setup are part of our opener service.' },
      { q: 'Why does my door reverse before closing?', a: 'This is very often a safety sensor alignment issue. We realign and test sensors as part of every opener service call.' },
    ],
    related: ['garage-door-repair', 'maintenance-tune-up', 'garage-door-installation'],
  },
  {
    slug: 'garage-door-installation',
    name: 'Garage Door Installation & Replacement',
    short: 'Installation',
    icon: 'door',
    image: 'res-house-dusk',
    imageAlt: 'Craftsman-style home with lit garage doors at dusk',
    summary: 'New garage doors professionally installed — start with a free onsite estimate on new doors.',
    metaDescription: 'New garage door installation and replacement with a free onsite estimate. Honest recommendations on repair vs. replacement.',
    headline: 'A new garage door, installed with care',
    intro: [
      'Sometimes repair is no longer the most cost-effective option. When your door is damaged, worn out or simply no longer suits your property, a new door can improve safety, reliability and curb appeal.',
      'We start with a free onsite estimate, help you choose a door that fits your property and budget, and install it properly — balanced, aligned and tested.',
    ],
    includes: ['Free onsite estimate on new doors', 'Old door removal', 'Professional installation', 'Opener pairing and setup', 'Balance and safety testing', 'Full system upgrades'],
    signs: ['Repeated repairs on an ageing door', 'Multiple damaged or dented panels', 'The door is drafty or poorly sealed', 'You want to upgrade the look of your property'],
    faqs: [
      { q: 'Should I repair or replace my garage door?', a: 'We inspect your system and recommend the most cost-effective solution based on age, condition, safety, and repair costs.' },
      { q: 'Do you offer free estimates on new doors?', a: 'Yes — we offer a free onsite estimate for new garage doors.' },
    ],
    related: ['garage-door-opener-repair-installation', 'panel-repair', 'maintenance-tune-up'],
  },
  {
    slug: 'off-track-repair',
    name: 'Door Off Track Repair',
    short: 'Off Track',
    icon: 'track',
    image: 'res-brick-driveway',
    imageAlt: 'Brick home with a wide driveway leading to the garage',
    summary: 'Track realignment, hinge and bracket fixes and roller reinsertion — secured safely to prevent costly damage.',
    metaDescription: 'Garage door off track? We provide track realignment, hinge and bracket repair, door balancing and roller reinsertion.',
    headline: 'Door off track? Realigned and secured safely',
    intro: [
      'An off-track door is unstable and can fall or bend further if it keeps being used. Bumps from vehicles, worn rollers and loose hardware are common causes.',
      'We realign the track, repair hinges and brackets, reinsert rollers and rebalance the door so it runs straight and secure.',
    ],
    includes: ['Track realignment', 'Hinge & bracket fix', 'Door balancing', 'Roller reinsertion'],
    signs: ['The door is hanging crooked', 'Rollers have popped out of the track', 'Visible gaps between rollers and track', 'Bent or dented track sections'],
    faqs: [
      { q: 'Can I keep using a door that’s off track?', a: 'No. Stop using it, keep people and vehicles away, and call us. Continuing to operate it can cause the door to fall or cause further damage.' },
    ],
    related: ['roller-repair', 'cable-repair', 'garage-door-repair'],
  },
  {
    slug: 'cable-repair',
    name: 'Cable Repair',
    short: 'Cables',
    icon: 'cable',
    image: 'res-house-suburban',
    imageAlt: 'Suburban home with a single garage door',
    summary: 'Cable replacement, adjustment and drum checks to restore smooth, even door movement.',
    metaDescription: 'Garage door cable repair and replacement, cable adjustment, drum checks and safety inspection.',
    headline: 'Cable repair that restores smooth, even movement',
    intro: [
      'Lift cables work with your springs to raise and lower the door evenly. A frayed, loose or snapped cable can leave the door hanging at an angle or stuck in place.',
      'We replace and adjust cables, check the drums they wind on and complete a safety inspection before we leave.',
    ],
    includes: ['Cable replacement', 'Cable adjustment', 'Drum check', 'Safety inspection'],
    signs: ['Frayed or rusty cables', 'A cable hanging loose', 'The door closes unevenly', 'One side lifts before the other'],
    faqs: [
      { q: 'Why did my garage door cable break?', a: 'Cables wear over time and are affected by rust, misaligned drums and spring problems. We inspect the related parts so the new cable lasts.' },
    ],
    related: ['broken-spring-repair', 'off-track-repair', 'roller-repair'],
  },
  {
    slug: 'roller-repair',
    name: 'Roller Repair',
    short: 'Rollers',
    icon: 'roller',
    image: 'res-modern-dusk',
    imageAlt: 'Contemporary home lit up at dusk',
    summary: 'Roller replacement, track lubrication and noise reduction for quiet, smooth operation.',
    metaDescription: 'Garage door roller repair and replacement, track lubrication and noise reduction for smooth, quiet operation.',
    headline: 'Quiet, smooth operation with expert roller repair',
    intro: [
      'Worn or cracked rollers make a door noisy, shaky and hard on the opener. Left alone, they can cause the door to jump its track.',
      'We replace worn rollers, lubricate the tracks and tune the door for smooth, quiet travel.',
    ],
    includes: ['Roller replacement', 'Track lubrication', 'Noise reduction', 'Smooth operation'],
    signs: ['Grinding or squeaking as the door moves', 'Jerky, shaky movement', 'Cracked or wobbling rollers', 'The opener strains to lift the door'],
    faqs: [
      { q: 'How do I know my rollers need replacing?', a: 'Noise, shaking and visibly worn or cracked rollers are the usual signs. We can confirm during a free onsite estimate.' },
    ],
    related: ['off-track-repair', 'maintenance-tune-up', 'garage-door-repair'],
  },
  {
    slug: 'panel-repair',
    name: 'Panel Repair',
    short: 'Panels',
    icon: 'panel',
    image: 'res-house-dusk',
    imageAlt: 'Raised-panel garage doors on a home at dusk',
    summary: 'Damaged or dented sections assessed and repaired — or replaced when that’s the smarter option.',
    metaDescription: 'Garage door panel repair for dented and damaged sections, with honest advice on repair versus replacement.',
    headline: 'Damaged panels, repaired or replaced',
    intro: [
      'A dented or cracked panel is more than cosmetic — it can weaken the door, affect how it travels in the track and let weather in.',
      'We assess the damage, explain whether a repair or section replacement makes sense, and make sure the door is balanced and safe afterwards.',
    ],
    includes: ['Damage assessment', 'Panel and section repair', 'Hardware and hinge check', 'Balance and safety testing'],
    signs: ['Dents, cracks or bent sections', 'Panels rubbing or catching', 'Gaps letting in light or drafts', 'Damage after a vehicle impact'],
    faqs: [
      { q: 'Is it better to replace a panel or the whole door?', a: 'It depends on the door’s age, condition and the extent of the damage. We’ll recommend the most cost-effective option after inspecting it.' },
    ],
    related: ['garage-door-installation', 'garage-door-repair', 'off-track-repair'],
  },
  {
    slug: 'maintenance-tune-up',
    name: 'Maintenance & Tune-Up',
    short: 'Tune-Ups',
    icon: 'tune',
    image: 'detail-tools',
    imageAlt: 'Professional wrenches used for garage door maintenance',
    summary: 'Lubrication, hardware tightening, balance testing and safety inspection to keep your door running smoothly.',
    metaDescription: 'Garage door maintenance and tune-up — lubrication, hardware tightening, balance testing and safety inspection.',
    headline: 'Preventive maintenance that keeps your door running smoothly',
    intro: [
      'Regular professional maintenance is the easiest way to avoid emergency repairs. Small adjustments now prevent broken springs, snapped cables and burnt-out openers later.',
      'Our tune-up covers lubrication, hardware tightening, balance testing and a full safety inspection.',
    ],
    includes: ['Lubrication service', 'Hardware tightening', 'Balance testing', 'Safety inspection'],
    signs: ['The door is getting noisier', 'It’s been more than a year since a service', 'The door feels heavier than it used to', 'You want to prevent winter breakdowns'],
    faqs: [
      { q: 'How often should a garage door be serviced?', a: 'Most residential doors benefit from a tune-up about once a year. Doors that are used many times a day benefit from more frequent checks.' },
    ],
    related: ['roller-repair', 'broken-spring-repair', 'garage-door-opener-repair-installation'],
  },
];

export function getService(slug: string | undefined) {
  return services.find(s => s.slug === slug);
}
