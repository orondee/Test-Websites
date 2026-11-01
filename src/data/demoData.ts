import { DemoProject } from '../types';

export const DEMO_PROJECTS: DemoProject[] = [
  {
    id: 'coffee-roastery',
    name: 'Brew & Origin Roasters',
    industry: 'hospitality',
    industryLabel: 'Artisan Cafe & E-Commerce',
    tagline: 'Single-origin small-batch roastery with online bean ordering & table reservations',
    description: 'A warm, inviting digital storefront for cafes and roasteries with online coffee bag ordering, a recurring subscription picker, and a table tasting booking system.',
    clientType: 'Cafes, Roasteries, Bakeries, Restaurants, Artisan Food Brands',
    heroImage: '/src/assets/images/demo_coffee_roastery_1793552553944.jpg',
    startingPrice: '$349',
    turnaroundTime: '5–7 business days',
    conversionFeatures: [
      'Interactive Bean Roast & Flavor Filter',
      'Direct Bag Purchasing with Cart Drawer',
      'Table & Tasting Session Reservation Form',
      'Mobile-Optimized Menu with Clean Pricing'
    ],
    techStack: ['React', 'Cart Drawer', 'Stripe Ready', 'Tailwind CSS'],
    guarantee: {
      title: 'Direct Client Ordering',
      subtitle: 'Built for local pickup and online recurring bean orders'
    }
  },
  {
    id: 'dental-clinic',
    name: 'Aura Facial & Dental Aesthetics',
    industry: 'healthcare',
    industryLabel: 'Medical, Aesthetics & Dental',
    tagline: 'Premier cosmetic dentistry & aesthetics clinic with instant appointment scheduling',
    description: 'A tranquil, luxury healthcare web experience that eliminates patient anxiety and drives high-value cosmetic consultations through an interactive 4-step treatment booking wizard.',
    clientType: 'Dental Clinics, Plastic Surgeons, Dermatology, Med Spas, Wellness Studios',
    heroImage: '/src/assets/images/demo_dental_clinic_1793552553382.jpg',
    startingPrice: '$499',
    turnaroundTime: '7–10 business days',
    conversionFeatures: [
      '4-Step Real-Time Consultation Booking Wizard',
      'Interactive Smile Transformation Before/After Slider',
      'Transparent Treatment Pricing & Financing Guide',
      'Specialist Doctor Credential Bios'
    ],
    techStack: ['Appointment Wizard', 'HIPAA Friendly', 'React', 'Tailwind CSS'],
    guarantee: {
      title: 'Automated Booking Flow',
      subtitle: 'Captures patient inquiries 24/7 without phone tag'
    }
  },
  {
    id: 'architecture-studio',
    name: 'Vander & Kanso Architecture',
    industry: 'creative',
    industryLabel: 'Architecture & Interior Design',
    tagline: 'Minimalist contemporary architectural atelier showcasing residential & civic projects',
    description: 'An editorial portfolio website built for architects and luxury interior designers. High-impact photography, interactive project blueprints, and a streamlined project brief intake.',
    clientType: 'Architects, Interior Designers, Luxury Home Builders, Landscape Artists',
    heroImage: '/src/assets/images/demo_architecture_villa_1793552554911.jpg',
    startingPrice: '$549',
    turnaroundTime: '7–10 business days',
    conversionFeatures: [
      'Filterable Architectural Portfolio by Typology',
      'Interactive Project Specification & Material Palette Modal',
      'High-Resolution Photography Showcase Grid',
      'Client RFP & Architectural Commission Brief Form'
    ],
    techStack: ['Masonry Grid', 'Modal Spec Drawer', 'Fast Preloading', 'Tailwind CSS'],
    guarantee: {
      title: 'Editorial Visual Presence',
      subtitle: 'Designed to elevate your brand prestige for high-ticket clients'
    }
  },
  {
    id: 'saas-platform',
    name: 'PulseFlow Automation Engine',
    industry: 'saas',
    industryLabel: 'B2B Software & AI Tech',
    tagline: 'Enterprise AI workflow automation platform with live interactive pipeline builder',
    description: 'A conversion-engineered SaaS landing page featuring an interactive workflow demo sandbox, dynamic seat pricing calculator, and friction-free free trial onboarding.',
    clientType: 'Tech Startups, B2B SaaS, AI Tools, Developer Platforms, Cloud Infrastructure',
    heroImage: '/src/assets/images/demo_saas_dashboard_abstract_1793552555356.jpg',
    startingPrice: '$599',
    turnaroundTime: '8–12 business days',
    conversionFeatures: [
      'Interactive Visual Pipeline Demo (Try Before Signup)',
      'Dynamic ROI & Seat Tier Pricing Calculator',
      'Enterprise Feature Matrix with Comparison Specs',
      'Frictionless 14-Day Trial Lead Capture Modal'
    ],
    techStack: ['Interactive State Nodes', 'Pricing Engine', 'React', 'Tailwind CSS'],
    guarantee: {
      title: 'Interactive Product Demo',
      subtitle: 'Allows visitors to test your software before signing up'
    }
  },
  {
    id: 'legal-advisory',
    name: 'Vanguard & Sterling LLP',
    industry: 'legal',
    industryLabel: 'Corporate Law & Strategic Advisory',
    tagline: 'Boutique corporate legal practice advising on M&A, intellectual property, and venture financings',
    description: 'An authoritative, distinguished digital presence for high-stakes corporate attorneys and executive consultants. Built to convey gravitas, transparency, and client discretion.',
    clientType: 'Law Firms, Private Equity, Family Offices, Executive Financial Consultancies',
    heroImage: '/src/assets/images/agency_hero_workspace_1793552555373.jpg',
    startingPrice: '$499',
    turnaroundTime: '7–10 business days',
    conversionFeatures: [
      'Structured Practice Areas Matrix with Deal Examples',
      'Partner Directory with Direct Consultation Booking',
      'Confidential Case & Transaction Evaluation Intake',
      'Clear Credentials and Practice Disciplines'
    ],
    techStack: ['Secure Intake Form', 'Attorney Roster', 'React', 'Tailwind CSS'],
    guarantee: {
      title: 'Executive Trust & Confidentiality',
      subtitle: 'Conveys prestige and captures private prospective clients'
    }
  }
];

