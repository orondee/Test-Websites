import React, { useState } from 'react';
import { 
  Monitor, 
  Tablet, 
  Smartphone, 
  Maximize2, 
  Minimize2, 
  X, 
  ArrowLeft, 
  Info, 
  CheckCircle, 
  ExternalLink,
  Sparkles,
  ShoppingBag,
  ShieldCheck
} from 'lucide-react';
import { DemoProject, ViewportMode } from '../types';
import { CoffeeDemo } from '../demos/CoffeeDemo';
import { DentalDemo } from '../demos/DentalDemo';
import { ArchitectureDemo } from '../demos/ArchitectureDemo';
import { SaaSDemo } from '../demos/SaaSDemo';
import { LegalDemo } from '../demos/LegalDemo';
import { RealEstateDemo } from '../demos/RealEstateDemo';
import { BakeryDemo } from '../demos/BakeryDemo';
import { FitnessDemo } from '../demos/FitnessDemo';
import { WoodworkDemo } from '../demos/WoodworkDemo';
import { MedSpaDemo } from '../demos/MedSpaDemo';

interface DemoViewerModalProps {
  demo: DemoProject;
  allDemos: DemoProject[];
  onSelectDemo: (demo: DemoProject) => void;
  onClose: () => void;
  onOrderThisType: (demo: DemoProject) => void;
}

