import React from 'react';
import { getSkeletonGridSpan } from './skeleton-utils';

interface DemoCardSkeletonProps {
  isFeatured?: boolean;
  className?: string;
}

/**
 * High-fidelity Skeleton loader for a single Demo Website showcase card.
 * Accurately replicates:
 * - Mock browser window control buttons and address bar
 * - Hero preview frame with aspect ratio and title scrim
 * - Value proposition guarantee pill
 * - Feature highlights checklist
 * - Starting price and CTA action buttons
 */
export const DemoCardSkeleton: React.FC<DemoCardSkeletonProps> = ({
  isFeatured = false,
  className = '',
}) => {
  return (
    <div
      role="status"
      aria-label="Loading demo website card"
      className={`bg-white dark:bg-neutral-900/90 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden flex flex-col justify-between shadow-xs select-none relative ${className}`}
    >
      <div>
        {/* Mock Browser Header Skeleton */}
        <div className="h-8 bg-neutral-100 dark:bg-neutral-800/80 px-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
          {/* Window controls */}
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <div className="w-2.5 h-2.5 rounded-full bg-neutral-300/80 dark:bg-neutral-700/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-neutral-300/80 dark:bg-neutral-700/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-neutral-300/80 dark:bg-neutral-700/80" />
          </div>

          {/* Simulated address bar */}
          <div className="h-2.5 w-36 bg-neutral-200 dark:bg-neutral-700/60 rounded-full" />

          {/* Live indicator badge */}
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/40" />
            <div className="w-14 h-2.5 bg-neutral-200 dark:bg-neutral-700/60 rounded-full" />
          </div>
        </div>

        {/* Hero Preview Image Area Skeleton */}
        <div
          className={`relative overflow-hidden bg-neutral-200/90 dark:bg-neutral-800 ${
            isFeatured ? 'aspect-16/9 md:aspect-21/9' : 'aspect-16/10'
          }`}
        >
          {/* Shimmer sweep animation */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent animate-shimmer pointer-events-none"
            aria-hidden="true"
          />

          {/* Bottom scrim preview placeholder */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/40 to-transparent flex items-end p-6">
            <div className="w-full space-y-2.5">
              {/* Category tag & turnaround pill */}
              <div className="flex items-center gap-2">
                <div className="h-3 w-24 bg-white/25 dark:bg-white/15 rounded-md" />
                <span className="text-white/30 text-xs">·</span>
                <div className="h-3 w-16 bg-white/20 dark:bg-white/10 rounded-md" />
              </div>
              {/* Card headline title */}
              <div
                className={`h-6 rounded-lg bg-white/30 dark:bg-white/20 ${
                  isFeatured ? 'w-2/3 max-w-md' : 'w-4/5'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Card Body Content Skeleton */}
        <div className="p-6 space-y-5">
          {/* Description lines */}
          <div className="space-y-2">
            <div className="h-3.5 w-full bg-neutral-200 dark:bg-neutral-800 rounded-md" />
            <div className="h-3.5 w-4/5 bg-neutral-200 dark:bg-neutral-800 rounded-md" />
          </div>

          {/* Commercial Guarantee Box Placeholder */}
          <div className="bg-neutral-50 dark:bg-neutral-800/60 rounded-xl p-3.5 border border-neutral-200/80 dark:border-neutral-700/60 space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded bg-emerald-500/20 dark:bg-emerald-400/20" />
              <div className="h-2.5 w-32 bg-neutral-300 dark:bg-neutral-700 rounded" />
            </div>
            <div className="h-2.5 w-48 bg-neutral-200 dark:bg-neutral-700/70 rounded" />
          </div>

          {/* Feature Highlights Checklist Placeholder */}
          <div className="space-y-2.5">
            <div className="h-2.5 w-36 bg-neutral-300 dark:bg-neutral-700 rounded" />
            <div className="space-y-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <div className="w-3.5 h-3.5 rounded-full bg-emerald-500/20 dark:bg-emerald-400/20 shrink-0" />
                  <div
                    className="h-2.5 bg-neutral-200 dark:bg-neutral-800 rounded"
                    style={{ width: `${65 + ((i * 13) % 25)}%` }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Actions Bar Skeleton */}
      <div className="p-6 pt-4 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between gap-3">
        <div className="space-y-1.5">
          <div className="h-2 w-20 bg-neutral-200 dark:bg-neutral-700 rounded" />
          <div className="h-5 w-16 bg-neutral-300 dark:bg-neutral-700 rounded-md" />
        </div>

        <div className="flex items-center gap-2">
          {/* Main Launch CTA Button */}
          <div className="h-8 w-24 bg-neutral-900/10 dark:bg-neutral-800 rounded-lg" />
          {/* Secondary Order Button */}
          <div className="h-8 w-16 border border-neutral-200 dark:border-neutral-800 rounded-lg" />
        </div>
      </div>

      <span className="sr-only">Loading demo project preview...</span>
    </div>
  );
};

interface DemoGridSkeletonProps {
  count?: number;
  className?: string;
}

/**
 * Grid of demo website card skeletons.
 * Mirrors the responsive columns and layout of DemoShowcaseSection.
 */
export const DemoGridSkeleton: React.FC<DemoGridSkeletonProps> = ({
  count = 5,
  className = '',
}) => {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading interactive demo projects"
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${className}`}
    >
      {Array.from({ length: count }).map((_, idx) => (
        <DemoCardSkeleton
          key={idx}
          isFeatured={idx === 0 && count > 2}
          className={getSkeletonGridSpan(idx, count)}
        />
      ))}
      <span className="sr-only">Loading demo websites grid...</span>
    </div>
  );
};

export default DemoCardSkeleton;
