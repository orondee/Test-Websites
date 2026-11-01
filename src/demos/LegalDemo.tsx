import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Scale, 
  Briefcase, 
  FileText, 
  ChevronRight, 
  CheckCircle, 
  Lock, 
  X,
  Phone,
  Mail,
  ArrowRight
} from 'lucide-react';

interface PracticeArea {
  id: string;
  name: string;
  shortDesc: string;
  leadPartner: string;
  dealHighlights: string[];
}

const PRACTICE_AREAS: PracticeArea[] = [
  {
    id: 'ma',
    name: 'Mergers & Strategic Acquisitions',
    shortDesc: 'Counseling public and private enterprises through cross-border divestitures, tender offers, and complex corporate restructurings.',
    leadPartner: 'Arthur Sterling, Senior Partner',
    dealHighlights: [
      'Represented FinTech pioneer in $820M acquisition by tier-1 global banking conglomerate',
      'Structured $340M multi-jurisdiction cross-border asset purchase across EU & US'
    ]
  },
  {
    id: 'vc',
    name: 'Venture Capital & Private Equity',
    shortDesc: 'Advising institutional LP/GP syndicates and high-growth technology founders from Series Seed through pre-IPO liquidity.',
    leadPartner: 'Eleanor Vance-Cole, Partner',
    dealHighlights: [
      'Lead counsel for $110M Series C AI infrastructure equity financing',
      'Represented flagship $450M venture debt & growth syndicate fund formation'
    ]
  },
  {
    id: 'ip',
    name: 'Intellectual Property & Technology Assets',
    shortDesc: 'Protecting foundational patent portfolios, proprietary algorithms, and trade secrets against hostile infringement and IP theft.',
    leadPartner: 'Dr. Marcus Vance, Of Counsel',
    dealHighlights: [
      'Secured complete defense verdict in $120M patent infringement ITC investigation',
      'Negotiated worldwide cross-licensing framework for advanced semiconductor fabrication'
    ]
  },
  {
    id: 'regulatory',
    name: 'Regulatory Compliance & Executive Investigations',
    shortDesc: 'Discreet advisory on SEC, DOJ, FTC compliance inquiries, national security CFIUS reviews, and corporate governance.',
    leadPartner: 'Hon. David Sterling, Senior Advisor',
    dealHighlights: [
      'Guided sovereign investment vehicle through comprehensive CFIUS clearance',
      'Resolved multi-agency enforcement review with zero civil penalty imposition'
    ]
  }
];

const ATTORNEYS = [
  {
    id: 'sterling',
    name: 'Arthur Sterling, Esq.',
    title: 'Managing Partner · Corporate M&A',
    education: 'Harvard Law School, J.D. magna cum laude · Oxford University, B.A.',
    admissions: 'New York Bar, District of Columbia Bar, U.S. Supreme Court',
    bio: 'Over 24 years advising Fortune 100 boards, sovereign wealth funds, and private equity sponsors on high-stakes corporate transactions totaling over $18 Billion.'
  },
  {
    id: 'vance-cole',
    name: 'Eleanor Vance-Cole, Esq.',
    title: 'Partner · Venture Capital & Emerging Companies',
    education: 'Stanford Law School, J.D. · Princeton University, A.B.',
    admissions: 'California Bar, New York Bar',
    bio: 'Renowned counsel for frontier technology innovators, specializing in generative compute, autonomous systems, and defense tech fund formations.'
  }
];

