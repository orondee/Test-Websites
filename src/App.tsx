import React, { useState, useEffect } from 'react';
import { AgencyHeader } from './components/AgencyHeader';
import { AgencyHero } from './components/AgencyHero';
import { DemoShowcaseSection } from './components/DemoShowcaseSection';
import { ProjectReadinessQuiz } from './components/ProjectReadinessQuiz';
import { PricingCalculator } from './components/PricingCalculator';
import { PackagesSection } from './components/PackagesSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ProcessSection } from './components/ProcessSection';
import { FAQSection } from './components/FAQSection';
import { AgencyFooter } from './components/AgencyFooter';
import { DemoViewerModal } from './components/DemoViewerModal';
import { InquiryModal } from './components/InquiryModal';
import { AccessibilityModal } from './components/AccessibilityModal';
import { ShareFeedbackButton } from './components/ShareFeedbackModal';
import { FadeInSection } from './components/ui/FadeInSection';
import { DEMO_PROJECTS } from './data/demoData';
import { DemoProject, AccessibilitySettings } from './types';

const DEFAULT_A11Y: AccessibilitySettings = {
  textScale: 'normal',
  highContrast: false,
  reducedMotion: false,
  dyslexicFont: false
};

export const App: React.FC = () => {
  // Theme state: dark/light
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Accessibility state
  const [isA11yOpen, setIsA11yOpen] = useState(false);
  const [a11ySettings, setA11ySettings] = useState<AccessibilitySettings>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('a11y_prefs');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          return DEFAULT_A11Y;
        }
      }
    }
    return DEFAULT_A11Y;
  });

  // State for active demo in live viewer
  const [activeViewerDemo, setActiveViewerDemo] = useState<DemoProject | null>(null);

  // State for inquiry modal
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [inquiryPackage, setInquiryPackage] = useState<string | undefined>();
  const [inquiryDemoId, setInquiryDemoId] = useState<string | undefined>();
  const [inquiryEstimate, setInquiryEstimate] = useState<{
    totalPrice: number;
    timeline: string;
    description: string;
    features: string[];
  } | undefined>();

  // Synchronize Dark Theme class on html root
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  // Synchronize Accessibility preferences on html root
  useEffect(() => {
    const root = document.documentElement;

    // 1. Font scaling
    const scaleMap = {
      normal: '100%',
      large: '115%',
      xlarge: '130%'
    };
    root.style.setProperty('--app-font-scale', scaleMap[a11ySettings.textScale] || '100%');

    // 2. High contrast
    if (a11ySettings.highContrast) {
      root.classList.add('accessibility-high-contrast');
    } else {
      root.classList.remove('accessibility-high-contrast');
    }

    // 3. Reduced motion
    if (a11ySettings.reducedMotion) {
      root.classList.add('accessibility-reduced-motion');
    } else {
      root.classList.remove('accessibility-reduced-motion');
    }

    // 4. Dyslexic font
    if (a11ySettings.dyslexicFont) {
      root.classList.add('accessibility-dyslexic');
    } else {
      root.classList.remove('accessibility-dyslexic');
    }

    localStorage.setItem('a11y_prefs', JSON.stringify(a11ySettings));
  }, [a11ySettings]);

  // Global Keyboard Shortcuts: Escape (close modals), 'd' (toggle dark), '/' (focus inquiry/search)
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // If typing in input, textarea, or select, ignore 'd' and '/'
      const activeEl = document.activeElement;
      const isInput =
        activeEl instanceof HTMLInputElement ||
        activeEl instanceof HTMLTextAreaElement ||
        activeEl instanceof HTMLSelectElement ||
        activeEl?.getAttribute('contenteditable') === 'true';

      if (e.key === 'Escape') {
        if (activeViewerDemo) setActiveViewerDemo(null);
        if (isInquiryOpen) setIsInquiryOpen(false);
        if (isA11yOpen) setIsA11yOpen(false);
      } else if (!isInput) {
        if (e.key === 'd' || e.key === 'D') {
          e.preventDefault();
          toggleTheme();
        } else if (e.key === '/') {
          e.preventDefault();
          setIsInquiryOpen(true);
        }
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [activeViewerDemo, isInquiryOpen, isA11yOpen]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  const updateA11ySettings = (newSettings: Partial<AccessibilitySettings>) => {
    setA11ySettings(prev => ({
      ...prev,
      ...newSettings
    }));
  };

  const resetA11ySettings = () => {
    setA11ySettings(DEFAULT_A11Y);
  };

  const handleLaunchDemo = (demo: DemoProject) => {
    setActiveViewerDemo(demo);
  };

  const handleOrderThisType = (demo: DemoProject) => {
    setInquiryDemoId(demo.id);
    setInquiryPackage('starter');
    setInquiryEstimate(undefined);
    setActiveViewerDemo(null);
    setIsInquiryOpen(true);
  };

  const handleSelectPackage = (packageId: string) => {
    setInquiryPackage(packageId);
    setInquiryDemoId(undefined);
    setInquiryEstimate(undefined);
    setIsInquiryOpen(true);
  };

  const handleSelectEstimate = (estimate: {
    totalPrice: number;
    timeline: string;
    description: string;
    features: string[];
  }) => {
    setInquiryEstimate(estimate);
    setInquiryPackage('custom');
    setInquiryDemoId(undefined);
    setIsInquiryOpen(true);
  };

  const scrollToDemos = () => {
    const el = document.getElementById('demos');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCalculator = () => {
    const el = document.getElementById('calculator');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 flex flex-col font-sans selection:bg-neutral-900 dark:selection:bg-white selection:text-white dark:selection:text-neutral-900 transition-colors">
      {/* Agency Header */}
      <AgencyHeader
        onOpenInquiry={() => {
          setInquiryPackage('starter');
          setInquiryEstimate(undefined);
          setIsInquiryOpen(true);
        }}
        onOpenAccessibility={() => setIsA11yOpen(true)}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />

      <main className="flex-1">
        {/* Agency Hero */}
        <FadeInSection yOffset={16} duration={0.75} forceReducedMotion={a11ySettings.reducedMotion}>
          <AgencyHero
            onExploreDemos={scrollToDemos}
            onOpenCalculator={scrollToCalculator}
            onQuickLaunchDemo={handleLaunchDemo}
          />
        </FadeInSection>

        {/* 10 Demo Websites Showcase Grid */}
        <FadeInSection forceReducedMotion={a11ySettings.reducedMotion}>
          <DemoShowcaseSection
            demos={DEMO_PROJECTS}
            onLaunchDemo={handleLaunchDemo}
            onOrderThisType={handleOrderThisType}
          />
        </FadeInSection>

        {/* Interactive Scope & Readiness Matcher */}
        <FadeInSection forceReducedMotion={a11ySettings.reducedMotion}>
          <ProjectReadinessQuiz
            onSelectRecommendedPackage={handleSelectPackage}
            onExploreDemo={handleLaunchDemo}
            onOpenInquiry={() => {
              setInquiryPackage('growth');
              setInquiryEstimate(undefined);
              setIsInquiryOpen(true);
            }}
          />
        </FadeInSection>

        {/* Interactive Pricing Calculator with lowered starter pricing */}
        <FadeInSection forceReducedMotion={a11ySettings.reducedMotion}>
          <PricingCalculator
            onSelectEstimate={handleSelectEstimate}
          />
        </FadeInSection>

        {/* Website Packages */}
        <FadeInSection forceReducedMotion={a11ySettings.reducedMotion}>
          <PackagesSection
            onSelectPackage={handleSelectPackage}
          />
        </FadeInSection>

        {/* Why Custom Wins */}
        <FadeInSection forceReducedMotion={a11ySettings.reducedMotion}>
          <WhyChooseUs />
        </FadeInSection>

        {/* 7-Day Process */}
        <FadeInSection forceReducedMotion={a11ySettings.reducedMotion}>
          <ProcessSection
            onOpenInquiry={() => {
              setInquiryPackage('starter');
              setInquiryEstimate(undefined);
              setIsInquiryOpen(true);
            }}
          />
        </FadeInSection>

        {/* Frequently Asked Questions */}
        <FadeInSection forceReducedMotion={a11ySettings.reducedMotion}>
          <FAQSection
            onOpenInquiry={() => {
              setInquiryPackage('starter');
              setInquiryEstimate(undefined);
              setIsInquiryOpen(true);
            }}
          />
        </FadeInSection>
      </main>

      {/* Agency Footer */}
      <FadeInSection yOffset={12} duration={0.6} forceReducedMotion={a11ySettings.reducedMotion}>
        <AgencyFooter
          onOpenInquiry={() => {
            setInquiryPackage('starter');
            setInquiryEstimate(undefined);
            setIsInquiryOpen(true);
          }}
          onOpenAccessibility={() => setIsA11yOpen(true)}
        />
      </FadeInSection>

      {/* Accessibility Preferences Modal */}
      <AccessibilityModal
        isOpen={isA11yOpen}
        onClose={() => setIsA11yOpen(false)}
        settings={a11ySettings}
        onUpdateSettings={updateA11ySettings}
        onReset={resetA11ySettings}
      />

      {/* Fullscreen / Framed Demo Sandbox Viewer */}
      {activeViewerDemo && (
        <DemoViewerModal
          demo={activeViewerDemo}
          allDemos={DEMO_PROJECTS}
          onSelectDemo={setActiveViewerDemo}
          onClose={() => setActiveViewerDemo(null)}
          onOrderThisType={handleOrderThisType}
        />
      )}

      {/* Client Inquiry & Proposal Modal */}
      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        initialPackage={inquiryPackage}
        initialDemoId={inquiryDemoId}
        initialEstimate={inquiryEstimate}
      />

      {/* Floating Share Feedback Widget */}
      <ShareFeedbackButton />
    </div>
  );
};
