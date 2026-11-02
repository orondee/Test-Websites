import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Sparkles, 
  Clock, 
  Check, 
  Plus, 
  Minus, 
  ArrowRight, 
  X, 
  Cake, 
  Heart,
  Calendar
} from 'lucide-react';
import { Image } from '../components/Image';

interface PastryItem {
  id: string;
  name: string;
  frenchName: string;
  price: number;
  description: string;
  image: string;
  badge?: string;
}

const PASTRIES: PastryItem[] = [
  {
    id: 'p1',
    name: 'Isigny Butter Croissant',
    frenchName: 'Croissant au Beurre AOP',
    price: 4.5,
    description: '72-hour laminated pastry with cultured Normandy butter and caramelized honeycomb layers.',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80',
    badge: 'Baked Fresh Hourly'
  },
  {
    id: 'p2',
    name: 'Valrhona Chocolate Pain au Chocolat',
    frenchName: 'Pain au Chocolat 70%',
    price: 5.25,
    description: 'Double batons of dark single-origin Ecuadorian dark chocolate inside flaky pastry.',
    image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=800&q=80',
    badge: 'Best Seller'
  },
  {
    id: 'p3',
    name: 'Wild Blackberry & Pistachio Tart',
    frenchName: 'Tartelette Mûre & Pistache',
    price: 7.5,
    description: 'Bronte pistachio frangipane cream, fresh forest blackberries, gold leaf flakes.',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'p4',
    name: 'Kouign-Amann Bretonne',
    frenchName: 'Kouign-Amann Traditionnel',
    price: 5.75,
    description: 'Caramelized salted butter crust with tender, melt-in-mouth laminated interior.',
    image: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&w=800&q=80',
    badge: 'Limited Batch'
  }
];

