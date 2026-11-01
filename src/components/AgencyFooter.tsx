import React from 'react';
import { Mail, Phone, MapPin, ArrowUp, Sparkles, Sliders } from 'lucide-react';

interface AgencyFooterProps {
  onOpenInquiry: () => void;
  onOpenAccessibility: () => void;
}

export const AgencyFooter: React.FC<AgencyFooterProps> = ({ 
  onOpenInquiry,
  onOpenAccessibility
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-950 dark:bg-black text-neutral-400 py-16 px-6 border-t border-neutral-900 text-xs transition-colors">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-neutral-800">
          <div className="space-y-2">
            <div className="font-display text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-neutral-800 text-white flex items-center justify-center text-[10px] font-mono">
                OS
              </span>
              <span>Oronde Web Studio</span>
            </div>
            <p className="text-xs text-neutral-400 max-w-sm">
              Custom-crafted, high-converting digital storefronts and websites for small businesses and founders starting at $299.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onOpenAccessibility}
              className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition-colors flex items-center gap-1.5"
              title="Accessibility Options"
            >
              <Sliders className="w-4 h-4" />
              <span>Accessibility</span>
            </button>
            <button
              onClick={onOpenInquiry}
              className="bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold px-5 py-2.5 rounded-lg text-xs uppercase tracking-wider transition-colors"
            >
              Start Your Website (From $299)
            </button>
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition-colors"
              title="Scroll to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              Demo Websites
            </div>
            <ul className="space-y-2 text-neutral-400">
              <li><a href="#demos" className="hover:text-white transition-colors">Artisan Roastery & Cafe ($349)</a></li>
              <li><a href="#demos" className="hover:text-white transition-colors">Aura Aesthetics & Dental ($499)</a></li>
              <li><a href="#demos" className="hover:text-white transition-colors">Architecture & Interiors ($549)</a></li>
              <li><a href="#demos" className="hover:text-white transition-colors">PulseFlow SaaS Automation ($599)</a></li>
              <li><a href="#demos" className="hover:text-white transition-colors">Corporate Legal Advisory ($499)</a></li>
            </ul>
          </div>

          <div>
            <div className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              Included In Every Build
            </div>
            <ul className="space-y-2 text-neutral-400">
              <li><span>Direct 1-on-1 Developer Contact</span></li>
              <li><span>Fast 7-Day Launch Guarantee</span></li>
              <li><span>100% Code & File Ownership</span></li>
              <li><span>Mobile & Tablet Optimization</span></li>
              <li><span>30 Days Free Edits & Support</span></li>
            </ul>
          </div>

          <div>
            <div className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              Direct Contact
            </div>
            <ul className="space-y-2 text-neutral-400">
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-neutral-500" />
                <a href="mailto:hello@orondestudio.com" className="hover:text-white">hello@orondestudio.com</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-neutral-500" />
                <span>(212) 555-0198</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                <span>Brooklyn, New York · Remote Worldwide</span>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              My Guarantee To You
            </div>
            <p className="text-neutral-400 text-xs leading-relaxed">
              You only pay the remaining balance once you are 100% happy with your website before live launch. Includes 30 days of free edits after launch.
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-500">
          <div>© 2026 Oronde Web Studio. Hand-crafted with React &amp; Vite.</div>
          <div className="flex items-center gap-4">
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            <span>·</span>
            <span>Direct Client Privacy</span>
            <span>·</span>
            <span>Zero Lock-In Guarantee</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
