import React from 'react';
import { ArrowRight } from 'lucide-react';

interface AgencyHeaderProps {
  onOpenInquiry: () => void;
  activeDemoId?: string | null;
}

export const AgencyHeader: React.FC<AgencyHeaderProps> = ({ onOpenInquiry }) => {
  return (
    <header className="border-b border-neutral-200 bg-white/95 backdrop-blur sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a href="#" className="font-display text-lg font-bold tracking-tight text-neutral-900 whitespace-nowrap shrink-0 flex items-center gap-2">
          <span className="w-7 h-7 rounded-md bg-neutral-900 text-white flex items-center justify-center text-xs font-bold font-mono">
            OS
          </span>
          <span>Oronde Web Studio</span>
        </a>

        {/* Zone 2: 4-5 concise single-line text links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-600">
          <a href="#demos" className="hover:text-neutral-900 transition-colors whitespace-nowrap shrink-0">
            Demo Websites
          </a>
          <a href="#calculator" className="hover:text-neutral-900 transition-colors whitespace-nowrap shrink-0">
            Pricing Calculator
          </a>
          <a href="#packages" className="hover:text-neutral-900 transition-colors whitespace-nowrap shrink-0">
            Website Packages
          </a>
          <a href="#why-us" className="hover:text-neutral-900 transition-colors whitespace-nowrap shrink-0">
            Why Custom
          </a>
          <a href="#process" className="hover:text-neutral-900 transition-colors whitespace-nowrap shrink-0">
            Launch Process
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenInquiry}
            className="px-4 py-2 text-xs font-semibold text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 transition-colors whitespace-nowrap shrink-0 shadow-xs flex items-center gap-1.5"
          >
            <span>Start Your Website</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