export const AGENCY_STATS = [
  { value: 'From $299', label: 'Affordable Starter Launch Pricing' },
  { value: '7–10 Days', label: 'Average Time to Live Website' },
  { value: '100% Owned', label: 'No Monthly Page-Builder Lock-In' },
  { value: '30 Days Care', label: 'Free Post-Launch Support & Revisions' }
];

export const AGENCY_PACKAGES = [
  {
    id: 'starter',
    name: 'Starter Business Launch',
    price: '$299',
    turnaround: '3–5 business days',
    popular: false,
    description: 'Designed for small businesses, freelancers, and local services who need a professional, trustworthy presence without overspending.',
    deliverables: [
      'Up to 4 custom responsive pages (Home, About, Services, Contact)',
      'Mobile-first responsive design for iPhone & Android',
      'Direct customer lead inquiry form',
      'Google Maps & contact click-to-call integration',
      'Google Search basic SEO & indexing setup',
      '30 days of free edits and support after launch'
    ]
  },
  {
    id: 'growth',
    name: 'Growth & Booking Suite',
    price: '$549',
    turnaround: '7–10 business days',
    popular: true,
    description: 'Our most popular package. Built for businesses that want interactive appointment booking, product sales, or dynamic service calculators.',
    deliverables: [
      'Up to 8 custom designed & coded pages',
      'Interactive booking calendar or online product store',
      'Custom animations and smooth responsive micro-interactions',
      'Domain connection & SSL security certificate',
      'Enhanced Google SEO & local search optimization',
      '30 days of free revisions & developer support'
    ]
  },
  {
    id: 'enterprise',
    name: 'Full Custom Platform',
    price: '$899',
    turnaround: '10–14 business days',
    popular: false,
    description: 'For businesses needing a unique digital application with custom calculators, multi-step wizards, or extensive content management.',
    deliverables: [
      'Up to 12 custom pages & specialized interactive tools',
      'Custom pricing calculators, product builders, or intake wizards',
      'Stripe payments / checkout integration',
      'Comprehensive speed optimization (loads in under 1.5 seconds)',
      'Full source code handover & deployment guide',
      '60 days of priority post-launch support'
    ]
  }
];
