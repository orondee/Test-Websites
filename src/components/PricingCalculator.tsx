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
  ExternalLink
} from 'lucide-react';
import { CalculatorState } from '../types';
import { 
  calculatePricingEstimate, 
  BASE_PRICES, 
  EXTRA_PAGE_RATE, 
  ADDON_COSTS, 
  BRANDING_COSTS,
  formatQuoteSummaryText,
  PricingConfig 
} from '../utils/pricing';
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
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-800 dark:bg-neutral-900 text-neutral-300 rounded-md text-xs font-semibold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5 text-emerald-400" />
            <span>Interactive Cost Calculator</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Calculate your custom website build
          </h2>
          <p className="text-sm text-neutral-400">
            Affordable starter rates with zero hidden agency markups. Configure your desired pages and features, then email your quote directly to Oronde (<span className="text-emerald-400 font-mono font-medium">{CONTACT_INFO.email}</span>) with one click.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-8 bg-neutral-950/60 dark:bg-neutral-900/60 p-6 sm:p-8 rounded-2xl border border-neutral-800">
            {/* Step 1: Website Classification */}
            <div>
              <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider block mb-3">
                1. Select Website Category
              </label>
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
                    onClick={() => setSiteType(type.id as any)}
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
            </div>

            {/* Step 2: Page Count Slider */}
            <div>
              <div className="flex items-center justify-between text-xs mb-3">
                <span className="font-bold text-neutral-300 uppercase tracking-wider">
                  2. Number of Custom Layout Pages
                </span>
                <span className="font-mono text-emerald-400 font-bold text-sm">
                  {pagesCount} Pages {pagesCount > 4 ? `(+$${(pagesCount - 4) * EXTRA_PAGE_RATE})` : '(4 Included)'}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="16"
                value={pagesCount}
                onChange={e => setPagesCount(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer h-2 bg-neutral-800 rounded-lg"
                aria-label="Number of custom pages"
              />
              <div className="flex justify-between text-[11px] text-neutral-500 mt-1.5 font-mono">
                <span>1 Page (Landing)</span>
                <span>4 Pages (Standard Included)</span>
                <span>8 Pages</span>
                <span>16 Pages (Enterprise)</span>
              </div>
            </div>

            {/* Step 3: Brand Identity & Asset Preparation */}
            <div>
              <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider block mb-3">
                3. Brand Identity & Visual Assets
              </label>
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
                    onClick={() => setBrandingTier(tier.id as any)}
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
            </div>

            {/* Step 4: Interactive Capabilities & Add-ons */}
            <div>
              <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider block mb-3">
                4. Interactive Features & Add-ons
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    checked: booking,
                    toggle: () => setBooking(!booking),
                    title: 'Appointment Booking Wizard',
                    cost: `+$${ADDON_COSTS.booking}`,
                    desc: 'Real-time multi-step calendar & consultation intake'
                  },
                  {
                    checked: ecommerce,
                    toggle: () => setEcommerce(!ecommerce),
                    title: 'Online Store / Cart Drawer',
                    cost: `+$${ADDON_COSTS.ecommerce}`,
                    desc: 'Product catalog, cart drawer & Stripe checkout'
                  },
                  {
                    checked: cms,
                    toggle: () => setCms(!cms),
                    title: 'Client Content Management',
                    cost: `+$${ADDON_COSTS.cms}`,
                    desc: 'Easily edit text and photos without writing code'
                  },
                  {
                    checked: seo,
                    toggle: () => setSeo(!seo),
                    title: 'Google SEO & Indexing',
                    cost: `+$${ADDON_COSTS.seo}`,
                    desc: 'Meta tags, XML sitemap, and Google Search Console setup'
                  },
                  {
                    checked: animations,
                    toggle: () => setAnimations(!animations),
                    title: 'Smooth Micro-Interactions',
                    cost: `+$${ADDON_COSTS.animations}`,
                    desc: 'Fluid settling motion, interactive sliders, 60fps feel'
                  },
                  {
                    checked: performancePack,
                    toggle: () => setPerformancePack(!performancePack),
                    title: 'Sub-Second Speed CDN Engine',
                    cost: `+$${ADDON_COSTS.performancePack}`,
                    desc: 'Lightweight image compression and instant page rendering'
                  },
                  {
                    checked: rush,
                    toggle: () => setRush(!rush),
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
            </div>
          </div>

          {/* Quotation Summary Card */}
          <div className="lg:col-span-5 bg-neutral-950 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-6 sticky top-24 shadow-2xl">
            <div className="border-b border-neutral-800 pb-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-mono tracking-wider text-emerald-400 font-bold">
                  Itemized Estimate Summary
                </span>
                <span className="text-[10px] text-neutral-500 font-mono">
                  Guaranteed Rate
                </span>
              </div>
              <h3 className="font-display text-2xl font-bold text-white mt-1">
                Your Project Scope
              </h3>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between text-neutral-400">
                <span>Base Platform Build:</span>
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
