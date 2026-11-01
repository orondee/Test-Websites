import React from 'react';
import { ArrowRight, Calculator, CheckCircle2, MonitorPlay, Sparkles } from 'lucide-react';
import { AGENCY_STATS } from '../data/demoData';

interface AgencyHeroProps {
  onExploreDemos: () => void;
  onOpenCalculator: () => void;
}

export const AgencyHero: React.FC<AgencyHeroProps> = ({
  onExploreDemos,
  onOpenCalculator
}) => {
  return (
    <section className="relative border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 overflow-hidden transition-colors">
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-700 dark:text-neutral-300 tracking-wide bg-neutral-100 dark:bg-neutral-800 px-3 py-1.5 rounded-lg border border-neutral-200/60 dark:border-neutral-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Affordable Custom Websites Starting at $299</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 dark:text-white leading-[1.12] text-balance">
              Professional websites crafted to grow your local business.
            </h1>

            <p className="text-neutral-600 dark:text-neutral-300 text-base sm:text-lg max-w-xl leading-relaxed">
              I design and code clean, modern websites tailored for small businesses, clinics, cafes, and founders. You get direct 1-on-1 collaboration, fast 7-day delivery, and 100% code ownership—without bloated agency retainers.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreDemos}
                className="bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 dark:text-neutral-900 text-white px-6 py-3.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 shadow-sm hover:shadow-md hover:-translate-y-0.5"
              >
                <MonitorPlay className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
                <span>Test 5 Live Demo Websites</span>
              </button>

              <button
                onClick={onOpenCalculator}
                className="border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 px-5 py-3.5 rounded-xl text-sm font-semibold hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all flex items-center gap-2 hover:-translate-y-0.5"
              >
                <Calculator className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
                <span>Instant Cost Calculator</span>
              </button>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-neutral-500 dark:text-neutral-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Direct 1-on-1 Developer Access</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Fast 7-Day Launch Guarantee</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>30 Days Free Edits Included</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Studio Asset */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-xl aspect-16/10 bg-neutral-100 dark:bg-neutral-800 group transition-all">
              <img
                src="/src/assets/images/agency_hero_workspace_1793552555373.jpg"
                alt="Oronde Web Studio creative workspace and web design showcase"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-6">
                <div className="text-white space-y-1">
                  <div className="text-xs uppercase tracking-wider font-semibold text-emerald-300">
                    Bespoke Web Engineering
                  </div>
                  <div className="font-display text-base font-bold">
                    Clean Code. Mobile-First. Fast Loading.
                  </div>
                  <div className="text-xs text-neutral-300">
                    Hand-crafted for phones, tablets, and desktops.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Real Value Strip below hero split */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 mt-12 border-t border-neutral-200 dark:border-neutral-800">
          {AGENCY_STATS.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <div className="font-display text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
                {stat.value}
              </div>
              <div className="text-xs text-neutral-500 dark:text-neutral-400 leading-snug">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
