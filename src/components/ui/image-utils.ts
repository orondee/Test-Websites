/**
 * Pure utility functions for the custom Image component
 * Includes placeholder generation, aspect ratio style computation, and class name resolvers.
 */

export interface ImageLoadingState {
  isLoaded: boolean;
  hasError: boolean;
}

/**
 * Generates an SVG data URL shimmer placeholder for smooth blur-up rendering.
 * Uses an elegant neutral dark/light gradient shimmer.
 */
export function generateShimmerSvg(width = 40, height = 30): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop stop-color="#1f2937" offset="0%"/>
        <stop stop-color="#374151" offset="50%"/>
        <stop stop-color="#1f2937" offset="100%"/>
      </linearGradient>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#g)"/>
  </svg>`;
  
  if (typeof btoa === 'function') {
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  }
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/**
 * Computes CSS aspect-ratio style object if an aspect ratio is provided.
 */
export function getAspectRatioStyle(aspectRatio?: string | number): React.CSSProperties | undefined {
  if (!aspectRatio) return undefined;
  if (typeof aspectRatio === 'number') {
    return { aspectRatio: `${aspectRatio}` };
  }
  // Convert formats like "16/9", "4:3", or "16 / 9" to standard CSS "16 / 9"
  const formatted = aspectRatio.replace(':', '/').trim();
  return { aspectRatio: formatted };
}

/**
 * Resolves the blur-up and loading transition classes for the image element.
 */
export function getImageTransitionClasses(isLoaded: boolean, hasError: boolean): string {
  if (hasError) {
    return 'opacity-0 invisible';
  }
  if (!isLoaded) {
    return 'opacity-0 scale-105 blur-md grayscale-20';
  }
  return 'opacity-100 scale-100 blur-0 grayscale-0 transition-all duration-700 ease-out';
}

/**
 * Computes native loading and fetch priority attributes based on the priority flag.
 */
export function getLoadingAttributes(priority = false): {
  loading: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'auto' | 'low';
  decoding: 'async' | 'sync' | 'auto';
} {
  if (priority) {
    return {
      loading: 'eager',
      fetchPriority: 'high',
      decoding: 'async',
    };
  }
  return {
    loading: 'lazy',
    fetchPriority: 'auto',
    decoding: 'async',
  };
}
