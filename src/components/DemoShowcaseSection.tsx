import React, { useState } from 'react';
import { 
  ArrowRight, 
  ExternalLink, 
  MonitorPlay, 
  CheckCircle2, 
  Clock, 
  Layers,
  Sparkles,
  ShieldCheck
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
    <section id="demos" className="py-20 bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 border-b border-neutral-200 dark:border-neutral-800 transition-colors">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Heading & Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Interactive Production Portfolio
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
              5 Unique Turnkey Demo Websites
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-xl">
              Each demo website is uniquely styled with its own distinct branding, color palette, and interactive capabilities designed for specific business models.
            </p>
          </div>

          {/* Interactive filter segmented control */}
          <div className="flex flex-wrap items-center gap-1 p-1 bg-neutral-200/70 dark:bg-neutral-800 rounded-xl">
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
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                  selectedIndustry === tab.id
                    ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
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
              className={`bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-neutral-400 dark:hover:border-neutral-600 hover:shadow-xl transition-all duration-300 group ${
                idx === 0 ? 'md:col-span-2 lg:col-span-2' : ''
              }`}
            >
              <div>
                {/* Visual Image Preview */}
                <div 
                  className={`relative overflow-hidden cursor-pointer bg-neutral-100 dark:bg-neutral-800 ${
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-6">
                    <div className="text-white space-y-1">
                      {/* Zero-pill metadata text */}
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
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    {demo.description}
                  </p>

                  <div className="bg-neutral-50 dark:bg-neutral-800/60 rounded-xl p-3.5 border border-neutral-200/80 dark:border-neutral-700/60 space-y-1">
                    <div className="text-[11px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>{demo.guarantee.title}</span>
                    </div>
                    <div className="text-xs text-neutral-700 dark:text-neutral-300">
                      {demo.guarantee.subtitle}
                    </div>
                  </div>

                  {/* Built-in Key Features */}
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                      Interactive Capabilities
                    </div>
                    <div className="space-y-1">
                      {demo.conversionFeatures.slice(0, 3).map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-6 pt-0 border-t border-neutral-100 dark:border-neutral-800 mt-4 flex items-center justify-between gap-3">
                <div>
                  <div className="text-[11px] text-neutral-500 dark:text-neutral-400">Starter Price</div>
                  <div className="font-display font-bold text-neutral-900 dark:text-white text-base font-mono">
                    {demo.startingPrice}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onLaunchDemo(demo)}
                    className="bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 dark:text-neutral-900 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    <MonitorPlay className="w-3.5 h-3.5 text-emerald-400 dark:text-emerald-600" />
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
