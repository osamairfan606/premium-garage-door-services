import type { ImageName } from './images.generated';
import type { FaqItem, LocationId } from './locations';
import type { IconName } from './services';

/**
 * City-specific service pages (/locations/:city/:slug), one per local search term such as
 * "broken garage door spring repair chicago". "Garage door repair <city>" itself is the city page.
 * Every page has its own copy for each city — never copy one city's text into the other.
 */
export type CityServiceKind = 'emergency' | 'spring' | 'opener' | 'off-track' | 'installation' | 'commercial';

export interface CityServiceKindInfo {
  slug: string;
  name: string;
  icon: IconName;
  /** Matching option in the quote form's "Type of issue" list. */
  formService: string;
  /** General service page (/services/:slug) and the blog posts tagged with it. */
  baseService?: string;
  /** What the job covers; the same work in both cities. */
  includes: string[];
}

export const cityServiceKinds: Record<CityServiceKind, CityServiceKindInfo> = {
  emergency: {
    slug: 'emergency-garage-door-repair',
    name: 'Emergency Garage Door Repair',
    icon: 'clock',
    formService: 'Door Won’t Open/Close',
    baseService: 'garage-door-repair',
    includes: ['Broken spring replacement', 'Snapped or loose cables', 'Doors off track', 'Doors stuck open or shut', 'Opener failures', 'Making a damaged door safe'],
  },
  spring: {
    slug: 'broken-spring-repair',
    name: 'Broken Spring Repair',
    icon: 'spring',
    formService: 'Broken Spring',
    baseService: 'broken-spring-repair',
    includes: ['Torsion spring replacement', 'Extension spring replacement', 'Spring tension adjustment', 'Extension-to-torsion conversion', 'Cable, drum and bearing check', 'Balance and safety test'],
  },
  opener: {
    slug: 'garage-door-opener-repair',
    name: 'Garage Door Opener Repair',
    icon: 'opener',
    formService: 'Opener Not Working',
    baseService: 'garage-door-opener-repair-installation',
    includes: ['Opener repair', 'New opener installation', 'Motor and gear replacement', 'Remote programming', 'Keypad setup', 'Safety sensor alignment'],
  },
  'off-track': {
    slug: 'off-track-cable-repair',
    name: 'Off Track & Cable Repair',
    icon: 'track',
    formService: 'Door Off Track',
    baseService: 'off-track-repair',
    includes: ['Track realignment', 'Bent track repair or replacement', 'Roller reinsertion and replacement', 'Cable replacement', 'Drum and cable adjustment', 'Door balancing'],
  },
  installation: {
    slug: 'garage-door-installation',
    name: 'New Garage Door Installation',
    icon: 'door',
    formService: 'New Door Installation',
    baseService: 'garage-door-installation',
    includes: ['Free onsite estimate', 'Measuring and style advice', 'Old door removal', 'Professional installation', 'Opener pairing or replacement', 'Balance and safety testing'],
  },
  commercial: {
    slug: 'commercial-garage-door-repair',
    name: 'Commercial Garage Door Repair',
    icon: 'badge',
    formService: 'Commercial Door Service',
    includes: ['Spring and cable repair', 'Opener service', 'Rollers and tracks', 'Planned maintenance', 'Door replacement', '24/7 emergency help'],
  },
};

export interface CityServicePage {
  kind: CityServiceKind;
  city: LocationId;
  /** Search title, 60 characters or fewer. */
  title: string;
  /** Meta description, 70–160 characters. */
  description: string;
  h1: string;
  accent: string;
  lead: string;
  image: ImageName;
  imageAlt: string;
  intro: string[];
  local: { title: string; body: string }[];
  faqs: FaqItem[];
}

