import React, { useState } from 'react';
import { AgencyHeader } from './components/AgencyHeader';
import { AgencyHero } from './components/AgencyHero';
import { DemoShowcaseSection } from './components/DemoShowcaseSection';
import { PricingCalculator } from './components/PricingCalculator';
import { PackagesSection } from './components/PackagesSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ProcessSection } from './components/ProcessSection';
import { AgencyFooter } from './components/AgencyFooter';
import { DemoViewerModal } from './components/DemoViewerModal';
import { InquiryModal } from './components/InquiryModal';
import { DEMO_PROJECTS } from './data/demoData';
import { DemoProject } from './types';

export const App: React.FC = () => {
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

  const handleLaunchDemo = (demo: DemoProject) => {
    setActiveViewerDemo(demo);
  };

  const handleOrderThisType = (demo: DemoProject) => {
    setInquiryDemoId(demo.id);
    setInquiryPackage('growth');
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
    <div className="min-h-screen bg-neutral-50 text-neutral-900 flex flex-col font-sans selection:bg-neutral-900 selection:text-white">
      {/* Agency Header */}
      <AgencyHeader
        onOpenInquiry={() => {
          setInquiryPackage('growth');
          setInquiryEstimate(undefined);
          setIsInquiryOpen(true);
        }}
      />

      <main className="flex-1">
        {/* Agency Hero */}
        <AgencyHero
          onExploreDemos={scrollToDemos}
          onOpenCalculator={scrollToCalculator}
        />

        {/* 5 Demo Websites Showcase Grid */}
        <DemoShowcaseSection
          demos={DEMO_PROJECTS}
          onLaunchDemo={handleLaunchDemo}
          onOrderThisType={handleOrderThisType}
        />

        {/* Interactive Pricing Calculator */}
        <PricingCalculator
          onSelectEstimate={handleSelectEstimate}
        />

        {/* Website Packages */}
        <PackagesSection
          onSelectPackage={handleSelectPackage}
        />

        {/* Why Custom Wins */}
        <WhyChooseUs />

        {/* 14-Day Process */}
        <ProcessSection
          onOpenInquiry={() => {
            setInquiryPackage('growth');
            setInquiryEstimate(undefined);
            setIsInquiryOpen(true);
          }}
        />
      </main>

      {/* Agency Footer */}
      <AgencyFooter
        onOpenInquiry={() => {
          setInquiryPackage('growth');
          setInquiryEstimate(undefined);
          setIsInquiryOpen(true);
        }}
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
    </div>
  );
};
