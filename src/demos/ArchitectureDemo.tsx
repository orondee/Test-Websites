import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Compass, 
  Layers, 
  ArrowUpRight, 
  X, 
  Check, 
  Send,
  Calendar,
  Sparkles,
  Maximize2
} from 'lucide-react';
import architectureHeroImg from '../assets/images/demo_architecture_villa_1793552554911.jpg';
import { Image } from '../components/Image';

interface Project {
  id: string;
  title: string;
  typology: 'residential' | 'penthouse' | 'civic';
  typologyLabel: string;
  location: string;
  year: string;
  area: string;
  materials: string[];
  summary: string;
  conceptText: string;
  specs: {
    structuralSystem: string;
    glazingType: string;
    solarRating: string;
  };
}

const PROJECTS: Project[] = [
  {
    id: 'villa-capri',
    title: 'The Cliffside Cantilever Residence',
    typology: 'residential',
    typologyLabel: 'Residential Villa',
    location: 'Costa Brava, Spain',
    year: '2025',
    area: '680 m² / 7,320 sq.ft',
    materials: ['Board-Formed White Concrete', 'Roman Travertine', 'Triple-Glazed Low-Iron Glass', 'Aged Teak Decking'],
    summary: 'A minimalist residential sanctuary projecting over limestone coastal cliffs, engineered with a 14-meter post-tensioned cantilevered terrace and infinity reflection pool.',
    conceptText: 'By anchoring the structural core directly into the geological bedrock, the upper living pavilion appears to hover weightlessly above the Mediterranean horizon, erasing boundaries between interior living and coastal wind.',
    specs: {
      structuralSystem: 'Post-tensioned reinforced architectural concrete',
      glazingType: 'Schüco structural frameless glass facade with motorized acoustic sliders',
      solarRating: 'Net Zero Operational Energy · Passivhaus Certified'
    }
  },
  {
    id: 'kanso-penthouse',
    title: 'Kanso Sky Sanctuary Penthouse',
    typology: 'penthouse',
    typologyLabel: 'Urban Penthouse',
    location: 'Tribeca, New York',
    year: '2026',
    area: '420 m² / 4,520 sq.ft',
    materials: ['Smoked French Oak', 'Honed Belgian Bluestone', 'Textured Wabi-Sabi Plaster', 'Bronzed Brass'],
    summary: 'A contemplative multi-level duplex residence atop a historic cast-iron building, integrating private bonsai reflection courtyards and skylit double-height galleries.',
    conceptText: 'Conceived as an urban retreat from the frenetic pace of Manhattan. Acoustic decoupling layers throughout ensure library-quiet ambient noise levels of under 24 dBA.',
    specs: {
      structuralSystem: 'Retrofit steel superstructure with floating acoustic floor slabs',
      glazingType: 'Acoustic laminated triple-pane curtain wall with UV solar filtering',
      solarRating: 'LEED Platinum Commercial & Residential Standard'
    }
  },
  {
    id: 'nordic-pavilion',
    title: 'Nordic Botanical Research Pavilion',
    typology: 'civic',
    typologyLabel: 'Civic & Cultural',
    location: 'Stockholm Archipelago, Sweden',
    year: '2024',
    area: '1,250 m² / 13,450 sq.ft',
    materials: ['Charred Kebony Timber', 'Local Bohus Granite', 'Zinc Standing-Seam Roof', 'Recycled Glulam Arches'],
    summary: 'A public ecological education and research pavilion immersed in coastal pine forest, designed to age gracefully into the sub-arctic maritime environment.',
    conceptText: 'Utilizing curved mass-timber glulam trusses sourced from sustainably harvested Nordic pine, the structure breathes with the seasonal climate without mechanical HVAC during summer months.',
    specs: {
      structuralSystem: 'Cross-Laminated Timber (CLT) & Mass Glulam Bents',
      glazingType: 'Double-glazed vacuum insulated glass with low solar gain coefficient',
      solarRating: 'Carbon Negative Embodied Footprint'
    }
  },
  {
    id: 'kyoto-courtyard',
    title: 'Higashiyama Contemporary Minka',
    typology: 'residential',
    typologyLabel: 'Residential Villa',
    location: 'Kyoto, Japan',
    year: '2025',
    area: '340 m² / 3,660 sq.ft',
    materials: ['Hinoki Cypress', 'Hand-split Slate', 'Washi Paper Screens', 'Darkened Steel Joinery'],
    summary: 'A discreet modern interpretation of traditional Japanese courtyard architecture, centered around an ancient weeping cherry tree and dry rock meditation garden.',
    conceptText: 'Shakkei (borrowed scenery) principles frame vistas of the eastern mountains while maintaining absolute visual privacy from the surrounding historic lane.',
    specs: {
      structuralSystem: 'Seismically isolated glulam frame with traditional mortise-and-tenon joints',
      glazingType: 'Thermally broken aluminum-clad timber sliders with concealed tracks',
      solarRating: 'CASBEE S-Class Environmental Rating'
    }
  }
];

