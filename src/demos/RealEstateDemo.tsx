import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Calendar, 
  Check, 
  ArrowRight, 
  X, 
  Bed, 
  Bath, 
  Maximize, 
  Clock, 
  ShieldCheck, 
  Phone,
  Filter
} from 'lucide-react';
import { Image } from '../components/Image';

interface PropertyListing {
  id: string;
  title: string;
  neighborhood: string;
  price: string;
  rawPrice: number;
  beds: number;
  baths: number;
  sqft: number;
  image: string;
  tag: string;
  description: string;
}

const PROPERTIES: PropertyListing[] = [
  {
    id: 'prop-1',
    title: 'The Glass Pavilion at Highgate',
    neighborhood: 'Highgate Ridge',
    price: '$4,850,000',
    rawPrice: 4850000,
    beds: 5,
    baths: 6,
    sqft: 6400,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    tag: 'Private Architectural Commission',
    description: 'Floor-to-ceiling minimal glazing, heated terrazzo infinity terrace, subterranean wine cellar, and panoramic city views.'
  },
  {
    id: 'prop-2',
    title: 'The Mews Courtyard Residence',
    neighborhood: 'Mayfair Central',
    price: '$3,400,000',
    rawPrice: 3400000,
    beds: 3,
    baths: 4,
    sqft: 3850,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    tag: 'Historic Restoration',
    description: 'Private gated cobblestone courtyard, smoked chevron oak floors, custom Boffi kitchen, and dual garage.'
  },
  {
    id: 'prop-3',
    title: 'Villa Solarium Waterfront',
    neighborhood: 'Chelsea Reach',
    price: '$6,200,000',
    rawPrice: 6200000,
    beds: 6,
    baths: 7,
    sqft: 7900,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    tag: 'Waterfront Sanctuary',
    description: 'Direct deep-water mooring access, triple-height atrium, rooftop garden with heated cedar plunge pool.'
  },
  {
    id: 'prop-4',
    title: 'The Kensington Penthouse & Sky Garden',
    neighborhood: 'South Kensington',
    price: '$5,150,000',
    rawPrice: 5150000,
    beds: 4,
    baths: 5,
    sqft: 4950,
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
    tag: 'Penthouse Collection',
    description: 'Direct keyed elevator entry, 360-degree skyline terraces, bespoke Calacatta marble fireplace, and 24/7 concierge.'
  }
];

