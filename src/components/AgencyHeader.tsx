import React from 'react';
import { ArrowRight, Sun, Moon, Sliders, Sparkles } from 'lucide-react';

interface AgencyHeaderProps {
  onOpenInquiry: () => void;
  onOpenAccessibility: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const AgencyHeader: React.FC<AgencyHeaderProps> = ({ 
  onOpenInquiry,
  onOpenAccessibility,
  isDark,
  onToggleTheme
}) => {
  return (
    <header className="border-b border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-neutral-900/95 backdrop-blur sticky top-0 z-40 transition-colors">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
        {/* Zone 1: Single text element wordmark */}
        <a 
          href="#" 
          className="font-display text-lg font-bold tracking-tight text-neutral-900 dark:text-white whitespace-nowrap shrink-0 flex items-center gap-2 group"
        >
          <span className="w-7 h-7 rounded-md bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 flex items-center justify-center text-xs font-bold font-mono transition-transform group-hover:scale-105">
            OS
          </span>
          <span>Oronde Web Studio</span>
        </a>

        {/* Zone 2: 4-5 concise single-line text links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-600 dark:text-neutral-300">
          <a href="#demos" className="hover:text-neutral-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0">
            Demos
          </a>
          <a href="#calculator" className="hover:text-neutral-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0">
            Calculator
          </a>
          <a href="#packages" className="hover:text-neutral-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0">
            Packages
          </a>
          <a href="#process" className="hover:text-neutral-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0">
            Process
          </a>
          <a href="#faq" className="hover:text-neutral-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0">
            FAQ
          </a>
        </nav>

        {/* Zone 3: Accessibility + Dark/Light Theme + Primary Action */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Quick Accessibility Button */}
          <button
            onClick={onOpenAccessibility}
            className="p-2 rounded-lg border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            title="Accessibility Preferences"
            aria-label="Open accessibility options"
          >
            <Sliders className="w-4 h-4" />
          </button>

          {/* Theme Switcher Button */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-lg border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle dark mode"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-neutral-600" />
            )}
          </button>

          {/* Primary Action Button */}
          <button
            onClick={onOpenInquiry}
            className="px-4 py-2 text-xs font-semibold text-white bg-neutral-900 dark:bg-white dark:text-neutral-900 rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-all whitespace-nowrap shrink-0 shadow-xs flex items-center gap-1.5 active:scale-95"
          >
            <span>Start Your Website</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
