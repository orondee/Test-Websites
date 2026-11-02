import { BusinessIndustry } from '../../types';

/**
 * Pure utility functions for the Demo Showcase Skeleton Screen Loader.
 */

/**
 * Determines how many skeleton cards to display based on the selected industry filter.
 */
export function getSkeletonCardCount(industry: BusinessIndustry | string, defaultCount = 10): number {
  if (industry === 'all') {
    return defaultCount;
  }
  // Individual industry categories typically have 1-2 featured projects
  return 2;
}

/**
 * Determines whether a card at a given index should be given full-width featured span.
 * When showing all items or 3+ items, the first card spans 2 columns on medium/large screens.
 */
export function isFeaturedCard(index: number, totalCount: number): boolean {
  return index === 0 && totalCount > 2;
}

/**
 * Returns Tailwind grid column classes for a skeleton card based on its index and count.
 */
export function getSkeletonGridSpan(index: number, totalCount: number): string {
  if (isFeaturedCard(index, totalCount)) {
    return 'md:col-span-2 lg:col-span-2';
  }
  return '';
}

/**
 * Returns accessible ARIA attributes for a container entering or leaving a loading state.
 */
export function getSkeletonAriaAttributes(isLoading: boolean) {
  return {
    'aria-busy': isLoading,
    'aria-live': 'polite' as const,
    role: 'region' as const,
  };
}
