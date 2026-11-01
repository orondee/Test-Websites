import React from 'react';
import { ArrowRight, Calculator, CheckCircle2, MonitorPlay } from 'lucide-react';
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
    <section className="relative border-b border-neutral-200 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-600 tracking-wide bg-neutral-100 px-3 py-1 rounded-md">
              <span>Bespoke Web Design & Development</span>
              <span aria-hidden="true">·</span>
              <span>Built for High-Ticket Conversion</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 leading-[1.12] text-balance">
              Websites built to turn everyday visitors into paying clients.
            </h1>

            <p className="text-neutral-600 text-base sm:text-lg max-w-xl leading-relaxed">
              We design and code lightning-fast, custom websites tailored for modern businesses. No clunky WordPress templates. No slow page builders. Just high-converting digital storefronts delivered in 14 days.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreDemos}
                className="bg-neutral-900 hover:bg-neutral-800 text-white px-6 py-3.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 shadow-sm"
              >
                <MonitorPlay className="w-4 h-4 text-emerald-400" />
                <span>Test 5 Live Demo Websites</span>
              </button>

              <button
                onClick={onOpenCalculator}
                className="border border-neutral-300 text-neutral-800 px-5 py-3.5 rounded-lg text-sm font-semibold hover:bg-neutral-50 transition-colors flex items-center gap-2"
              >
                <Calculator className="w-4 h-4 text-neutral-500" />
                <span>Calculate Your Website Cost</span>
              </button>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-neutral-500">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>100% Custom Code (React & Vite)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Mobile & SEO Optimized</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Turnaround in 10–14 Days</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Studio Asset */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-neutral-200 shadow-xl aspect-16/10 bg-neutral-100 group">
              <img
                src="/src/assets/images/agency_hero_workspace_1793552555373.jpg"
                alt="Oronde Web Studio creative workspace and web design showcase"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6">
                <div className="text-white space-y-1">
                  <div className="text-xs uppercase tracking-wider font-semibold text-emerald-300">
                    Live Production Standards
                  </div>
                  <div className="font-display text-base font-bold">
                    Clean Code. Zero Template Bloat.
                  </div>
                  <div className="text-xs text-neutral-300">
                    Tested across iPhone, Android, iPad, and 4K displays.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column KPI Strip below hero split */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 mt-12 border-t border-neutral-200">
          {AGENCY_STATS.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <div className="font-display text-2xl sm:text-3xl font-bold text-neutral-900">
                {stat.value}
              </div>
              <div className="text-xs text-neutral-500 leading-snug">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
