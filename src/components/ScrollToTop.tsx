import React, { useState, useEffect, useCallback } from 'react';
import { ArrowUp } from 'lucide-react';
import {
  calculateScrollProgress,
  isScrollAboveThreshold,
  getScrollToTopOptions
} from '../utils/scroll-utils';

interface ScrollToTopProps {
  threshold?: number;
  forceReducedMotion?: boolean;
}

export const ScrollToTop: React.FC<ScrollToTopProps> = ({
  threshold = 350,
  forceReducedMotion = false
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Passive scroll handler with requestAnimationFrame throttling for 60fps smoothness
  const handleScroll = useCallback(() => {
    if (typeof window === 'undefined') return;

    const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
    const documentHeight = document.documentElement.scrollHeight || 0;
    const viewportHeight = window.innerHeight || 0;

    const visible = isScrollAboveThreshold(scrollY, threshold);
    setIsVisible(visible);

    if (visible) {
      const progress = calculateScrollProgress({
        scrollY,
        documentHeight,
        viewportHeight
      });
      setScrollProgress(progress);
    }
  }, [threshold]);

  useEffect(() => {
    handleScroll(); // Initial check
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [handleScroll]);

  const scrollToTop = () => {
    if (typeof window === 'undefined') return;
    const options = getScrollToTopOptions(forceReducedMotion);
    window.scrollTo(options);
  };

  // SVG circular progress ring geometry
  const size = 44;
  const strokeWidth = 2.5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div
      className={`fixed bottom-19 right-5 sm:bottom-20 sm:right-5 z-40 transition-all duration-300 ease-out print:hidden ${
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-3 pointer-events-none'
      }`}
    >
      <div className="relative group">
        {/* Floating Scroll to Top Action Button */}
        <button
          type="button"
          onClick={scrollToTop}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocus={() => setIsHovered(true)}
          onBlur={() => setIsHovered(false)}
          aria-label={`Scroll back to top of page (${scrollProgress}% scrolled)`}
          title="Scroll to top"
          tabIndex={isVisible ? 0 : -1}
          className="relative flex items-center justify-center w-11 h-11 rounded-full bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border border-neutral-200/90 dark:border-neutral-800 shadow-md hover:shadow-xl text-neutral-700 dark:text-neutral-200 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-all duration-200 hover:-translate-y-0.5 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-neutral-950"
        >
          {/* Radial Scroll Progress Ring */}
          <svg
            className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
            viewBox={`0 0 ${size} ${size}`}
            aria-hidden="true"
          >
            {/* Track background */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth={strokeWidth}
              className="text-neutral-200/70 dark:text-neutral-800/80"
            />
            {/* Active progress fill */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="text-emerald-500 dark:text-emerald-400 transition-[stroke-dashoffset] duration-150 ease-out"
            />
          </svg>

          {/* Up Arrow Icon with hover animation */}
          <ArrowUp
            className={`w-4 h-4 transition-transform duration-200 ${
              isHovered ? '-translate-y-0.5 scale-110 text-emerald-600 dark:text-emerald-400' : ''
            }`}
            strokeWidth={2.25}
          />
        </button>

        {/* Informative Floating Tooltip */}
        <div
          role="tooltip"
          aria-hidden={!isHovered}
          className={`absolute right-full mr-2.5 top-1/2 -translate-y-1/2 whitespace-nowrap px-2.5 py-1 rounded-md text-[11px] font-medium tracking-tight bg-neutral-900/95 dark:bg-neutral-800/95 text-white shadow-lg pointer-events-none transition-all duration-150 ${
            isHovered
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 translate-x-1.5'
          }`}
        >
          <span>Top</span>
          <span className="mx-1 text-neutral-400">·</span>
          <span className="font-mono text-emerald-400 font-semibold">{scrollProgress}%</span>
        </div>
      </div>
    </div>
  );
};
