import { ToastItem, ToastType } from '../types';

export interface CreateToastOptions {
  id?: string;
  title: string;
  message?: string;
  type?: ToastType;
  duration?: number;
  now?: number;
}

export const DEFAULT_TOAST_DURATION = 8000;
export const MAX_VISIBLE_TOASTS = 4;


/**
 * Creates a normalized ToastItem with defaults.
 */
export function createToastItem(options: CreateToastOptions): ToastItem {
  const id = options.id || `toast-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  const type = options.type || 'info';
  const duration = options.duration !== undefined ? options.duration : DEFAULT_TOAST_DURATION;
  const createdAt = options.now !== undefined ? options.now : Date.now();

  return {
    id,
    title: options.title,
    message: options.message,
    type,
    duration,
    createdAt,
  };
}

/**
 * Adds a new toast to the existing list, enforcing deduplication and maximum visible limit.
 * New toasts are appended to the front so newest appear at top or entry.
 */
export function addToastItem(
  currentToasts: ToastItem[],
  newToast: ToastItem,
  maxVisible: number = MAX_VISIBLE_TOASTS
): ToastItem[] {
  // If identical ID already exists, replace it
  const filtered = currentToasts.filter((t) => t.id !== newToast.id);
  const updated = [newToast, ...filtered];

  if (updated.length > maxVisible) {
    return updated.slice(0, maxVisible);
  }
  return updated;
}

/**
 * Removes a toast by its unique ID.
 */
export function removeToastItem(currentToasts: ToastItem[], idToRemove: string): ToastItem[] {
  return currentToasts.filter((t) => t.id !== idToRemove);
}

/**
 * Computes remaining duration in milliseconds based on current time.
 */
export function calculateRemainingDuration(
  createdAt: number,
  duration: number,
  now: number = Date.now()
): number {
  if (duration <= 0) return Infinity; // Persistent toast
  const elapsed = Math.max(0, now - createdAt);
  return Math.max(0, duration - elapsed);
}

/**
 * Returns accessible ARIA attributes for a given toast type.
 */
export function getToastAriaAttributes(type: ToastType): {
  role: 'status' | 'alert';
  ariaLive: 'polite' | 'assertive';
} {
  if (type === 'error') {
    return {
      role: 'alert',
      ariaLive: 'assertive',
    };
  }
  return {
    role: 'status',
    ariaLive: 'polite',
  };
}
