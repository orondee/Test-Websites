import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Coffee, 
  Clock, 
  MapPin, 
  Calendar, 
  Plus, 
  Minus, 
  Check, 
  Sparkles,
  ArrowRight,
  X,
  CreditCard
} from 'lucide-react';
import coffeeHeroImg from '../assets/images/demo_coffee_roastery_1793552553944.jpg';

interface CoffeeProduct {
  id: string;
  name: string;
  roast: 'light' | 'medium' | 'dark' | 'espresso';
  roastLabel: string;
  origin: string;
  tastingNotes: string[];
  process: string;
  price: number;
  weight: string;
}

const PRODUCTS: CoffeeProduct[] = [
  {
    id: 'c1',
    name: 'Guji Hambela Blossom',
    roast: 'light',
    roastLabel: 'Light Filter Roast',
    origin: 'Oromia, Ethiopia · 2,100m',
    tastingNotes: ['Bergamot', 'Jasmine', 'Honey Peach'],
    process: 'Natural Anaerobic',
    price: 22,
    weight: '250g'
  },
  {
    id: 'c2',
    name: 'Huila Supremo Reserve',
    roast: 'medium',
    roastLabel: 'Medium Omniroast',
    origin: 'San Agustin, Colombia · 1,850m',
    tastingNotes: ['Toasted Pecan', 'Red Apple', 'Brown Sugar'],
    process: 'Washed Extended Ferment',
    price: 20,
    weight: '250g'
  },
  {
    id: 'c3',
    name: 'Antigua Valley Bourbon',
    roast: 'medium',
    roastLabel: 'Medium-Dark Espresso',
    origin: 'Sacatepéquez, Guatemala · 1,600m',
    tastingNotes: ['Dark Cocoa', 'Blood Orange', 'Caramel'],
    process: 'Classic Washed',
    price: 19,
    weight: '250g'
  },
  {
    id: 'c4',
    name: 'Nyeri Peaberry Reserve',
    roast: 'light',
    roastLabel: 'Light Filter Roast',
    origin: 'Mount Kenya, Kenya · 1,950m',
    tastingNotes: ['Blackcurrant', 'Grapefruit', 'Cane Sugar'],
    process: 'Double Washed',
    price: 24,
    weight: '250g'
  },
  {
    id: 'c5',
    name: 'Midnight Velvet Espresso',
    roast: 'dark',
    roastLabel: 'Dark Espresso Roast',
    origin: 'Sumatra & Brazil Blend',
    tastingNotes: ['Smoked Molasses', 'Dark Truffle', 'Cacao'],
    process: 'Wet-Hulled & Natural',
    price: 18,
    weight: '300g'
  },
  {
    id: 'c6',
    name: 'Chiapas Highlands Micro-Lot',
    roast: 'medium',
    roastLabel: 'Medium Roast',
    origin: 'Chiapas, Mexico · 1,700m',
    tastingNotes: ['Pecan Praline', 'Sweet Cinnamon', 'Milk Chocolate'],
    process: 'Honey Process',
    price: 21,
    weight: '250g'
  }
];

