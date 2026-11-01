import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  Send, 
  FileText, 
  Calendar, 
  Sparkles,
  Download,
  Building
} from 'lucide-react';
import { DEMO_PROJECTS } from '../data/demoData';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPackage?: string;
  initialDemoId?: string;
  initialEstimate?: {
    totalPrice: number;
    timeline: string;
    description: string;
    features: string[];
  };
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  initialPackage,
  initialDemoId,
  initialEstimate
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('Hospitality / Restaurant');
  const [selectedDemo, setSelectedDemo] = useState(initialDemoId || 'coffee-roastery');
  const [selectedPackage, setSelectedPackage] = useState(initialPackage || 'growth');
  const [budgetRange, setBudgetRange] = useState('$2,500 – $5,000');
  const [timeline, setTimeline] = useState('Within 2–3 weeks');
  const [projectBrief, setProjectBrief] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (initialPackage) setSelectedPackage(initialPackage);
    if (initialDemoId) setSelectedDemo(initialDemoId);
    if (initialEstimate) {
      setBudgetRange(`$${initialEstimate.totalPrice.toLocaleString()} (Calculator Estimate)`);
      setTimeline(initialEstimate.timeline);
      setProjectBrief(
        `Pre-configured from Cost Estimator:\n${initialEstimate.description}\n\nSelected Add-ons:\n` +
        initialEstimate.features.map(f => `• ${f}`).join('\n')
      );
    }
  }, [initialPackage, initialDemoId, initialEstimate]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative my-8 border border-neutral-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-800 p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <h3 className="font-display font-bold text-2xl text-neutral-900">
                Project Inquiry & Proposal Received!
              </h3>
              <p className="text-sm text-neutral-600 max-w-md mx-auto">
                Thank you, <span className="font-semibold text-neutral-900">{fullName}</span>. We have generated a custom roadmap for <span className="font-semibold text-neutral-900">{companyName || 'your business'}</span>.
              </p>
            </div>

            {/* Generated Proposal Receipt Card */}
            <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 text-left text-xs space-y-2 text-neutral-700">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-200 font-mono text-[11px] text-neutral-500">
                <span>PROPOSAL #{Math.floor(100000 + Math.random() * 900000)}</span>
                <span className="text-emerald-700 font-bold">STATUS: CONFIRMED</span>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <span className="text-neutral-400 block">Client Contact:</span>
                  <span className="font-semibold text-neutral-900">{email}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block">Target Budget:</span>
                  <span className="font-semibold text-neutral-900">{budgetRange}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block">Target Launch:</span>
                  <span className="font-semibold text-neutral-900">{timeline}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block">Turnaround Sprint:</span>
                  <span className="font-semibold text-emerald-700">10–14 Days Guaranteed</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleReset}
                className="w-full sm:w-auto bg-neutral-900 hover:bg-neutral-800 text-white px-6 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                Return to Studio
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6 space-y-1">
              <div className="text-xs uppercase font-mono tracking-wider text-emerald-600 font-semibold">
                Direct Agency Discovery
              </div>
              <h3 className="font-display font-bold text-2xl text-neutral-900">
                Start Your Website Build
              </h3>
              <p className="text-xs text-neutral-600">
                Tell us about your business goals. We reply within 4 hours with a scope breakdown and kickoff schedule.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-neutral-700 block mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    placeholder="e.g. Marcus Vance"
                    className="w-full text-xs px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-neutral-900"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-neutral-700 block mb-1">Work Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="marcus@vanceenterprises.com"
                    className="w-full text-xs px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-neutral-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-neutral-700 block mb-1">Company / Brand Name</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={e => setCompanyName(e.target.value)}
                    placeholder="e.g. Lumina Health"
                    className="w-full text-xs px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-neutral-900"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-neutral-700 block mb-1">Industry Sector</label>
                  <select
                    value={industry}
                    onChange={e => setIndustry(e.target.value)}
                    className="w-full text-xs px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-neutral-900 bg-white"
                  >
                    <option>Hospitality / Cafe / Food</option>
                    <option>Healthcare / Dental / Medical Clinic</option>
                    <option>Architecture / Interior Design</option>
                    <option>B2B SaaS / Tech Startup</option>
                    <option>Corporate Law / Wealth Advisory</option>
                    <option>Retail / Direct-to-Consumer</option>
                    <option>Other Professional Service</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-neutral-700 block mb-1">Target Budget Range</label>
                  <select
                    value={budgetRange}
                    onChange={e => setBudgetRange(e.target.value)}
                    className="w-full text-xs px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-neutral-900 bg-white"
                  >
                    <option>$1,850 (Starter Business)</option>
                    <option>$2,500 – $3,500 (Growth Suite)</option>
                    <option>$3,500 – $6,000 (Custom Platform)</option>
                    <option>$6,000+ (Enterprise Custom Application)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-neutral-700 block mb-1">Desired Launch Timeline</label>
                  <select
                    value={timeline}
                    onChange={e => setTimeline(e.target.value)}
                    className="w-full text-xs px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-neutral-900 bg-white"
                  >
                    <option>Within 7 Days (Rush Sprint)</option>
                    <option>Within 2–3 Weeks (Standard)</option>
                    <option>Within 1–2 Months</option>
                    <option>Flexible / Planning Phase</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-700 block mb-1">
                  Project Details & Goals
                </label>
                <textarea
                  rows={3}
                  value={projectBrief}
                  onChange={e => setProjectBrief(e.target.value)}
                  placeholder="Share details on your current website, key features needed (e.g. online booking, payments, custom brand design), or inspiration..."
                  className="w-full text-xs px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-neutral-900"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-neutral-900 hover:bg-neutral-800 text-white py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Send className="w-4 h-4 text-emerald-400" />
                  <span>Submit Inquiry & Receive Custom Proposal</span>
                </button>
              </div>

              <div className="text-[11px] text-center text-neutral-500">
                🔒 Strict confidentiality guaranteed. No spam, ever.
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
