import React, { useState } from 'react';
import { ArrowRight, Sun, Moon, Sliders, Menu, X, Sparkles, Github } from 'lucide-react';

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="border-b border-neutral-200/80 dark:border-neutral-800/80 bg-white/90 dark:bg-neutral-950/90 backdrop-blur-md sticky top-0 z-40 transition-colors">
      <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between gap-6">
        {/* Zone 1: Brand Wordmark */}
        <a 
          href="#" 
          className="font-display text-base sm:text-lg font-bold tracking-tight text-neutral-950 dark:text-white whitespace-nowrap shrink-0 flex items-center gap-2.5 group"
        >
          <span className="w-7 h-7 rounded-lg bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 flex items-center justify-center text-xs font-bold font-mono transition-transform duration-200 group-hover:scale-105 shadow-xs">
            OS
          </span>
          <span className="tracking-tight">Oronde's Web Studio</span>
        </a>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-8 text-xs uppercase tracking-wider font-semibold text-neutral-600 dark:text-neutral-300">
          <a href="#demos" className="hover:text-neutral-950 dark:hover:text-white transition-colors whitespace-nowrap py-1">
            10 Demos
          </a>
          <a href="#calculator" className="hover:text-neutral-950 dark:hover:text-white transition-colors whitespace-nowrap py-1">
            Cost Calculator
          </a>
          <a href="#packages" className="hover:text-neutral-950 dark:hover:text-white transition-colors whitespace-nowrap py-1">
            Packages
          </a>
          <a href="#why-us" className="hover:text-neutral-950 dark:hover:text-white transition-colors whitespace-nowrap py-1">
            Why Custom
          </a>
          <a href="#process" className="hover:text-neutral-950 dark:hover:text-white transition-colors whitespace-nowrap py-1">
            Process
          </a>
          <a href="#faq" className="hover:text-neutral-950 dark:hover:text-white transition-colors whitespace-nowrap py-1">
            FAQ
          </a>
        </nav>

        {/* Zone 3: Accessibility + Dark/Light Theme + CTA */}
        <div className="flex items-center gap-2 shrink-0">
          {/* GitHub Repository Link */}
          <a
            href="https://github.com/orondee/Test-Websites"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors flex items-center justify-center"
            title="View GitHub Repository (orondee/Test-Websites)"
            aria-label="View source code on GitHub"
          >
            <Github className="w-4 h-4" />
          </a>

          {/* Quick Accessibility Button */}
          <button
            onClick={onOpenAccessibility}
            className="p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
            title="Accessibility Options"
            aria-label="Open accessibility options"
          >
            <Sliders className="w-4 h-4" />
          </button>

          {/* Theme Switcher Button */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle dark mode"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-neutral-700" />
            )}
          </button>

          {/* Primary Action Button (Desktop) */}
          <button
            onClick={onOpenInquiry}
            className="hidden sm:inline-flex px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-neutral-950 hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100 rounded-lg transition-all whitespace-nowrap shadow-xs items-center gap-1.5 active:scale-95"
          >
            <span>Start Website</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-6 py-6 space-y-4 shadow-xl">
          <nav className="flex flex-col space-y-3 text-sm font-medium text-neutral-700 dark:text-neutral-200">
            <a 
              href="#demos" 
              onClick={closeMenu}
              className="py-1 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              10 Live Demo Websites
            </a>
            <a 
              href="#calculator" 
              onClick={closeMenu}
              className="py-1 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              Interactive Cost Calculator
            </a>
            <a 
              href="#packages" 
              onClick={closeMenu}
              className="py-1 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              Website Packages (From $149)
            </a>
            <a 
              href="#why-us" 
              onClick={closeMenu}
              className="py-1 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              Why Custom Engineering Wins
            </a>
            <a 
              href="#process" 
              onClick={closeMenu}
              className="py-1 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              Our 7-Day Sprint Process
            </a>
            <a 
              href="#faq" 
              onClick={closeMenu}
              className="py-1 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              Frequently Asked Questions
            </a>
            <a
              href="https://github.com/orondee/Test-Websites"
              target="_blank"
              rel="noopener noreferrer"
              className="py-1 flex items-center gap-2 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>GitHub Repository (Source Code)</span>
            </a>
          </nav>

          <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800">
            <button
              onClick={() => {
                closeMenu();
                onOpenInquiry();
              }}
              className="w-full py-2.5 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 text-xs uppercase tracking-wider font-semibold rounded-lg flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Start Your Website Build (From $149)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
