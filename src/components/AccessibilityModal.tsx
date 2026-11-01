import React from 'react';
import { 
  X, 
  Eye, 
  Type, 
  ZapOff, 
  RotateCcw, 
  Keyboard, 
  Check, 
  Sliders
} from 'lucide-react';
import { AccessibilitySettings } from '../types';

interface AccessibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AccessibilitySettings;
  onUpdateSettings: (newSettings: Partial<AccessibilitySettings>) => void;
  onReset: () => void;
}

export const AccessibilityModal: React.FC<AccessibilityModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  onReset
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="accessibility-title"
    >
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative text-neutral-900 dark:text-neutral-100 transition-colors">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded-lg transition-colors focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          aria-label="Close accessibility options"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-neutral-100 dark:border-neutral-800">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h2 id="accessibility-title" className="font-display font-bold text-lg text-neutral-900 dark:text-white">
              Accessibility Preferences
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Customize text size, contrast, and motion
            </p>
          </div>
        </div>

        <div className="space-y-5">
          {/* Text Size Scaling */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5 mb-2.5">
              <Type className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Text Size</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'normal', label: 'Default', size: '100%' },
                { id: 'large', label: 'Large', size: '115%' },
                { id: 'xlarge', label: 'X-Large', size: '130%' }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => onUpdateSettings({ textScale: opt.id as any })}
                  className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all ${
                    settings.textScale === opt.id
                      ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-bold'
                      : 'border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-500'
                  }`}
                >
                  <div className="text-xs">{opt.label}</div>
                  <div className="text-[10px] text-neutral-400">{opt.size}</div>
                </button>
              ))}
            </div>
          </div>

          {/* High Contrast Mode */}
          <div className="flex items-center justify-between p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/40">
            <div className="space-y-0.5">
              <div className="text-xs font-bold text-neutral-900 dark:text-white flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>High Contrast Mode</span>
              </div>
              <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
                Enhance contrast borders and dark backgrounds
              </div>
            </div>
            <button
              onClick={() => onUpdateSettings({ highContrast: !settings.highContrast })}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                settings.highContrast ? 'bg-emerald-600' : 'bg-neutral-300 dark:bg-neutral-700'
              }`}
              aria-label="Toggle high contrast mode"
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                  settings.highContrast ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Reduced Motion */}
          <div className="flex items-center justify-between p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/40">
            <div className="space-y-0.5">
              <div className="text-xs font-bold text-neutral-900 dark:text-white flex items-center gap-1.5">
                <ZapOff className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Reduce Motion</span>
              </div>
              <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
                Disable animations and transitions
              </div>
            </div>
            <button
              onClick={() => onUpdateSettings({ reducedMotion: !settings.reducedMotion })}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                settings.reducedMotion ? 'bg-emerald-600' : 'bg-neutral-300 dark:bg-neutral-700'
              }`}
              aria-label="Toggle reduced motion"
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                  settings.reducedMotion ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Dyslexia-Friendly Font */}
          <div className="flex items-center justify-between p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-800/40">
            <div className="space-y-0.5">
              <div className="text-xs font-bold text-neutral-900 dark:text-white flex items-center gap-1.5">
                <Type className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Dyslexia-Friendly Font</span>
              </div>
              <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
                Use high-legibility type with wider character spacing
              </div>
            </div>
            <button
              onClick={() => onUpdateSettings({ dyslexicFont: !settings.dyslexicFont })}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                settings.dyslexicFont ? 'bg-emerald-600' : 'bg-neutral-300 dark:bg-neutral-700'
              }`}
              aria-label="Toggle dyslexia-friendly font"
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                  settings.dyslexicFont ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Keyboard Navigation Quick Guide */}
          <div className="p-3 bg-neutral-100 dark:bg-neutral-800/60 rounded-xl border border-neutral-200 dark:border-neutral-800 text-[11px] text-neutral-600 dark:text-neutral-400 space-y-1">
            <div className="font-bold text-neutral-900 dark:text-white flex items-center gap-1">
              <Keyboard className="w-3.5 h-3.5" />
              <span>Keyboard Shortcuts</span>
            </div>
            <div>• <kbd className="px-1 py-0.5 bg-white dark:bg-neutral-700 rounded border border-neutral-300 dark:border-neutral-600 text-[10px]">Tab</kbd> to move forward through elements</div>
            <div>• <kbd className="px-1 py-0.5 bg-white dark:bg-neutral-700 rounded border border-neutral-300 dark:border-neutral-600 text-[10px]">Esc</kbd> to close any open modal or demo viewer</div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
          <button
            onClick={onReset}
            className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Defaults</span>
          </button>

          <button
            onClick={onClose}
            className="bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 dark:text-neutral-900 text-white px-5 py-2 rounded-xl text-xs font-semibold transition-colors shadow-sm"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
