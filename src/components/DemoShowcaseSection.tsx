import React, { useState } from 'react';
import { 
  ArrowRight, 
  ExternalLink, 
  MonitorPlay, 
  CheckCircle2, 
  Clock, 
  Layers,
  Sparkles
} from 'lucide-react';
import { BusinessIndustry, DemoProject } from '../types';

interface DemoShowcaseSectionProps {
  demos: DemoProject[];
  onLaunchDemo: (demo: DemoProject) => void;
  onOrderThisType: (demo: DemoProject) => void;
}

export const DemoShowcaseSection: React.FC<DemoShowcaseSectionProps> = ({
  demos,
  onLaunchDemo,
  onOrderThisType
}) => {
  const [selectedIndustry, setSelectedIndustry] = useState<BusinessIndustry>('all');

  const filtered = selectedIndustry === 'all'
    ? demos
    : demos.filter(d => d.industry === selectedIndustry);

  return (
    <section id="demos" className="py-20 bg-neutral-50 border-b border-neutral-200">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Heading & Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Interactive Production Portfolio
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
              5 Turnkey Business Demo Websites
            </h2>
            <p className="text-sm text-neutral-600 max-w-xl">
              Each demo is a fully functional web experience with realistic booking wizards, shopping carts, and interactive calculators built for specific business sectors.
            </p>
          </div>

          {/* Interactive filter segmented control (§1.A allowed for interactive buttons) */}
          <div className="flex flex-wrap items-center gap-1 p-1 bg-neutral-200/70 rounded-xl">
            {[
              { id: 'all', label: 'All Demos (5)' },
              { id: 'hospitality', label: 'Cafe & E-Commerce' },
              { id: 'healthcare', label: 'Dental & Clinic' },
              { id: 'creative', label: 'Architecture' },
              { id: 'saas', label: 'B2B SaaS' },
              { id: 'legal', label: 'Corporate Law' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedIndustry(tab.id as BusinessIndustry)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  selectedIndustry === tab.id
                    ? 'bg-white text-neutral-900 shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Demo Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((demo, idx) => (
            <div
              key={demo.id}
              className={`bg-white border border-neutral-200 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-neutral-400 hover:shadow-xl transition-all duration-300 group ${
                idx === 0 ? 'md:col-span-2 lg:col-span-2' : ''
              }`}
            >
              <div>
                {/* Visual Image Preview */}
                <div 
                  className={`relative overflow-hidden cursor-pointer bg-neutral-100 ${
                    idx === 0 ? 'aspect-16/9 md:aspect-21/9' : 'aspect-16/10'
                  }`}
                  onClick={() => onLaunchDemo(demo)}
                >
                  <img
                    src={demo.heroImage}
                    alt={`${demo.name} live demo preview`}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent flex items-end p-6">
                    <div className="text-white space-y-1">
                      {/* Zero-pill metadata text (§1.A) */}
                      <div className="flex items-center gap-2 text-xs text-neutral-300">
                        <span>{demo.industryLabel}</span>
                        <span aria-hidden="true">·</span>
                        <span>{demo.turnaroundTime}</span>
                      </div>
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                        {demo.name}
                      </h3>
                    </div>
                  </div>

                  <div className="absolute top-4 right-4 bg-neutral-950/80 backdrop-blur text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <MonitorPlay className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Launch Sandbox</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-4">
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    {demo.description}
                  </p>

                  <div className="bg-neutral-50 rounded-xl p-3.5 border border-neutral-200/80 space-y-1.5">
                    <div className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
                      Built for Business Growth
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-lg font-bold text-emerald-700">
                        {demo.resultsStat.value}
                      </span>
                      <span className="text-xs text-neutral-600">
                        {demo.resultsStat.label}
                      </span>
                    </div>
                  </div>

                  {/* Built-in Key Features */}
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
                      Interactive Conversion Hooks
                    </div>
                    <div className="space-y-1">
                      {demo.conversionFeatures.slice(0, 3).map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2 text-xs text-neutral-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-6 pt-0 border-t border-neutral-100 mt-4 flex items-center justify-between gap-3">
                <div>
                  <div className="text-[11px] text-neutral-500">Typical Pricing</div>
                  <div className="font-display font-bold text-neutral-900 text-sm">
                    {demo.startingPrice}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onLaunchDemo(demo)}
                    className="bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    <MonitorPlay className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Test Demo</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
