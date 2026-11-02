import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import { ToastItem, ToastType } from '../types';
import {
  createToastItem,
  addToastItem,
  removeToastItem,
  getToastAriaAttributes,
  DEFAULT_TOAST_DURATION,
} from '../utils/toast-manager';

export interface ToastContextType {
  toasts: ToastItem[];
  showToast: (options: { title: string; message?: string; type?: ToastType; duration?: number }) => string;
  success: (title: string, message?: string, duration?: number) => string;
  error: (title: string, message?: string, duration?: number) => string;
  info: (title: string, message?: string, duration?: number) => string;
  warning: (title: string, message?: string, duration?: number) => string;
  dismissToast: (id: string) => void;
  clearAll: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastProviderProps {
  children: React.ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => removeToastItem(prev, id));
  }, []);

  const clearAll = useCallback(() => {
    setToasts([]);
  }, []);

  const showToast = useCallback(
    ({
      title,
      message,
      type = 'info',
      duration = DEFAULT_TOAST_DURATION,
    }: {
      title: string;
      message?: string;
      type?: ToastType;
      duration?: number;
    }) => {
      const item = createToastItem({ title, message, type, duration });
      setToasts((prev) => addToastItem(prev, item));
      return item.id;
    },
    []
  );

  const success = useCallback(
    (title: string, message?: string, duration?: number) => {
      return showToast({ title, message, type: 'success', duration });
    },
    [showToast]
  );

  const error = useCallback(
    (title: string, message?: string, duration?: number) => {
      return showToast({ title, message, type: 'error', duration });
    },
    [showToast]
  );

  const info = useCallback(
    (title: string, message?: string, duration?: number) => {
      return showToast({ title, message, type: 'info', duration });
    },
    [showToast]
  );

  const warning = useCallback(
    (title: string, message?: string, duration?: number) => {
      return showToast({ title, message, type: 'warning', duration });
    },
    [showToast]
  );

  return (
    <ToastContext.Provider
      value={{
        toasts,
        showToast,
        success,
        error,
        info,
        warning,
        dismissToast,
        clearAll,
      }}
    >
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

interface ToastContainerProps {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onDismiss }) => {
  return (
    <div
      role="region"
      aria-label="Notifications"
      className="fixed top-5 right-5 z-[99999] flex flex-col items-end space-y-3 pointer-events-none max-w-full px-4 sm:px-0 sm:max-w-md"
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <SingleToast key={toast.id} toast={toast} onDismiss={onDismiss} />
        ))}
      </AnimatePresence>
    </div>
  );
};

interface SingleToastProps {
  toast: ToastItem;
  onDismiss: (id: string) => void;
}

const SingleToast: React.FC<SingleToastProps> = ({ toast, onDismiss }) => {
  const ariaAttrs = getToastAriaAttributes(toast.type);

  // Auto-dismiss countdown
  useEffect(() => {
    if (!toast.duration || toast.duration <= 0) return;
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, toast.duration);

    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, onDismiss]);


  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />;
      case 'info':
      default:
        return <Info className="w-5 h-5 text-cyan-400 shrink-0" />;
    }
  };

  const getBorderColor = () => {
    switch (toast.type) {
      case 'success':
        return 'border-emerald-500/30 dark:border-emerald-500/30';
      case 'error':
        return 'border-rose-500/30 dark:border-rose-500/30';
      case 'warning':
        return 'border-amber-500/30 dark:border-amber-500/30';
      case 'info':
      default:
        return 'border-cyan-500/30 dark:border-cyan-500/30';
    }
  };

  const getAccentBg = () => {
    switch (toast.type) {
      case 'success':
        return 'bg-emerald-950/80 border-emerald-800/60';
      case 'error':
        return 'bg-rose-950/80 border-rose-800/60';
      case 'warning':
        return 'bg-amber-950/80 border-amber-800/60';
      case 'info':
      default:
        return 'bg-cyan-950/80 border-cyan-800/60';
    }
  };

  const getProgressColor = () => {
    switch (toast.type) {
      case 'success':
        return 'bg-emerald-500';
      case 'error':
        return 'bg-rose-500';
      case 'warning':
        return 'bg-amber-500';
      case 'info':
      default:
        return 'bg-cyan-500';
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.92, transition: { duration: 0.2 } }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      role={ariaAttrs.role}
      aria-live={ariaAttrs.ariaLive}
      className={`pointer-events-auto relative w-full sm:w-[380px] bg-neutral-900/95 dark:bg-neutral-900/95 backdrop-blur-md border ${getBorderColor()} rounded-xl p-4 shadow-2xl text-neutral-100 overflow-hidden flex flex-col gap-1`}
    >
      <div className="flex items-start gap-3">
        <div className={`p-1.5 rounded-lg border ${getAccentBg()}`}>
          {getIcon()}
        </div>

        <div className="flex-1 min-w-0 pr-2">
          <h4 className="font-semibold text-sm text-white tracking-tight leading-snug">
            {toast.title}
          </h4>
          {toast.message && (
            <p className="text-xs text-neutral-300 mt-0.5 leading-relaxed break-words">
              {toast.message}
            </p>
          )}
        </div>

        <button
          onClick={() => onDismiss(toast.id)}
          className="text-neutral-400 hover:text-white p-1 rounded-md hover:bg-neutral-800 transition-colors shrink-0"
          aria-label="Dismiss notification"
        >
          <X className="w-4 h-4" />
        </button>

      </div>

      {toast.duration && toast.duration > 0 && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-800 overflow-hidden">
          <motion.div
            className={`h-full ${getProgressColor()}`}
            initial={{ width: '100%' }}
            animate={{ width: '0%' }}
            transition={{ duration: toast.duration / 1000, ease: 'linear' }}
          />
        </div>
      )}
    </motion.div>
  );
};
