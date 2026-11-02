import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  Send, 
  FileText, 
  Calendar, 
  Sparkles,
  Download,
  Building,
  ShieldCheck,
  Mail,
  Copy,
  ExternalLink
} from 'lucide-react';
import { DEMO_PROJECTS } from '../data/demoData';
import { CONTACT_INFO, buildMailtoUrl } from '../data/contact';
import { useToast } from '../context/ToastContext';

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
  const [selectedPackage, setSelectedPackage] = useState(initialPackage || 'starter');
  const [budgetRange, setBudgetRange] = useState('$149 – $299');
  const [timeline, setTimeline] = useState('Within 7 days');
  const [projectBrief, setProjectBrief] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedSuccess, setCopiedSuccess] = useState(false);
  const { success } = useToast();

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

  const buildInquirySummary = () => {
    return (
      `Hi Oronde,\n\n` +
      `Here is my project inquiry for Oronde's Web Studio:\n\n` +
      `• Name: ${fullName || 'Client'}\n` +
      `• Email: ${email}\n` +
      `• Company: ${companyName || 'Not specified'}\n` +
      `• Industry: ${industry}\n` +
      `• Target Budget: ${budgetRange}\n` +
      `• Desired Timeline: ${timeline}\n\n` +
      `Project Brief & Requirements:\n${projectBrief || 'Standard custom website build'}\n\n` +
      `Looking forward to your reply!\n`
    );
  };

  const mailtoUrl = buildMailtoUrl({
    subject: `New Project Inquiry: ${companyName || fullName || 'Website Build'} (${budgetRange})`,
    body: buildInquirySummary()
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    success(
      'Message Sent Successfully',
      `Thank you ${fullName || 'for reaching out'}! Your inquiry details are ready for Oronde Stewart.`
    );
    // Trigger mailto link
    try {
      window.location.href = mailtoUrl;
    } catch (err) {
      // Ignored if protocol handler not configured
    }
  };


  const handleCopyDetails = async () => {
    try {
      await navigator.clipboard.writeText(buildInquirySummary());
      setCopiedSuccess(true);
      setTimeout(() => setCopiedSuccess(false), 3000);
    } catch (e) {
      setCopiedSuccess(true);
      setTimeout(() => setCopiedSuccess(false), 3000);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative my-8 text-neutral-900 dark:text-neutral-100 transition-colors">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-800 dark:hover:text-white p-1"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <h3 className="font-display font-bold text-2xl text-neutral-900 dark:text-white">
                Project Inquiry Ready to Send!
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-md mx-auto">
                Thank you, <span className="font-semibold text-neutral-900 dark:text-white">{fullName}</span>. Your details are pre-formatted for Oronde at{' '}
                <a href={`mailto:${CONTACT_INFO.email}`} className="text-emerald-600 dark:text-emerald-400 font-semibold underline">
                  {CONTACT_INFO.email}
                </a>.
              </p>
            </div>

            {/* Generated Proposal Receipt Card */}
            <div className="bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 rounded-xl p-4 text-left text-xs space-y-2 text-neutral-700 dark:text-neutral-300">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-200 dark:border-neutral-700 font-mono text-[11px] text-neutral-500 dark:text-neutral-400">
                <span>INQUIRY #{Math.floor(100000 + Math.random() * 900000)}</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">RECIPIENT: {CONTACT_INFO.email}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <span className="text-neutral-400 block">Your Contact Email:</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">{email}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block">Target Budget:</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">{budgetRange}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block">Target Launch:</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">{timeline}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block">Direct Recipient:</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">{CONTACT_INFO.name}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5">
              <a
                href={mailtoUrl}
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                <span>Open in Email App ({CONTACT_INFO.email})</span>
              </a>

              <button
                type="button"
                onClick={handleCopyDetails}
                className="w-full sm:w-auto border border-neutral-300 dark:border-neutral-700 hover:border-neutral-900 text-neutral-700 dark:text-neutral-300 px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                {copiedSuccess ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-500">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Text</span>
                  </>
                )}
              </button>

              <button
                onClick={handleReset}
                className="w-full sm:w-auto bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 dark:text-neutral-900 text-white px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-mono tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold">
                  Direct Developer Discovery
                </span>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  <Mail className="w-3 h-3" />
                  <span>{CONTACT_INFO.email}</span>
                </a>
              </div>
              <h3 className="font-display font-bold text-2xl text-neutral-900 dark:text-white">
                Start Your Website Build
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                Tell me about your business goals. I reply within 4 hours with an honest scope breakdown and kickoff schedule.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    placeholder="e.g. Jordan Miller"
                    className="w-full text-xs px-3 py-2 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 rounded-lg text-neutral-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="jordan@business.com"
                    className="w-full text-xs px-3 py-2 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 rounded-lg text-neutral-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1">Company / Brand Name</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={e => setCompanyName(e.target.value)}
                    placeholder="e.g. Miller Bakery"
                    className="w-full text-xs px-3 py-2 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 rounded-lg text-neutral-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1">Industry Sector</label>
                  <select
                    value={industry}
                    onChange={e => setIndustry(e.target.value)}
                    className="w-full text-xs px-3 py-2 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 rounded-lg text-neutral-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option>Hospitality / Cafe / Food</option>
                    <option>Healthcare / Dental / Wellness</option>
                    <option>Architecture / Creative Studio</option>
                    <option>B2B SaaS / Tech Startup</option>
                    <option>Corporate Law / Wealth Advisory</option>
                    <option>Retail / Local Services</option>
                    <option>Other Business</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1">Target Budget Range</label>
                  <select
                    value={budgetRange}
                    onChange={e => setBudgetRange(e.target.value)}
                    className="w-full text-xs px-3 py-2 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 rounded-lg text-neutral-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option>$129 – $199 (Starter Business Launch)</option>
                    <option>$199 – $299 (Growth & Booking Suite)</option>
                    <option>$299 – $450 (Custom Platform & Store)</option>
                    <option>$450+ (Specialized Multi-App Suite)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1">Desired Launch Timeline</label>
                  <select
                    value={timeline}
                    onChange={e => setTimeline(e.target.value)}
                    className="w-full text-xs px-3 py-2 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 rounded-lg text-neutral-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option>Within 3–5 Days (Rush Sprint)</option>
                    <option>Within 7–10 Days (Standard)</option>
                    <option>Within 2–3 Weeks</option>
                    <option>Flexible / Planning Phase</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 block mb-1">
                  Project Details & Goals
                </label>
                <textarea
                  rows={3}
                  value={projectBrief}
                  onChange={e => setProjectBrief(e.target.value)}
                  placeholder="Share details on what you need (e.g. online booking, store, clean portfolio, colors, inspiration)..."
                  className="w-full text-xs px-3 py-2 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 rounded-lg text-neutral-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="pt-2 space-y-2">
                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Send className="w-4 h-4 text-emerald-200" />
                  <span>Send Project Details to Oronde</span>
                </button>

                <div className="flex items-center justify-between text-[11px] text-neutral-500 dark:text-neutral-400 pt-1">
                  <span>🔒 Direct reply from {CONTACT_INFO.name}</span>
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="font-mono text-emerald-600 dark:text-emerald-400 hover:underline"
                  >
                    {CONTACT_INFO.email}
                  </a>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
