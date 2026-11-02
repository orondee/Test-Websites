import { DemoProject } from '../types';
import coffeeHero from '../assets/images/demo_coffee_roastery_1793552553944.jpg';
import dentalHero from '../assets/images/demo_dental_clinic_1793552553382.jpg';
import architectureHero from '../assets/images/demo_architecture_villa_1793552554911.jpg';
import saasHero from '../assets/images/demo_saas_dashboard_abstract_1793552555356.jpg';
import legalHero from '../assets/images/agency_hero_workspace_1793552555373.jpg';

export const DEMO_PROJECTS: DemoProject[] = [
  {
    id: 'coffee-roastery',
    name: 'Brew & Origin Roasters',
    industry: 'hospitality',
    industryLabel: 'Artisan Cafe & E-Commerce',
    tagline: 'Single-origin small-batch roastery with online bean ordering & table reservations',
    description: 'A warm, inviting digital storefront for cafes and roasteries with online coffee bag ordering, a recurring subscription picker, and a table tasting booking system.',
    clientType: 'Cafes, Roasteries, Bakeries, Restaurants, Artisan Food Brands',
    heroImage: coffeeHero,
    startingPrice: '$189',
    turnaroundTime: '4–6 business days',
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
    heroImage: dentalHero,
    startingPrice: '$269',
    turnaroundTime: '5–7 business days',
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
    heroImage: architectureHero,
    startingPrice: '$299',
    turnaroundTime: '6–8 business days',
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
    heroImage: saasHero,
    startingPrice: '$329',
    turnaroundTime: '7–10 business days',
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
    heroImage: legalHero,
    startingPrice: '$269',
    turnaroundTime: '5–7 business days',
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
  },
  {
    id: 'luxury-realestate',
    name: 'Kensington & Co. Estates',
    industry: 'realestate',
    industryLabel: 'Private Estates & Luxury Realty',
    tagline: 'Curated architectural listings and private residences with confidential walk-through booking',
    description: 'An ultra-refined digital showroom for high-net-worth real estate brokerages and architectural developments. Includes filterable neighborhood portfolios, interactive floor plans, and VIP private showing scheduling.',
    clientType: 'Luxury Realtors, Architectural Developers, Estate Brokerages, Private Landlords',
    heroImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    startingPrice: '$299',
    turnaroundTime: '5–7 business days',
    conversionFeatures: [
      'Filterable Luxury Listing Gallery by Neighborhood',
      'Confidential Private Showing Booking Modal',
      'Property Spec Matrix (Beds, Baths, Sq Ft, Pricing)',
      'High-Resolution Fullscreen Architectural Gallery'
    ],
    techStack: ['Showing Scheduler', 'Gallery Lightbox', 'React', 'Tailwind CSS'],
    guarantee: {
      title: 'VIP Buyer Conversion',
      subtitle: 'Captures qualified private showing requests with date/time selection'
    }
  },
  {
    id: 'artisan-bakery',
    name: 'Céleste Pâtisserie & Boulangerie',
    industry: 'hospitality',
    industryLabel: 'Artisan Bakery & Custom Cakes',
    tagline: 'Traditional French viennoiserie with morning pastry pre-orders and bespoke tiered cake customizer',
    description: 'An elegant French bakery storefront allowing customers to pre-order fresh morning viennoiserie to prevent sell-outs, plus an interactive 3D tier and flavor configurator for custom wedding and celebration cakes.',
    clientType: 'Artisan Bakeries, Patisseries, Custom Cake Designers, Boutique Chocolatiers',
    heroImage: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80',
    startingPrice: '$189',
    turnaroundTime: '4–6 business days',
    conversionFeatures: [
      'Real-Time Pastry Pre-Order Bag with Counter Pickup',
      'Interactive Custom Cake Tier, Sponge & Filling Customizer',
      'Live Oven Batch Schedule Indicator (Next Fresh Bake)',
      'Custom Inscription Preview Piped in Chocolate'
    ],
    techStack: ['Pre-Order Cart Drawer', 'Live Cake Customizer', 'React', 'Tailwind CSS'],
    guarantee: {
      title: 'Zero Morning Inventory Waste',
      subtitle: 'Drives prepaid morning pickups before the counter opens'
    }
  },
  {
    id: 'fitness-studio',
    name: 'Forma Athletic & Pilates Club',
    industry: 'fitness',
    industryLabel: 'Boutique Reformer Pilates & Strength',
    tagline: 'High-end reformer pilates and strength sanctuary with real-time class spots and instant pass checkout',
    description: 'A sleek, performance-driven web app for boutique fitness studios. Replaces slow third-party booking tools with native high-speed class booking, remaining spot countdowns, and instant drop-in pass purchases.',
    clientType: 'Pilates Studios, Strength Gyms, Yoga Shalas, Athletic Clubs, Personal Trainers',
    heroImage: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80',
    startingPrice: '$229',
    turnaroundTime: '5–7 business days',
    conversionFeatures: [
      'Interactive Weekly Class Schedule with Live Spot Countdown',
      'Filter by Discipline (Reformer, Strength, Recovery)',
      '1-Click Drop-In Pass Booking Modal ($35 Single Session)',
      'Coach Credentials & Specialty Discipline Bios'
    ],
    techStack: ['Timetable State Engine', 'Live Spot Tracker', 'React', 'Tailwind CSS'],
    guarantee: {
      title: 'Frictionless Class Booking',
      subtitle: 'Fills open reformer machines with zero booking drop-off'
    }
  },
  {
    id: 'high-end-trades',
    name: 'Nordic Custom Woodwork & Atelier',
    industry: 'trades',
    industryLabel: 'Architectural Millwork & Cabinetry',
    tagline: 'Bespoke heirloom kitchen cabinetry and architectural woodworking with live linear-footage budget calculator',
    description: 'A tactile, high-craft digital presence for master woodworkers and cabinetmakers. Features interactive hardwood species swatches, a linear-footage cabinetry cost estimator, and in-home measurement booking.',
    clientType: 'Custom Cabinetmakers, Millwork Shops, Furniture Craftsmen, High-End Remodelers',
    heroImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
    startingPrice: '$249',
    turnaroundTime: '4–6 business days',
    conversionFeatures: [
      'Interactive Hardwood Species Selector (Walnut, White Oak, Ash)',
      'Linear-Footage Kitchen Budget Estimator Slider',
      'Door Profile & Ceiling Height Multipliers',
      'In-Home Measurement Consultation Request System'
    ],
    techStack: ['Cabinetry Estimator', 'Material Swatch Selector', 'React', 'Tailwind CSS'],
    guarantee: {
      title: 'Pre-Qualified Project Inquiries',
      subtitle: 'Filters out low-budget leads with instant pricing clarity'
    }
  },
  {
    id: 'med-spa',
    name: 'Lumière Longevity & Medical Aesthetics',
    industry: 'healthcare',
    industryLabel: 'Regenerative Longevity & Luxury Med Spa',
    tagline: 'Physician-formulated NAD+ infusions, cryotherapy, and regenerative aesthetics with treatment matcher',
    description: 'A serene medical wellness digital experience. Connects prospective patients with targeted longevity therapies through an interactive symptom-and-goal treatment matcher and confidential suite booking.',
    clientType: 'Med Spas, IV Wellness Lounges, Longevity Clinics, Cryotherapy Centers, Dermatologists',
    heroImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    startingPrice: '$269',
    turnaroundTime: '5–7 business days',
    conversionFeatures: [
      'Interactive Goal Filter (Cellular Longevity, Radiance, Recovery)',
      'Detailed Therapy Protocol Cards with Duration & Medical Specs',
      'Confidential Online Suite Booking Form with Date/Time Picker',
      'Physician Credential & Board Certification Badges'
    ],
    techStack: ['Treatment Matcher', 'HIPAA Ready Intake', 'React', 'Tailwind CSS'],
    guarantee: {
      title: 'High-Ticket Aesthetic Booking',
      subtitle: 'Transforms casual visitors into booked medical wellness sessions'
    }
  }
];

export const AGENCY_STATS = [
  { value: 'From $149', label: 'Affordable Starter Launch Pricing' },
  { value: '5–7 Days', label: 'Average Time to Live Website' },
  { value: '100% Owned', label: 'No Monthly Page-Builder Lock-In' },
  { value: '30 Days Care', label: 'Free Post-Launch Support & Revisions' }
];

export const AGENCY_PACKAGES = [
  {
    id: 'starter',
    name: 'Starter Business Launch',
    price: '$149',
    turnaround: '2–4 business days',
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
    price: '$299',
    turnaround: '5–7 business days',
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
    price: '$499',
    turnaround: '7–10 business days',
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
