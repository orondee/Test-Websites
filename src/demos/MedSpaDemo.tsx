import React, { useState } from 'react';
import { 
  Sparkles, 
  Activity, 
  Calendar, 
  Clock, 
  Check, 
  ArrowRight, 
  X, 
  ShieldCheck, 
  Plus, 
  CheckCircle2 
} from 'lucide-react';

interface WellnessProtocol {
  id: string;
  name: string;
  duration: string;
  price: number;
  benefits: string[];
  description: string;
  category: 'iv' | 'cryo' | 'longevity';
}

const PROTOCOLS: WellnessProtocol[] = [
  {
    id: 'w1',
    name: 'NAD+ Cellular Longevity Infusion',
    duration: '90 min',
    price: 380,
    benefits: ['Mitochondrial Repair', 'DNA Integrity', 'Cognitive Focus'],
    description: 'High-purity Nicotinamide Adenine Dinucleotide to stimulate cellular bioenergetics and reverse metabolic fatigue.',
    category: 'longevity'
  },
  {
    id: 'w2',
    name: 'Glutathione Radiance & Glow Drip',
    duration: '45 min',
    price: 195,
    benefits: ['Skin Pigmentation Brightening', 'Hepatic Detox', 'Collagen Synthesis'],
    description: 'Master antioxidant intravenous cocktail combined with Vitamin C and Biotin for profound dermal luminosity.',
    category: 'iv'
  },
  {
    id: 'w3',
    name: 'Whole-Body Subzero Cryo Chamber (-140°C)',
    duration: '3 min',
    price: 75,
    benefits: ['Systemic Inflammation Drop', 'Endorphin Surge', 'Metabolic Boost'],
    description: 'Advanced electric walk-in cryotherapy chamber designed for rapid neuromuscular recovery and deep restorative sleep.',
    category: 'cryo'
  },
  {
    id: 'w4',
    name: 'Executive Neuro-Recovery Protocol',
    duration: '60 min',
    price: 260,
    benefits: ['Adrenal Reset', 'Electrolyte Balance', 'Mental Clarity'],
    description: 'Targeted amino acid complex with Magnesium Glycinate and Vitamin B12 for high-performance recovery.',
    category: 'iv'
  }
];