export const BakeryDemo: React.FC = () => {
  const [cart, setCart] = useState<{ [id: string]: number }>({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'pastries' | 'cake-builder'>('pastries');

  // Custom Cake Builder state
  const [cakeTiers, setCakeTiers] = useState<number>(2);
  const [cakeSponge, setCakeSponge] = useState<string>('Vanilla Bean Génoise');
  const [cakeFilling, setCakeFilling] = useState<string>('Passionfruit Curd & Swiss Buttercream');
  const [cakeInscription, setCakeInscription] = useState<string>('Happy Celebration!');
  const [cakeOrdered, setCakeOrdered] = useState(false);

  const cakePrice = cakeTiers === 1 ? 85 : cakeTiers === 2 ? 165 : 290;

  const totalCartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const totalCartPrice = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = PASTRIES.find(p => p.id === id);
    return sum + (item ? item.price * qty : 0);
  }, 0);

  const addToCart = (id: string) => {
    setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const updateCartQty = (id: string, delta: number) => {
    setCart(prev => {
      const current = prev[id] || 0;
      const next = current + delta;
      if (next <= 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: next };
    });
  };

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100 font-sans selection:bg-rose-500 selection:text-white">
      {/* Bakery Brand Header */}
      <header className="border-b border-stone-800 bg-stone-950/90 backdrop-blur-md sticky top-0 z-30 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 font-serif font-bold text-sm">
            C
          </div>
          <div>
            <div className="font-serif tracking-widest text-sm uppercase font-semibold text-white">
              Céleste Pâtisserie
            </div>
            <div className="text-[10px] text-stone-400 tracking-wider font-mono">
              Boulangerie & Custom Cakes
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-stone-800/80 p-1 rounded-lg border border-stone-700 text-xs">
            <button
              onClick={() => setActiveTab('pastries')}
              className={`px-3 py-1 rounded-md transition-colors ${
                activeTab === 'pastries' ? 'bg-rose-500 text-white font-semibold' : 'text-stone-400 hover:text-white'
              }`}
            >
              Morning Pastries
            </button>
            <button
              onClick={() => setActiveTab('cake-builder')}
              className={`px-3 py-1 rounded-md transition-colors flex items-center gap-1.5 ${
                activeTab === 'cake-builder' ? 'bg-rose-500 text-white font-semibold' : 'text-stone-400 hover:text-white'
              }`}
            >
              <Cake className="w-3 h-3" />
              <span>Bespoke Cake Builder</span>
            </button>
          </div>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 rounded-lg bg-stone-800 border border-stone-700 hover:bg-stone-700 text-white transition-colors"
            aria-label="View pre-order bag"
          >
            <ShoppingBag className="w-4 h-4" />
            {totalCartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                {totalCartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Main Tab Content */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        {activeTab === 'pastries' ? (
          <div className="space-y-8">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-rose-400">
                <Clock className="w-3.5 h-3.5" />
                <span>Next Oven Bake Batch: 07:15 AM · Pre-Orders Open</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white">
                Artisan Pastry Pre-Order Menu
              </h1>
              <p className="text-stone-400 text-sm max-w-xl">
                Reserve your favorite viennoiserie online for morning counter pickup or local delivery to ensure your morning favorites don't sell out.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {PASTRIES.map((item) => (
                <div
                  key={item.id}
                  className="bg-stone-950 border border-stone-800 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-rose-500/40 transition-colors"
                >
                  <div>
                    <div className="relative aspect-4/3 bg-stone-800 overflow-hidden">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                      {item.badge && (
                        <div className="absolute top-3 left-3 bg-rose-500 text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full">
                          {item.badge}
                        </div>
                      )}
                    </div>
                    <div className="p-5 space-y-2">
                      <div className="text-[10px] text-rose-400 font-mono italic">
                        {item.frenchName}
                      </div>
                      <h3 className="font-serif text-base font-bold text-white">
                        {item.name}
                      </h3>
                      <p className="text-xs text-stone-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0 flex items-center justify-between border-t border-stone-900 mt-2">
                    <span className="font-mono text-sm font-bold text-white">
                      ${item.price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => addToCart(item.id)}
                      className="px-3.5 py-1.5 rounded-lg bg-rose-500 hover:bg-rose-400 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Custom Cake Builder */
          <div className="max-w-3xl mx-auto space-y-8 bg-stone-950 p-8 rounded-3xl border border-stone-800">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-rose-400 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Interactive Celebration Studio</span>
              </div>
              <h2 className="font-serif text-3xl font-bold text-white">
                Bespoke Cake Customizer
              </h2>
              <p className="text-stone-400 text-xs sm:text-sm">
                Design custom tiered celebration cakes with real-time pricing and pastry chef consultation.
              </p>
            </div>

            {cakeOrdered ? (
              <div className="p-6 bg-emerald-950/30 border border-emerald-800/60 rounded-2xl text-center space-y-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                  <Check className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white text-base">Custom Cake Request Received!</h4>
                <p className="text-xs text-stone-300">
                  Chef Céleste will hand-craft your {cakeTiers}-tier {cakeSponge} cake. Estimated total: <span className="font-mono text-rose-400 font-bold">${cakePrice}</span>.
                </p>
                <button
                  onClick={() => setCakeOrdered(false)}
                  className="mt-2 px-4 py-2 bg-stone-800 hover:bg-stone-700 text-white rounded-lg text-xs"
                >
                  Configure Another Cake
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-mono text-stone-400 uppercase mb-2">
                    1. Select Tiers & Portions
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { tiers: 1, label: '1 Tier (8–12 guests)', price: '$85' },
                      { tiers: 2, label: '2 Tiers (20–30 guests)', price: '$165' },
                      { tiers: 3, label: '3 Tiers (50+ guests)', price: '$290' }
                    ].map(t => (
                      <button
                        key={t.tiers}
                        type="button"
                        onClick={() => setCakeTiers(t.tiers)}
                        className={`p-3 rounded-xl border text-left transition-colors ${
                          cakeTiers === t.tiers
                            ? 'border-rose-500 bg-rose-500/10 text-white'
                            : 'border-stone-800 bg-stone-900 text-stone-400 hover:text-white'
                        }`}
                      >
                        <div className="font-bold text-xs">{t.label}</div>
                        <div className="text-xs font-mono text-rose-400 mt-1">{t.price}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-stone-400 uppercase mb-2">
                    2. Sponge Base Flavor
                  </label>
                  <select
                    value={cakeSponge}
                    onChange={e => setCakeSponge(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl p-3 text-xs text-white"
                  >
                    <option value="Vanilla Bean Génoise">Madagascar Vanilla Bean Génoise</option>
                    <option value="Dark Chocolate Valrhona">70% Valrhona Dark Cocoa Sponge</option>
                    <option value="Sicilian Pistachio Sponge">Sicilian Roasted Pistachio Almond Cake</option>
                    <option value="Lemon Elderflower">Meyer Lemon & Elderflower Infusion</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-stone-400 uppercase mb-2">
                    3. Buttercream & Filling Infusion
                  </label>
                  <select
                    value={cakeFilling}
                    onChange={e => setCakeFilling(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl p-3 text-xs text-white"
                  >
                    <option value="Passionfruit Curd & Swiss Buttercream">Passionfruit Curd & Swiss Buttercream</option>
                    <option value="Salted Caramel & Hazelnut Praline">Salted Butter Caramel & Roasted Hazelnut Praline</option>
                    <option value="Raspberry Compote & White Chocolate">Fresh Raspberry Compote & Whipped White Chocolate</option>
                    <option value="Espresso Ganache">Caffè Mocha Espresso Ganache</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-stone-400 uppercase mb-2">
                    4. Custom Cake Inscription (Piped in Chocolate)
                  </label>
                  <input
                    type="text"
                    value={cakeInscription}
                    onChange={e => setCakeInscription(e.target.value)}
                    maxLength={32}
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl p-3 text-xs text-white font-serif"
                    placeholder="e.g. Joyeux Anniversaire Sophie!"
                  />
                </div>

                <div className="p-4 bg-stone-900 rounded-2xl border border-stone-800 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] uppercase font-mono text-stone-400">Total Price Estimate</div>
                    <div className="font-serif text-2xl font-bold text-rose-400">${cakePrice}</div>
                  </div>
                  <button
                    onClick={() => setCakeOrdered(true)}
                    className="px-6 py-3 bg-rose-500 hover:bg-rose-400 text-white font-bold rounded-xl text-xs flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <span>Reserve Custom Cake</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-stone-950 border-l border-stone-800 p-6 flex flex-col justify-between h-full text-stone-200">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-stone-800">
                <div className="flex items-center gap-2 font-serif text-lg font-bold text-white">
                  <ShoppingBag className="w-5 h-5 text-rose-500" />
                  <span>Morning Pre-Order Bag</span>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-stone-800 text-stone-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="py-4 space-y-3 max-h-[60vh] overflow-y-auto">
                {Object.keys(cart).length === 0 ? (
                  <p className="text-xs text-stone-500 text-center py-8">
                    Your pastry box is empty. Add fresh items from the menu.
                  </p>
                ) : (
                  Object.entries(cart).map(([id, qty]) => {
                    const item = PASTRIES.find(p => p.id === id);
                    if (!item) return null;
                    return (
                      <div key={id} className="flex items-center justify-between p-3 bg-stone-900 rounded-xl">
                        <div className="text-xs">
                          <div className="font-bold text-white">{item.name}</div>
                          <div className="text-rose-400 font-mono">${(item.price * qty).toFixed(2)}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateCartQty(id, -1)}
                            className="w-6 h-6 rounded bg-stone-800 flex items-center justify-center text-xs hover:bg-stone-700"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-mono">{qty}</span>
                          <button
                            onClick={() => updateCartQty(id, 1)}
                            className="w-6 h-6 rounded bg-stone-800 flex items-center justify-center text-xs hover:bg-stone-700"
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

            <div className="pt-4 border-t border-stone-800 space-y-3">
              <div className="flex justify-between items-center text-sm font-bold text-white">
                <span>Subtotal:</span>
                <span className="font-mono text-rose-400">${totalCartPrice.toFixed(2)}</span>
              </div>
              <button
                onClick={() => {
                  alert('Thank you! Your morning counter pickup is reserved.');
                  setCart({});
                  setIsCartOpen(false);
                }}
                disabled={totalCartCount === 0}
                className="w-full bg-rose-500 hover:bg-rose-400 disabled:opacity-40 text-white font-bold py-3 rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
              >
                <span>Checkout Morning Pickup</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default BakeryDemo;
