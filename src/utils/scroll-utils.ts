/**
 * Utilities for scroll tracking, progress calculation, and smooth return-to-top navigation.
 */

export interface ScrollProgressParams {
  scrollY: number;
  documentHeight: number;
  viewportHeight: number;
}

/**
 * Calculates current scroll completion as a percentage (0 to 100).
 * Handles edge cases like short documents, negative overscroll, and clamp boundaries.
 */
export function calculateScrollProgress({
  scrollY,
  documentHeight,
  viewportHeight
}: ScrollProgressParams): number {
  if (viewportHeight <= 0 || documentHeight <= viewportHeight) {
    return 0;
  }

  const maxScroll = documentHeight - viewportHeight;
  if (maxScroll <= 0) {
    return 0;
  }

  const rawProgress = (scrollY / maxScroll) * 100;
  const clamped = Math.max(0, Math.min(100, rawProgress));
  return Math.round(clamped);
}

/**
 * Determines whether scroll-to-top button should be visible.
 * Default threshold is 350 pixels.
 */
export function isScrollAboveThreshold(scrollY: number, threshold: number = 350): boolean {
  if (isNaN(scrollY) || scrollY < 0) return false;
  return scrollY > threshold;
}

/**
 * Returns the standard ScrollToOptions, respecting user accessibility preference for reduced motion.
 */
export function getScrollToTopOptions(reducedMotion: boolean = false): ScrollToOptions {
  return {
    top: 0,
    left: 0,
    behavior: reducedMotion ? 'auto' : 'smooth'
  };
}