export const cityServicePages: CityServicePage[] = [
  // ───────────────────────────── Chicago ─────────────────────────────
  {
    kind: 'emergency',
    city: 'chicago',
    title: 'Emergency Garage Door Repair Chicago | 24 Hour Service',
    description: 'Emergency garage door repair in Chicago, 24 hours a day: broken springs, snapped cables, doors stuck open or off track. Call (312) 626-5158.',
    h1: 'Emergency garage door repair in Chicago',
    accent: 'answered 24 hours a day.',
    lead: 'A door stuck open at midnight, or a spring that snapped just before work? Call our Chicago line any time, day or night, and we’ll get your garage secure and working again.',
    image: 'chicago-night',
    imageAlt: 'Chicago skyline at night',
    intro: [
      'Garage door emergencies rarely happen at a good time. In Chicago they tend to arrive with the first hard freeze, when a tired spring finally gives out, or after a car clips the track in a tight alley. A door stuck open leaves your home and everything in the garage exposed; a door stuck shut can keep you from getting to work.',
      'Our Chicago line is answered 24/7. Tell us what happened and we’ll tell you honestly what can wait until morning and what can’t. When a technician arrives, the first job is to make the door safe and secure, then repair it properly, with same-day service whenever possible.',
    ],
    local: [
      { title: 'Detached alley garages', body: 'Many Chicago homes have a detached garage on the alley. When its door won’t close, the garage sits out of sight and open to the alley all night, so a door stuck open is a call we treat as urgent.' },
      { title: 'Cold-snap breakdowns', body: 'Springs and cables near the end of their life often fail on the coldest mornings, when the steel is at its most brittle and the opener is working hardest against stiff grease.' },
      { title: 'Make it safe while you wait', body: 'Keep cars and people out from under the door and stop pressing the remote. If the door is open and a spring is broken, don’t pull the red emergency release: the door can drop.' },
    ],
    faqs: [
      { q: 'Do you really answer the Chicago line 24 hours a day?', a: 'Yes. (312) 626-5158 is answered 24/7, including nights, weekends and holidays. We’ll talk through the problem and arrange the earliest available visit to your address.' },
      { q: 'What counts as a garage door emergency?', a: 'A door stuck open, a broken spring, a snapped cable, a door hanging off its track, or a door that has dropped or been hit by a car. Anything that leaves your home unsecured or the door unstable should not wait.' },
      { q: 'Can I close a stuck door myself?', a: 'If the springs and cables look intact and the door moves evenly, you can sometimes close it with the opener, or by hand after pulling the release. If a spring or cable is broken, or the door is crooked, leave it where it is and call us.' },
      { q: 'Is the estimate free for emergency repairs?', a: 'Yes. We explain what’s wrong and give you an estimate on site before any work begins, so you can decide with the full picture.' },
    ],
  },
  {
    kind: 'spring',
    city: 'chicago',
    title: 'Broken Garage Door Spring Repair Chicago | 24/7',
    description: 'Broken garage door spring repair in Chicago: torsion and extension springs replaced, balanced and tested, same-day whenever possible. Call (312) 626-5158.',
    h1: 'Broken garage door spring repair in Chicago',
    accent: 'lifting again within hours.',
    lead: 'Heard a loud bang from the garage and now the door won’t lift? A broken spring is the most common reason. We replace torsion and extension springs across Chicago, 24/7.',
    image: 'detail-tools',
    imageAlt: 'Wrenches used for garage door spring replacement',
    intro: [
      'Garage door springs carry almost all of the door’s weight. Each spring is rated for a set number of open-and-close cycles, and once it reaches that limit it fails, usually with a loud bang. In Chicago this happens most often in winter, when the steel is cold and every cycle adds strain to a spring that was already worn.',
      'We replace broken springs with ones matched to your door’s weight and height, set the tension so the door balances, and check the cables, drums and bearings that work with them. If both springs are the same age we’ll usually recommend replacing the pair, and we’ll explain why before we start.',
    ],
    local: [
      { title: 'Older doors, older hardware', body: 'Plenty of Chicago bungalows and two-flats still have older doors on open extension springs running along the tracks. We repair these, and can convert them to a torsion system where it suits the door and the garage.' },
      { title: 'Heavier wood and insulated doors', body: 'Wood carriage-style doors and insulated doors weigh more than a basic steel door. Springs must be sized for the real weight, or the opener ends up doing the lifting and wears out early.' },
      { title: 'Don’t lift it yourself', body: 'With a broken spring the door can weigh well over 100 pounds and may slam shut. Leave it closed, keep cars and children away, and never try to unwind or adjust a torsion spring yourself.' },
    ],
    faqs: [
      { q: 'How fast can you replace a broken spring in Chicago?', a: 'Broken springs are one of our most common calls. We offer same-day service whenever possible, and most spring replacements are finished in a single visit. Call (312) 626-5158 to check the earliest time for your address.' },
      { q: 'Should I replace both springs if only one broke?', a: 'Usually yes, if your door has two springs of the same age. The second one has done the same number of cycles and is often close to failing. We’ll show you its condition and let you decide.' },
      { q: 'Can I still use the opener with a broken spring?', a: 'No. An opener isn’t designed to lift the full weight of the door. Using it can strip the gear, bend the door or pull the opener off its mount.' },
      { q: 'Are longer-lasting springs available?', a: 'Ask us about high-cycle springs when we quote. They cost more up front but are rated for more cycles, which suits a door the family uses many times a day.' },
    ],
  },
  {
    kind: 'opener',
    city: 'chicago',
    title: 'Garage Door Opener Repair Chicago | Repair & Install',
    description: 'Garage door opener repair and installation in Chicago: motors, remotes, keypads and safety sensors fixed or replaced. 24/7 service. Call (312) 626-5158.',
    h1: 'Garage door opener repair in Chicago',
    accent: 'quiet and reliable, every time.',
    lead: 'Opener humming but the door won’t move, reversing for no reason or simply worn out? We repair and replace garage door openers for Chicago homes and set up your remotes and keypad before we leave.',
    image: 'res-modern-garage',
    imageAlt: 'Modern home with dark garage doors',
    intro: [
      'An opener is only as good as the door it lifts. When it struggles, the cause is often the door itself, a worn spring or a binding roller, rather than the motor. That’s why every opener call starts with a quick check of the door’s balance before we touch the opener.',
      'If the opener is at fault we repair what can be repaired: sensors, logic boards, gears, limits and force settings. If it has reached the end of its life we’ll recommend a replacement that suits your door and how you use the garage, install it and program your remotes and keypad.',
    ],
    local: [
      { title: 'Cold-weather sluggishness', body: 'Old, thick grease in the tracks and on the opener rail makes Chicago doors slow and stubborn in winter, and some openers reverse because they think the door is blocked. Cleaning, lubrication and a force adjustment often fix it.' },
      { title: 'Rooms beside the garage', body: 'Many Chicago homes have a bedroom or family room next to or above an attached garage. A belt-drive opener is noticeably quieter than an older chain-drive unit, and we can help you choose.' },
      { title: 'Detached garages and remotes', body: 'Remotes for a detached alley garage need reliable range from the car and the back door. We check signal, batteries and antenna placement, and set up a keypad so nobody is locked out.' },
    ],
    faqs: [
      { q: 'Why does my opener hum but the door doesn’t move?', a: 'Usually a broken spring, a stripped drive gear, or a door that is still locked or disconnected from the opener. Don’t keep pressing the button. Check the spring above the door for a gap, then call (312) 626-5158.' },
      { q: 'Why does the door go back up before it closes?', a: 'Most often the safety sensors near the floor are misaligned, dirty or blocked. In cold weather it can also be a force setting that needs adjusting. We realign and test the sensors on every opener call.' },
      { q: 'Should I repair or replace my opener?', a: 'If the opener is fairly new and the problem is a sensor, remote or gear, repair usually makes sense. If it is old, noisy, lacks working safety sensors or keeps failing, a new opener is often the better value. We’ll explain both options.' },
      { q: 'Can you program my remotes and keypad?', a: 'Yes. Remote programming and keypad setup are part of every opener repair and installation, and we’ll show you how the manual release works.' },
    ],
  },
  {
    kind: 'off-track',
    city: 'chicago',
    title: 'Garage Door Off Track & Cable Repair Chicago | 24/7',
    description: 'Garage door off track or a cable snapped in Chicago? We realign tracks, replace cables and rollers, and rebalance the door. Call (312) 626-5158, 24/7.',
    h1: 'Garage door off track and cable repair in Chicago',
    accent: 'realigned and secured safely.',
    lead: 'A door hanging crooked, rollers out of the track or a cable dangling loose is unstable and can fall. Stop using it, and call our Chicago team to set it right.',
    image: 'res-brick-driveway',
    imageAlt: 'Brick home with a driveway leading to the garage',
    intro: [
      'Doors come off track for a few reasons: a car bumps the door or the track, a worn roller jumps out, a lift cable slips off its drum, or a spring breaks and the door drops unevenly. Cables and tracks fail together so often that we treat them as one job.',
      'We secure the door first, then straighten or replace bent track, reinstall rollers, replace frayed or snapped cables, reseat them on the drums and set the springs so both sides lift evenly. We finish by testing the opener’s safety reversal.',
    ],
    local: [
      { title: 'Tight alleys, bumped tracks', body: 'Turning into a detached garage off a narrow Chicago alley leaves little room for error, and a clipped track or bottom panel is one of the most common ways a door comes off track.' },
      { title: 'Salt and rust at floor level', body: 'Road salt carried in on tires sits at the bottom of the door all winter. It corrodes the cable ends, bottom brackets and lower rollers first, which is where most snapped cables start.' },
      { title: 'Settled garage floors', body: 'In older detached garages the concrete slab can settle or heave, so the door meets the floor unevenly and twists in the track. We adjust the door and the bottom seal to suit the floor.' },
    ],
    faqs: [
      { q: 'Can I keep using a door that’s off track?', a: 'No. Stop using the opener and don’t try to force the door. An off-track door can fall or bend further. Keep people and cars clear and call (312) 626-5158.' },
      { q: 'What happens when a garage door cable snaps?', a: 'The door usually lifts on one side only and hangs crooked, or drops when it’s opened. The spring on that side may also be loose. We replace the cable, check the drum and spring, and rebalance the door.' },
      { q: 'Should both cables be replaced?', a: 'If one cable has frayed from age or rust, the other is usually not far behind. We’ll show you the condition of both and recommend replacing them as a pair when it makes sense.' },
      { q: 'Is it the cable or the spring?', a: 'A loud bang and a suddenly heavy door point to the spring; a crooked door with a loose wire points to the cable. Often it’s both, which is why we inspect the whole lifting system.' },
    ],
  },
  {
    kind: 'installation',
    city: 'chicago',
    title: 'New Garage Door Installation Chicago | Free Estimate',
    description: 'New garage door installation and replacement in Chicago: free onsite estimate, help choosing a style, old door removed, new door balanced and tested.',
    h1: 'New garage door installation in Chicago',
    accent: 'built for the weather it will face.',
    lead: 'Replacing a worn-out door or upgrading your home’s curb appeal? We start with a free onsite estimate, help you choose the right door and install it properly.',
    image: 'res-house-dusk',
    imageAlt: 'Craftsman-style home with lit garage doors at dusk',
    intro: [
      'A new garage door is one of the most visible changes you can make to a Chicago home, and it’s a safety and comfort upgrade too. Newer doors seal better, run quieter and work with modern openers and safety sensors.',
      'We measure the opening, look at the headroom, framing and floor, and talk through styles, insulation and windows that suit your home. On installation day we remove the old door, install and balance the new one, connect or replace the opener and test everything before we leave.',
    ],
    local: [
      { title: 'Insulation for Chicago winters', body: 'If the garage is attached, shares a wall with living space or doubles as a workshop, an insulated door helps keep it warmer in winter and cuts drafts into the house.' },
      { title: 'Styles that suit the block', body: 'From brick bungalows to new construction, Chicago streets mix a lot of styles. Carriage-house, raised-panel and modern flush doors each suit different homes, and we’ll show you options that fit yours.' },
      { title: 'Older openings, real measurements', body: 'Older detached garages often have non-standard openings, low headroom or out-of-square framing. We measure on site so the new door fits and seals properly, instead of guessing from a photo.' },
    ],
    faqs: [
      { q: 'How much does a new garage door cost in Chicago?', a: 'It depends on size, material, insulation, windows and whether the opener is replaced too. We give you a free onsite estimate with clear options before you commit to anything.' },
      { q: 'How long does garage door installation take?', a: 'Most standard residential installations are completed in a day once the door has arrived. We’ll confirm the timing when we quote.' },
      { q: 'Do you take away the old door?', a: 'Yes. Removing the old door is part of the installation, and we leave the garage clean.' },
      { q: 'Should I replace the opener at the same time?', a: 'If your opener is old, noisy or lacks working safety sensors, replacing it with the door is often sensible. If it’s in good shape, we connect it and adjust it to the new door.' },
    ],
  },
  {
    kind: 'commercial',
    city: 'chicago',
    title: 'Commercial Garage Door Repair Chicago | Overhead Doors',
    description: 'Commercial garage door repair in Chicago for storefronts, warehouses and workshops: springs, cables, openers, maintenance and new doors. Call (312) 626-5158.',
    h1: 'Commercial garage door repair in Chicago',
    accent: 'with less downtime.',
    lead: 'When an overhead door at your shop, warehouse or loading area stops working, deliveries wait and security suffers. Our Chicago team repairs, maintains and replaces commercial doors.',
    image: 'com-brick-warehouse',
    imageAlt: 'Brick commercial building with a metal overhead door',
    intro: [
      'Commercial overhead doors cycle far more often than a home garage door, and they are usually bigger and heavier. Springs, cables, rollers and openers wear faster, and one failure can stop deliveries, leave a building unsecured or trap vehicles inside.',
      'We repair springs, cables, rollers, tracks and openers, provide planned maintenance and install replacement doors. Commercial systems vary, so tell us the door type, size and opener when you call and we’ll confirm we can service it before scheduling a visit.',
    ],
    local: [
      { title: 'Doors that seal in winter', body: 'A bay door that won’t close tight lets Chicago’s cold straight into the building and drives up heating costs. We check seals, balance and hardware so the door closes properly.' },
      { title: 'Work around your hours', body: 'Storefronts, restaurants and workshops can’t always shut down for a repair. Tell us your operating hours and we’ll do our best to schedule the work around them.' },
      { title: 'High-cycle wear', body: 'Doors that open dozens of times a day wear through standard springs quickly. Planned maintenance catches worn springs, rollers and cables before they fail in the middle of a busy shift.' },
    ],
    faqs: [
      { q: 'What kinds of businesses do you serve in Chicago?', a: 'Storefronts, workshops, auto and service businesses, warehouses and other properties with overhead doors. Call (312) 626-5158 with your door details and we’ll confirm we can help.' },
      { q: 'Do you offer emergency commercial door repair in Chicago?', a: 'Yes. If a door is stuck open or shut, call our Chicago line 24/7 and we’ll arrange the earliest available visit.' },
      { q: 'Can you maintain several doors on one property?', a: 'Yes. Maintenance covers lubrication, hardware tightening, balance testing and safety checks for each door. Let us know how many doors you have when you request service.' },
      { q: 'Is the estimate free for commercial work?', a: 'Yes. We provide free onsite estimates for commercial repairs, installations and replacements.' },
    ],
  },

  // ─────────────────────────── Indianapolis ───────────────────────────
  {
    kind: 'emergency',
    city: 'indianapolis',
    title: '24 Hour Garage Door Repair Indianapolis | Emergency',
    description: '24 hour emergency garage door repair in Indianapolis for broken springs, cables, off-track doors and doors stuck open. Call (463) 262-2862 any time.',
    h1: 'Emergency garage door repair in Indianapolis',
    accent: 'day or night, 24/7.',
    lead: 'Spring snapped, cable came off or the door won’t close after a storm? Our Indianapolis line is answered around the clock, and we come out to make the door safe and get it working.',
    image: 'indy-dusk',
    imageAlt: 'Indianapolis skyline at dusk',
    intro: [
      'In most Indianapolis homes the attached garage is how the family actually comes and goes, so a door that won’t move stops the whole household. And when the door is stuck open, the door from the garage into the house is often the only thing between your home and the street.',
      'Call (463) 262-2862 at any hour. We’ll ask a few quick questions, help you keep everyone safe until we arrive and send a technician as soon as we can, with same-day service whenever possible. Once the door is secure we repair the cause, not just the symptom.',
    ],
    local: [
      { title: 'Storm-season damage', body: 'Central Indiana’s spring and summer storms bring strong winds that can bow a wide door, push it off its track or leave it hanging after a power cut. We realign, rebalance and test the door before we leave.' },
      { title: 'Power out, door shut', body: 'If the power is out, the red emergency release lets you open the door by hand, but only if the springs are intact. A door that feels extremely heavy has a broken spring: leave it closed and call us.' },
      { title: 'Car stuck inside', body: 'A door that won’t open with the car inside is one of the most common morning calls. Don’t force it with the opener; tell us when you need to leave and we’ll work to get it open safely.' },
    ],
    faqs: [
      { q: 'Is your Indianapolis line open 24 hours?', a: 'Yes. Call (463) 262-2862 any time, including overnight, weekends and holidays, and we’ll arrange the earliest visit we can to your address.' },
      { q: 'My door won’t close and it’s late. What should I do?', a: 'Check that nothing is blocking the safety sensors near the floor and that both sensor lights are on. If the door still won’t close, or a spring or cable looks broken, don’t force it. Call us and keep the door into the house locked until it’s fixed.' },
      { q: 'Do you fix garage doors damaged in a storm?', a: 'Yes. We repair bent tracks, damaged rollers and hinges, and doors knocked out of balance by wind. If panels are badly damaged we’ll explain whether a repair or a new section makes more sense.' },
      { q: 'Will I know the cost before you start?', a: 'Yes. We inspect the door, explain the repair and give you a free onsite estimate before any work begins.' },
    ],
  },
  {
    kind: 'spring',
    city: 'indianapolis',
    title: 'Broken Garage Door Spring Repair Indianapolis | 24/7',
    description: 'Broken garage door spring in Indianapolis? We replace torsion and extension springs, rebalance the door and test it. 24/7 service. Call (463) 262-2862.',
    h1: 'Broken garage door spring repair in Indianapolis',
    accent: 'fixed safely, same day when possible.',
    lead: 'If your door suddenly feels like it weighs a ton, or the opener strains and stops, a spring has probably broken. Our Indianapolis technicians replace and balance springs on all common door types.',
    image: 'res-house-two-storey',
    imageAlt: 'Two-storey home with a white double garage door',
    intro: [
      'Most garage doors in Indianapolis homes use torsion springs mounted on a bar above the door. They wind up as the door closes and unwind to help lift it. After years of daily use and plenty of freeze–thaw swings, the steel fatigues and the spring snaps, often leaving a clear gap in the coil.',
      'We replace the broken spring with the right wire size and length for your door, rebalance it so it stays put halfway up, and inspect the cables, drums and rollers while we’re there. You get a clear, free onsite estimate before we start.',
    ],
    local: [
      { title: 'Two-car doors on one spring', body: 'Many builder-grade 16-foot doors in Indianapolis subdivisions lift on a single torsion spring. When it breaks the door is dead weight. We can replace it or, where it makes sense, fit a two-spring setup that shares the load.' },
      { title: 'Freeze–thaw fatigue', body: 'Indiana winters swing above and below freezing again and again. Each swing and each cold start adds stress to the steel, which is why so many springs give out in the coldest months.' },
      { title: 'Catch the signs early', body: 'Visible rust on the spring, a door that drifts down when you let go halfway, or one side lifting before the other are early warnings. Replacing a worn spring on your schedule beats an emergency call.' },
    ],
    faqs: [
      { q: 'How do I know if my garage door spring is broken?', a: 'Look at the spring above the door: a clear gap in the coil means it has snapped. Other signs are a loud bang from the garage, a door that is suddenly very heavy, loose cables, or an opener that lifts the door a few inches and stops.' },
      { q: 'Can you replace a spring the same day in Indianapolis?', a: 'Same-day service is offered whenever possible. Call (463) 262-2862 and we’ll confirm the earliest appointment for your address.' },
      { q: 'Is it safe to replace a torsion spring myself?', a: 'We strongly advise against it. A wound torsion spring stores enough energy to cause serious injury, and winding it needs proper bars and training.' },
      { q: 'Why does my garage door have only one spring?', a: 'Many builder-installed doors come with a single spring to save cost. It works, but when it breaks the door can’t be lifted at all. On wide or heavy doors we may recommend two springs so the load is shared.' },
    ],
  },
  {
    kind: 'opener',
    city: 'indianapolis',
    title: 'Garage Door Opener Repair Indianapolis | 24/7 Service',
    description: 'Garage door opener not working in Indianapolis? We repair motors, sensors, remotes and keypads, and install new openers. Call (463) 262-2862.',
    h1: 'Garage door opener repair in Indianapolis',
    accent: 'and new openers installed right.',
    lead: 'From a remote that stopped working to an opener that grinds, stalls or won’t close the door, our Indianapolis team finds the real cause and fixes it.',
    image: 'res-modern-dusk',
    imageAlt: 'Contemporary home lit up at dusk',
    intro: [
      'Openers fail in a handful of predictable ways: the door reverses before it reaches the floor, the motor runs but nothing moves, the remote or keypad stops responding, or the opener simply gets louder and slower every year. Each points to a different part, and guessing at it wastes money.',
      'Our technicians test the door’s balance first, then the sensors, limits, force settings and drive. We repair the opener when it’s worth repairing. When it isn’t, we install a new unit, program your remotes and keypad, and show you how the manual release works.',
    ],
    local: [
      { title: 'After a storm or power cut', body: 'Storms in central Indiana knock the power out often enough that it pays to know your opener. After an outage or a surge, some openers need their limits reset or their remotes reprogrammed, and we can do both.' },
      { title: 'Humid summers, noisy rails', body: 'Heat and humidity dry out the lubricant on chain-drive rails and door hardware. A chain that slaps or a door that judders is often fixed with adjustment and lubrication rather than a new opener.' },
      { title: 'A quieter opener for attached garages', body: 'If a bedroom or family room shares a wall with the garage, a belt-drive or wall-mounted opener can cut the noise considerably. We’ll recommend what fits your ceiling and your door.' },
    ],
    faqs: [
      { q: 'My remote stopped working but the wall button works. What’s wrong?', a: 'Start with a fresh battery. If that doesn’t help, the remote may need reprogramming or the opener’s receiver may be failing. We test and reprogram remotes and keypads on every opener visit.' },
      { q: 'Why does my opener reverse before the door closes?', a: 'The usual cause is the safety sensors: slightly misaligned, dirty or in direct sun. A door that binds in its track can also trigger a reverse. We check both.' },
      { q: 'Do you replace old openers in Indianapolis?', a: 'Yes. We remove the old unit, install the new opener, set the limits and force, test the safety reversal and program your remotes. Start with a free onsite estimate by calling (463) 262-2862.' },
      { q: 'How long does a garage door opener last?', a: 'Many last 10 to 15 years with normal use, but heavy daily use, an unbalanced door or a weak spring shortens that. If yours is older and getting louder, it’s worth having it checked.' },
    ],
  },
  {
    kind: 'off-track',
    city: 'indianapolis',
    title: 'Garage Door Off Track & Cable Repair Indianapolis',
    description: 'Indianapolis garage door off track, crooked or hanging by one cable? We realign tracks, replace cables and rollers and rebalance it. Call (463) 262-2862.',
    h1: 'Off-track garage door and cable repair in Indianapolis',
    accent: 'back on track, safely.',
    lead: 'If your door is crooked, stuck halfway or a cable has come off the drum, don’t run the opener. Our Indianapolis technicians realign the door and replace damaged cables and rollers.',
    image: 'res-house-suburban',
    imageAlt: 'Suburban home with a single garage door',
    intro: [
      'A garage door rides on rollers inside two steel tracks and lifts on two cables wound around drums at the top. When any of those parts slips, bends or breaks, the door twists in its opening, and running the opener at that point usually makes the damage worse.',
      'We start by making the door stable, then straighten or replace track sections, fit new rollers where the old ones have worn, replace and reseat the cables and set the spring tension so the door rises level. Before we leave, we test the door and opener together.',
    ],
    local: [
      { title: 'Wind and wide doors', body: 'Strong gusts during Indiana storms can flex a wide two-car door hard enough to pop rollers out of the track, especially when the rollers are worn or the track brackets are loose.' },
      { title: 'Worn rollers first', body: 'On older doors that still run on their original steel rollers, worn bearings let a roller wobble out of the track. Nylon rollers with sealed bearings run quieter and track better.' },
      { title: 'One side lower than the other', body: 'If the bottom of the door sits lower on one side, a cable has probably stretched, frayed or slipped on its drum. Fixing it then costs less than waiting for it to snap.' },
    ],
    faqs: [
      { q: 'My garage door is stuck halfway and crooked. What should I do?', a: 'Leave it where it is, unplug the opener if you can do so safely, and keep everyone away from the door. Then call (463) 262-2862. Pushing it up or down can make it fall.' },
      { q: 'Why do garage door cables break?', a: 'Age, rust and fraying where the cable meets the bottom bracket are the usual causes. A cable can also jump off its drum if the door hits something or a spring loses tension.' },
      { q: 'Can you fix bent garage door tracks?', a: 'Lightly bent track can often be straightened and realigned; badly kinked or crushed sections should be replaced. We’ll tell you which on site, with a free estimate.' },
      { q: 'How long does off-track repair take?', a: 'Most off-track and cable repairs are completed in a single visit, often within a few hours, depending on the parts needed.' },
    ],
  },
  {
    kind: 'installation',
    city: 'indianapolis',
    title: 'New Garage Door Installation Indianapolis | Free Quote',
    description: 'New garage doors installed in Indianapolis: free onsite estimate, honest advice on repair vs. replacement, and professional installation. Call (463) 262-2862.',
    h1: 'New garage door installation in Indianapolis',
    accent: 'with a free onsite estimate.',
    lead: 'Whether your door has been dented, keeps needing repairs or you simply want a better look, our Indianapolis team helps you pick a new door and installs it right.',
    image: 'res-modern-garage',
    imageAlt: 'Modern home with new dark garage doors',
    intro: [
      'Sometimes another repair isn’t the best use of your money. If your door is dented, drafty, noisy despite repairs or just doesn’t suit the house anymore, a new door can solve all of it at once. And when a repair would do, we’ll tell you.',
      'We visit, measure and go through the options with you: steel or wood-look finishes, insulation, windows and hardware, and whether your opener should be kept or replaced. Then we remove the old door, install the new one, balance the springs and test the door and opener together.',
    ],
    local: [
      { title: 'Comfort beside an attached garage', body: 'In many Indianapolis homes the garage sits next to a kitchen, laundry room or bedroom. An insulated door with good seals keeps that side of the house more comfortable through hot summers and cold snaps.' },
      { title: 'One double door or two singles?', body: 'Replacing a wide two-car door or a pair of single doors? We’ll talk through the look, the cost and the springs and openers each option needs.' },
      { title: 'After hail or impact damage', body: 'If a door has been dented by hail or a vehicle, we’ll assess whether individual sections can be replaced or whether a new door makes more sense, and explain why.' },
    ],
    faqs: [
      { q: 'Should I repair or replace my garage door?', a: 'If the door is structurally sound and the problem is a spring, cable or opener, repair is usually best. Replace it when panels are badly damaged, the door is drafty and worn, or repairs keep adding up. We’ll give you both options on site.' },
      { q: 'Do you give free estimates on new garage doors in Indianapolis?', a: 'Yes. Call (463) 262-2862 or request an estimate online, and we’ll measure and quote at your home free of charge.' },
      { q: 'Is an insulated garage door worth it?', a: 'It’s worth considering if the garage is attached, has living space above or beside it, or you work in it. Insulated doors are also stiffer and usually quieter in operation.' },
      { q: 'Will my old opener work with a new door?', a: 'Often it will, as long as it’s in good condition and strong enough for the new door’s weight. We test it, adjust it to the new door and tell you if a replacement makes more sense.' },
    ],
  },
  {
    kind: 'commercial',
    city: 'indianapolis',
    title: 'Commercial Garage Door Repair Indianapolis, IN',
    description: 'Commercial overhead door repair in Indianapolis for warehouses, docks and shops: springs, cables, openers, maintenance and new doors. Call (463) 262-2862.',
    h1: 'Commercial garage door repair in Indianapolis',
    accent: 'for docks, bays and storefronts.',
    lead: 'Indianapolis runs on logistics, and a dock or bay door that won’t open costs time and money. We repair, maintain and replace overhead doors for local businesses.',
    image: 'com-loading-dock',
    imageAlt: 'Loading dock bays with commercial overhead doors',
    intro: [
      'Warehouses, distribution sites, service shops and storefronts across Indianapolis rely on overhead doors that open and close many times a day. That kind of use wears springs, cables and rollers far faster than a home door, and failures tend to happen at the worst moment.',
      'Our team handles spring and cable repair, opener service, track and roller work, planned maintenance and door replacement. Commercial door systems vary, so call with the door type, size and opener and we’ll confirm it’s a fit before we schedule a visit.',
    ],
    local: [
      { title: 'Dock doors that cycle all day', body: 'At a busy loading dock a door can open and close dozens of times per shift. We check spring condition and wear during maintenance so you can plan a replacement before a failure.' },
      { title: 'Safety checks on every visit', body: 'Every visit includes a check of balance, hardware, sensors and reversal, so the door is safe for staff, drivers and forklifts working around it.' },
      { title: 'Clear estimates up front', body: 'You get a free onsite estimate with the work explained before anything begins, so facility managers can approve it with confidence.' },
    ],
    faqs: [
      { q: 'Do you service loading dock doors in Indianapolis?', a: 'We service many of the overhead door systems used at docks and bays. Because commercial doors vary, call (463) 262-2862 with the door type, size and opener and we’ll confirm before scheduling.' },
      { q: 'Can you set up planned maintenance for our doors?', a: 'Yes. Planned maintenance includes lubrication, hardware tightening, balance testing and safety checks, which reduces unexpected breakdowns.' },
      { q: 'What if a door fails after hours?', a: 'Our Indianapolis line is answered 24/7. If a door is stuck open and the building isn’t secure, call and we’ll arrange the earliest available visit.' },
      { q: 'Do you replace commercial doors?', a: 'Yes. When repair no longer makes sense, we provide a free onsite estimate for a replacement door and install it.' },
    ],
  },
];

export const cityServicePath = (p: Pick<CityServicePage, 'city' | 'kind'>) => `/locations/${p.city}/${cityServiceKinds[p.kind].slug}`;

export const cityServicesFor = (city: LocationId) => cityServicePages.filter(p => p.city === city);

export const getCityServicePage = (city: LocationId, kind: CityServiceKind) => cityServicePages.find(p => p.city === city && p.kind === kind);

/** Which city page to link from a general /services/:slug page. */
export const kindForService: Record<string, CityServiceKind> = {
  'garage-door-repair': 'emergency',
  'broken-spring-repair': 'spring',
  'garage-door-opener-repair-installation': 'opener',
  'off-track-repair': 'off-track',
  'cable-repair': 'off-track',
  'garage-door-installation': 'installation',
};
