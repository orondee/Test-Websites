import React, { useState } from 'react';
import { 
  Hammer, 
  Ruler, 
  Layers, 
  Check, 
  ArrowRight, 
  X, 
  Calendar, 
  Sparkles, 
  ShieldCheck, 
  Calculator 
} from 'lucide-react';

interface WoodSpecies {
  id: string;
  name: string;
  origin: string;
  tone: string;
  hardness: string;
  hexBg: string;
  multiplier: number;
}

const WOOD_SPECIES: WoodSpecies[] = [
  {
    id: 'walnut',
    name: 'American Black Walnut',
    origin: 'Appalachian Hardwoods',
    tone: 'Deep chocolate with subtle violet undertones',
    hardness: '1,010 Janka',
    hexBg: '#3d2b1f',
    multiplier: 1.25
  },
  {
    id: 'white-oak',
    name: 'Rift & Quarter-Sawn White Oak',
    origin: 'Northern Wisconsin',
    tone: 'Crisp honey wheat with tight linear grain',
    hardness: '1,360 Janka',
    hexBg: '#8c7355',
    multiplier: 1.15
  },
  {
    id: 'smoked-ash',
    name: 'Smoked European Ash',
    origin: 'Bavarian Sustainable Forests',
    tone: 'Muted charcoal-olive with prominent open grain',
    hardness: '1,320 Janka',
    hexBg: '#47433b',
    multiplier: 1.10
  },
  {
    id: 'bleached-maple',
    name: 'Nordic Bleached Hard Maple',
    origin: 'Scandinavian Certified Plantations',
    tone: 'Porcelain cream with ultra-smooth satin sheen',
    hardness: '1,450 Janka',
    hexBg: '#b8a68d',
    multiplier: 1.05
  }
];