export const DemoViewerModal: React.FC<DemoViewerModalProps> = ({
  demo,
  allDemos,
  onSelectDemo,
  onClose,
  onOrderThisType
}) => {
  const [viewport, setViewport] = useState<ViewportMode>('desktop');
  const [showBlueprint, setShowBlueprint] = useState(false);

  // Keyboard navigation shortcuts
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        const currentIndex = allDemos.findIndex(d => d.id === demo.id);
        const nextIndex = (currentIndex + 1) % allDemos.length;
        onSelectDemo(allDemos[nextIndex]);
      } else if (e.key === 'ArrowLeft' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        const currentIndex = allDemos.findIndex(d => d.id === demo.id);
        const prevIndex = (currentIndex - 1 + allDemos.length) % allDemos.length;
        onSelectDemo(allDemos[prevIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [demo.id, allDemos, onClose, onSelectDemo]);

  // Render the matching demo component
  const renderDemoContent = () => {
    switch (demo.id) {
      case 'coffee-roastery':
        return <CoffeeDemo />;
      case 'dental-clinic':
        return <DentalDemo />;
      case 'architecture-studio':
        return <ArchitectureDemo />;
      case 'saas-platform':
        return <SaaSDemo />;
      case 'legal-advisory':
        return <LegalDemo />;
      case 'luxury-realestate':
        return <RealEstateDemo />;
      case 'artisan-bakery':
        return <BakeryDemo />;
      case 'fitness-studio':
        return <FitnessDemo />;
      case 'high-end-trades':
        return <WoodworkDemo />;
      case 'med-spa':
        return <MedSpaDemo />;
      default:
        return <CoffeeDemo />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-neutral-950 text-white overflow-hidden">
      {/* Top Floating Agency Header Bar */}
      <header className="h-14 bg-neutral-900 border-b border-neutral-800 px-4 sm:px-6 flex items-center justify-between gap-4 shrink-0 z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-medium"
            title="Return to Agency Portfolio"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Exit to Portfolio</span>
          </button>

          <div className="h-4 w-px bg-neutral-700" />

          {/* Demo Dropdown Switcher */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-400 hidden md:inline">Viewing:</span>
            <select
              value={demo.id}
              onChange={e => {
                const found = allDemos.find(d => d.id === e.target.value);
                if (found) onSelectDemo(found);
              }}
              className="bg-neutral-800 border border-neutral-700 text-xs text-white rounded px-2.5 py-1.5 font-medium focus:outline-none focus:border-emerald-500"
            >
              {allDemos.map(d => (
                <option key={d.id} value={d.id}>
                  {d.name} ({d.startingPrice})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Device Viewport Switcher */}
        <div className="hidden sm:flex items-center gap-1 p-1 bg-neutral-800 rounded-lg border border-neutral-700">
          <button
            onClick={() => setViewport('desktop')}
            className={`p-1.5 rounded text-xs flex items-center gap-1.5 transition-all ${
              viewport === 'desktop'
                ? 'bg-neutral-900 text-white font-semibold shadow-xs'
                : 'text-neutral-400 hover:text-white'
            }`}
            title="Desktop 1440px"
          >
            <Monitor className="w-4 h-4" />
            <span className="text-[11px] hidden lg:inline">Desktop</span>
          </button>

          <button
            onClick={() => setViewport('tablet')}
            className={`p-1.5 rounded text-xs flex items-center gap-1.5 transition-all ${
              viewport === 'tablet'
                ? 'bg-neutral-900 text-white font-semibold shadow-xs'
                : 'text-neutral-400 hover:text-white'
            }`}
            title="Tablet 768px"
          >
            <Tablet className="w-4 h-4" />
            <span className="text-[11px] hidden lg:inline">Tablet</span>
          </button>

          <button
            onClick={() => setViewport('mobile')}
            className={`p-1.5 rounded text-xs flex items-center gap-1.5 transition-all ${
              viewport === 'mobile'
                ? 'bg-neutral-900 text-white font-semibold shadow-xs'
                : 'text-neutral-400 hover:text-white'
            }`}
            title="Mobile 390px"
          >
            <Smartphone className="w-4 h-4" />
            <span className="text-[11px] hidden lg:inline">Mobile</span>
          </button>

          <button
            onClick={() => setViewport('fullscreen')}
            className={`p-1.5 rounded text-xs flex items-center gap-1.5 transition-all ${
              viewport === 'fullscreen'
                ? 'bg-neutral-900 text-white font-semibold shadow-xs'
                : 'text-neutral-400 hover:text-white'
            }`}
            title="Full Window"
          >
            <Maximize2 className="w-4 h-4" />
            <span className="text-[11px] hidden lg:inline">Full</span>
          </button>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowBlueprint(!showBlueprint)}
            className={`px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-colors flex items-center gap-1.5 ${
              showBlueprint 
                ? 'bg-emerald-600 border-emerald-500 text-white' 
                : 'bg-neutral-800 border-neutral-700 text-neutral-300 hover:text-white'
            }`}
          >
            <Info className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Build Specs</span>
          </button>

          <button
            onClick={() => onOrderThisType(demo)}
            className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 shadow-xs"
          >
            <span>Order a Site Like This ({demo.startingPrice})</span>
          </button>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 relative overflow-hidden flex bg-neutral-950">
        {/* Device Frame Viewport Container */}
        <div className="flex-1 overflow-auto flex items-start justify-center p-2 sm:p-6 transition-all">
          {viewport === 'fullscreen' ? (
            <div className="w-full h-full min-h-screen bg-white text-neutral-900 rounded-none overflow-y-auto">
              {renderDemoContent()}
            </div>
          ) : viewport === 'desktop' ? (
            <div className="w-full max-w-[1340px] bg-white rounded-xl shadow-2xl border border-neutral-800 overflow-hidden flex flex-col my-auto max-h-[calc(100vh-6rem)] transition-all duration-300">
              {/* Browser mockup bar */}
              <div className="h-9 bg-neutral-100 border-b border-neutral-200 px-4 flex items-center gap-2 select-none shrink-0">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <div className="flex-1 max-w-sm mx-auto bg-white rounded px-3 py-1 text-[11px] text-neutral-600 font-mono text-center border border-neutral-200 truncate">
                  https://preview.{demo.id}.demo
                </div>
              </div>
              <div className="overflow-y-auto flex-1">
                {renderDemoContent()}
              </div>
            </div>
          ) : viewport === 'tablet' ? (
            <div className="w-[768px] bg-white rounded-2xl shadow-2xl border-4 border-neutral-800 overflow-hidden flex flex-col my-auto max-h-[calc(100vh-6rem)] transition-all duration-300">
              <div className="h-6 bg-neutral-900 flex items-center justify-center shrink-0">
                <div className="w-12 h-1 bg-neutral-700 rounded-full" />
              </div>
              <div className="overflow-y-auto flex-1">
                {renderDemoContent()}
              </div>
            </div>
          ) : (
            // Mobile (390px)
            <div className="w-[390px] bg-white rounded-3xl shadow-2xl border-8 border-neutral-800 overflow-hidden flex flex-col my-auto max-h-[820px] aspect-[9/19.5] transition-all duration-300">
              {/* Dynamic Island / Notch */}
              <div className="h-7 bg-neutral-900 flex items-center justify-between px-6 text-[10px] text-white shrink-0 font-medium">
                <span>9:41</span>
                <div className="w-20 h-4 bg-black rounded-full" />
                <span>5G · 100%</span>
              </div>
              <div className="overflow-y-auto flex-1">
                {renderDemoContent()}
              </div>
            </div>
          )}
        </div>

        {/* Blueprint Side Drawer */}
        {showBlueprint && (
          <aside className="w-80 sm:w-96 bg-neutral-900 border-l border-neutral-800 p-6 flex flex-col justify-between overflow-y-auto shrink-0 z-30 shadow-2xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
                  Demo Specifications
                </div>
                <button
                  onClick={() => setShowBlueprint(false)}
                  className="text-neutral-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div>
                <h3 className="font-display font-bold text-lg text-white">
                  {demo.name}
                </h3>
                <div className="text-xs text-neutral-400 mt-1">
                  Ideal Clients: <span className="text-white">{demo.clientType}</span>
                </div>
              </div>

              <div className="bg-neutral-800/60 p-4 rounded-lg border border-neutral-700 space-y-1">
                <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{demo.guarantee.title}</span>
                </div>
                <div className="text-xs text-neutral-300">
                  {demo.guarantee.subtitle}
                </div>
              </div>

              <div>
                <div className="text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
                  Built-In Features
                </div>
                <div className="space-y-2">
                  {demo.conversionFeatures.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-neutral-300">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-neutral-800">
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <div className="text-neutral-400">Starter Price:</div>
                    <div className="font-mono font-bold text-emerald-400 text-base">{demo.startingPrice}</div>
                  </div>
                  <div>
                    <div className="text-neutral-400">Launch Speed:</div>
                    <div className="font-mono font-bold text-white text-base">{demo.turnaroundTime}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-800">
              <button
                onClick={() => onOrderThisType(demo)}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
              >
                Order This Website ({demo.startingPrice})
              </button>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};
