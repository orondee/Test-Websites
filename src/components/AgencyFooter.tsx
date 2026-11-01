import React from 'react';
import { Mail, Phone, MapPin, ArrowUp } from 'lucide-react';

interface AgencyFooterProps {
  onOpenInquiry: () => void;
}

export const AgencyFooter: React.FC<AgencyFooterProps> = ({ onOpenInquiry }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-950 text-neutral-400 py-16 px-6 border-t border-neutral-900 text-xs">
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
              Custom-crafted, high-converting digital storefronts and web platforms for modern businesses.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onOpenInquiry}
              className="bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold px-5 py-2.5 rounded-lg text-xs uppercase tracking-wider transition-colors"
            >
              Start Your Website
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
              <li><a href="#demos" className="hover:text-white transition-colors">Artisan Roastery & Cafe</a></li>
              <li><a href="#demos" className="hover:text-white transition-colors">Aura Aesthetics & Dental</a></li>
              <li><a href="#demos" className="hover:text-white transition-colors">Architecture & Interiors</a></li>
              <li><a href="#demos" className="hover:text-white transition-colors">PulseFlow SaaS Automation</a></li>
              <li><a href="#demos" className="hover:text-white transition-colors">Corporate Legal Advisory</a></li>
            </ul>
          </div>

          <div>
            <div className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              Agency Capabilities
            </div>
            <ul className="space-y-2 text-neutral-400">
              <li><span>Custom React & Vite Code</span></li>
              <li><span>Real-time Booking Engines</span></li>
              <li><span>Stripe E-commerce Stores</span></li>
              <li><span>Headless CMS Architecture</span></li>
              <li><span>Google Core Web Vitals (99+)</span></li>
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
                <span>SoHo, New York, NY</span>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              Commercial Guarantee
            </div>
            <p className="text-neutral-400 text-xs leading-relaxed">
              Every website project includes a 14-day turnaround guarantee, 100% intellectual property ownership, and 30 days of post-launch technical support.
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-500">
          <div>© 2026 Oronde Web Studio. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <span>Client Privacy Policy</span>
            <span>·</span>
            <span>Terms of Service</span>
            <span>·</span>
            <span>SOC-2 Compliant Hosting</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
