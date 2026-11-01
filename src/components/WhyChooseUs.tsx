import React from 'react';
import { Check, X, Zap, Shield, Sparkles, TrendingUp } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  return (
    <section id="why-us" className="py-20 bg-neutral-900 text-white border-b border-neutral-800">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
            Engineered For Commercial Superiority
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Custom Code vs. Bloated Templates
          </h2>
          <p className="text-sm text-neutral-400">
            Most businesses lose 40% of their mobile visitors before the page even loads. Here is why our bespoke architecture delivers 3x higher conversion.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-neutral-800">
            {/* Left: Oronde Studio */}
            <div className="md:col-span-6 p-6 sm:p-8 space-y-6 bg-neutral-900/40">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
                    The Modern Standard
                  </div>
                  <h3 className="font-display text-xl font-bold text-white mt-1">
                    Bespoke Code by Oronde Studio
                  </h3>
                </div>
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Zap className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-4">
                {[
                  {
                    title: '98–100 Mobile Google PageSpeed',
                    desc: 'Under 1.2s total load time. Ranked higher automatically by Google search algorithms.'
                  },
                  {
                    title: 'Engineered For Direct Commercial Actions',
                    desc: 'Custom multi-step booking wizards, direct payment links, and frictionless form flows.'
                  },
                  {
                    title: 'Zero Plugin Maintenance Headaches',
                    desc: 'No database crashes, no security exploits, no weekly broken plugin updates.'
                  },
                  {
                    title: '100% Code Ownership',
                    desc: 'You own every line of code and visual asset. No monthly page-builder subscriptions.'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-500 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 stroke-3" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">{item.title}</div>
                      <div className="text-[11px] text-neutral-400 mt-0.5 leading-relaxed">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Traditional Generic WordPress / Wix */}
            <div className="md:col-span-6 p-6 sm:p-8 space-y-6 bg-neutral-950/80">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-rose-400 font-bold">
                    The Outdated Legacy
                  </div>
                  <h3 className="font-display text-xl font-bold text-neutral-300 mt-1">
                    WordPress / Wix / Elementor Templates
                  </h3>
                </div>
                <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
                  <X className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-4">
                {[
                  {
                    title: '35–55 Mobile PageSpeed Scores',
                    desc: 'Heavy 4MB bundle sizes with 30+ redundant plugins causing 5s+ load abandonment.'
                  },
                  {
                    title: 'Rigid Cookie-Cutter Templates',
                    desc: 'Looks identical to thousands of competitors; difficult to customize without breaking.'
                  },
                  {
                    title: 'Frequent Exploits & Vulnerabilities',
                    desc: 'Constant target for bot spam, outdated PHP scripts, and sudden layout breaking.'
                  },
                  {
                    title: 'Hostage Recurring Builder Fees',
                    desc: 'Locked into expensive proprietary ecosystems with painful migration hurdles.'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 opacity-80">
                    <div className="w-5 h-5 rounded-full bg-rose-950 border border-rose-600 text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
                      <X className="w-3 h-3 stroke-3" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-neutral-300">{item.title}</div>
                      <div className="text-[11px] text-neutral-500 mt-0.5 leading-relaxed">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
