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
    'F & H Builders & Developers is a premium real estate and construction company committed to creating exceptional living spaces across Ernakulam. We specialise in luxury villas, premium villa plots, residential construction, geotechnical investigation and complete construction consultancy.',
  approach:
    'Every project is thoughtfully designed with modern architecture, expert structural engineering, comprehensive geotechnical investigation, superior craftsmanship and premium quality materials — ensuring safety, durability, elegance and lasting value. Our geotechnical investigations provide accurate soil analysis and foundation recommendations, enabling construction that is safe, stable and cost effective.',
  promise:
    'We are committed to delivering exceptional comfort, innovative design, engineering excellence and complete customer satisfaction in every project we undertake.',
}

/** Assurance strip directly beneath the hero. */
export const ASSURANCES = [
  {
    icon: IconShield,
    title: 'Quality Assurance',
    copy: 'Premium materials, grade tested steel and an independent audit at every structural milestone.',
  },
  {
    icon: IconTeam,
    title: 'Expert Team',
    copy: 'Architects, structural engineers and geotechnical specialists working as one accountable team.',
  },
  {
    icon: IconClock,
    title: 'On Time Delivery',
    copy: 'Schedules linked to milestones, written into the agreement and honoured on the promised date.',
  },
  {
    icon: IconHeartHand,
    title: 'Customer Satisfaction',
    copy: 'Complete transparency from soil report to handover — and long after the keys change hands.',
  },
]

/** Headline numbers, shared by the About section. */
export const STATS = [
  { value: '150+', label: 'Projects Completed' },
  { value: '100+', label: 'Happy Clients' },
  { value: '12+', label: 'Years of Experience' },
]

export const SERVICES = [
  {
    icon: IconVilla,
    title: 'Luxury Villa Construction',
    copy: 'Villas built from the ground up around your life, not a catalogue — imported stone, joinery cut on site, and a site engineer who knows your name.',
  },
  {
    icon: IconTower,
    title: 'Premium Villa Projects',
    copy: 'Gated communities in Kerala’s most desirable pockets, where every home is designed to hold its value and its beauty.',
  },
  {
    icon: IconPlot,
    title: 'Villa Plots',
    copy: 'Clear title plots, ready to build, with approved layouts, paved approach roads and utilities already at your boundary wall.',
  },
  {
    icon: IconHome,
    title: 'Residential Construction',
    copy: 'Family homes delivered with the same discipline as our flagship villas — structural integrity you will never have to think about.',
  },
  {
    icon: IconGeotech,
    title: 'Geotechnical Investigation',
    copy: 'Borehole testing, accurate soil analysis and clear foundation recommendations — so the ground is understood before a single rupee is spent above it.',
  },
  {
    icon: IconConsult,
    title: 'Construction Consultancy',
    copy: 'Costing, vendor vetting, approvals and quality audits. Independent advice from people who build, not just advise.',
  },
  {
    icon: IconBlueprint,
    title: 'Architectural Planning',
    copy: 'Plans drawn to respond to Kerala light and Kerala rain, modelled in 3D before a single stone is laid.',
  },
  {
    icon: IconInterior,
    title: 'Interior Solutions',
    copy: 'Bespoke interiors finished to the millimetre — lighting, veneers, stone and soft furnishing curated as one composition.',
  },
  {
    icon: IconGrowth,
    title: 'Property Development',
    copy: 'Land acquisition through handover, managed end to end, with returns modelled honestly before you commit a rupee.',
  },
]

export const PROJECTS = [
  {
    name: 'Villa Serene',
    location: 'Kakkanad, Kochi',
    status: 'Ongoing',
    category: 'Villas',
    highlight: '4 BHK · 3,850 sq.ft · Private courtyard & plunge pool',
    blurb:
      'A calm villa filled with light, built around a central courtyard, where the monsoon becomes part of the architecture.',
    image: IMAGES.villaSerene,
    variant: 0,
  },
  {
    name: 'The Heritage Residences',
    location: 'Thrissur',
    status: 'Completed',
    category: 'Villas',
    highlight: '5 BHK · 5,200 sq.ft · Traditional Nalukettu elevation',
    blurb:
      'Traditional Kerala proportions rendered in contemporary materials — carved teak, laterite and glass in one breath.',
    image: IMAGES.heritage,
    variant: 1,
  },
  {
    name: 'F&H Skyline Enclave',
    location: 'Edappally, Kochi',
    status: 'Ongoing',
    category: 'Residential',
    highlight: '12 premium villas · Gated · Clubhouse & landscaped spine',
    blurb:
      'A limited enclave of twelve homes, each with its own garden frontage and a shared clubhouse that feels like a resort.',
    image: IMAGES.skyline,
    variant: 2,
  },
  {
    name: 'Palm Grove Villa Plots',
    location: 'Aluva, Ernakulam',
    status: 'Ongoing',
    category: 'Villa Plots',
    highlight: '18 plots · 6–12 cents · Clear title, approved layout',
    blurb:
      'Plots ready to build on a quiet stretch lined with palms, minutes from the highway yet entirely removed from it. Soil tested before listing.',
    image: IMAGES.palmGrove,
    variant: 3,
  },
  {
    name: 'Casa Mirada',
    location: 'Kozhikode',
    status: 'Completed',
    category: 'Villas',
    highlight: '4 BHK · 4,100 sq.ft · Double height living pavilion',
    blurb:
      'A hillside home with a living pavilion that opens completely to the west, built for long evenings and longer conversations.',
    image: IMAGES.casaMirada,
    variant: 4,
  },
  {
    name: 'The Waterline',
    location: 'Alappuzha',
    status: 'Completed',
    category: 'Villas',
    highlight: '3 BHK · 3,200 sq.ft · Backwater frontage & infinity deck',
    blurb:
      'A backwater retreat where the deck reads as an extension of the water — piled to a geotechnical report, built for humidity.',
    image: IMAGES.waterline,
    variant: 5,
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

export const TESTIMONIALS = [
  {
    quote:
      'We had been let down twice before we found F&H. They handed over three weeks early, and every rupee was accounted for. Walking into that house for the first time is a feeling I still cannot describe.',
    name: 'Dr. Anitha Menon',
    project: 'Villa Serene, Kakkanad',
    initials: 'AM',
  },
  {
    quote:
      'What struck me was the honesty. They talked me out of two expensive ideas that would not have aged well. That is not what a contractor does — that is what a partner does.',
    name: 'Rahul Varghese',
    project: 'Casa Mirada, Kozhikode',
    initials: 'RV',
  },
  {
    quote:
      'I was managing the build from Dubai. Weekly photos, weekly costs, a call every Friday. I never once felt like I was guessing about my own home.',
    name: 'Faisal Rahman',
    project: 'The Waterline, Alappuzha',
    initials: 'FR',
  },
  {
    quote:
      'The finish quality is what sold my sister on booking with them too. Six years in, not a single crack, not one leak through two monsoons.',
    name: 'Sreelakshmi Nair',
    project: 'Heritage Residences, Thrissur',
    initials: 'SN',
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