export const LegalDemo: React.FC = () => {
  const [selectedPractice, setSelectedPractice] = useState(PRACTICE_AREAS[0]);
  const [isEvaluationOpen, setIsEvaluationOpen] = useState(false);
  const [evaluationSuccess, setEvaluationSuccess] = useState(false);
  
  // Intake Form State
  const [clientCompany, setClientCompany] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [matterDescription, setMatterDescription] = useState('');
  const [matterUrgency, setMatterUrgency] = useState('Standard (48h response)');

  const handleEvaluationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEvaluationSuccess(true);
    setTimeout(() => {
      setEvaluationSuccess(false);
      setIsEvaluationOpen(false);
      setClientCompany('');
      setContactName('');
      setContactEmail('');
      setMatterDescription('');
    }, 2800);
  };

  return (
    <div className="min-h-screen bg-[#0C121E] text-[#DCE4EE] font-sans selection:bg-[#B4975A] selection:text-[#0C121E]">
      {/* Top Advisory Notice */}
      <div className="bg-[#080D16] border-b border-[#1E293B] text-xs py-2 px-4 text-center font-medium text-[#94A3B8] flex items-center justify-center gap-2">
        <Lock className="w-3 h-3 text-[#B4975A]" />
        <span>Confidential Corporate Representation</span>
        <span aria-hidden="true">·</span>
        <span>New York · Washington D.C. · London</span>
        <span aria-hidden="true">·</span>
        <span>Attorney Advertising</span>
      </div>

      {/* Header */}
      <header className="border-b border-[#1E293B] bg-[#0C121E]/95 backdrop-blur sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded border border-[#B4975A] text-[#B4975A] flex items-center justify-center font-serif-luxury font-bold text-sm">
              VS
            </span>
            <div className="flex flex-col">
              <span className="font-serif-luxury font-bold text-lg tracking-wide text-white">
                Vanguard & Sterling
              </span>
              <span className="text-[10px] text-[#94A3B8] tracking-widest uppercase font-mono">
                Attorneys at Law · LLP
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest font-semibold text-[#94A3B8]">
            <a href="#practices" className="hover:text-white transition-colors">Practices</a>
            <a href="#attorneys" className="hover:text-white transition-colors">Partners</a>
            <a href="#transactions" className="hover:text-white transition-colors">Landmark Deals</a>
            <a href="#intake" className="hover:text-white transition-colors">Counsel Intake</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsEvaluationOpen(true)}
              className="bg-[#B4975A] hover:bg-[#A38649] text-[#0C121E] text-xs uppercase tracking-wider font-bold px-4 py-2 rounded transition-colors shadow-sm"
            >
              Request Consultation
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative border-b border-[#1E293B] overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#B4975A] tracking-widest uppercase">
              <span>Strategic Counsel for High-Stakes Enterprises</span>
            </div>
            <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl text-white font-normal leading-[1.14]">
              Decisive legal mastery when corporate outcomes are non-negotiable.
            </h1>
            <p className="text-[#94A3B8] text-base sm:text-lg max-w-2xl leading-relaxed">
              We counsel Fortune 500 boards, institutional investment funds, and pioneering founders through critical corporate reorganizations, complex acquisitions, and sensitive regulatory matters.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => setIsEvaluationOpen(true)}
                className="bg-[#B4975A] hover:bg-[#A38649] text-[#0C121E] px-6 py-3.5 rounded text-xs uppercase tracking-wider font-bold transition-colors inline-flex items-center gap-2"
              >
                Retain Counsel / Request Review
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="#practices"
                className="border border-[#334155] text-white px-5 py-3.5 rounded text-xs uppercase tracking-wider font-semibold hover:bg-[#1E293B] transition-colors"
              >
                View Core Disciplines
              </a>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[#1E293B]">
              <div>
                <div className="font-serif-luxury text-2xl text-white">$18B+</div>
                <div className="text-xs text-[#94A3B8] mt-0.5">Aggregate M&A Value Advised</div>
              </div>
              <div>
                <div className="font-serif-luxury text-2xl text-white">Tier 1</div>
                <div className="text-xs text-[#94A3B8] mt-0.5">Chambers USA Ranking</div>
              </div>
              <div>
                <div className="font-serif-luxury text-2xl text-white">100%</div>
                <div className="text-xs text-[#94A3B8] mt-0.5">Partner-Led Representation</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-[#101726] border border-[#1E293B] rounded-xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center gap-2 text-[#B4975A]">
                <Scale className="w-5 h-5" />
                <h3 className="font-serif-luxury text-lg font-bold text-white">Direct Partner Access</h3>
              </div>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                At Vanguard & Sterling, our clients work directly with recognized senior partners—never junior associate layers. Every deal receives executive attention.
              </p>
              <div className="space-y-2 pt-2 border-t border-[#1E293B] text-xs">
                <div className="flex items-center justify-between text-[#94A3B8]">
                  <span>New York Office:</span>
                  <span className="font-mono text-white">Park Ave Tower</span>
                </div>
                <div className="flex items-center justify-between text-[#94A3B8]">
                  <span>London Office:</span>
                  <span className="font-mono text-white">100 Bishopsgate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Practice Areas Interactive Matrix */}
      <section id="practices" className="max-w-6xl mx-auto px-6 py-16">
        <div className="max-w-2xl mb-10">
          <div className="text-xs font-mono text-[#B4975A] uppercase tracking-widest mb-1">
            Core Disciplines
          </div>
          <h2 className="font-serif-luxury text-3xl font-normal text-white">
            Areas of Practice
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {PRACTICE_AREAS.map(practice => (
            <button
              key={practice.id}
              onClick={() => setSelectedPractice(practice)}
              className={`p-4 text-left rounded-lg border transition-all ${
                selectedPractice.id === practice.id
                  ? 'border-[#B4975A] bg-[#162032] shadow-md'
                  : 'border-[#1E293B] bg-[#0E1522] hover:border-[#334155]'
              }`}
            >
              <div className="font-serif-luxury text-sm font-bold text-white mb-1">
                {practice.name}
              </div>
              <div className="text-[11px] text-[#94A3B8]">
                {practice.leadPartner}
              </div>
            </button>
          ))}
        </div>

        {/* Selected Practice Details Card */}
        <div className="bg-[#101726] border border-[#1E293B] rounded-xl p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1E293B]">
            <div>
              <div className="text-xs uppercase tracking-widest font-mono text-[#B4975A] mb-1">
                Selected Discipline Overview
              </div>
              <h3 className="font-serif-luxury text-2xl text-white">
                {selectedPractice.name}
              </h3>
            </div>
            <button
              onClick={() => setIsEvaluationOpen(true)}
              className="bg-[#B4975A] hover:bg-[#A38649] text-[#0C121E] px-4 py-2 rounded text-xs uppercase font-bold tracking-wider self-start sm:self-auto transition-colors"
            >
              Consult On This Practice
            </button>
          </div>

          <p className="text-sm text-[#94A3B8] leading-relaxed max-w-3xl">
            {selectedPractice.shortDesc}
          </p>

          <div>
            <div className="text-xs uppercase tracking-widest font-mono text-[#B4975A] mb-3">
              Representative Landmark Precedents
            </div>
            <div className="space-y-2">
              {selectedPractice.dealHighlights.map((hl, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-neutral-300">
                  <CheckCircle className="w-4 h-4 text-[#B4975A] shrink-0 mt-0.5" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partners Directory */}
      <section id="attorneys" className="border-t border-[#1E293B] bg-[#0E1522] py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mb-10">
            <div className="text-xs font-mono text-[#B4975A] uppercase tracking-widest mb-1">
              Leadership
            </div>
            <h2 className="font-serif-luxury text-3xl font-normal text-white">
              Senior Partners
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ATTORNEYS.map(atty => (
              <div key={atty.id} className="bg-[#101726] border border-[#1E293B] rounded-xl p-6 sm:p-8 space-y-4">
                <div className="border-b border-[#1E293B] pb-4">
                  <h3 className="font-serif-luxury text-xl font-bold text-white">{atty.name}</h3>
                  <div className="text-xs text-[#B4975A] font-medium mt-0.5">{atty.title}</div>
                </div>

                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  {atty.bio}
                </p>

                <div className="space-y-1.5 text-[11px] text-[#94A3B8] pt-2">
                  <div><strong className="text-white">Credentials:</strong> {atty.education}</div>
                  <div><strong className="text-white">Admissions:</strong> {atty.admissions}</div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setIsEvaluationOpen(true)}
                    className="text-xs text-[#B4975A] hover:text-white font-semibold flex items-center gap-1 transition-colors"
                  >
                    Direct Partner Inquiry
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Confidential Consultation Modal */}
      {isEvaluationOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="bg-[#101726] border border-[#1E293B] rounded-xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative text-[#DCE4EE]">
            <button
              onClick={() => setIsEvaluationOpen(false)}
              className="absolute top-4 right-4 text-[#94A3B8] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-5 h-5 text-[#B4975A]" />
              <h3 className="font-serif-luxury text-xl font-bold text-white">
                Confidential Counsel Request
              </h3>
            </div>
            <p className="text-xs text-[#94A3B8] mb-6">
              Subject to conflict clearance and preliminary matter evaluation.
            </p>

            {evaluationSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#162032] border border-[#B4975A] text-[#B4975A] mx-auto flex items-center justify-center">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div className="font-serif-luxury text-xl font-bold text-white">Inquiry Securely Logged</div>
                <p className="text-xs text-[#94A3B8] max-w-sm mx-auto">
                  A partner will review conflict checks and contact you at <span className="text-white font-mono">{contactEmail}</span> within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleEvaluationSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-[#94A3B8] block mb-1">Client Entity / Corporation</label>
                  <input
                    type="text"
                    required
                    value={clientCompany}
                    onChange={e => setClientCompany(e.target.value)}
                    placeholder="e.g. Apex Meridian Holdings LLC"
                    className="w-full text-xs px-3 py-2.5 bg-[#0C121E] border border-[#1E293B] rounded text-white focus:outline-none focus:border-[#B4975A]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-[#94A3B8] block mb-1">Executive Name</label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={e => setContactName(e.target.value)}
                      placeholder="e.g. David Vance"
                      className="w-full text-xs px-3 py-2.5 bg-[#0C121E] border border-[#1E293B] rounded text-white focus:outline-none focus:border-[#B4975A]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#94A3B8] block mb-1">Direct Email</label>
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={e => setContactEmail(e.target.value)}
                      placeholder="dvance@company.com"
                      className="w-full text-xs px-3 py-2.5 bg-[#0C121E] border border-[#1E293B] rounded text-white focus:outline-none focus:border-[#B4975A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#94A3B8] block mb-1">High-Level Matter Summary (Non-Confidential Conflict Check)</label>
                  <textarea
                    rows={3}
                    value={matterDescription}
                    onChange={e => setMatterDescription(e.target.value)}
                    placeholder="Describe transaction size, counterparties, or jurisdiction..."
                    className="w-full text-xs px-3 py-2.5 bg-[#0C121E] border border-[#1E293B] rounded text-white focus:outline-none focus:border-[#B4975A]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-[#B4975A] hover:bg-[#A38649] text-[#0C121E] py-2.5 rounded text-xs uppercase tracking-wider font-bold transition-colors"
                  >
                    Submit Confidential Brief
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-[#1E293B] bg-[#080D16] text-[#64748B] py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs">
          <div className="flex items-center gap-3">
            <span className="font-serif-luxury text-sm font-bold text-white">Vanguard & Sterling LLP</span>
            <span>·</span>
            <span>Park Avenue, New York</span>
          </div>
          <div>© 2026 Vanguard & Sterling LLP. Prior results do not guarantee a similar outcome.</div>
        </div>
      </footer>
    </div>
  );
};
