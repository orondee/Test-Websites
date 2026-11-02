import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface ProcessSectionProps {
  onOpenInquiry: () => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ onOpenInquiry }) => {
  const steps = [
    {
      num: '01',
      title: 'Quick Kickoff & Goal Blueprint',
      timeline: 'Day 1',
      desc: 'We hop on a 20-minute chat or exchange a quick brief to define your business goals, target clients, preferred colors, and must-have pages.'
    },
    {
      num: '02',
      title: 'Custom Layout & Design Prototype',
      timeline: 'Days 2–3',
      desc: 'I create clean, mobile-optimized visual layouts for your review. You get to approve the styling, typography, and content before final coding.'
    },
    {
      num: '03',
      title: 'Clean Coding & Feature Wiring',
      timeline: 'Days 4–5',
      desc: 'I build your site using modern React, connect your inquiry forms, booking calendars, and payment links with fluid animations.'
    },
    {
      num: '04',
      title: 'Domain Launch & 30-Day Free Edits',
      timeline: 'Days 6–7',
      desc: 'We connect your custom domain, test on mobile phones, launch live on Google, and you receive 30 days of included minor revisions.'
    }
  ];

  return (
    <section id="process" className="py-20 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white transition-colors">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Simple 4-Step Journey
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
            How We Take Your Website Live in 7 Days
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            A fast, collaborative sprint designed to get your business online without stress or endless delays.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/70 rounded-2xl p-6 flex flex-col justify-between hover:border-neutral-400 dark:hover:border-neutral-500 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-lg text-emerald-600 dark:text-emerald-400">
                    {step.num}
                  </span>
                  <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-300 bg-neutral-200/70 dark:bg-neutral-700 px-2 py-0.5 rounded">
                    {step.timeline}
                  </span>
                </div>

                <h3 className="font-display font-bold text-base text-neutral-900 dark:text-white">
                  {step.title}
                </h3>

                <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-neutral-200/60 dark:border-neutral-700 flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Zero Downtime Milestone</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={onOpenInquiry}
            className="bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 dark:text-neutral-900 text-white px-8 py-3.5 rounded-xl text-xs uppercase font-bold tracking-wider transition-colors inline-flex items-center gap-2 shadow-sm"
          >
            <span>Start Your 7-Day Project (From $149)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
