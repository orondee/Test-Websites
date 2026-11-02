import React, { useState } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Check, 
  Sparkles, 
  Heart,
  ThumbsUp,
  Lightbulb,
  Smile
} from 'lucide-react';

interface ShareFeedbackModalProps {
  // Can be controlled or have internal floating trigger
}

export const ShareFeedbackButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [feedbackType, setFeedbackType] = useState<'praise' | 'idea' | 'critique'>('praise');
  const [category, setCategory] = useState('Visual Design & Layout');
  const [comments, setComments] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comments.trim()) return;

    setIsSending(true);
    // Simulate real feedback transmission
    setTimeout(() => {
      setIsSending(false);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setIsOpen(false);
        setComments('');
        setEmail('');
      }, 2400);
    }, 600);
  };

  return (
    <>
      {/* Floating Trigger Button (Bottom Right) */}
      <aside 
        aria-label="Website Feedback"
        className="fixed bottom-5 right-5 z-40 print:hidden"
      >
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border border-neutral-200/90 dark:border-neutral-800 shadow-md hover:shadow-xl text-neutral-700 dark:text-neutral-200 hover:text-neutral-950 dark:hover:text-white transition-all duration-200 hover:-translate-y-0.5 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          aria-label="Open design feedback form"
        >
          <div className="w-5 h-5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center transition-transform group-hover:scale-110">
            <MessageSquare className="w-3 h-3" />
          </div>
          <span className="text-xs font-semibold tracking-tight">Share Feedback</span>
        </button>
      </aside>

      {/* Feedback Popover Dialog */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:justify-end p-4 sm:p-6 bg-black/40 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-labelledby="feedback-dialog-title"
        >
          <div 
            className="w-full sm:w-[380px] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl p-5 sm:p-6 text-neutral-900 dark:text-neutral-100 relative transition-all"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-1 text-neutral-400 hover:text-neutral-700 dark:hover:text-white rounded-lg transition-colors"
              aria-label="Close feedback window"
            >
              <X className="w-4 h-4" />
            </button>

            {isSubmitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
                  <Check className="w-6 h-6 stroke-3" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-display font-bold text-base text-neutral-950 dark:text-white">
                    Feedback Received!
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-[260px] mx-auto">
                    Thank you for helping us improve Oronde's Web Studio. Your notes go directly to the developer.
                  </p>
                </div>
              </div>
            ) : (
              <div>
                {/* Header */}
                <div className="mb-4 space-y-1 pr-6">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    <Sparkles className="w-3 h-3" />
                    <span>Direct Studio Input</span>
                  </div>
                  <h3 id="feedback-dialog-title" className="font-display font-bold text-base text-neutral-950 dark:text-white">
                    Share Quick Feedback
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    Have thoughts on the design, demo sites, or pricing? Let us know!
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3.5">
                  {/* Reaction Pill Selector */}
                  <div>
                    <label className="text-[11px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider block mb-1.5">
                      Your Impression
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'praise', label: 'Impressive', icon: ThumbsUp },
                        { id: 'idea', label: 'Suggestion', icon: Lightbulb },
                        { id: 'critique', label: 'Needs Work', icon: MessageSquare }
                      ].map(item => {
                        const Icon = item.icon;
                        const isSelected = feedbackType === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setFeedbackType(item.id as any)}
                            className={`py-2 px-2 rounded-xl border text-[11px] font-semibold flex flex-col items-center gap-1 transition-all ${
                              isSelected
                                ? 'border-emerald-600 dark:border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 shadow-xs'
                                : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:border-neutral-300 dark:hover:border-neutral-700'
                            }`}
                          >
                            <Icon className="w-3.5 h-3.5" />
                            <span>{item.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Category Dropdown */}
                  <div>
                    <label className="text-[11px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider block mb-1">
                      Focus Area
                    </label>
                    <select
                      value={category}
                      onChange={e => setCategory(e.target.value)}
                      className="w-full text-xs px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white focus:outline-none focus:border-emerald-500"
                    >
                      <option>Visual Design & Typography</option>
                      <option>5 Demo Websites Experience</option>
                      <option>Website Pricing & Packages</option>
                      <option>Mobile Responsiveness</option>
                      <option>Other Thoughts</option>
                    </select>
                  </div>

                  {/* Feedback Textarea */}
                  <div>
                    <label className="text-[11px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider block mb-1">
                      Comments *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={comments}
                      onChange={e => setComments(e.target.value)}
                      placeholder="What caught your eye? Any features or improvements you'd like to see?"
                      className="w-full text-xs px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  {/* Optional Email */}
                  <div>
                    <label className="text-[11px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider block mb-1">
                      Your Email <span className="font-normal text-neutral-400">(optional)</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="alex@example.com"
                      className="w-full text-xs px-3 py-1.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={isSending || !comments.trim()}
                      className="w-full bg-neutral-950 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 disabled:opacity-50 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-98"
                    >
                      {isSending ? (
                        <span>Sending...</span>
                      ) : (
                        <>
                          <span>Submit Feedback</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
