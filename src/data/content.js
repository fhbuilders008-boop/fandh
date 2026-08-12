import {
  IconVilla,
  IconTower,
  IconPlot,
  IconHome,
  IconConsult,
  IconBlueprint,
  IconInterior,
  IconGrowth,
  IconGeotech,
  IconShield,
  IconTeam,
  IconClock,
  IconHeartHand,
} from '../components/Icons'
import { IMAGES } from '../lib/images'

/**
 * Company profile — the canonical description of F&H Builders & Developers.
 * Rendered by the About section; keep marketing copy edits in one place.
 */
export const COMPANY = {
  intro:
    'Every great home begins with a vision. We transform that vision into exceptional living spaces through thoughtful design, expert engineering, and uncompromising craftsmanship. From luxury villas to complete construction solutions, every project is built with precision, transparency, and a commitment to lasting value.',
  approach:
    "We believe a home is more than a structure it's where families grow, memories are created, and futures are built. That's why every detail is carefully planned and executed to deliver comfort, beauty, and confidence for generations.",
}

/** Assurance strip directly beneath the hero. */
export const ASSURANCES = [
  {
    icon: IconShield,
    title: 'Built On Trust',
    copy: 'A reputation earned through honesty, accountability, and successful project delivery.',
  },
  {
    icon: IconTeam,
    title: 'Structural Excellence',
    copy: 'Designed by experts and engineered to withstand the test of time.',
  },
  {
    icon: IconClock,
    title: 'Precision In Every Detail',
    copy: 'From foundation to finishing, every element is executed with uncompromising standards.',
  },
  {
    icon: IconHeartHand,
    title: 'A Home, Not Just A Project',
    copy: 'We build spaces where families create memories for generations.',
  },
]

/** Headline numbers, shared by the About section. */
export const STATS = [
  { value: '150+', label: 'Projects Completed' },
  { value: '150+', label: 'Happy Clients' },
  { value: '18+', label: 'Years of Experience' },
]

export const SERVICES = [
  {
    icon: IconVilla,
    title: 'Luxury Villa Construction',
    copy: 'Custom designed villas crafted with premium materials, expert engineering, and timeless elegance.',
  },
  {
    icon: IconTower,
    title: 'Premium Villa Projects',
    copy: 'Exclusive communities designed for comfort, privacy, and long-term value.',
  },
  {
    icon: IconPlot,
    title: 'Villa Plots',
    copy: 'Clear title plots in prime locations, ready for your dream home.',
  },
  {
    icon: IconHome,
    title: 'Residential Construction',
    copy: 'Beautiful homes built with precision, transparency, and lasting quality.',
  },
  {
    icon: IconGeotech,
    title: 'Geotechnical Investigation',
    copy: 'Borehole testing, accurate soil analysis and clear foundation recommendations — so the ground is understood before a single rupee is spent above it.',
  },
  {
    icon: IconConsult,
    title: 'Construction Consultancy',
    copy: 'Expert guidance for planning, budgeting, approvals, and execution.',
  },
  {
    icon: IconBlueprint,
    title: 'Architectural Planning',
    copy: 'Thoughtful designs that blend aesthetics, functionality, and modern living.',
  },
  {
    icon: IconInterior,
    title: 'Interior Solutions',
    copy: 'Tailored interiors that transform houses into extraordinary homes.',
  },
  {
    icon: IconGrowth,
    title: 'Property Development',
    copy: 'End-to-end development solutions designed to maximize value and returns.',
  },
]

export const PROJECTS = [
  {
    name: 'Upcoming Project',
    location: 'Pazhanganad, Kadambrayar, Ernakulam',
    status: 'Upcoming',
    category: 'Villas',
    highlight: 'Foundation stage · Details to follow',
    blurb:
      'Groundwork underway on our newest site — full specifications to be announced as the project progresses.',
    image: IMAGES.upcomingWork,
    variant: 0,
  },
]