export const ArchitectureDemo: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'residential' | 'penthouse' | 'civic'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isCommissionOpen, setIsCommissionOpen] = useState(false);
  const [commissionSubmitted, setCommissionSubmitted] = useState(false);
  
  // Commission Form State
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [projectLocation, setProjectLocation] = useState('');
  const [projectBudget, setProjectBudget] = useState('$2M – $5M');
  const [projectNotes, setProjectNotes] = useState('');

  const filteredProjects = activeFilter === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.typology === activeFilter);

  const handleCommissionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCommissionSubmitted(true);
    setTimeout(() => {
      setCommissionSubmitted(false);
      setIsCommissionOpen(false);
      setClientName('');
      setClientEmail('');
      setProjectNotes('');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#F6F5F2] text-[#1C1C1A] font-sans selection:bg-[#1C1C1A] selection:text-[#F6F5F2]">
      {/* Editorial Header */}
      <header className="border-b border-[#E3E0DA] bg-[#F6F5F2]/90 backdrop-blur sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="font-serif-luxury text-xl font-bold tracking-tight text-[#1C1C1A]">
              Vander & Kanso
            </span>
            <span className="hidden sm:inline text-xs text-[#7A7870] font-mono tracking-widest uppercase">
              / Atelier d'Architecture
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest font-medium text-[#57554E]">
            <a href="#works" className="hover:text-[#1C1C1A] transition-colors">Selected Works</a>
            <a href="#philosophy" className="hover:text-[#1C1C1A] transition-colors">Philosophy</a>
            <a href="#atelier" className="hover:text-[#1C1C1A] transition-colors">Atelier</a>
            <a href="#contact" className="hover:text-[#1C1C1A] transition-colors">Commissions</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCommissionOpen(true)}
              className="bg-[#1C1C1A] text-[#F6F5F2] hover:bg-[#33322E] px-4 py-2 rounded text-xs tracking-wider uppercase font-medium transition-colors"
            >
              Inquire Project
            </button>
          </div>
        </div>
      </header>

      {/* Hero Showcase */}
      <section className="relative border-b border-[#E3E0DA]">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="text-xs uppercase tracking-widest text-[#7A7870] font-mono">
              Zurich · Paris · Tokyo · New York
            </div>
            <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#1C1C1A] leading-[1.12]">
              Architecture of profound stillness, light, and materiality.
            </h1>
            <p className="text-[#57554E] text-base sm:text-lg max-w-xl leading-relaxed">
              We design bespoke residential villas and contemplative cultural spaces that harmonize structural rigor with natural geological landscapes.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="#works"
                className="bg-[#1C1C1A] text-[#F6F5F2] px-6 py-3 rounded text-xs uppercase tracking-widest font-medium hover:bg-[#33322E] transition-colors inline-flex items-center gap-2"
              >
                Explore Projects
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <button
                onClick={() => setIsCommissionOpen(true)}
                className="border border-[#7A7870] text-[#1C1C1A] px-5 py-3 rounded text-xs uppercase tracking-widest font-medium hover:bg-[#EAE7E0] transition-colors"
              >
                Commission Studio
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[#E3E0DA]">
              <div>
                <div className="font-serif-luxury text-2xl text-[#1C1C1A]">28</div>
                <div className="text-xs text-[#7A7870] mt-0.5">International Monograph Awards</div>
              </div>
              <div>
                <div className="font-serif-luxury text-2xl text-[#1C1C1A]">Net Zero</div>
                <div className="text-xs text-[#7A7870] mt-0.5">Carbon Operational Target</div>
              </div>
              <div>
                <div className="font-serif-luxury text-2xl text-[#1C1C1A]">100%</div>
                <div className="text-xs text-[#7A7870] mt-0.5">Custom Site-Specific Fabrication</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-lg overflow-hidden border border-[#E3E0DA] shadow-xl aspect-4/3 relative group">
              <Image
                src={architectureHeroImg}
                alt="Cliffside Cantilever Residence by Vander & Kanso"
                fill
                priority
                className="transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6">
                <div className="text-white space-y-1">
                  <div className="text-xs tracking-widest uppercase font-mono text-stone-300">Monograph Feature · 2026</div>
                  <div className="font-serif-luxury text-lg font-bold">The Cliffside Cantilever Residence</div>
                  <div className="text-xs text-stone-300">Costa Brava, Spain · Architectural Review Selection</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Selected Works Portfolio */}
      <section id="works" className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#7A7870] font-mono mb-1">
              Typology Catalog
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#1C1C1A]">
              Selected Architectural Works
            </h2>
          </div>

          {/* Filter Bar */}
          <div className="flex items-center gap-1 p-1 bg-[#ECE9E2] rounded border border-[#DDD9D0]">
            {(['all', 'residential', 'penthouse', 'civic'] as const).map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-3 py-1.5 text-xs uppercase tracking-wider font-medium rounded transition-colors ${
                  activeFilter === f
                    ? 'bg-[#1C1C1A] text-[#F6F5F2]'
                    : 'text-[#57554E] hover:text-[#1C1C1A]'
                }`}
              >
                {f === 'all' ? 'All Typologies' : f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map(proj => (
            <div
              key={proj.id}
              className="bg-white border border-[#E3E0DA] rounded-lg p-6 sm:p-8 flex flex-col justify-between hover:border-[#1C1C1A] transition-colors group cursor-pointer"
              onClick={() => setSelectedProject(proj)}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-[#7A7870] font-mono">
                  <span>{proj.typologyLabel}</span>
                  <span>{proj.location} · {proj.year}</span>
                </div>

                <h3 className="font-serif-luxury text-2xl text-[#1C1C1A] group-hover:underline">
                  {proj.title}
                </h3>

                <p className="text-xs text-[#57554E] leading-relaxed">
                  {proj.summary}
                </p>

                <div className="pt-2">
                  <div className="text-[11px] uppercase tracking-wider text-[#7A7870] font-mono mb-2">
                    Primary Materials
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.materials.map((m, idx) => (
                      <span key={idx} className="text-[11px] px-2 py-0.5 bg-[#F0EDE6] text-[#47453F] rounded">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[#F0EDE6] flex items-center justify-between text-xs">
                <span className="text-[#7A7870] font-mono">{proj.area}</span>
                <span className="font-semibold text-[#1C1C1A] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  View Blueprint & Specs
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Project Specs Drawer Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-900"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-xs font-mono uppercase tracking-widest text-[#7A7870] mb-1">
              Monograph Blueprint Specs · {selectedProject.year}
            </div>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#1C1C1A] mb-3">
              {selectedProject.title}
            </h3>
            <div className="text-xs text-[#7A7870] font-mono flex items-center gap-3 pb-4 border-b border-neutral-200">
              <span>{selectedProject.location}</span>
              <span>·</span>
              <span>{selectedProject.area}</span>
              <span>·</span>
              <span>{selectedProject.typologyLabel}</span>
            </div>

            <div className="py-6 space-y-6">
              <div>
                <h4 className="text-xs uppercase tracking-widest font-mono text-[#7A7870] mb-2">
                  Architectural Concept
                </h4>
                <p className="text-xs sm:text-sm text-[#47453F] leading-relaxed">
                  {selectedProject.conceptText}
                </p>
              </div>

              <div className="bg-[#F6F5F2] p-4 rounded-lg border border-[#E3E0DA] space-y-3">
                <div className="text-xs uppercase tracking-widest font-mono text-[#7A7870]">
                  Engineering & Structural Invariants
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="font-bold text-[#1C1C1A] block">Superstructure:</span>
                    <span className="text-neutral-600">{selectedProject.specs.structuralSystem}</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#1C1C1A] block">Acoustics & Glazing:</span>
                    <span className="text-neutral-600">{selectedProject.specs.glazingType}</span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="font-bold text-[#1C1C1A] block">Sustainability Certification:</span>
                    <span className="text-neutral-600">{selectedProject.specs.solarRating}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-widest font-mono text-[#7A7870] mb-2">
                  Curated Material Palette
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {selectedProject.materials.map((m, idx) => (
                    <div key={idx} className="p-2 border border-neutral-200 rounded text-xs text-neutral-700 flex items-center gap-2">
                      <Layers className="w-3.5 h-3.5 text-neutral-400" />
                      {m}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-200 flex items-center justify-between">
              <button
                onClick={() => {
                  setSelectedProject(null);
                  setIsCommissionOpen(true);
                }}
                className="bg-[#1C1C1A] text-white px-5 py-2.5 rounded text-xs uppercase tracking-wider font-medium hover:bg-[#33322E] transition-colors"
              >
                Inquire Similar Architectural Project
              </button>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-xs text-neutral-500 hover:text-neutral-800"
              >
                Close Spec
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Commission Inquiry Modal */}
      {isCommissionOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setIsCommissionOpen(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-900"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <Building2 className="w-5 h-5 text-[#1C1C1A]" />
              <h3 className="font-serif-luxury text-xl font-bold text-[#1C1C1A]">
                Architectural Commission Inquiry
              </h3>
            </div>
            <p className="text-xs text-[#57554E] mb-6">
              Our atelier accepts a limited number of residential and civic commissions each calendar year.
            </p>

            {commissionSubmitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-stone-100 text-[#1C1C1A] mx-auto flex items-center justify-center">
                  <Check className="w-6 h-6" />
                </div>
                <div className="font-serif-luxury text-xl font-bold">Inquiry Received</div>
                <p className="text-xs text-[#57554E] max-w-sm mx-auto">
                  Our principal partner will review your project brief and site parameters within 48 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleCommissionSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-neutral-700 block mb-1">Client / Entity Name</label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={e => setClientName(e.target.value)}
                    placeholder="e.g. Katherine Sterling"
                    className="w-full text-xs px-3 py-2 border border-neutral-300 rounded focus:outline-none focus:border-[#1C1C1A]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-neutral-700 block mb-1">Email</label>
                    <input
                      type="email"
                      required
                      value={clientEmail}
                      onChange={e => setClientEmail(e.target.value)}
                      placeholder="katherine@example.com"
                      className="w-full text-xs px-3 py-2 border border-neutral-300 rounded focus:outline-none focus:border-[#1C1C1A]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-neutral-700 block mb-1">Project Site / City</label>
                    <input
                      type="text"
                      required
                      value={projectLocation}
                      onChange={e => setProjectLocation(e.target.value)}
                      placeholder="e.g. Aspen, Colorado"
                      className="w-full text-xs px-3 py-2 border border-neutral-300 rounded focus:outline-none focus:border-[#1C1C1A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-700 block mb-1">Anticipated Construction Budget</label>
                  <select
                    value={projectBudget}
                    onChange={e => setProjectBudget(e.target.value)}
                    className="w-full text-xs px-3 py-2 border border-neutral-300 rounded focus:outline-none focus:border-[#1C1C1A]"
                  >
                    <option>$1.5M – $3.0M</option>
                    <option>$3.0M – $7.0M</option>
                    <option>$7.0M+ Private Estate</option>
                    <option>Civic / Cultural Institutional</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-700 block mb-1">Site Overview & Program Vision</label>
                  <textarea
                    rows={3}
                    value={projectNotes}
                    onChange={e => setProjectNotes(e.target.value)}
                    placeholder="Describe topography, desired square footage, timeline..."
                    className="w-full text-xs px-3 py-2 border border-neutral-300 rounded focus:outline-none focus:border-[#1C1C1A]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-[#1C1C1A] text-white py-2.5 rounded text-xs uppercase tracking-wider font-semibold hover:bg-[#33322E] transition-colors"
                  >
                    Transmit Commission Brief
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-[#E3E0DA] bg-[#1C1C1A] text-[#9E9B92] py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs">
          <div className="flex items-center gap-3">
            <span className="font-serif-luxury text-base text-[#F6F5F2]">Vander & Kanso</span>
            <span>·</span>
            <span>Atelier d'Architecture</span>
          </div>
          <div>© 2026 Vander & Kanso Architecture Atelier. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
};
