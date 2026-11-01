import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface ProcessSectionProps {
  onOpenInquiry: () => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ onOpenInquiry }) => {
  const steps = [
    {
      num: '01',
      title: 'Strategy & Wireframe Blueprint',
      timeline: 'Days 1–3',
      desc: 'We analyze your target audience, competitors, and revenue goals to establish high-converting copy, page hierarchy, and customer journey blueprints.'
    },
    {
      num: '02',
      title: 'Bespoke UI Design & Prototyping',
      timeline: 'Days 4–7',
      desc: 'Crafting pixel-perfect layouts, domain-native typography, color palettes, and interactive components. You review an interactive prototype before code.'
    },
    {
      num: '03',
      title: 'Production Engineering & Integrations',
      timeline: 'Days 8–12',
      desc: 'We write clean, lightweight React code, connect your booking/e-commerce/CRM webhooks, and optimize asset loading to guarantee a 95+ PageSpeed score.'
    },
    {
      num: '04',
      title: 'QA, Google SEO & Live Domain Launch',
      timeline: 'Days 13–14',
      desc: 'Full cross-browser testing across iPhone, Android, and desktop. We connect your custom domain, set up Google Analytics & Schema SEO, and hand over the keys.'
    }
  ];

  return (
    <section id="process" className="py-20 bg-white border-b border-neutral-200">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Rapid Execution
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-neutral-900 tracking-tight">
            How We Take You Live in 14 Days
          </h2>
          <p className="text-sm text-neutral-600">
            A battle-tested 4-phase sprint that keeps you updated every step without dragging out for months.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 flex flex-col justify-between hover:border-neutral-400 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-lg text-emerald-600">
                    {step.num}
                  </span>
                  <span className="text-xs font-semibold text-neutral-500 bg-neutral-200/60 px-2 py-0.5 rounded">
                    {step.timeline}
                  </span>
                </div>

                <h3 className="font-display font-bold text-base text-neutral-900">
                  {step.title}
                </h3>

                <p className="text-xs text-neutral-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-neutral-200/60 flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Zero Downtime Milestone</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={onOpenInquiry}
            className="bg-neutral-900 hover:bg-neutral-800 text-white px-8 py-3.5 rounded-xl text-xs uppercase font-bold tracking-wider transition-colors inline-flex items-center gap-2 shadow-sm"
          >
            <span>Book Your 14-Day Sprint</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