export const WHY_US = [
  {
    title: 'Premium Quality Construction',
    copy: 'Grade tested steel, branded cement and an independent quality audit at every structural milestone.',
  },
  {
    title: 'Transparent Pricing',
    copy: 'An itemised estimate before you sign. No hidden escalation, no surprise variations once the project is underway.',
  },
  {
    title: 'Prime Locations',
    copy: 'Plots and projects chosen for connectivity, neighbourhood quality and lasting appreciation.',
  },
  {
    title: 'Modern Architecture',
    copy: 'Contemporary design intelligence tuned to Kerala’s climate, light and way of living.',
  },
  {
    title: 'Engineering Excellence',
    copy: 'Geotechnical investigation and structural design precede every drawing — soil analysed, bearing capacity proven, foundations sized to fact rather than assumption.',
  },
  {
    title: 'Experienced Team',
    copy: 'Architects, structural engineers and site supervisors who have delivered together for over a decade.',
  },
  {
    title: 'Timely Delivery',
    copy: 'Schedules linked to milestones that you can hold us to — and a track record of handing over on the promised date.',
  },
  {
    title: 'Trusted Service',
    copy: 'Most of our work comes from referrals. That is the only review metric we genuinely care about.',
  },
  {
    title: 'Complete Support',
    copy: 'Land, approvals, design, build, interiors and handover documentation — one team, one accountability.',
  },
  {
    title: 'Excellent Investment Value',
    copy: 'Homes engineered and located to appreciate, so your residence is also your strongest asset.',
  },
]

/**
 * TEMPORARY gallery.
 *
 * Three stock photographs stand in until F&H's own project photography is
 * supplied; every other tile renders as a labelled placeholder so the section
 * reads as deliberately unfinished rather than broken.
 *
 * To fill a placeholder: give the tile an `image` (an id from lib/images.js, or
 * a path under /public) and delete its `placeholder: true`. Nothing else needs
 * to change. `span` accepts 'tall' or 'wide'; omit it for a standard tile.
 */
export const GALLERY = [
  {
    title: 'Villa Serene — west elevation',
    caption: 'Kakkanad, Kochi',
    image: IMAGES.villaPool,
    variant: 0,
    span: 'tall',
  },
  {
    title: 'Living pavilion, Casa Mirada',
    caption: 'Interior',
    image: IMAGES.interiorDining,
    variant: 4,
  },
  {
    title: 'Skyline Enclave — slab reinforcement',
    caption: 'Construction progress',
    image: IMAGES.slabCasting,
    variant: 2,
  },
  { title: 'Interiors', placeholder: true, variant: 4, span: 'wide' },
  { title: 'Geotechnical investigation', placeholder: true, variant: 3 },
  { title: 'Drone photography', placeholder: true, variant: 2 },
  { title: 'Project walkthrough films', placeholder: true, variant: 5 },
]

export const FAQS = [
  {
    q: 'How does the construction process work, start to finish?',
    a: 'It runs in six stages: consultation and site study, concept design and 3D walkthrough, detailed estimate and agreement, approvals and foundation, structure and finishing, then handover with a full documentation file. You get a named project manager at stage one and keep them until the keys are in your hand.',
  },
  {
    q: 'How is pricing calculated, and what is included?',
    a: 'We price per square foot against a written specification sheet — brand, grade and quantity for every major material. Structure, plumbing, electrical, flooring, painting and standard joinery are included. Anything outside that sheet is quoted separately before it is executed, never after.',
  },
  {
    q: 'What payment plans do you offer?',
    a: 'Payments are linked to milestones, not the calendar: you pay when a stage is verifiably complete. A typical schedule is booking, foundation, releases by slab, finishing and handover. We are also empanelled with the major home loan providers and can help you assemble the file.',
  },
  {
    q: 'How long does a villa take to build?',
    a: 'A 3,000–4,000 sq.ft villa typically takes 10 to 14 months from foundation to handover, depending on the finish level and approvals. The committed date goes into the agreement, and our delivery record against it is something we will happily put in front of you.',
  },
  {
    q: 'Can I customise an existing project design?',
    a: 'Yes. In our villa projects you can modify layouts, elevations and the entire finish palette up to a defined stage in the build. For independent villas, the design starts from a blank sheet and your brief.',
  },
  {
    q: 'How do I book a site visit?',
    a: 'Message us on WhatsApp or call +91 99615 33355 and we will arrange a visit at a time that suits you — including evenings and weekends. If you are overseas, we will do a live video walkthrough of the site instead.',
  },
  {
    q: 'Do you handle approvals and legal documentation?',
    a: 'We do. Panchayat or corporation permits, building permits, occupancy certificate and the complete handover documentation set are all managed by our own team. Every plot we sell carries a clear, verified title.',
  },
  {
    q: 'Is there a warranty after handover?',
    a: 'Yes — a structural warranty plus a defect liability period covering workmanship, waterproofing and services. Our service team stays reachable long after that window closes; most of our referrals come from clients we handed over to years ago.',
  },
]