export const RealEstateDemo: React.FC = () => {
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>('all');
  const [activeProperty, setActiveProperty] = useState<PropertyListing | null>(null);
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);
  const [tourDate, setTourDate] = useState('2026-11-12');
  const [tourTime, setTourTime] = useState('14:00');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [tourConfirmed, setTourConfirmed] = useState(false);

  const filtered = selectedNeighborhood === 'all'
    ? PROPERTIES
    : PROPERTIES.filter(p => p.neighborhood.toLowerCase().includes(selectedNeighborhood.toLowerCase()));

  const handleBookTour = (prop: PropertyListing) => {
    setActiveProperty(prop);
    setTourConfirmed(false);
    setIsTourModalOpen(true);
  };

  const handleConfirmTour = (e: React.FormEvent) => {
    e.preventDefault();
    setTourConfirmed(true);
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100 font-sans selection:bg-amber-600 selection:text-white">
      {/* Top Real Estate Brand Header */}
      <header className="border-b border-neutral-800 bg-neutral-950/95 sticky top-0 z-30 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 font-serif font-bold text-sm">
            K
          </div>
          <div>
            <div className="font-serif tracking-widest text-sm uppercase font-semibold text-white">
              Kensington & Co.
            </div>
            <div className="text-[10px] text-neutral-400 tracking-wider font-mono">
              Private Real Estate & Estates
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="hidden md:flex items-center gap-6 text-neutral-400">
            <span>Portfolio</span>
            <span>Private Acquisitions</span>
            <span>Advisory</span>
          </div>
          <button
            onClick={() => handleBookTour(PROPERTIES[0])}
            className="bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold px-4 py-2 rounded-lg text-xs transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Request Showing</span>
          </button>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="relative py-16 px-6 border-b border-neutral-800 bg-gradient-to-b from-neutral-950 to-neutral-900">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono">
            <span>Autumn 2026 Private Collection</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white max-w-2xl leading-tight">
            Distinguished Residences & Architectural Sanctuaries.
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base max-w-xl">
            Representing premier high-net-worth real estate. Schedule private VIP walk-throughs and review unlisted off-market opportunities.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-4">
            <span className="text-xs text-neutral-500 flex items-center gap-1 font-mono">
              <Filter className="w-3 h-3" /> Location:
            </span>
            {['all', 'Highgate', 'Mayfair', 'Chelsea', 'Kensington'].map((loc) => (
              <button
                key={loc}
                onClick={() => setSelectedNeighborhood(loc)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  selectedNeighborhood === loc
                    ? 'bg-amber-500 text-neutral-950 font-semibold'
                    : 'bg-neutral-800 text-neutral-300 hover:text-white'
                }`}
              >
                {loc === 'all' ? 'All Neighborhoods' : loc}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((prop) => (
            <div
              key={prop.id}
              className="bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden hover:border-neutral-700 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-16/10 overflow-hidden bg-neutral-800">
                  <Image
                    src={prop.image}
                    alt={prop.title}
                    fill
                    className="group-hover:scale-104 transition-transform duration-700 object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-neutral-950/80 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-mono text-amber-400 border border-neutral-800">
                    {prop.tag}
                  </div>
                  <div className="absolute bottom-4 right-4 bg-neutral-950/90 backdrop-blur-md px-3.5 py-1.5 rounded-lg font-mono text-sm font-bold text-white border border-neutral-800">
                    {prop.price}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="space-y-1">
                    <div className="text-xs font-mono text-neutral-400 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      <span>{prop.neighborhood}</span>
                    </div>
                    <h3 className="font-serif text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                      {prop.title}
                    </h3>
                  </div>

                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {prop.description}
                  </p>

                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-neutral-800/80 text-xs text-neutral-300 font-mono">
                    <div className="flex items-center gap-1.5">
                      <Bed className="w-3.5 h-3.5 text-neutral-500" />
                      <span>{prop.beds} Beds</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Bath className="w-3.5 h-3.5 text-neutral-500" />
                      <span>{prop.baths} Baths</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Maximize className="w-3.5 h-3.5 text-neutral-500" />
                      <span>{prop.sqft.toLocaleString()} sq ft</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => handleBookTour(prop)}
                  className="w-full bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700/60 font-semibold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>Book Private Showing</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Showing Schedule Modal */}
      {isTourModalOpen && activeProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-md w-full p-6 space-y-5 text-neutral-200">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-serif text-lg font-bold text-white">
                  Schedule Private Showing
                </h4>
                <p className="text-xs text-neutral-400 font-mono truncate max-w-[280px]">
                  {activeProperty.title} ({activeProperty.price})
                </p>
              </div>
              <button
                onClick={() => setIsTourModalOpen(false)}
                className="p-1 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {tourConfirmed ? (
              <div className="p-6 bg-emerald-950/30 border border-emerald-800/60 rounded-xl space-y-3 text-center">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                  <Check className="w-5 h-5" />
                </div>
                <h5 className="font-bold text-white text-sm">Showing Requested!</h5>
                <p className="text-xs text-neutral-300">
                  Our private client advisory will confirm your appointment for <span className="text-amber-400 font-mono font-bold">{tourDate}</span> at <span className="text-amber-400 font-mono font-bold">{tourTime}</span> via phone.
                </p>
                <button
                  onClick={() => setIsTourModalOpen(false)}
                  className="mt-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-semibold"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleConfirmTour} className="space-y-4 text-xs">
                <div>
                  <label className="block text-neutral-400 mb-1 font-mono">Preferred Date</label>
                  <input
                    type="date"
                    required
                    value={tourDate}
                    onChange={e => setTourDate(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1 font-mono">Preferred Time</label>
                  <select
                    value={tourTime}
                    onChange={e => setTourTime(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-white"
                  >
                    <option value="10:00">10:00 AM (Morning Natural Light)</option>
                    <option value="12:00">12:00 PM (Midday)</option>
                    <option value="14:00">02:00 PM (Afternoon)</option>
                    <option value="16:30">04:30 PM (Golden Hour Sunset)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1 font-mono">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Lady Eleanor Kensington"
                    value={clientName}
                    onChange={e => setClientName(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1 font-mono">Direct Phone (Confidential)</label>
                  <input
                    type="tel"
                    required
                    placeholder="+44 20 7946 0912"
                    value={clientPhone}
                    onChange={e => setClientPhone(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2.5 text-white"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold py-3 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <span>Confirm Confidential Showing</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default RealEstateDemo;
