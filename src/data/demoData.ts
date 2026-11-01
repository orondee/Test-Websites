import { DemoProject } from '../types';

export const DEMO_PROJECTS: DemoProject[] = [
  {
    id: 'coffee-roastery',
    name: 'Brew & Origin Roasters',
    industry: 'hospitality',
    industryLabel: 'Artisan Cafe & E-Commerce',
    tagline: 'Single-origin small-batch roastery with online bean subscriptions & cafe reservations',
    description: 'Designed to elevate a local coffee shop into a high-margin direct-to-consumer brand with instant mobile order pickup, recurring subscription club, and tasting room booking.',
    clientType: 'Cafes, Roasteries, Bakeries, Restaurants, Artisan Food Brands',
    heroImage: '/src/assets/images/demo_coffee_roastery_1793552553944.jpg',
    startingPrice: '$2,400',
    turnaroundTime: '10 business days',
    conversionFeatures: [
      '1-Click Direct Bean Bag Purchasing',
      'Recurring Monthly Coffee Subscription Selector',
      'Table & Cupping Session Booking System',
      'Mobile-First Cart Drawer with Upsells'
    ],
    techStack: ['React', 'Cart State Engine', 'Stripe Ready', 'Tailwind CSS'],
    resultsStat: {
      value: '+215%',
      label: 'Online bean re-orders within 60 days'
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
    startingPrice: '$3,200',
    turnaroundTime: '14 business days',
    conversionFeatures: [
      '4-Step Real-Time Consultation Booking Wizard',
      'Interactive Smile Transformation Before/After Viewer',
      'Transparent Treatment Pricing & Insurance Guide',
      'Specialist Doctor Credential Bios & Patient Reviews'
    ],
    techStack: ['Appointment Engine', 'HIPAA Ready UX', 'React', 'Tailwind CSS'],
    resultsStat: {
      value: '+340%',
      label: 'Qualified cosmetic consultation inquiries'
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
    startingPrice: '$3,800',
    turnaroundTime: '14 business days',
    conversionFeatures: [
      'Filterable Architectural Portfolio by Typology',
      'Interactive Project Specification & Material Palette Modal',
      'High-Resolution Photography Showcase Grid',
      'Client RFP & Architectural Commission Brief Form'
    ],
    techStack: ['Masonry Grid', 'Modal Spec Drawer', 'Fast Image Preloading', 'Tailwind CSS'],
    resultsStat: {
      value: '$4.2M',
      label: 'In new client build contracts originated'
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
    startingPrice: '$4,500',
    turnaroundTime: '18 business days',
    conversionFeatures: [
      'Interactive Visual Pipeline Demo (Try Before Signup)',
      'Dynamic ROI & Seat Tier Pricing Calculator',
      'Enterprise Feature Matrix with Comparison Specs',
      'Frictionless 14-Day Trial Lead Capture Modal'
    ],
    techStack: ['Interactive State Nodes', 'Pricing Engine', 'React', 'Tailwind CSS'],
    resultsStat: {
      value: '18.4%',
      label: 'Visitor-to-trial conversion rate'
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
    startingPrice: '$3,600',
    turnaroundTime: '12 business days',
    conversionFeatures: [
      'Structured Practice Areas Matrix with Deal Examples',
      'Partner Directory with Direct Consultation Booking',
      'Confidential Case & Transaction Evaluation Intake',
      'Landmark Deal Tracker with Verified Volume'
    ],
    techStack: ['Secure Intake Form', 'Attorney Roster', 'React', 'Tailwind CSS'],
    resultsStat: {
      value: '+180%',
      label: 'Direct corporate retained client inquiries'
    }
  }
];

export const AGENCY_STATS = [
  { value: '100%', label: 'Mobile Google PageSpeed Score' },
  { value: '10–14 Days', label: 'Average Turnaround to Live Launch' },
  { value: '3.8x', label: 'Average Inbound Conversion Lift' },
  { value: '0 Maintenance Stress', label: 'Hosting, SSL & Security Handled' }
];

export const AGENCY_PACKAGES = [
  {
    id: 'starter',
    name: 'Starter Business Presence',
    price: '$1,850',
    turnaround: '5–7 business days',
    popular: false,
    description: 'Perfect for local service providers, freelancers, and small businesses needing an immediate high-trust web presence that captures leads.',
    deliverables: [
      'Up to 5 bespoke custom responsive pages',
      'Mobile-first responsive design (iPhone & Android)',
      'High-converting lead capture inquiry form',
      'Basic On-Page SEO setup & Google indexing',
      '1 year included ultra-fast hosting setup',
      '30 days post-launch support & updates'
    ]
  },
  {
    id: 'growth',
    name: 'Growth & High-Conversion Suite',
    price: '$3,400',
    turnaround: '10–14 business days',
    popular: true,
    description: 'Our most requested package. Engineered for established businesses and practices that want to generate consistent, qualified paying customers.',
    deliverables: [
      'Up to 10 custom designed & coded pages',
      'Interactive features (Booking wizard or E-commerce catalog)',
      'Advanced On-Page & Technical SEO architecture',
      'CRM & Email automation webhook integration',
      'Custom micro-interactions & speed optimization (95+ score)',
      '60 days post-launch priority support'
    ]
  },
  {
    id: 'enterprise',
    name: 'Bespoke Custom Platform',
    price: '$5,800',
    turnaround: '18–21 business days',
    popular: false,
    description: 'For ambitious brands, SaaS startups, and high-ticket service firms requiring a distinct, competitive edge with custom application workflows.',
    deliverables: [
      'Unlimited custom layout pages & application routes',
      'Complex interactive calculators, filters, or portals',
      'Payment gateway / Stripe billing integration',
      'Full brand design system & custom iconography',
      'Comprehensive conversion rate optimization (CRO)',
      'Dedicated Slack channel & 6 months ongoing care'
    ]
  }
];
