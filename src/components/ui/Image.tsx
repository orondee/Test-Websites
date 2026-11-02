import React, { useState, useEffect, useRef } from 'react';
import {
  generateShimmerSvg,
  getAspectRatioStyle,
  getImageTransitionClasses,
  getLoadingAttributes,
} from './image-utils';

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  aspectRatio?: string | number;
  priority?: boolean;
  blurDataURL?: string;
  fill?: boolean;
  fallbackSrc?: string;
  showShimmer?: boolean;
}

/**
 * Custom modern Image component with blur-up loading effect and lazy-loading.
 * 
 * Features:
 * - Low-overhead blur-up effect with smooth 700ms scale/blur transition
 * - Built-in SVG shimmer skeleton pulse while downloading
 * - Automatic cached-image detection to prevent layout flashing
 * - Native lazy-loading & asynchronous decoding by default
 * - Support for priority above-the-fold images (Hero)
 * - Graceful fallback on network error
 */
export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  aspectRatio,
  priority = false,
  blurDataURL,
  fill = false,
  fallbackSrc,
  showShimmer = true,
  onLoad,
  onError,
  style,
  ...rest
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const imgRef = useRef<HTMLImageElement | null>(null);

  // Sync internal src if prop changes
  useEffect(() => {
    setCurrentSrc(src);
    setIsLoaded(false);
    setHasError(false);
  }, [src]);

  // Check if image is already cached/complete on mount
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      if (imgRef.current.naturalWidth > 0) {
        setIsLoaded(true);
      }
    }
  }, [currentSrc]);

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setIsLoaded(true);
    if (onLoad) {
      onLoad(e);
    }
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      return;
    }
    setHasError(true);
    if (onError) {
      onError(e);
    }
  };

  const loadingAttrs = getLoadingAttributes(priority);
  const aspectStyle = getAspectRatioStyle(aspectRatio);
  const placeholderUrl = blurDataURL || generateShimmerSvg(40, 30);

  // Container sizing
  const containerClasses = [
    'relative overflow-hidden select-none',
    fill ? 'absolute inset-0 w-full h-full' : '',
    containerClassName,
  ]
    .filter(Boolean)
    .join(' ');

  // Image transition classes
  const transitionClasses = getImageTransitionClasses(isLoaded, hasError);

  return (
    <div
      className={containerClasses}
      style={{
        ...aspectStyle,
        ...style,
      }}
    >
      {/* Background Shimmer & Blur Placeholder */}
      {showShimmer && !isLoaded && !hasError && (
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0 bg-neutral-200 dark:bg-neutral-800 animate-pulse overflow-hidden pointer-events-none"
        >
          {/* Blur backdrop image */}
          <img
            src={placeholderUrl}
            alt=""
            className="w-full h-full object-cover filter blur-xl scale-110 opacity-70"
            aria-hidden="true"
          />
          {/* Subtle moving shimmer highlight */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 dark:via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
        </div>
      )}

      {/* Main High-Resolution Image */}
      {!hasError && (
        <img
          ref={imgRef}
          src={currentSrc}
          alt={alt}
          loading={loadingAttrs.loading}
          decoding={loadingAttrs.decoding}
          // @ts-expect-error fetchPriority standard in modern browsers
          fetchpriority={loadingAttrs.fetchPriority}
          onLoad={handleLoad}
          onError={handleError}
          className={`${fill ? 'w-full h-full object-cover' : ''} ${className} ${transitionClasses}`}
          referrerPolicy="no-referrer"
          {...rest}
        />
      )}

      {/* Graceful Fallback if image fails to load */}
      {hasError && (
        <div
          role="img"
          aria-label={alt || 'Image failed to load'}
          className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-400 text-xs text-center"
        >
          <svg
            className="w-8 h-8 mb-2 opacity-50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          <span className="font-medium text-neutral-500 dark:text-neutral-400 max-w-xs truncate">
            {alt || 'Preview Asset'}
          </span>
        </div>
      )}
    </div>
  );
};

export default Image;
