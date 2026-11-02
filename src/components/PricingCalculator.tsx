import React, { useState } from 'react';
import { 
  Calculator, 
  Check, 
  Sparkles, 
  ArrowRight, 
  Clock, 
  ShieldCheck, 
  Mail,
  Copy,
  CheckCircle2,
  Zap,
  Palette,
  Layers,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { 
  calculatePricingEstimate, 
  BASE_PRICES, 
  EXTRA_PAGE_RATE, 
  ADDON_COSTS, 
  BRANDING_COSTS,
  formatQuoteSummaryText,
  PricingConfig 
} from '../utils/pricing';
import { 
  calculateStepperProgress, 
  StepperStep 
} from '../utils/calculator-stepper';
import { CONTACT_INFO, buildMailtoUrl } from '../data/contact';

interface PricingCalculatorProps {
  onSelectEstimate: (summary: {
    totalPrice: number;
    timeline: string;
    description: string;
    features: string[];
  }) => void;
}

export const PricingCalculator: React.FC<PricingCalculatorProps> = ({
  onSelectEstimate
}) => {
  const [siteType, setSiteType] = useState<PricingConfig['siteType']>('business');
  const [pagesCount, setPagesCount] = useState(5);
  const [brandingTier, setBrandingTier] = useState<PricingConfig['brandingTier']>('included');
  
  // Toggles
  const [cms, setCms] = useState(true);
  const [booking, setBooking] = useState(true);
  const [ecommerce, setEcommerce] = useState(false);
  const [seo, setSeo] = useState(true);
  const [animations, setAnimations] = useState(true);
  const [performancePack, setPerformancePack] = useState(true);
  const [rush, setRush] = useState(false);

  // Stepper & Progress Tracking
  const [activeStep, setActiveStep] = useState<number>(1);
  const [visitedSteps, setVisitedSteps] = useState<number[]>([1, 2, 3, 4]);

  // Copy feedback state
  const [isCopied, setIsCopied] = useState(false);

  const currentConfig: PricingConfig = {
    siteType,
    pagesCount,
    brandingTier,
    cms,
    booking,
    ecommerce,
    seo,
    animations,
    performancePack,
    rush
  };

  const estimateResult = calculatePricingEstimate(currentConfig);

  const {
    basePrice,
    extraPageCost,
    brandingCost,
    cmsCost,
    bookingCost,
    ecommerceCost,
    seoCost,
    animationsCost,
    performanceCost,
    rushCost,
    totalEstimate,
    depositAmount,
    completionAmount,
    timelineString
  } = estimateResult;

  const activeAddonsCount = [
    cms,
    booking,
    ecommerce,
    seo,
    animations,
    performancePack,
    rush
  ].filter(Boolean).length;

  const stepperState = calculateStepperProgress({
    siteType,
    pagesCount,
    brandingTier,
    activeAddonsCount,
    visitedSteps,
    activeStep
  });

  const markStepVisited = (stepNumber: number) => {
    setActiveStep(stepNumber);
    if (!visitedSteps.includes(stepNumber)) {
      setVisitedSteps(prev => [...prev, stepNumber]);
    }
  };

  const scrollToStep = (targetId: string, stepNumber: number) => {
    markStepVisited(stepNumber);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const activeFeaturesList: string[] = [
    `${pagesCount} Custom Responsive Pages`,
    brandingTier === 'full' 
      ? 'Full Brand Identity Kit & Photography' 
      : brandingTier === 'polish' 
        ? 'Logo Polish & Color Palette Setup' 
        : 'Client Existing Assets Integration',
    siteType === 'ecommerce' || ecommerce ? 'Full E-commerce Product & Cart Suite' : '',
    booking ? 'Real-Time Appointment / Booking Wizard' : '',
    cms ? 'Client Content Management Setup (Edit text/photos)' : '',
    seo ? 'Google SEO & Indexing Setup' : '',
    animations ? 'Polished 60fps Micro-Interactions & Transitions' : '',
    performancePack ? 'Sub-Second CDN Speed & Image Optimization' : '',
    rush ? 'Fast-Track Priority Delivery Sprint (3-Day Launch)' : ''
  ].filter(Boolean);

  // Mailto link for direct emailing
  const emailSubject = `Website Build Quote: ${siteType.toUpperCase()} ($${totalEstimate})`;
  const emailBody = formatQuoteSummaryText(currentConfig, estimateResult);
  const mailtoHref = buildMailtoUrl({
    subject: emailSubject,
    body: emailBody
  });

  const handleCopyQuote = async () => {
    try {
      await navigator.clipboard.writeText(emailBody);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 3000);
    } catch (err) {
      // Fallback
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 3000);
    }
  };

  const handleApplyEstimate = () => {
    onSelectEstimate({
      totalPrice: totalEstimate,
      timeline: timelineString,
      description: `Custom ${siteType.toUpperCase()} Website with ${pagesCount} pages and selected integrations.`,
      features: activeFeaturesList
    });
  };

  return (
    <section id="calculator" className="py-20 bg-neutral-900 dark:bg-black text-neutral-100 border-b border-neutral-800 transition-colors">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-800 dark:bg-neutral-900 text-neutral-300 rounded-md text-xs font-semibold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5 text-emerald-400" />
            <span>Interactive Cost Calculator</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Calculate your custom website build
          </h2>
          <p className="text-sm text-neutral-400">
            Affordable starter rates with zero hidden agency markups. Follow the steps below to dial in your scope, then email your instant quote directly to Oronde (<span className="text-emerald-400 font-mono font-medium">{CONTACT_INFO.email}</span>) with one click.
          </p>
        </div>

        {/* Visual Stepper & Progress Indicator Bar */}
        <div className="mb-10 bg-neutral-950/80 dark:bg-neutral-900/80 border border-neutral-800/80 rounded-2xl p-4 sm:p-6 shadow-xl backdrop-blur-sm">
          {/* Top Progress Metric Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <div className="text-xs font-bold uppercase tracking-wider text-neutral-200">
                Estimate Progress
              </div>
              <span className="text-[11px] text-neutral-400 font-normal hidden sm:inline">
                · {stepperState.statusText}
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold text-emerald-400">
                {stepperState.progressPercentage}% Complete
              </span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-bold">
                {stepperState.isFullyReady ? 'Ready to Email' : 'In Progress'}
              </span>
            </div>
          </div>

          {/* Animated Progress Bar Track */}
          <div className="relative w-full h-2.5 bg-neutral-800/80 rounded-full overflow-hidden mb-6">
            <div
              role="progressbar"
              aria-valuenow={stepperState.progressPercentage}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Website estimate configuration progress"
              className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 rounded-full transition-all duration-500 ease-out shadow-[0_0_12px_rgba(16,185,129,0.5)]"
              style={{ width: `${stepperState.progressPercentage}%` }}
            />
          </div>

          {/* Interactive Step Nodes / Navigation Stepper */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3">
            {stepperState.steps.map((step) => {
              const isActive = activeStep === step.id;
              const isCompleted = step.isCompleted;

              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => scrollToStep(step.targetId, step.id)}
                  className={`group relative p-2.5 sm:p-3 rounded-xl border text-left transition-all ${
                    isActive
                      ? 'border-emerald-500/80 bg-emerald-950/30 text-white shadow-sm ring-1 ring-emerald-500/40'
                      : isCompleted
                        ? 'border-neutral-800 bg-neutral-900/40 text-neutral-300 hover:border-neutral-700 hover:bg-neutral-900/60'
                        : 'border-neutral-800/60 bg-neutral-900/20 text-neutral-500'
                  }`}
                  aria-label={`Jump to ${step.title}`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center shrink-0 transition-colors ${
                        isActive
                          ? 'bg-emerald-500 text-black font-bold ring-2 ring-emerald-400/30'
                          : isCompleted
                            ? 'bg-emerald-950 border border-emerald-500/60 text-emerald-400'
                            : 'bg-neutral-800 text-neutral-400'
                      }`}
                    >
                      {isCompleted && !isActive ? (
                        <Check className="w-3 h-3 stroke-3" />
                      ) : (
                        step.id
                      )}
                    </span>
                    <span className="text-[11px] font-bold tracking-tight truncate">
                      {step.shortTitle}
                    </span>
                  </div>

                  <div className="text-[10px] text-neutral-400 font-mono truncate pl-7">
                    {step.subtitle}
                  </div>

                  {isActive && (
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-emerald-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-8 bg-neutral-950/60 dark:bg-neutral-900/60 p-6 sm:p-8 rounded-2xl border border-neutral-800">
            {/* Step 1: Website Classification */}
            <div 
              id="calc-step-category" 
              className={`rounded-xl p-4 sm:p-5 transition-all ${
                activeStep === 1 
                  ? 'bg-neutral-900/60 border border-emerald-500/30' 
                  : 'bg-transparent border border-transparent'
              }`}
              onClick={() => markStepVisited(1)}
            >
              <div className="flex items-center justify-between mb-3.5">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  <label className="text-xs font-bold text-neutral-200 uppercase tracking-wider">
                    Select Website Category
                  </label>
                </div>
                <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950/40 border border-emerald-800/60 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Check className="w-2.5 h-2.5" />
                  <span>Step 1 of 4</span>
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'starter', label: 'Starter Presence', sub: 'Simple 1-4 page brand site', price: '$129' },
                  { id: 'business', label: 'Local Business / Clinic', sub: 'Services & appointments', price: '$199' },
                  { id: 'ecommerce', label: 'E-Commerce Store', sub: 'Products, cart, checkout', price: '$249' },
                  { id: 'saas', label: 'B2B SaaS / Tech', sub: 'Product tour & trial signup', price: '$289' },
                  { id: 'bespoke', label: 'Consultancy / Law', sub: 'High-trust practice advisory', price: '$299' }
                ].map(type => (
                  <button
                    key={type.id}
                    onClick={() => {
                      setSiteType(type.id as any);
                      markStepVisited(1);
                    }}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      siteType === type.id
                        ? 'border-emerald-500 bg-emerald-950/30 text-white shadow-sm ring-1 ring-emerald-500/50'
                        : 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-xs text-white">{type.label}</div>
                      <span className="text-[10px] text-emerald-400 font-mono font-bold">{type.price}</span>
                    </div>
                    <div className="text-[11px] text-neutral-400 mt-1">{type.sub}</div>
                  </button>
                ))}
              </div>

              <div className="mt-3.5 flex justify-end">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    scrollToStep('calc-step-pages', 2);
                  }}
                  className="text-[11px] text-neutral-400 hover:text-emerald-400 flex items-center gap-1 transition-colors font-medium py-1 px-2 rounded-lg hover:bg-neutral-800/50"
                >
                  <span>Continue to Step 2: Page Scope</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Step 2: Page Count Slider */}
            <div 
              id="calc-step-pages" 
              className={`rounded-xl p-4 sm:p-5 transition-all ${
                activeStep === 2 
                  ? 'bg-neutral-900/60 border border-emerald-500/30' 
                  : 'bg-transparent border border-transparent'
              }`}
              onClick={() => markStepVisited(2)}
            >
              <div className="flex items-center justify-between mb-3.5">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  <span className="text-xs font-bold text-neutral-200 uppercase tracking-wider">
                    Number of Custom Layout Pages
                  </span>
                </div>
                <span className="font-mono text-emerald-400 font-bold text-xs bg-emerald-950/40 border border-emerald-800/60 px-2 py-0.5 rounded-full">
                  {pagesCount} Pages {pagesCount > 4 ? `(+$${(pagesCount - 4) * EXTRA_PAGE_RATE})` : '(4 Included)'}
                </span>
              </div>

              <input
                type="range"
                min="1"
                max="16"
                value={pagesCount}
                onChange={e => {
                  setPagesCount(Number(e.target.value));
                  markStepVisited(2);
                }}
                className="w-full accent-emerald-500 cursor-pointer h-2 bg-neutral-800 rounded-lg"
                aria-label="Number of custom pages"
              />
              <div className="flex justify-between text-[11px] text-neutral-500 mt-2 font-mono">
                <span>1 Page (Landing)</span>
                <span>4 Pages (Standard)</span>
                <span>8 Pages</span>
                <span>16 Pages (Enterprise)</span>
              </div>

              <div className="mt-3.5 flex justify-end">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    scrollToStep('calc-step-branding', 3);
                  }}
                  className="text-[11px] text-neutral-400 hover:text-emerald-400 flex items-center gap-1 transition-colors font-medium py-1 px-2 rounded-lg hover:bg-neutral-800/50"
                >
                  <span>Continue to Step 3: Brand Identity</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Step 3: Brand Identity & Asset Preparation */}
            <div 
              id="calc-step-branding" 
              className={`rounded-xl p-4 sm:p-5 transition-all ${
                activeStep === 3 
                  ? 'bg-neutral-900/60 border border-emerald-500/30' 
                  : 'bg-transparent border border-transparent'
              }`}
              onClick={() => markStepVisited(3)}
            >
              <div className="flex items-center justify-between mb-3.5">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold flex items-center justify-center">
                    3
                  </span>
                  <label className="text-xs font-bold text-neutral-200 uppercase tracking-wider">
                    Brand Identity & Visual Assets
                  </label>
                </div>
                <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950/40 border border-emerald-800/60 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Check className="w-2.5 h-2.5" />
                  <span>Step 3 of 4</span>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  {
                    id: 'included',
                    title: 'Have Existing Assets',
                    desc: 'You provide logo, text, and photos',
                    cost: '+$0'
                  },
                  {
                    id: 'polish',
                    title: 'Logo & Color Polish',
                    desc: 'Vector cleanup, typography & palette',
                    cost: `+$${BRANDING_COSTS.polish}`
                  },
                  {
                    id: 'full',
                    title: 'Full Brand Kit',
                    desc: 'Logo suite, licensed photos & styling',
                    cost: `+$${BRANDING_COSTS.full}`
                  }
                ].map(tier => (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => {
                      setBrandingTier(tier.id as any);
                      markStepVisited(3);
                    }}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      brandingTier === tier.id
                        ? 'border-emerald-500 bg-emerald-950/20 text-white ring-1 ring-emerald-500/40'
                        : 'border-neutral-800 bg-neutral-900/40 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{tier.title}</span>
                      <span className="text-[10px] text-emerald-400 font-mono font-bold">{tier.cost}</span>
                    </div>
                    <p className="text-[11px] text-neutral-400 mt-1 leading-snug">{tier.desc}</p>
                  </button>
                ))}
              </div>

              <div className="mt-3.5 flex justify-end">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    scrollToStep('calc-step-addons', 4);
                  }}
                  className="text-[11px] text-neutral-400 hover:text-emerald-400 flex items-center gap-1 transition-colors font-medium py-1 px-2 rounded-lg hover:bg-neutral-800/50"
                >
                  <span>Continue to Step 4: Add-ons & Speed</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Step 4: Interactive Capabilities & Add-ons */}
            <div 
              id="calc-step-addons" 
              className={`rounded-xl p-4 sm:p-5 transition-all ${
                activeStep === 4 
                  ? 'bg-neutral-900/60 border border-emerald-500/30' 
                  : 'bg-transparent border border-transparent'
              }`}
              onClick={() => markStepVisited(4)}
            >
              <div className="flex items-center justify-between mb-3.5">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold flex items-center justify-center">
                    4
                  </span>
                  <label className="text-xs font-bold text-neutral-200 uppercase tracking-wider">
                    Interactive Features & Add-ons
                  </label>
                </div>
                <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950/40 border border-emerald-800/60 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span>{activeAddonsCount} Active</span>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    checked: booking,
                    toggle: () => {
                      setBooking(!booking);
                      markStepVisited(4);
                    },
                    title: 'Appointment Booking Wizard',
                    cost: `+$${ADDON_COSTS.booking}`,
                    desc: 'Real-time multi-step calendar & consultation intake'
                  },
                  {
                    checked: ecommerce,
                    toggle: () => {
                      setEcommerce(!ecommerce);
                      markStepVisited(4);
                    },
                    title: 'Online Store / Cart Drawer',
                    cost: `+$${ADDON_COSTS.ecommerce}`,
                    desc: 'Product catalog, cart drawer & Stripe checkout'
                  },
                  {
                    checked: cms,
                    toggle: () => {
                      setCms(!cms);
                      markStepVisited(4);
                    },
                    title: 'Client Content Management',
                    cost: `+$${ADDON_COSTS.cms}`,
                    desc: 'Easily edit text and photos without writing code'
                  },
                  {
                    checked: seo,
                    toggle: () => {
                      setSeo(!seo);
                      markStepVisited(4);
                    },
                    title: 'Google SEO & Indexing',
                    cost: `+$${ADDON_COSTS.seo}`,
                    desc: 'Meta tags, XML sitemap, and Google Search Console setup'
                  },
                  {
                    checked: animations,
                    toggle: () => {
                      setAnimations(!animations);
                      markStepVisited(4);
                    },
                    title: 'Smooth Micro-Interactions',
                    cost: `+$${ADDON_COSTS.animations}`,
                    desc: 'Fluid settling motion, interactive sliders, 60fps feel'
                  },
                  {
                    checked: performancePack,
                    toggle: () => {
                      setPerformancePack(!performancePack);
                      markStepVisited(4);
                    },
                    title: 'Sub-Second Speed CDN Engine',
                    cost: `+$${ADDON_COSTS.performancePack}`,
                    desc: 'Lightweight image compression and instant page rendering'
                  },
                  {
                    checked: rush,
                    toggle: () => {
                      setRush(!rush);
                      markStepVisited(4);
                    },
                    title: 'Priority 3-Day Sprint',
                    cost: `+$${ADDON_COSTS.rush}`,
                    desc: 'Dedicated fast-track sprint to go live in 3 days'
                  }
                ].map((addon, idx) => (
                  <div
                    key={idx}
                    onClick={addon.toggle}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-3 select-none ${
                      addon.checked
                        ? 'border-emerald-500/70 bg-emerald-950/20 text-white'
                        : 'border-neutral-800 bg-neutral-900/40 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                        addon.checked ? 'bg-emerald-500 text-black' : 'border border-neutral-600'
                      }`}
                    >
                      {addon.checked && <Check className="w-3 h-3 stroke-3" />}
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span className="text-white">{addon.title}</span>
                        <span className="font-mono text-emerald-400">{addon.cost}</span>
                      </div>
                      <div className="text-[11px] text-neutral-400 mt-0.5 leading-snug">{addon.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-3.5 flex justify-end">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    scrollToStep('calc-step-quote', 5);
                  }}
                  className="text-[11px] text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors font-bold py-1 px-2.5 rounded-lg bg-emerald-950/40 border border-emerald-800/60"
                >
                  <span>Review Final Estimate & Email Quote</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Quotation Summary Card */}
          <div 
            id="calc-step-quote"
            className="lg:col-span-5 bg-neutral-950 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-6 sticky top-24 shadow-2xl transition-all"
          >
            {/* Step 5 Indicator Banner */}
            <div className="border-b border-neutral-800 pb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-950/60 border border-emerald-500/40 rounded-full text-[10px] font-mono text-emerald-300 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Step 5 · Final Estimate Generated</span>
                </div>
                <span className="text-[10px] text-neutral-400 font-mono">
                  Guaranteed Rate
                </span>
              </div>
              <h3 className="font-display text-2xl font-bold text-white mt-1">
                Your Project Scope
              </h3>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between text-neutral-400">
                <span>Base Platform Build ({siteType.toUpperCase()}):</span>
                <span className="font-mono text-white">${basePrice}</span>
              </div>
              {extraPageCost > 0 && (
                <div className="flex items-center justify-between text-neutral-400">
                  <span>Additional Pages ({pagesCount - 4} pages @ ${EXTRA_PAGE_RATE}):</span>
                  <span className="font-mono text-white">+${extraPageCost}</span>
                </div>
              )}
              {brandingCost > 0 && (
                <div className="flex items-center justify-between text-neutral-400">
                  <span>Branding Package ({brandingTier}):</span>
                  <span className="font-mono text-white">+${brandingCost}</span>
                </div>
              )}
              {cms && (
                <div className="flex items-center justify-between text-neutral-400">
                  <span>Client CMS Integration:</span>
                  <span className="font-mono text-white">+${cmsCost}</span>
                </div>
              )}
              {booking && (
                <div className="flex items-center justify-between text-neutral-400">
                  <span>Booking Engine:</span>
                  <span className="font-mono text-white">+${bookingCost}</span>
                </div>
              )}
              {ecommerce && (
                <div className="flex items-center justify-between text-neutral-400">
                  <span>Online Store & Checkout:</span>
                  <span className="font-mono text-white">+${ecommerceCost}</span>
                </div>
              )}
              {seo && (
                <div className="flex items-center justify-between text-neutral-400">
                  <span>Google SEO & Meta Tags:</span>
                  <span className="font-mono text-white">+${seoCost}</span>
                </div>
              )}
              {animations && (
                <div className="flex items-center justify-between text-neutral-400">
                  <span>Custom Interactions:</span>
                  <span className="font-mono text-white">+${animationsCost}</span>
                </div>
              )}
              {performancePack && (
                <div className="flex items-center justify-between text-neutral-400">
                  <span>Sub-Second CDN Speed:</span>
                  <span className="font-mono text-white">+${performanceCost}</span>
                </div>
              )}
              {rush && (
                <div className="flex items-center justify-between text-amber-400">
                  <span>Priority Rush Sprint:</span>
                  <span className="font-mono font-bold">+${rushCost}</span>
                </div>
              )}
            </div>

            <div className="border-t border-neutral-800 pt-5 space-y-3">
              <div className="flex items-baseline justify-between">
                <div>
                  <div className="text-xs text-neutral-400">Total Build Investment:</div>
                  <div className="text-[11px] text-neutral-500">
                    50% deposit (${depositAmount}) · 50% on live launch (${completionAmount})
                  </div>
                </div>
                <div className="font-display font-bold text-3xl sm:text-4xl text-emerald-400 font-mono">
                  ${totalEstimate.toLocaleString()}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-2 text-neutral-300 bg-neutral-900/60 p-3 rounded-lg border border-neutral-800">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span>Estimated Delivery:</span>
                </span>
                <span className="font-mono font-bold text-white">{timelineString}</span>
              </div>
            </div>

            {/* Direct Email & Action Buttons */}
            <div className="space-y-2.5 pt-2">
              {/* Primary: Email directly to Oronde */}
              <a
                href={mailtoHref}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3.5 px-4 rounded-xl text-xs uppercase font-bold tracking-wider transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/40 text-center"
              >
                <Mail className="w-4 h-4" />
                <span>Email Quote to Oronde</span>
              </a>

              <div className="grid grid-cols-2 gap-2">
                {/* Secondary: Copy Quote to Clipboard */}
                <button
                  type="button"
                  onClick={handleCopyQuote}
                  className="w-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 py-2.5 px-3 rounded-xl text-[11px] font-semibold transition-colors flex items-center justify-center gap-1.5"
                  title="Copy formatted quotation text"
                >
                  {isCopied ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Quote Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-neutral-400" />
                      <span>Copy Quote</span>
                    </>
                  )}
                </button>

                {/* Tertiary: Open project intake modal */}
                <button
                  type="button"
                  onClick={handleApplyEstimate}
                  className="w-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 py-2.5 px-3 rounded-xl text-[11px] font-semibold transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Book in Intake</span>
                  <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
                </button>
              </div>

              {/* Direct email info box */}
              <div className="p-3 bg-neutral-900/80 rounded-xl border border-neutral-800 text-[11px] text-neutral-400 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Direct developer email:</span>
                </div>
                <a 
                  href={`mailto:${CONTACT_INFO.email}`} 
                  className="font-mono text-emerald-400 font-semibold hover:underline"
                >
                  {CONTACT_INFO.email}
                </a>
              </div>

              <div className="text-[11px] text-center text-neutral-500 flex items-center justify-center gap-2 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
                <span>30 Days Free Edits · 100% Code Ownership</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
