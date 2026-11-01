import React from 'react';
import { Check, ArrowRight, Sparkles } from 'lucide-react';
import { AGENCY_PACKAGES } from '../data/demoData';

interface PackagesSectionProps {
  onSelectPackage: (packageId: string) => void;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({
  onSelectPackage
}) => {
  return (
    <section id="packages" className="py-20 bg-white border-b border-neutral-200">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Fixed-Scope Packages
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
            Predictable Investment. Zero Surprises.
          </h2>
          <p className="text-sm text-neutral-600">
            Choose a packaged solution or use our custom calculator above. Every website is custom designed and fully owned by you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {AGENCY_PACKAGES.map(pkg => (
            <div
              key={pkg.id}
              className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
                pkg.popular
                  ? 'border-2 border-neutral-900 bg-neutral-900 text-white shadow-xl scale-[1.02]'
                  : 'border border-neutral-200 bg-white text-neutral-900 hover:border-neutral-400'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-neutral-950 text-[11px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                  Most Popular For Businesses
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className={`font-display text-xl font-bold ${pkg.popular ? 'text-white' : 'text-neutral-900'}`}>
                    {pkg.name}
                  </h3>
                  <div className={`text-xs mt-1 ${pkg.popular ? 'text-neutral-400' : 'text-neutral-500'}`}>
                    Delivery in {pkg.turnaround}
                  </div>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className={`font-display text-4xl font-bold font-mono ${pkg.popular ? 'text-white' : 'text-neutral-900'}`}>
                    {pkg.price}
                  </span>
                  <span className={`text-xs ${pkg.popular ? 'text-neutral-400' : 'text-neutral-500'}`}>
                    / one-time build
                  </span>
                </div>

                <p className={`text-xs leading-relaxed ${pkg.popular ? 'text-neutral-300' : 'text-neutral-600'}`}>
                  {pkg.description}
                </p>

                <div className="space-y-2.5 pt-2 border-t border-neutral-200/20">
                  <div className={`text-[11px] font-bold uppercase tracking-wider ${pkg.popular ? 'text-neutral-400' : 'text-neutral-500'}`}>
                    Included Deliverables:
                  </div>
                  {pkg.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs">
                      <Check className={`w-4 h-4 shrink-0 mt-0.5 ${pkg.popular ? 'text-emerald-400' : 'text-emerald-600'}`} />
                      <span className={pkg.popular ? 'text-neutral-200' : 'text-neutral-700'}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => onSelectPackage(pkg.id)}
                  className={`w-full py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 ${
                    pkg.popular
                      ? 'bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold shadow-md'
                      : 'bg-neutral-900 hover:bg-neutral-800 text-white'
                  }`}
                >
                  <span>Select {pkg.name.split(' ')[0]}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
