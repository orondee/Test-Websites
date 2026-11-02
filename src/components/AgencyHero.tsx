import React from 'react';
import { ArrowRight, Calculator, CheckCircle2, MonitorPlay, Sparkles, Code2, ShieldCheck, Zap, Github } from 'lucide-react';
import { AGENCY_STATS, DEMO_PROJECTS } from '../data/demoData';
import { DemoProject } from '../types';
import heroWorkspaceImg from '../assets/images/agency_hero_workspace_1793552555373.jpg';
import { Image } from './Image';

interface AgencyHeroProps {
  onExploreDemos: () => void;
  onOpenCalculator: () => void;
  onQuickLaunchDemo?: (demo: DemoProject) => void;
}

export const AgencyHero: React.FC<AgencyHeroProps> = ({
  onExploreDemos,
  onOpenCalculator,
  onQuickLaunchDemo
}) => {
  return (
    <section className="relative border-b border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 overflow-hidden transition-colors">
      {/* Subtle architectural grid pattern background */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(currentColor 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Hero Column */}
          <div className="lg:col-span-7 space-y-7">
            {/* Live studio status kicker */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-700 dark:text-neutral-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-semibold">Independent Web Studio</span>
              <span className="text-neutral-400 dark:text-neutral-600">·</span>
              <span className="text-neutral-500 dark:text-neutral-400">Custom Websites From $149</span>
            </div>

            {/* Jaw-Dropping Agency Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-950 dark:text-white leading-[1.08] text-balance">
              Websites crafted to make your business look like an{' '}
              <span className="font-serif-luxury italic font-normal text-emerald-700 dark:text-emerald-400">
                industry leader.
              </span>
            </h1>

            {/* Value Proposition Description */}
            <p className="text-neutral-600 dark:text-neutral-300 text-base sm:text-lg max-w-xl leading-relaxed">
              I design and code bespoke digital storefronts for clinics, cafes, architects, tech startups, and local practices. Enjoy direct 1-on-1 collaboration, 7-day turnaround, and 100% code ownership with zero monthly builder rent.
            </p>

            {/* Primary & Secondary Action Cluster */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={onExploreDemos}
                className="bg-neutral-950 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 dark:text-neutral-950 text-white px-7 py-4 rounded-xl text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all flex items-center gap-2.5 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-95"
              >
                <MonitorPlay className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
                <span>Test 5 Live Demo Websites</span>
              </button>

              <button
                onClick={onOpenCalculator}
                className="border border-neutral-300 dark:border-neutral-700 hover:border-neutral-900 dark:hover:border-neutral-400 text-neutral-800 dark:text-neutral-200 px-6 py-4 rounded-xl text-xs sm:text-sm font-semibold uppercase tracking-wider hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-all flex items-center gap-2 hover:-translate-y-0.5"
              >
                <Calculator className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
                <span>Instant Cost Calculator</span>
              </button>

              <a
                href="https://github.com/orondee/Test-Websites"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white px-4 py-4 rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-all flex items-center gap-2 hover:-translate-y-0.5"
                title="View Source on GitHub (orondee/Test-Websites)"
              >
                <Github className="w-4 h-4" />
                <span className="hidden sm:inline">GitHub</span>
              </a>
            </div>

            {/* Quick Demo Previews Bar */}
            <div className="pt-2 border-t border-neutral-200/60 dark:border-neutral-800/60 space-y-2">
              <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                Explore Pre-Built Industry Demos:
              </div>
              <div className="flex flex-wrap gap-2">
                {DEMO_PROJECTS.map(demo => (
                  <button
                    key={demo.id}
                    onClick={() => onQuickLaunchDemo ? onQuickLaunchDemo(demo) : onExploreDemos()}
                    className="text-xs px-2.5 py-1 rounded-md bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors flex items-center gap-1.5"
                  >
                    <span>{demo.name.split(' ')[0]}</span>
                    <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">{demo.startingPrice}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Core Trust Reassurance */}
            <div className="pt-1 flex flex-wrap items-center gap-6 text-xs text-neutral-500 dark:text-neutral-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Direct 1-on-1 Contact</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>7–10 Day Delivery Sprint</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>100% Code & File Ownership</span>
              </div>
            </div>
          </div>

          {/* Right Hero Column: Editorial Visual Showcase */}
          <div className="lg:col-span-5 relative">
            {/* Visual Frame */}
            <div className="relative rounded-2xl overflow-hidden border border-neutral-200/90 dark:border-neutral-800 shadow-2xl aspect-4/3 sm:aspect-16/11 bg-neutral-100 dark:bg-neutral-900 group">
              <Image
                src={heroWorkspaceImg}
                alt="Oronde Web Studio editorial web design studio workspace"
                fill
                priority
                className="group-hover:scale-102 transition-transform duration-700 ease-out"
              />

              {/* Scrim overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-6">
                <div className="text-white space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded">
                      Live Production
                    </span>
                    <span className="text-xs text-neutral-300">Clean React Architecture</span>
                  </div>
                  <div className="font-display text-lg font-bold">
                    Engineered For High-Ticket Client Conversions
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed max-w-sm">
                    No bloated WordPress plugins. Mobile-first responsive layouts that load in under 1.2 seconds.
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Trust Accent Badge */}
            <div className="absolute -bottom-4 -left-4 sm:-bottom-5 sm:-left-5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-3.5 shadow-xl flex items-center gap-3 max-w-xs transition-transform hover:-translate-y-1">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <Code2 className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <div className="font-bold text-neutral-900 dark:text-white">Bespoke Hand-Coded</div>
                <div className="text-[11px] text-neutral-500 dark:text-neutral-400">Zero monthly builder lock-in</div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Metric / Value Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-14 mt-14 border-t border-neutral-200/80 dark:border-neutral-800/80">
          {AGENCY_STATS.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <div className="font-display text-2xl sm:text-3xl font-bold text-neutral-950 dark:text-white">
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