export const CoffeeDemo: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'light' | 'medium' | 'dark'>('all');
  const [cart, setCart] = useState<{ [id: string]: number }>({ 'c1': 1 });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutSuccess, setIsCheckoutSuccess] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  
  // Subscription simulator
  const [subGrind, setSubGrind] = useState('Whole Bean');
  const [subFreq, setSubFreq] = useState('Every 2 Weeks');
  const [subBags, setSubBags] = useState(2);
  const [subSubscribed, setSubSubscribed] = useState(false);

  // Reservation Form State
  const [bookingName, setBookingName] = useState('');
  const [bookingDate, setBookingDate] = useState('2026-11-05');
  const [bookingGuests, setBookingGuests] = useState('2 Guests');

  const filteredProducts = activeFilter === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.roast === activeFilter || (activeFilter === 'dark' && p.roast === 'espresso'));

  const addToCart = (id: string) => {
    setCart(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => {
      const current = prev[id] || 0;
      const updated = current + delta;
      if (updated <= 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: updated };
    });
  };

  const cartItemsCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartSubtotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = PRODUCTS.find(p => p.id === id);
    return sum + (item ? item.price * qty : 0);
  }, 0);

  const handleCheckout = () => {
    setIsCheckoutSuccess(true);
    setTimeout(() => {
      setCart({});
      setIsCheckoutSuccess(false);
      setIsCartOpen(false);
    }, 2800);
  };

  const handleBookTable = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setIsBookingOpen(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2C241E] font-sans selection:bg-[#4A3B32] selection:text-[#FDFBF7]">
      {/* Top Notice */}
      <div className="bg-[#2C241E] text-[#F3ECE4] text-xs py-2 px-4 text-center tracking-wide font-medium flex items-center justify-center gap-2">
        <span>Fresh Batch Roasted Daily in Brooklyn, NY</span>
        <span aria-hidden="true">·</span>
        <span>Complimentary Carbon-Neutral Shipping on orders over $45</span>
      </div>

      {/* Navigation */}
      <header className="border-b border-[#E8DFD5] bg-[#FDFBF7]/90 backdrop-blur sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#4A3B32] text-[#FDFBF7] flex items-center justify-center font-bold text-sm">
              BO
            </span>
            <div className="flex flex-col">
              <span className="font-serif-luxury font-bold text-lg tracking-tight text-[#2C241E]">
                Brew & Origin
              </span>
              <span className="text-[11px] text-[#7D6B5D] tracking-wider uppercase">Small Batch Roasters</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#5A4C40]">
            <a href="#coffees" className="hover:text-[#2C241E] transition-colors">Single Origins</a>
            <a href="#subscription" className="hover:text-[#2C241E] transition-colors">Coffee Club</a>
            <a href="#cafe" className="hover:text-[#2C241E] transition-colors">Tasting Room</a>
            <a href="#sourcing" className="hover:text-[#2C241E] transition-colors">Ethical Sourcing</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsBookingOpen(true)}
              className="hidden sm:inline-flex text-xs font-semibold px-3 py-2 border border-[#4A3B32] text-[#4A3B32] rounded hover:bg-[#4A3B32] hover:text-[#FDFBF7] transition-colors"
            >
              Book Tasting
            </button>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded bg-[#4A3B32] text-[#FDFBF7] hover:bg-[#382B24] transition-colors flex items-center gap-2 text-xs font-medium"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
              {cartItemsCount > 0 && (
                <span className="bg-[#D97706] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative border-b border-[#E8DFD5] overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-medium text-[#7D6B5D] tracking-wide">
              <span>Harvest 2026 Direct Micro-Lots</span>
              <span aria-hidden="true">·</span>
              <span>100% Arabica Specialty Grade</span>
            </div>
            <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#2C241E] leading-[1.15]">
              Coffee crafted for those who taste the subtleties.
            </h1>
            <p className="text-[#5A4C40] text-base sm:text-lg max-w-xl leading-relaxed">
              We source single-origin coffees directly from smallholder partner farms across Ethiopia, Colombia, and Guatemala. Roasted weekly in small batches on our restored vintage cast-iron roaster.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#coffees"
                className="inline-flex items-center gap-2 bg-[#2C241E] text-[#FDFBF7] px-6 py-3.5 rounded text-sm font-semibold hover:bg-[#4A3B32] transition-colors shadow-sm"
              >
                Explore Current Harvest
                <ArrowRight className="w-4 h-4" />
              </a>
              <button
                onClick={() => setIsBookingOpen(true)}
                className="inline-flex items-center gap-2 border border-[#B3A192] text-[#2C241E] px-5 py-3.5 rounded text-sm font-semibold hover:bg-[#F3ECE4] transition-colors"
              >
                <Calendar className="w-4 h-4 text-[#7D6B5D]" />
                Reserve Tasting Table
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[#E8DFD5]">
              <div>
                <div className="font-serif-luxury text-2xl font-bold text-[#2C241E]">88.5+</div>
                <div className="text-xs text-[#7D6B5D] mt-0.5">SCA Cupping Score</div>
              </div>
              <div>
                <div className="font-serif-luxury text-2xl font-bold text-[#2C241E]">48 Hrs</div>
                <div className="text-xs text-[#7D6B5D] mt-0.5">Roast to Doorstep</div>
              </div>
              <div>
                <div className="font-serif-luxury text-2xl font-bold text-[#2C241E]">3.2x</div>
                <div className="text-xs text-[#7D6B5D] mt-0.5">Fair Trade Floor Pay</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-lg overflow-hidden border border-[#E8DFD5] shadow-lg aspect-4/3 bg-[#E8DFD5]">
              <img
                src={coffeeHeroImg}
                alt="Brew & Origin Roastery bar and espresso bar"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                <div className="text-white space-y-1">
                  <div className="text-xs font-semibold tracking-wider uppercase text-amber-200">Flagship Roastery</div>
                  <div className="text-sm font-medium">142 Wythe Avenue, Williamsburg, Brooklyn</div>
                  <div className="text-xs text-neutral-300">Open Daily 7:00 AM – 6:00 PM</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coffee Catalog */}
      <section id="coffees" className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs font-semibold tracking-wider uppercase text-[#7D6B5D] mb-1">
              Current Micro-Lots
            </div>
            <h2 className="font-serif-luxury text-3xl font-bold text-[#2C241E]">
              Freshly Roasted Beans
            </h2>
            <p className="text-sm text-[#5A4C40] mt-1 max-w-md">
              Each lot is cupped, profiled, and hand-packaged in recyclable nitrogen-flushed bags.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-[#EFE9DF] rounded border border-[#E0D5C7]">
            {(['all', 'light', 'medium', 'dark'] as const).map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                  activeFilter === filter
                    ? 'bg-[#2C241E] text-[#FDFBF7] shadow-sm'
                    : 'text-[#5A4C40] hover:text-[#2C241E]'
                }`}
              >
                {filter === 'all' ? 'All Beans' : `${filter.charAt(0).toUpperCase() + filter.slice(1)} Roast`}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="bg-white border border-[#E8DFD5] rounded-lg p-6 flex flex-col justify-between hover:shadow-md transition-shadow group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-[#7D6B5D]">
                  <span>{product.roastLabel}</span>
                  <span className="font-mono">{product.weight}</span>
                </div>

                <div>
                  <h3 className="font-serif-luxury text-xl font-bold text-[#2C241E] group-hover:text-[#8C5E38] transition-colors">
                    {product.name}
                  </h3>
                  <div className="text-xs text-[#7D6B5D] flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3 text-[#A89280]" />
                    <span>{product.origin}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="text-xs text-[#7D6B5D] mb-1.5">Tasting Notes:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {product.tastingNotes.map((note, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2.5 py-1 bg-[#F5EFE6] text-[#4A3B32] rounded font-medium"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-xs text-[#7D6B5D] pt-1">
                  <span className="font-medium text-[#4A3B32]">Process:</span> {product.process}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[#F0E8DC] flex items-center justify-between">
                <div>
                  <div className="text-lg font-bold text-[#2C241E] font-mono">${product.price}.00</div>
                  <div className="text-[11px] text-emerald-700 font-medium">In Stock · Ships in 24h</div>
                </div>
                <button
                  onClick={() => addToCart(product.id)}
                  className="bg-[#2C241E] hover:bg-[#4A3B32] text-[#FDFBF7] px-4 py-2 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Subscription Club Simulator */}
      <section id="subscription" className="border-y border-[#E8DFD5] bg-[#F5EFE6] py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center space-y-2 mb-10">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#7D6B5D]">
              Never Run Out of Exceptional Coffee
            </span>
            <h2 className="font-serif-luxury text-3xl font-bold text-[#2C241E]">
              The Roaster's Club Subscription
            </h2>
            <p className="text-sm text-[#5A4C40] max-w-xl mx-auto">
              Curated seasonal releases delivered automatically to your door. Save 15% on every bag, swap beans anytime, cancel with 1 click.
            </p>
          </div>

          <div className="bg-white border border-[#E8DFD5] rounded-xl p-8 shadow-sm space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Grind Selector */}
              <div>
                <label className="text-xs font-bold text-[#4A3B32] uppercase tracking-wider block mb-2">
                  1. Choose Grind
                </label>
                <div className="space-y-2">
                  {['Whole Bean', 'Filter / Chemex', 'Espresso Grind'].map(grind => (
                    <button
                      key={grind}
                      onClick={() => setSubGrind(grind)}
                      className={`w-full text-left px-3 py-2 text-xs rounded border transition-colors ${
                        subGrind === grind
                          ? 'border-[#2C241E] bg-[#2C241E] text-white font-semibold'
                          : 'border-[#E0D5C7] text-[#5A4C40] hover:border-[#2C241E]'
                      }`}
                    >
                      {grind}
                    </button>
                  ))}
                </div>
              </div>

              {/* Frequency */}
              <div>
                <label className="text-xs font-bold text-[#4A3B32] uppercase tracking-wider block mb-2">
                  2. Delivery Cadence
                </label>
                <div className="space-y-2">
                  {['Every Week', 'Every 2 Weeks', 'Every Month'].map(freq => (
                    <button
                      key={freq}
                      onClick={() => setSubFreq(freq)}
                      className={`w-full text-left px-3 py-2 text-xs rounded border transition-colors ${
                        subFreq === freq
                          ? 'border-[#2C241E] bg-[#2C241E] text-white font-semibold'
                          : 'border-[#E0D5C7] text-[#5A4C40] hover:border-[#2C241E]'
                      }`}
                    >
                      {freq}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="text-xs font-bold text-[#4A3B32] uppercase tracking-wider block mb-2">
                  3. Quantity Per Shipment
                </label>
                <div className="space-y-2">
                  {[1, 2, 3].map(bags => (
                    <button
                      key={bags}
                      onClick={() => setSubBags(bags)}
                      className={`w-full text-left px-3 py-2 text-xs rounded border transition-colors ${
                        subBags === bags
                          ? 'border-[#2C241E] bg-[#2C241E] text-white font-semibold'
                          : 'border-[#E0D5C7] text-[#5A4C40] hover:border-[#2C241E]'
                      }`}
                    >
                      {bags} {bags === 1 ? 'Bag' : 'Bags'} ({bags * 250}g) · 15% off
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-[#F0E8DC] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-xs text-[#7D6B5D]">
                  Estimated investment per shipment ({subBags} bags · {subFreq})
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-2xl font-bold text-[#2C241E]">
                    ${Math.round(subBags * 18.7)}
                  </span>
                  <span className="text-xs line-through text-[#A89280]">
                    ${subBags * 22}
                  </span>
                  <span className="text-xs text-emerald-700 font-semibold">Free US Shipping</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setSubSubscribed(true);
                  setTimeout(() => setSubSubscribed(false), 3000);
                }}
                disabled={subSubscribed}
                className="w-full sm:w-auto bg-[#4A3B32] hover:bg-[#2C241E] text-white px-6 py-3 rounded text-sm font-semibold transition-colors flex items-center justify-center gap-2"
              >
                {subSubscribed ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    Subscription Started!
                  </>
                ) : (
                  <>
                    <Coffee className="w-4 h-4" />
                    Activate Coffee Subscription
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between p-6">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#4A3B32]" />
                  <h3 className="font-serif-luxury font-bold text-lg text-[#2C241E]">Your Coffee Cart</h3>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1 rounded text-neutral-400 hover:text-neutral-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="py-4 space-y-4 max-h-[60vh] overflow-y-auto">
                {Object.keys(cart).length === 0 ? (
                  <div className="py-12 text-center text-sm text-neutral-500">
                    Your cart is empty. Add a freshly roasted micro-lot!
                  </div>
                ) : (
                  Object.entries(cart).map(([id, qty]) => {
                    const item = PRODUCTS.find(p => p.id === id);
                    if (!item) return null;
                    return (
                      <div key={id} className="flex items-center justify-between gap-4 py-3 border-b border-neutral-100">
                        <div className="space-y-0.5">
                          <div className="font-medium text-sm text-[#2C241E]">{item.name}</div>
                          <div className="text-xs text-[#7D6B5D]">{item.roastLabel} · 250g</div>
                          <div className="font-mono text-xs font-semibold text-[#4A3B32]">
                            ${item.price}.00 each
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(id, -1)}
                            className="w-7 h-7 rounded border border-neutral-200 flex items-center justify-center text-neutral-600 hover:bg-neutral-50"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-mono font-bold">{qty}</span>
                          <button
                            onClick={() => updateQuantity(id, 1)}
                            className="w-7 h-7 rounded border border-neutral-200 flex items-center justify-center text-neutral-600 hover:bg-neutral-50"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="border-t border-neutral-200 pt-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-600">Subtotal</span>
                <span className="font-mono font-bold text-base text-[#2C241E]">
                  ${cartSubtotal}.00
                </span>
              </div>
              <div className="text-xs text-neutral-500 flex items-center justify-between">
                <span>Shipping</span>
                <span>{cartSubtotal >= 45 ? 'Free' : '$4.95'}</span>
              </div>

              {isCheckoutSuccess ? (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-center text-xs text-emerald-800 font-medium">
                  Order Placed! Thank you for supporting direct-trade coffee.
                </div>
              ) : (
                <button
                  onClick={handleCheckout}
                  disabled={cartItemsCount === 0}
                  className="w-full bg-[#2C241E] hover:bg-[#4A3B32] disabled:opacity-40 text-white py-3 rounded text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <CreditCard className="w-4 h-4" />
                  Proceed to Checkout (${cartSubtotal >= 45 ? cartSubtotal : cartSubtotal + 4.95})
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tasting Room Booking Modal */}
      {isBookingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setIsBookingOpen(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded bg-[#F5EFE6] flex items-center justify-center text-[#4A3B32]">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif-luxury font-bold text-lg text-[#2C241E]">Tasting Room Reservation</h3>
                <div className="text-xs text-[#7D6B5D]">Brooklyn Roastery & Bar</div>
              </div>
            </div>

            {bookingSuccess ? (
              <div className="py-8 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                  <Check className="w-6 h-6" />
                </div>
                <div className="font-bold text-[#2C241E]">Table Reserved!</div>
                <div className="text-xs text-neutral-600">
                  We look forward to hosting you on {bookingDate}. A confirmation has been logged.
                </div>
              </div>
            ) : (
              <form onSubmit={handleBookTable} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-neutral-700 block mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={bookingName}
                    onChange={e => setBookingName(e.target.value)}
                    placeholder="e.g. Jordan Smith"
                    className="w-full text-xs px-3 py-2 border border-neutral-300 rounded focus:outline-none focus:border-[#4A3B32]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-neutral-700 block mb-1">Preferred Date</label>
                    <input
                      type="date"
                      required
                      value={bookingDate}
                      onChange={e => setBookingDate(e.target.value)}
                      className="w-full text-xs px-3 py-2 border border-neutral-300 rounded focus:outline-none focus:border-[#4A3B32]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-neutral-700 block mb-1">Party Size</label>
                    <select
                      value={bookingGuests}
                      onChange={e => setBookingGuests(e.target.value)}
                      className="w-full text-xs px-3 py-2 border border-neutral-300 rounded focus:outline-none focus:border-[#4A3B32]"
                    >
                      <option>1 Guest</option>
                      <option>2 Guests</option>
                      <option>3–4 Guests</option>
                      <option>5+ Private Cupping</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-[#2C241E] hover:bg-[#4A3B32] text-white py-2.5 rounded text-xs font-semibold transition-colors"
                  >
                    Confirm Tasting Reservation
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-[#E8DFD5] bg-[#2C241E] text-[#C2B5A8] py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs">
          <div className="flex items-center gap-3">
            <span className="font-serif-luxury text-base font-bold text-[#FDFBF7]">Brew & Origin</span>
            <span>·</span>
            <span>Brooklyn, NY</span>
          </div>
          <div className="flex gap-6">
            <span>Hours: Mon–Sun 7am–6pm</span>
            <span>orders@brewandorigin.co</span>
          </div>
          <div>© 2026 Brew & Origin Roasters. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
};