export const MedSpaDemo: React.FC = () => {
  const [selectedGoal, setSelectedGoal] = useState<'recovery' | 'glow' | 'longevity'>('longevity');
  const [activeProtocol, setActiveProtocol] = useState<WellnessProtocol>(PROTOCOLS[0]);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [clientDate, setClientDate] = useState('2026-11-14');
  const [clientTime, setClientTime] = useState('11:00 AM');
  const [patientName, setPatientName] = useState('');
  const [booked, setBooked] = useState(false);

  const filtered = selectedGoal === 'longevity'
    ? PROTOCOLS
    : selectedGoal === 'glow'
    ? PROTOCOLS.filter(p => p.category === 'iv')
    : PROTOCOLS.filter(p => p.category === 'cryo' || p.category === 'longevity');

  const handleBook = (item: WellnessProtocol) => {
    setActiveProtocol(item);
    setBooked(false);
    setBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-teal-500 selection:text-black">
      {/* Brand Header */}
      <header className="border-b border-slate-800 bg-slate-900/95 sticky top-0 z-30 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400 font-bold text-sm">
            L
          </div>
          <div>
            <div className="font-semibold tracking-widest text-sm uppercase text-white font-serif">
              Lumière Longevity
            </div>
            <div className="text-[10px] text-slate-400 tracking-wider font-mono">
              Regenerative Medical Aesthetics & IV
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="hidden md:flex items-center gap-2 text-teal-400 font-mono">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            <span>Board-Certified Medical Staff</span>
          </div>
          <button
            onClick={() => handleBook(PROTOCOLS[0])}
            className="bg-teal-500 hover:bg-teal-400 text-black font-bold px-4 py-2 rounded-lg text-xs transition-colors cursor-pointer"
          >
            <span>Book Protocol Session</span>
          </button>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="py-16 px-6 border-b border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-5xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-mono">
            <span>Evidence-Based Longevity Therapies</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white max-w-2xl leading-tight">
            Cellular Rejuvenation & Advanced Aesthetic Protocols.
          </h1>
          <p className="text-slate-400 text-xs sm:text-base max-w-xl leading-relaxed">
            Elevating healthspan and skin vitality through physician-formulated IV therapies, whole-body cryotherapy, and regenerative biology.
          </p>

          {/* Goal Selector */}
          <div className="pt-4 flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 font-mono mr-2">Primary Goal:</span>
            {[
              { id: 'longevity', label: 'Cellular Longevity & NAD+' },
              { id: 'glow', label: 'Collagen Radiance & Glow' },
              { id: 'recovery', label: 'Inflammation & Rapid Recovery' }
            ].map(g => (
              <button
                key={g.id}
                onClick={() => setSelectedGoal(g.id as any)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  selectedGoal === g.id
                    ? 'bg-teal-500 text-black'
                    : 'bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Protocol Menu Grid */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map(item => (
            <div
              key={item.id}
              className="bg-slate-900/90 border border-slate-800 hover:border-teal-500/40 rounded-2xl p-6 flex flex-col justify-between space-y-5 transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-teal-400 font-bold bg-teal-500/10 px-2.5 py-0.5 rounded-full border border-teal-500/20">
                    {item.category.toUpperCase()} PROTOCOL
                  </span>
                  <div className="flex items-center gap-1 text-xs text-slate-400 font-mono">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{item.duration}</span>
                  </div>
                </div>

                <h3 className="font-serif text-xl font-bold text-white">
                  {item.name}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.description}
                </p>

                <div className="space-y-1.5 pt-2 border-t border-slate-800">
                  {item.benefits.map((b, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase font-mono text-slate-500">Session Fee</div>
                  <div className="font-mono text-xl font-bold text-teal-400">${item.price}</div>
                </div>

                <button
                  onClick={() => handleBook(item)}
                  className="px-4 py-2 bg-teal-500 hover:bg-teal-400 text-black font-bold text-xs rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>Reserve Appointment</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      {bookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-5 text-slate-200">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-serif text-lg font-bold text-white">Schedule Treatment</h4>
                <p className="text-xs text-teal-400 font-mono">{activeProtocol.name}</p>
              </div>
              <button
                onClick={() => setBookingModalOpen(false)}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {booked ? (
              <div className="p-6 bg-teal-950/30 border border-teal-800/60 rounded-xl space-y-3 text-center">
                <div className="w-10 h-10 rounded-full bg-teal-500/20 text-teal-400 mx-auto flex items-center justify-center">
                  <Check className="w-5 h-5" />
                </div>
                <h5 className="font-bold text-white text-sm">Appointment Reserved!</h5>
                <p className="text-xs text-slate-300">
                  Your suite reservation for <span className="text-teal-400 font-mono">{clientDate} at {clientTime}</span> has been scheduled.
                </p>
                <button
                  onClick={() => setBookingModalOpen(false)}
                  className="mt-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold"
                >
                  Close
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setBooked(true);
                }}
                className="space-y-4 text-xs"
              >
                <div>
                  <label className="block text-slate-400 mb-1 font-mono">Date</label>
                  <input
                    type="date"
                    required
                    value={clientDate}
                    onChange={e => setClientDate(e.target.value)}
                    className="w-full bg-black border border-slate-800 rounded-lg p-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-mono">Preferred Time</label>
                  <select
                    value={clientTime}
                    onChange={e => setClientTime(e.target.value)}
                    className="w-full bg-black border border-slate-800 rounded-lg p-2.5 text-white"
                  >
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="02:30 PM">02:30 PM</option>
                    <option value="04:45 PM">04:45 PM</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-mono">Client Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Claire Dupont"
                    value={patientName}
                    onChange={e => setPatientName(e.target.value)}
                    className="w-full bg-black border border-slate-800 rounded-lg p-2.5 text-white"
                  />
                </div>

                <div className="p-3 bg-black rounded-xl border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-400">Total Treatment Fee:</span>
                  <span className="font-mono text-base font-bold text-teal-400">${activeProtocol.price}</span>
                </div>

                <button
                  type="submit"
                  className="w-full bg-teal-500 hover:bg-teal-400 text-black font-bold py-3 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Confirm Appointment Reservation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default MedSpaDemo;
