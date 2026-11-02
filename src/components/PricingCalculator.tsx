import React, { useState } from 'react';
import { 
  Calculator, 
  Check, 
  Sparkles, 
  ArrowRight, 
  Clock, 
  ShieldCheck, 
  Server,
  Zap
} from 'lucide-react';
import { CalculatorState } from '../types';
import { calculatePricingEstimate, BASE_PRICES, EXTRA_PAGE_RATE, ADDON_COSTS } from '../utils/pricing';

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
  const [siteType, setSiteType] = useState<CalculatorState['websiteType']>('business');
  const [pagesCount, setPagesCount] = useState(5);
  
  // Toggles
  const [cms, setCms] = useState(true);
  const [booking, setBooking] = useState(true);
  const [ecommerce, setEcommerce] = useState(false);
  const [seo, setSeo] = useState(true);
  const [animations, setAnimations] = useState(true);
  const [rush, setRush] = useState(false);

  const estimateResult = calculatePricingEstimate({
    siteType,
    pagesCount,
    cms,
    booking,
    ecommerce,
    seo,
    animations,
    rush
  });

  const {
    basePrice,
    extraPageCost,
    totalEstimate,
    timelineString
  } = estimateResult;

  const cmsCost = cms ? ADDON_COSTS.cms : 0;
  const bookingCost = booking ? ADDON_COSTS.booking : 0;
  const ecommerceCost = ecommerce ? ADDON_COSTS.ecommerce : 0;
  const seoCost = seo ? ADDON_COSTS.seo : 0;
  const animationsCost = animations ? ADDON_COSTS.animations : 0;
  const rushCost = rush ? ADDON_COSTS.rush : 0;

  const activeFeaturesList: string[] = [
    `${pagesCount} Custom Responsive Pages`,
    siteType === 'ecommerce' || ecommerce ? 'Full E-commerce Product & Cart Suite' : '',
    booking ? 'Real-Time Appointment / Booking Wizard' : '',
    cms ? 'Client Content Management Setup' : '',
    seo ? 'Google SEO & Indexing Setup' : '',
    animations ? 'Polished Micro-Interactions & Transitions' : '',
    rush ? 'Fast-Track Priority Delivery Sprint' : ''
  ].filter(Boolean);

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
            <span>Transparent Investment Estimator</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Calculate your custom website build
          </h2>
          <p className="text-sm text-neutral-400">
            Affordable starter rates with zero hidden agency markups. Configure your desired pages and features to receive an instant build quotation.
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
                        ? 'border-emerald-500 bg-emerald-950/30 text-white shadow-sm'
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
                  {pagesCount} Pages {pagesCount > 4 ? `(+$${(pagesCount - 4) * EXTRA_PAGE_RATE})` : '(Included)'}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="12"
                value={pagesCount}
                onChange={e => setPagesCount(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-neutral-500 mt-1 font-mono">
                <span>1 Page (Landing)</span>
                <span>4 Pages (Standard)</span>
                <span>12 Pages (Multi-Service)</span>
              </div>
            </div>

            {/* Step 3: Interactive Capabilities & Add-ons */}
            <div>
              <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider block mb-3">
                3. Interactive Features & Add-ons
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
                    desc: 'Edit text and photos without writing code'
                  },
                  {
                    checked: seo,
                    toggle: () => setSeo(!seo),
                    title: 'Google SEO & Indexing',
                    cost: `+$${ADDON_COSTS.seo}`,
                    desc: 'Meta tags, sitemap, and Google Search Console setup'
                  },
                  {
                    checked: animations,
                    toggle: () => setAnimations(!animations),
                    title: 'Smooth Micro-Interactions',
                    cost: `+$${ADDON_COSTS.animations}`,
                    desc: 'Fluid settling motion, interactive sliders, 60fps feel'
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
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                      addon.checked
                        ? 'border-emerald-500/70 bg-emerald-950/20 text-white'
                        : 'border-neutral-800 bg-neutral-900/40 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 ${
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
                      <div className="text-[11px] text-neutral-400 mt-0.5">{addon.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quotation Summary Card */}
          <div className="lg:col-span-5 bg-neutral-950 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-6 sticky top-24 shadow-2xl">
            <div className="border-b border-neutral-800 pb-4">
              <div className="text-xs uppercase font-mono tracking-wider text-emerald-400 font-bold">
                Itemized Estimate Summary
              </div>
              <h3 className="font-display text-2xl font-bold text-white mt-1">
                Your Project Scope
              </h3>
            </div>

            <div className="space-y-2.5 text-xs">
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
              {rush && (
                <div className="flex items-center justify-between text-amber-400">
                  <span>Priority Rush Sprint:</span>
                  <span className="font-mono font-bold">+${rushCost}</span>
                </div>
              )}
            </div>

            <div className="border-t border-neutral-800 pt-5 space-y-2">
              <div className="flex items-baseline justify-between">
                <div>
                  <div className="text-xs text-neutral-400">Total Build Investment:</div>
                  <div className="text-[11px] text-neutral-500">50% deposit, 50% on live launch</div>
                </div>
                <div className="font-display font-bold text-3xl sm:text-4xl text-emerald-400 font-mono">
                  ${totalEstimate.toLocaleString()}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-3 text-neutral-300 bg-neutral-900/60 p-3 rounded-lg border border-neutral-800">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span>Estimated Delivery:</span>
                </span>
                <span className="font-mono font-bold text-white">{timelineString}</span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <button
                onClick={handleApplyEstimate}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3.5 rounded-xl text-xs uppercase font-bold tracking-wider transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/40"
              >
                <span>Book This Exact Spec</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-[11px] text-center text-neutral-500 flex items-center justify-center gap-2">
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
