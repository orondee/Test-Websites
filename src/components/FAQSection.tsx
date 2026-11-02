import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle, ArrowRight, CheckCircle2 } from 'lucide-react';

interface FAQItem {
  id: string;
  category: 'timeline' | 'process' | 'pricing' | 'maintenance';
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    id: 'timeline-launch',
    category: 'timeline',
    question: 'How fast can my website be launched?',
    answer: 'Most standard business websites are completed and launched within 7 to 10 business days. For urgent deadlines, our Starter Business package can be delivered via a 3 to 5 day fast-track sprint. Because you work directly with me rather than a bloated agency committee, decisions and revisions happen without delay.'
  },
  {
    id: 'preparation-assets',
    category: 'process',
    question: 'What do I need to have ready before we start?',
    answer: 'Just an idea of what your business does and any logo or photos you already have! If you do not have professional photography or written copy yet, do not worry—I help craft compelling headlines, structure your service offerings, and provide high-resolution licensed imagery matching your industry aesthetic.'
  },
  {
    id: 'code-ownership',
    category: 'pricing',
    question: 'Do I own the website, or am I locked into a monthly subscription?',
    answer: 'You own 100% of your website, code, domain, and design assets from day one. Unlike proprietary website builders like Wix or Squarespace that lock your site into their closed ecosystem, our websites are built on open modern web standards (React and clean HTML/CSS) that can be hosted anywhere with zero hostage fees.'
  },
  {
    id: 'post-launch-maintenance',
    category: 'maintenance',
    question: 'What happens if I need changes or updates after we launch?',
    answer: 'Every project comes with 30 days of complimentary post-launch support and minor revisions (such as updating hours, menu items, phone numbers, or staff photos). After 30 days, you can request simple updates on an affordable per-task basis, or I can integrate a headless content management system (CMS) so you can edit text and images directly.'
  },
  {
    id: 'payment-terms',
    category: 'pricing',
    question: 'How do payments and milestones work?',
    answer: 'We keep billing simple and low-risk: a 50% deposit secures your sprint on my calendar and initiates design wireframes. The remaining 50% is only due once your website is fully coded, reviewed by you, and approved for final live domain launch.'
  },
  {
    id: 'mobile-seo',
    category: 'process',
    question: 'Will my website be fast on mobile phones and rank on Google?',
    answer: 'Yes! Every website is built mobile-first and tested thoroughly on modern iPhones, Android devices, and iPads. We configure proper Google search meta tags, OpenGraph social sharing cards, XML sitemaps, and lightweight image compression so your pages load in under 1.5 seconds.'
  },
  {
    id: 'domain-hosting',
    category: 'maintenance',
    question: 'How do custom domain and hosting work?',
    answer: 'I handle the full deployment setup. If you already own a domain (via GoDaddy, Namecheap, Google Domains, etc.), I connect it directly to modern, ultra-fast cloud hosting with an included free SSL security padlock certificate. Setup is completely seamless with zero technical hassle on your end.'
  }
];

interface FAQSectionProps {
  onOpenInquiry: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onOpenInquiry }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'timeline' | 'process' | 'pricing' | 'maintenance'>('all');
  const [expandedId, setExpandedId] = useState<string | null>('timeline-launch');

  const filteredFaqs = activeCategory === 'all'
    ? FAQS
    : FAQS.filter(f => f.category === activeCategory);

  const toggleAccordion = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-20 bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 border-b border-neutral-200 dark:border-neutral-800 transition-colors">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-200/60 dark:bg-neutral-800 text-emerald-700 dark:text-emerald-400 rounded-md text-xs font-semibold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Answers to Common Questions</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto">
            Everything you need to know about working with an independent web developer, project timelines, deliverables, and ongoing support.
          </p>
        </div>

        {/* Filter Segmented Control */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-neutral-200/70 dark:bg-neutral-800/80 rounded-xl mb-10 max-w-xl mx-auto">
          {[
            { id: 'all', label: 'All Questions' },
            { id: 'timeline', label: 'Timelines' },
            { id: 'process', label: 'Design & Build' },
            { id: 'pricing', label: 'Pricing & Ownership' },
            { id: 'maintenance', label: 'Hosting & Care' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id as any)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
                activeCategory === tab.id
                  ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Accordion Questions List */}
        <div className="space-y-3">
          {filteredFaqs.map(faq => {
            const isExpanded = expandedId === faq.id;
            return (
              <div
                key={faq.id}
                className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
                  isExpanded
                    ? 'border-emerald-600/70 dark:border-emerald-500/70 bg-white dark:bg-neutral-900 shadow-sm'
                    : 'border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/60 hover:border-neutral-300 dark:hover:border-neutral-700'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                  aria-expanded={isExpanded}
                >
                  <span className={`font-display text-sm sm:text-base font-semibold transition-colors ${
                    isExpanded ? 'text-emerald-700 dark:text-emerald-400' : 'text-neutral-900 dark:text-white'
                  }`}>
                    {faq.question}
                  </span>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                    isExpanded
                      ? 'rotate-180 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed border-t border-neutral-100 dark:border-neutral-800/60">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Callout Card */}
        <div className="mt-12 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-display font-bold text-base sm:text-lg text-neutral-900 dark:text-white">
              Have a specific question about your project?
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              No sales pressure. Reach out to Oronde Stewart directly at{' '}
              <a href="mailto:orondestewart1@gmail.com" className="text-emerald-600 dark:text-emerald-400 font-medium underline">
                orondestewart1@gmail.com
              </a>{' '}
              and I'll reply within 4 hours.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <a
              href="mailto:orondestewart1@gmail.com"
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap shadow-xs hover:-translate-y-0.5 active:scale-95 flex items-center gap-2"
            >
              <span>Email Oronde</span>
            </a>
            <button
              onClick={onOpenInquiry}
              className="bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 dark:text-neutral-900 text-white px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 shadow-xs hover:-translate-y-0.5 active:scale-95"
            >
              <span>Project Intake Form</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
