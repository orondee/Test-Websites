import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Check, 
  HelpCircle, 
  Layers, 
  Clock, 
  ShieldCheck, 
  RotateCcw,
  MonitorPlay
} from 'lucide-react';
import { DEMO_PROJECTS } from '../data/demoData';
import { DemoProject } from '../types';

interface ProjectReadinessQuizProps {
  onSelectRecommendedPackage: (packageId: string) => void;
  onExploreDemo: (demo: DemoProject) => void;
  onOpenInquiry: () => void;
}

export const ProjectReadinessQuiz: React.FC<ProjectReadinessQuizProps> = ({
  onSelectRecommendedPackage,
  onExploreDemo,
  onOpenInquiry
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [businessType, setBusinessType] = useState<string>('hospitality');
  const [primaryGoal, setPrimaryGoal] = useState<string>('bookings');
  const [timeline, setTimeline] = useState<string>('7days');

  const getRecommendation = () => {
    if (businessType === 'hospitality' || primaryGoal === 'store') {
      return {
        packageId: 'growth',
        packageName: 'Growth & Store Suite',
        price: '$299',
        turnaround: '5–7 Days',
        demoId: 'coffee-roastery',
        demoName: 'Brew & Origin Roasters (Cafe & Store)',
        pitch: 'You need an e-commerce or menu system with direct ordering and online payment collection.'
      };
    }
    if (businessType === 'healthcare' || primaryGoal === 'bookings') {
      return {
        packageId: 'growth',
        packageName: 'Growth & Appointments Suite',
        price: '$299',
        turnaround: '5–7 Days',
        demoId: 'dental-clinic',
        demoName: 'Aura Facial & Dental (Booking Wizard)',
        pitch: 'An automated 24/7 multi-step consultation scheduler that fills your client calendar without phone tag.'
      };
    }
    if (businessType === 'creative' || primaryGoal === 'portfolio') {
      return {
        packageId: 'growth',
        packageName: 'Growth & Portfolio Suite',
        price: '$299',
        turnaround: '5–7 Days',
        demoId: 'architecture-studio',
        demoName: 'Vander & Kanso Architecture (Editorial Atelier)',
        pitch: 'A high-end editorial showcase with project blueprint modals and luxury photography hierarchy.'
      };
    }
    if (businessType === 'saas') {
      return {
        packageId: 'enterprise',
        packageName: 'Full Custom Platform',
        price: '$499',
        turnaround: '7–10 Days',
        demoId: 'saas-platform',
        demoName: 'PulseFlow SaaS (Interactive Sandbox)',
        pitch: 'A high-converting product landing with an interactive pipeline simulator and dynamic pricing calculator.'
      };
    }
    return {
      packageId: 'starter',
      packageName: 'Starter Business Launch',
      price: '$149',
      turnaround: '2–4 Days',
      demoId: 'legal-advisory',
      demoName: 'Vanguard & Sterling (Corporate Advisory)',
      pitch: 'A streamlined, ultra-fast 4-page presence that establishes immediate credibility and captures leads.'
    };
  };

  const rec = getRecommendation();
  const matchingDemo = DEMO_PROJECTS.find(d => d.id === rec.demoId) || DEMO_PROJECTS[0];

  return (
    <section className="py-20 bg-white dark:bg-neutral-900 border-b border-neutral-200/80 dark:border-neutral-800/80 text-neutral-900 dark:text-neutral-100 transition-colors">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
            <span>Interactive Scope Matcher</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 dark:text-white">
            Not sure which website you need?
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-lg mx-auto">
            Answer 3 quick questions about your business to get a tailored architecture recommendation and price estimate in 30 seconds.
          </p>
        </div>

        {/* Quiz Container Card */}
        <div className="bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          {/* Progress Indicators */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-neutral-200 dark:border-neutral-800">
            <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              {step <= 3 ? `Question ${step} of 3` : 'Your Tailored Architecture Blueprint'}
            </div>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3].map(s => (
                <div
                  key={s}
                  className={`w-6 h-1.5 rounded-full transition-colors ${
                    step === s ? 'bg-emerald-600 dark:bg-emerald-400' : step > s ? 'bg-neutral-900 dark:bg-white' : 'bg-neutral-300 dark:bg-neutral-800'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Step 1: Industry / Business */}
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="font-display text-lg sm:text-xl font-bold text-neutral-950 dark:text-white">
                What type of business are you launching or upgrading?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'hospitality', label: 'Cafe, Roastery, Bakery, Restaurant', desc: 'Online ordering, menus, and table reservations' },
                  { id: 'healthcare', label: 'Dental Clinic, Med Spa, Wellness Doctor', desc: 'Patient appointments, treatments, and procedures' },
                  { id: 'creative', label: 'Architecture, Interior Design, Luxury Builder', desc: 'Visual portfolio gallery and project specifications' },
                  { id: 'saas', label: 'B2B Software, AI Tool, Tech Startup', desc: 'Interactive feature tour, pricing tiers, and trial signups' },
                  { id: 'legal', label: 'Law Firm, Private Equity, Executive Advisory', desc: 'High-trust confidential consultation and credentials' },
                  { id: 'starter', label: 'Local Service, Freelancer, Consultant', desc: 'Clean high-converting presence to capture direct calls' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setBusinessType(item.id);
                      setStep(2);
                    }}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      businessType === item.id
                        ? 'border-emerald-600 dark:border-emerald-500 bg-white dark:bg-neutral-900 shadow-sm'
                        : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-700 bg-white/60 dark:bg-neutral-900/60'
                    }`}
                  >
                    <div className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-white">{item.label}</div>
                    <div className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Primary Goal */}
          {step === 2 && (
            <div className="space-y-6">
              <h3 className="font-display text-lg sm:text-xl font-bold text-neutral-950 dark:text-white">
                What is the single most important action visitors must take?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'bookings', label: 'Book Consultations or Appointments', desc: 'Real-time multi-step calendar booking without phone tag' },
                  { id: 'store', label: 'Purchase Products or Order Online', desc: 'Catalog, cart drawer, and Stripe instant checkout' },
                  { id: 'portfolio', label: 'Inspect Portfolio & Request Commission Quotes', desc: 'Showcase projects to attract high-ticket clients' },
                  { id: 'leads', label: 'Send Direct Inquiry / Call Our Team', desc: 'Friction-free lead capture form with instant notifications' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setPrimaryGoal(item.id);
                      setStep(3);
                    }}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      primaryGoal === item.id
                        ? 'border-emerald-600 dark:border-emerald-500 bg-white dark:bg-neutral-900 shadow-sm'
                        : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-700 bg-white/60 dark:bg-neutral-900/60'
                    }`}
                  >
                    <div className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-white">{item.label}</div>
                    <div className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1">{item.desc}</div>
                  </button>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setStep(1)}
                  className="text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
                >
                  ← Back to previous question
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Timeline */}
          {step === 3 && (
            <div className="space-y-6">
              <h3 className="font-display text-lg sm:text-xl font-bold text-neutral-950 dark:text-white">
                When do you need your website live on your domain?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'urgent', label: 'Fast-Track (3–5 Days)', desc: 'Prioritize quick sprint to launch immediately' },
                  { id: '7days', label: 'Standard (7–10 Days)', desc: 'Full review, bespoke design, and testing' },
                  { id: 'flexible', label: 'Within 2–3 Weeks', desc: 'Flexible timeline while finalizing brand assets' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setTimeline(item.id);
                      setStep(4);
                    }}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      timeline === item.id
                        ? 'border-emerald-600 dark:border-emerald-500 bg-white dark:bg-neutral-900 shadow-sm'
                        : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-700 bg-white/60 dark:bg-neutral-900/60'
                    }`}
                  >
                    <div className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-white">{item.label}</div>
                    <div className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1">{item.desc}</div>
                  </button>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setStep(2)}
                  className="text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
                >
                  ← Back to previous question
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Tailored Recommendation Result */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 sm:p-8 space-y-4 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-100 dark:border-neutral-800">
                  <div>
                    <div className="text-[11px] font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-bold">
                      Recommended Package For You
                    </div>
                    <h4 className="font-display text-2xl font-bold text-neutral-950 dark:text-white mt-0.5">
                      {rec.packageName}
                    </h4>
                  </div>
                  <div className="text-left sm:text-right">
                    <div className="font-display font-bold text-2xl sm:text-3xl font-mono text-emerald-600 dark:text-emerald-400">
                      {rec.price}
                    </div>
                    <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
                      Estimated {rec.turnaround}
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {rec.pitch}
                </p>

                {/* Interactive Demo Match */}
                <div className="p-3.5 bg-neutral-50 dark:bg-neutral-950 rounded-lg border border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <div className="text-[11px] font-mono text-neutral-400 uppercase">Similar Live Model:</div>
                    <div className="font-bold text-xs text-neutral-900 dark:text-white">{rec.demoName}</div>
                  </div>
                  <button
                    onClick={() => onExploreDemo(matchingDemo)}
                    className="px-3 py-1.5 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 rounded-lg text-xs font-semibold flex items-center gap-1.5 hover:opacity-90 transition-opacity"
                  >
                    <MonitorPlay className="w-3.5 h-3.5 text-emerald-400 dark:text-emerald-600" />
                    <span>Test This Model</span>
                  </button>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={() => onSelectRecommendedPackage(rec.packageId)}
                    className="w-full sm:flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>Start With {rec.packageName} ({rec.price})</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setStep(1)}
                    className="w-full sm:w-auto px-4 py-3 border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-xl text-xs font-semibold hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retake Quiz</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
