import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  ExternalLink, 
  MonitorPlay, 
  CheckCircle2, 
  Clock, 
  Layers,
  Sparkles,
  ShieldCheck,
  Smartphone,
  Eye,
  RotateCw
} from 'lucide-react';
import { BusinessIndustry, DemoProject } from '../types';
import { Image } from './Image';
import { DemoGridSkeleton, DemoCardSkeleton } from './ui/DemoCardSkeleton';
import { getSkeletonCardCount, getSkeletonAriaAttributes } from './ui/skeleton-utils';

interface DemoShowcaseSectionProps {
  demos: DemoProject[];
  onLaunchDemo: (demo: DemoProject) => void;
  onOrderThisType: (demo: DemoProject) => void;
  isLoading?: boolean;
}

export const DemoShowcaseSection: React.FC<DemoShowcaseSectionProps> = ({
  demos,
  onLaunchDemo,
  onOrderThisType,
  isLoading = false
}) => {
  const [selectedIndustry, setSelectedIndustry] = useState<BusinessIndustry>('all');
  const [isFilterLoading, setIsFilterLoading] = useState(false);
  const [isSimulatedLoading, setIsSimulatedLoading] = useState(false);

  // Handle switching industry filters with smooth skeleton loading feedback
  const handleSelectIndustry = (industry: BusinessIndustry) => {
    if (industry === selectedIndustry) return;
    setIsFilterLoading(true);
    setSelectedIndustry(industry);
  };

  // Brief skeleton screen duration on filter change
  useEffect(() => {
    if (!isFilterLoading) return;
    const timer = setTimeout(() => {
      setIsFilterLoading(false);
    }, 380);
    return () => clearTimeout(timer);
  }, [isFilterLoading, selectedIndustry]);

  // Handle manual skeleton preview trigger
  const triggerSimulatedLoad = () => {
    setIsSimulatedLoading(true);
    setTimeout(() => {
      setIsSimulatedLoading(false);
    }, 3500);
  };

  const isShowingSkeleton = isLoading || isFilterLoading || isSimulatedLoading;

  const filtered = selectedIndustry === 'all'
    ? demos
    : demos.filter(d => d.industry === selectedIndustry);

  const skeletonCount = getSkeletonCardCount(selectedIndustry, demos.length);
  const ariaAttrs = getSkeletonAriaAttributes(isShowingSkeleton);

  return (
    <section 
      id="demos" 
      className="py-24 bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 border-b border-neutral-200/80 dark:border-neutral-800/80 transition-colors"
      {...ariaAttrs}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
              <span>01. Interactive Proof</span>
              <span aria-hidden="true">·</span>
              <span>Production-Grade Code</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-950 dark:text-white">
              10 Distinctive Industry Demo Websites
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-xl leading-relaxed">
              Every website below is completely functional—featuring custom carts, multi-step booking calendars, and interactive calculators engineered for conversion.
            </p>
          </div>

          {/* Industry Filter Bar & Skeleton Simulation Action */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5 self-start md:self-end">
            <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-neutral-200/60 dark:bg-neutral-900 rounded-xl border border-neutral-300/40 dark:border-neutral-800">
              {[
                { id: 'all', label: `All Projects (${demos.length})` },
                { id: 'hospitality', label: 'Cafe & Bakery' },
                { id: 'healthcare', label: 'Dental & Med Spa' },
                { id: 'realestate', label: 'Real Estate' },
                { id: 'fitness', label: 'Pilates & Fitness' },
                { id: 'creative', label: 'Architecture' },
                { id: 'trades', label: 'Craft & Cabinetry' },
                { id: 'saas', label: 'B2B SaaS' },
                { id: 'legal', label: 'Corporate Law' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => handleSelectIndustry(tab.id as BusinessIndustry)}
                  aria-pressed={selectedIndustry === tab.id}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap focus:outline-hidden focus:ring-2 focus:ring-emerald-500/50 ${
                    selectedIndustry === tab.id
                      ? 'bg-white dark:bg-neutral-800 text-neutral-950 dark:text-white shadow-xs'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Skeleton Simulation Preview Button */}
            <button
              onClick={triggerSimulatedLoad}
              disabled={isShowingSkeleton}
              title="Preview skeleton loader effect"
              aria-label="Simulate skeleton screen loader"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-xl border border-neutral-300/60 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/70 text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white hover:border-neutral-400 dark:hover:border-neutral-700 transition-colors cursor-pointer disabled:opacity-50"
            >
              <RotateCw className={`w-3.5 h-3.5 ${isShowingSkeleton ? 'animate-spin text-emerald-500' : ''}`} />
              <span className="hidden sm:inline">Preview Skeleton</span>
            </button>
          </div>
        </div>

        {/* Demo Cards Showcase Grid or Skeleton Loader */}
        {isShowingSkeleton ? (
          <div aria-live="polite">
            <DemoGridSkeleton count={skeletonCount} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-300">
            {filtered.map((demo, idx) => (
              <div
                key={demo.id}
                className={`bg-white dark:bg-neutral-900/90 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-neutral-400 dark:hover:border-neutral-600 hover:shadow-xl transition-all duration-300 group ${
                  idx === 0 && filtered.length > 2 ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
              >
                <div>
                  {/* Mock Browser Header */}
                  <div className="h-8 bg-neutral-100 dark:bg-neutral-800/80 px-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs text-neutral-500">
                    <div className="flex items-center gap-1.5" aria-hidden="true">
                      <div className="w-2.5 h-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                      <div className="w-2.5 h-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                      <div className="w-2.5 h-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                    </div>
                    <div className="font-mono text-[10px] text-neutral-400 dark:text-neutral-500 truncate max-w-[200px]">
                      https://{demo.id}.demo.oronde.studio
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>Live Simulator</span>
                    </div>
                  </div>

                  {/* Hero Preview Image Frame */}
                  <div 
                    className={`relative overflow-hidden cursor-pointer bg-neutral-100 dark:bg-neutral-800 ${
                      idx === 0 && filtered.length > 2 ? 'aspect-16/9 md:aspect-21/9' : 'aspect-16/10'
                    }`}
                    onClick={() => onLaunchDemo(demo)}
                  >
                    <Image
                      src={demo.heroImage}
                      alt={`${demo.name} interactive demo preview`}
                      fill
                      priority={idx === 0}
                      showShimmer={true}
                      className="group-hover:scale-103 transition-transform duration-700 ease-out"
                    />

                    {/* Gradient Scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-6">
                      <div className="text-white space-y-1.5">
                        <div className="flex items-center gap-2 text-xs text-neutral-300">
                          <span className="font-medium text-emerald-300">{demo.industryLabel}</span>
                          <span aria-hidden="true">·</span>
                          <span>{demo.turnaroundTime}</span>
                        </div>
                        <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                          {demo.name}
                        </h3>
                      </div>
                    </div>

                    {/* Hover Overlay Button */}
                    <div className="absolute inset-0 bg-neutral-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <div className="bg-white/95 text-neutral-950 text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        <MonitorPlay className="w-4 h-4 text-emerald-600" />
                        <span>Test Full Interactive Demo</span>
                      </div>
                    </div>
                  </div>

                  {/* Content Details */}
                  <div className="p-6 space-y-5">
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                      {demo.description}
                    </p>

                    {/* Commercial Value Guarantee Box */}
                    <div className="bg-neutral-50 dark:bg-neutral-800/60 rounded-xl p-3.5 border border-neutral-200/80 dark:border-neutral-700/60 space-y-1">
                      <div className="text-[11px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>{demo.guarantee.title}</span>
                      </div>
                      <div className="text-xs text-neutral-700 dark:text-neutral-300">
                        {demo.guarantee.subtitle}
                      </div>
                    </div>

                    {/* Conversion Features */}
                    <div className="space-y-2">
                      <div className="text-[11px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                        Interactive Feature Highlights
                      </div>
                      <div className="space-y-1.5">
                        {demo.conversionFeatures.map((feat, fIdx) => (
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
                <div className="p-6 pt-4 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-[10px] uppercase font-mono tracking-wider text-neutral-500 dark:text-neutral-400">
                      Starter Build Price
                    </div>
                    <div className="font-display font-bold text-neutral-950 dark:text-white text-lg font-mono">
                      {demo.startingPrice}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onLaunchDemo(demo)}
                      className="bg-neutral-950 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 dark:text-neutral-950 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
                    >
                      <MonitorPlay className="w-3.5 h-3.5 text-emerald-400 dark:text-emerald-600" />
                      <span>Test Demo</span>
                    </button>
                    <button
                      onClick={() => onOrderThisType(demo)}
                      className="border border-neutral-300 dark:border-neutral-700 hover:border-neutral-900 dark:hover:border-neutral-400 text-neutral-800 dark:text-neutral-200 text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
                      title="Order a website modeled after this demo"
                    >
                      Order
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