export const WoodworkDemo: React.FC = () => {
  const [selectedWood, setSelectedWood] = useState<WoodSpecies>(WOOD_SPECIES[1]);
  const [linearFeet, setLinearFeet] = useState<number>(24);
  const [cabinetHeight, setCabinetHeight] = useState<'standard' | 'ceiling'>('ceiling');
  const [doorStyle, setDoorStyle] = useState<'slab' | 'shaker' | 'fluted'>('fluted');
  const [consultationBooked, setConsultationBooked] = useState(false);
  const [homeownerName, setHomeownerName] = useState('');
  const [homeownerZip, setHomeownerZip] = useState('');

  // Live cabinetry cost estimate calculation
  const baseCostPerFoot = 420;
  const heightMultiplier = cabinetHeight === 'ceiling' ? 1.25 : 1.0;
  const doorMultiplier = doorStyle === 'fluted' ? 1.35 : doorStyle === 'shaker' ? 1.15 : 1.0;
  const estimatedTotal = Math.round(linearFeet * baseCostPerFoot * heightMultiplier * doorMultiplier * selectedWood.multiplier);

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100 font-sans selection:bg-amber-600 selection:text-white">
      {/* Brand Header */}
      <header className="border-b border-stone-800 bg-stone-950/95 sticky top-0 z-30 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-600/20 border border-amber-600/40 flex items-center justify-center text-amber-500 font-serif font-bold text-sm">
            N
          </div>
          <div>
            <div className="font-serif tracking-widest text-sm uppercase font-semibold text-white">
              Nordic Woodwork & Atelier
            </div>
            <div className="text-[10px] text-stone-400 tracking-wider font-mono">
              Bespoke Cabinetry & Architectural Millwork
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="hidden md:flex items-center gap-6 text-stone-400">
            <span>Portfolio</span>
            <span>Joinery Standards</span>
            <span>Materials</span>
          </div>
          <button
            onClick={() => {
              const el = document.getElementById('wood-calculator');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-amber-600 hover:bg-amber-500 text-white font-bold px-4 py-2 rounded-lg text-xs transition-colors"
          >
            Instant Cabinetry Estimator
          </button>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="py-16 px-6 border-b border-stone-800 bg-stone-950">
        <div className="max-w-5xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono">
            <span>Heirloom Joinery · Made in North America</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white max-w-2xl">
            Architectural Cabinetry Built to Outlive the House.
          </h1>
          <p className="text-stone-400 text-xs sm:text-base max-w-xl leading-relaxed">
            Solid hardwood dovetailed drawers, mortise-and-tenon face frames, and Blum soft-close mechanics. Explore wood finishes and calculate your project budget below.
          </p>
        </div>
      </div>

      {/* Interactive Material Finish Swatches */}
      <div className="max-w-5xl mx-auto px-6 py-12 border-b border-stone-800/80">
        <div className="space-y-4 mb-6">
          <div className="text-xs uppercase font-mono tracking-wider text-amber-500 font-bold">
            01. Interactive Material Finishes
          </div>
          <h2 className="font-serif text-2xl font-bold text-white">
            Select Hardwood Species
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {WOOD_SPECIES.map(wood => (
            <div
              key={wood.id}
              onClick={() => setSelectedWood(wood)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                selectedWood.id === wood.id
                  ? 'border-amber-500 bg-stone-950 shadow-md ring-2 ring-amber-500/20'
                  : 'border-stone-800 bg-stone-950/60 hover:border-stone-700'
              }`}
            >
              <div
                className="w-full h-24 rounded-xl mb-3 border border-white/10 flex items-end p-2.5 shadow-inner"
                style={{ backgroundColor: wood.hexBg }}
              >
                <span className="text-[10px] font-mono text-white/90 bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs">
                  {wood.hardness}
                </span>
              </div>
              <h3 className="font-bold text-sm text-white">{wood.name}</h3>
              <p className="text-[11px] text-stone-400 mt-1">{wood.tone}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Instant Cabinetry Budget Estimator */}
      <div id="wood-calculator" className="max-w-4xl mx-auto px-6 py-14 space-y-8">
        <div className="space-y-2">
          <div className="text-xs uppercase font-mono tracking-wider text-amber-500 font-bold">
            02. Live Budget Estimator
          </div>
          <h2 className="font-serif text-2xl font-bold text-white">
            Custom Kitchen & Built-in Calculator
          </h2>
          <p className="text-stone-400 text-xs sm:text-sm">
            Adjust linear footage and construction specs for real-time pricing transparency.
          </p>
        </div>

        <div className="bg-stone-950 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-6">
          {/* Linear Footage Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-mono text-stone-300 uppercase">
                Cabinetry Run Length
              </label>
              <span className="font-mono text-amber-400 text-base font-bold">
                {linearFeet} Linear Feet
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="60"
              step="2"
              value={linearFeet}
              onChange={e => setLinearFeet(Number(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-stone-500 font-mono mt-1">
              <span>10 ft (Pantry/Bar)</span>
              <span>24 ft (Medium Kitchen)</span>
              <span>60 ft (Full Estate Kitchen)</span>
            </div>
          </div>

          {/* Door Profile & Ceiling Height */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-stone-300 uppercase mb-2">
                Door Profile & Fronts
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'slab', label: 'Euro Slab' },
                  { id: 'shaker', label: 'Slim Shaker' },
                  { id: 'fluted', label: 'Fluted Reeded' }
                ].map(p => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setDoorStyle(p.id as any)}
                    className={`py-2 px-2 rounded-xl text-xs font-medium border text-center transition-colors ${
                      doorStyle === p.id
                        ? 'border-amber-500 bg-amber-500/10 text-white font-bold'
                        : 'border-stone-800 bg-stone-900 text-stone-400 hover:text-white'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-stone-300 uppercase mb-2">
                Cabinet Height
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setCabinetHeight('standard')}
                  className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition-colors ${
                    cabinetHeight === 'standard'
                      ? 'border-amber-500 bg-amber-500/10 text-white font-bold'
                      : 'border-stone-800 bg-stone-900 text-stone-400 hover:text-white'
                  }`}
                >
                  Standard (84" Upper)
                </button>
                <button
                  type="button"
                  onClick={() => setCabinetHeight('ceiling')}
                  className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition-colors ${
                    cabinetHeight === 'ceiling'
                      ? 'border-amber-500 bg-amber-500/10 text-white font-bold'
                      : 'border-stone-800 bg-stone-900 text-stone-400 hover:text-white'
                  }`}
                >
                  Full Ceiling Height (108")
                </button>
              </div>
            </div>
          </div>

          {/* Real-time Calculation Result Bar */}
          <div className="p-6 bg-stone-900 rounded-2xl border border-stone-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="text-[10px] uppercase font-mono text-stone-400">
                Estimated Cabinetry Build Total ({selectedWood.name})
              </div>
              <div className="font-serif text-3xl font-bold text-amber-500 font-mono">
                ${estimatedTotal.toLocaleString()}
              </div>
              <div className="text-[11px] text-stone-400 mt-0.5">
                Includes shop drafting, soft-close hardware, and factory pre-assembly.
              </div>
            </div>

            <button
              onClick={() => setConsultationBooked(true)}
              className="px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl text-xs transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <span>Schedule Measurement Visit</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {consultationBooked && (
            <div className="p-4 bg-emerald-950/30 border border-emerald-800/60 rounded-xl flex items-center justify-between text-xs text-emerald-300">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Consultation request submitted! A master joiner will contact you to review blueprints.</span>
              </div>
              <button
                onClick={() => setConsultationBooked(false)}
                className="text-stone-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default WoodworkDemo;
