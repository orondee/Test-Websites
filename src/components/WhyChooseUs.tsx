import React from 'react';
import { Check, X, Zap, Shield, Sparkles, UserCheck } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  return (
    <section id="why-us" className="py-20 bg-neutral-900 dark:bg-black text-white border-b border-neutral-800 transition-colors">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
            Why Work With An Independent Developer
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Direct Personal Service vs. Bloated Agencies & Builders
          </h2>
          <p className="text-sm text-neutral-400">
            When you hire Oronde Web Studio, you speak directly with the developer who codes your website. No account managers, no 3-month waitlists, and no monthly builder lock-in.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-neutral-800">
            {/* Left: Oronde Web Studio */}
            <div className="md:col-span-6 p-6 sm:p-8 space-y-6 bg-neutral-900/50">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
                    The Modern Independent Approach
                  </div>
                  <h3 className="font-display text-xl font-bold text-white mt-1">
                    Oronde Web Studio
                  </h3>
                </div>
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <UserCheck className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-4">
                {[
                  {
                    title: 'Fair, Affordable Starter Rates (From $149)',
                    desc: 'High-quality web engineering accessible to local businesses and new ventures.'
                  },
                  {
                    title: 'Direct 1-on-1 Communication',
                    desc: 'Text, email, or call me directly. Your feedback is implemented immediately.'
                  },
                  {
                    title: 'Fast 7-Day Launch',
                    desc: 'Clear scope and focused sprints so you can begin taking client inquiries next week.'
                  },
                  {
                    title: '100% Code & File Ownership',
                    desc: 'No monthly proprietary platform fees. You own all code, assets, and design files.'
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

            {/* Right: Traditional Big Agencies & DIY Builders */}
            <div className="md:col-span-6 p-6 sm:p-8 space-y-6 bg-neutral-950/80">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-rose-400 font-bold">
                    Traditional Agencies & DIY Builders
                  </div>
                  <h3 className="font-display text-xl font-bold text-neutral-300 mt-1">
                    Expensive Agencies / Clunky Templates
                  </h3>
                </div>
                <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
                  <X className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-4">
                {[
                  {
                    title: '$3,000 – $10,000+ Bloated Agency Retainers',
                    desc: 'Large markups to pay for agency offices, sales reps, and layers of account managers.'
                  },
                  {
                    title: '6 to 12 Week Bureaucratic Timelines',
                    desc: 'Endless status meetings and approval committees that delay your business launch.'
                  },
                  {
                    title: 'Brittle WordPress Plugin Breakages',
                    desc: 'Outdated plugins and security patches frequently break layout and forms.'
                  },
                  {
                    title: 'Hostage Monthly Subscription Lock-In',
                    desc: 'If you stop paying their expensive monthly fee, your website disappears.'
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
