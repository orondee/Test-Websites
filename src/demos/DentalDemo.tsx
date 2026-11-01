import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  Star, 
  ShieldCheck, 
  Award, 
  X,
  Phone,
  User,
  ArrowRight
} from 'lucide-react';

interface ServiceItem {
  id: string;
  name: string;
  category: string;
  duration: string;
  startingPrice: string;
  description: string;
}

const SERVICES: ServiceItem[] = [
  {
    id: 'veneers',
    name: 'Handcrafted Porcelain Veneers',
    category: 'Cosmetic',
    duration: '2 appointments',
    startingPrice: '$1,400 / tooth',
    description: 'Ultra-thin, custom-sculpted ceramic veneers designed to optimize dental symmetry, shade, and contour with minimal enamel reduction.'
  },
  {
    id: 'invisalign',
    name: 'Invisalign® Clear Aligners',
    category: 'Orthodontics',
    duration: '4–12 months',
    startingPrice: '$3,800 full treatment',
    description: 'Digitally planned, discreet tooth straightening powered by iTero 3D intraoral optical scanning.'
  },
  {
    id: 'whitening',
    name: 'Laser Enamel Whitening',
    category: 'Aesthetics',
    duration: '60 minutes',
    startingPrice: '$450 in-office',
    description: 'Cold-light laser activation lifting up to 8 shades of deep extrinsic stains with zero post-treatment sensitivity.'
  },
  {
    id: 'exam',
    name: 'Comprehensive Oral & Facial Health Exam',
    category: 'Preventative',
    duration: '75 minutes',
    startingPrice: '$280 (Insurance accepted)',
    description: '3D CBCT digital imaging, periodontal screening, oral cancer scan, and personalized aesthetic roadmap.'
  }
];

const DOCTORS = [
  {
    id: 'dr-vance',
    name: 'Dr. Elena Vance, DDS',
    title: 'Lead Cosmetic & Restorative Surgeon',
    credentials: 'Columbia University School of Dental Medicine · AACD Accredited Fellow',
    specialty: 'Smile Design & Porcelain Artistry'
  },
  {
    id: 'dr-chen',
    name: 'Dr. Julian Chen, DMD, MS',
    title: 'Orthodontic & Facial Aesthetics Director',
    credentials: 'Harvard School of Dental Medicine · Diamond Plus Invisalign Provider',
    specialty: 'Digital Orthodontics & Airway Alignment'
  }
];

export const DentalDemo: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedService, setSelectedService] = useState(SERVICES[0].id);
  const [selectedDoctor, setSelectedDoctor] = useState(DOCTORS[0].id);
  const [selectedDate, setSelectedDate] = useState('2026-11-06');
  const [selectedTime, setSelectedTime] = useState('10:30 AM');
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientNotes, setPatientNotes] = useState('');
  const [isBooked, setIsBooked] = useState(false);

  // Before / After Slider Position (0 to 100)
  const [sliderPos, setSliderPos] = useState(50);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooked(true);
  };

  const resetBooking = () => {
    setIsBooked(false);
    setBookingStep(1);
    setIsBookingOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#1E262B] font-sans selection:bg-[#2A383F] selection:text-[#FBF9F5]">
      {/* Top Bar Banner */}
      <div className="bg-[#1E262B] text-[#E2ECEF] text-xs py-2 px-4 text-center font-medium flex items-center justify-center gap-2">
        <span>Beverly Hills & Manhattan Clinics</span>
        <span aria-hidden="true">·</span>
        <span>Welcoming New Patients · Direct Private Insurance Billing</span>
      </div>

      {/* Header */}
      <header className="border-b border-[#E6E1D8] bg-[#FBF9F5]/90 backdrop-blur sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#2A383F] text-[#FBF9F5] flex items-center justify-center font-bold text-sm">
              A
            </span>
            <div className="flex flex-col">
              <span className="font-serif-luxury font-bold text-lg tracking-tight text-[#1E262B]">
                Aura Aesthetics
              </span>
              <span className="text-[10px] text-[#718087] tracking-wider uppercase">Dental & Facial Studio</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#4D5A60]">
            <a href="#services" className="hover:text-[#1E262B] transition-colors">Treatments</a>
            <a href="#transformations" className="hover:text-[#1E262B] transition-colors">Smile Transformations</a>
            <a href="#doctors" className="hover:text-[#1E262B] transition-colors">Specialists</a>
            <a href="#financing" className="hover:text-[#1E262B] transition-colors">Fees & Financing</a>
          </nav>

          <div className="flex items-center gap-3">
            <a href="tel:3105550192" className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#4D5A60] hover:text-[#1E262B] font-medium">
              <Phone className="w-3.5 h-3.5" />
              (310) 555-0192
            </a>
            <button
              onClick={() => {
                setBookingStep(1);
                setIsBooked(false);
                setIsBookingOpen(true);
              }}
              className="bg-[#2A383F] hover:bg-[#1B2428] text-white text-xs font-semibold px-4 py-2 rounded-md transition-colors shadow-xs"
            >
              Book Consultation
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative border-b border-[#E6E1D8] overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-medium text-[#718087] tracking-wide">
              <span>AACD Accredited Cosmetic Facility</span>
              <span aria-hidden="true">·</span>
              <span>Minimally Invasive Dentistry</span>
            </div>
            <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1E262B] leading-[1.15]">
              Dentistry elevated to an architectural fine art.
            </h1>
            <p className="text-[#4D5A60] text-base sm:text-lg max-w-xl leading-relaxed">
              We blend advanced digital 3D facial modeling with custom hand-layered ceramics to design natural, harmonious smiles that reflect your individual character.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => {
                  setBookingStep(1);
                  setIsBookingOpen(true);
                }}
                className="inline-flex items-center gap-2 bg-[#2A383F] text-white px-6 py-3.5 rounded-md text-sm font-semibold hover:bg-[#1B2428] transition-colors shadow-sm"
              >
                Schedule Aesthetic Consultation
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="#transformations"
                className="inline-flex items-center gap-2 border border-[#C5BFB5] text-[#1E262B] px-5 py-3.5 rounded-md text-sm font-semibold hover:bg-[#F2EEE7] transition-colors"
              >
                View Patient Gallery
              </a>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[#E6E1D8]">
              <div>
                <div className="font-serif-luxury text-2xl font-bold text-[#1E262B]">2,400+</div>
                <div className="text-xs text-[#718087] mt-0.5">Smiles Transformed</div>
              </div>
              <div>
                <div className="font-serif-luxury text-2xl font-bold text-[#1E262B]">15 Years</div>
                <div className="text-xs text-[#718087] mt-0.5">Porcelain Veneer Warranty</div>
              </div>
              <div>
                <div className="font-serif-luxury text-2xl font-bold text-[#1E262B]">5.0 ★</div>
                <div className="text-xs text-[#718087] mt-0.5">380+ Verified Reviews</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-lg overflow-hidden border border-[#E6E1D8] shadow-lg aspect-4/3 bg-[#E6E1D8]">
              <img
                src="/src/assets/images/demo_dental_clinic_1793552553382.jpg"
                alt="Aura Dental clinic lounge and aesthetic reception"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section id="services" className="max-w-6xl mx-auto px-6 py-16">
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-semibold tracking-wider uppercase text-[#718087] mb-1">
            Clinical Care & Aesthetics
          </div>
          <h2 className="font-serif-luxury text-3xl font-bold text-[#1E262B]">
            Our Signature Treatments
          </h2>
          <p className="text-sm text-[#4D5A60] mt-1">
            Every procedure is planned using 3D intraoral digital scanners and bespoke mockups prior to treatment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map(service => (
            <div
              key={service.id}
              className="bg-white border border-[#E6E1D8] rounded-lg p-6 flex flex-col justify-between hover:border-[#2A383F] transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-[#718087]">
                  <span className="font-medium text-[#2A383F]">{service.category}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {service.duration}
                  </span>
                </div>

                <h3 className="font-serif-luxury text-xl font-bold text-[#1E262B]">
                  {service.name}
                </h3>

                <p className="text-xs text-[#4D5A60] leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#F0EBE3] flex items-center justify-between">
                <div>
                  <div className="text-xs text-[#718087]">Starting Investment</div>
                  <div className="text-sm font-bold font-mono text-[#1E262B]">{service.startingPrice}</div>
                </div>
                <button
                  onClick={() => {
                    setSelectedService(service.id);
                    setBookingStep(1);
                    setIsBookingOpen(true);
                  }}
                  className="text-xs font-semibold text-[#2A383F] hover:text-[#1B2428] flex items-center gap-1 border-b border-[#2A383F] pb-0.5"
                >
                  Book Treatment
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Transformation Slider */}
      <section id="transformations" className="border-y border-[#E6E1D8] bg-[#F2EEE7] py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center space-y-2 mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#718087]">
              Clinical Case Study #409
            </span>
            <h2 className="font-serif-luxury text-3xl font-bold text-[#1E262B]">
              Interactive Smile Transformation
            </h2>
            <p className="text-sm text-[#4D5A60] max-w-md mx-auto">
              Drag the interactive slider below to inspect the restorative smile alignment and ceramic shading.
            </p>
          </div>

          <div className="bg-white border border-[#E6E1D8] rounded-xl p-6 shadow-sm">
            {/* Simulation Canvas with Before & After views */}
            <div className="relative h-72 sm:h-96 rounded-lg overflow-hidden select-none bg-neutral-900">
              {/* After Image Layer (Underneath) */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-50 to-stone-100 flex items-center justify-center p-8">
                <div className="text-center space-y-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    After: 8 Porcelain Veneers (Shade BL2, Natural Translucency)
                  </div>
                  <div className="font-serif-luxury text-2xl font-bold text-neutral-800">
                    Harmonious Arch Symmetry & Brightness
                  </div>
                  <p className="text-xs text-neutral-600 max-w-sm mx-auto">
                    Restored incisal length, closed diastema gaps, optimized lip dynamics.
                  </p>
                </div>
              </div>

              {/* Before Layer (Clipped by slider position) */}
              <div 
                className="absolute inset-y-0 left-0 overflow-hidden bg-gradient-to-r from-stone-200 to-amber-100 flex items-center justify-center p-8 border-r-2 border-white shadow-xl"
                style={{ width: `${sliderPos}%` }}
              >
                <div className="text-center space-y-3 min-w-[320px]">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-200 text-neutral-800 text-xs font-semibold rounded">
                    Before: Enamel Discoloration & Minor Crowding
                  </div>
                  <div className="font-serif-luxury text-2xl font-bold text-neutral-700">
                    Pre-Op Clinical State
                  </div>
                  <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                    Wear attrition on incisors, extrinsic staining, uneven gum line.
                  </p>
                </div>
              </div>

              {/* Visual Divider Thumb */}
              <div 
                className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg pointer-events-none"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#2A383F] text-white flex items-center justify-center shadow-md text-[10px] font-bold">
                  ↔
                </div>
              </div>
            </div>

            {/* Slider Control */}
            <div className="mt-6 flex items-center gap-4">
              <span className="text-xs font-bold text-neutral-500">Before</span>
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPos}
                onChange={e => setSliderPos(Number(e.target.value))}
                className="w-full accent-[#2A383F] cursor-pointer"
              />
              <span className="text-xs font-bold text-[#2A383F]">After</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Step Booking Wizard Modal */}
      {isBookingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={resetBooking}
              className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-700"
            >
              <X className="w-5 h-5" />
            </button>

            {isBooked ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif-luxury font-bold text-2xl text-[#1E262B]">
                  Consultation Confirmed!
                </h3>
                <p className="text-sm text-[#4D5A60] max-w-md mx-auto">
                  Thank you, <span className="font-semibold">{patientName || 'valued patient'}</span>. Your appointment has been scheduled for <span className="font-semibold">{selectedDate}</span> at <span className="font-semibold">{selectedTime}</span> with <span className="font-semibold">{DOCTORS.find(d => d.id === selectedDoctor)?.name}</span>.
                </p>
                <div className="bg-[#FBF9F5] p-4 rounded-lg border border-[#E6E1D8] text-xs text-neutral-600 space-y-1">
                  <div>Clinic Address: 450 N Bedford Drive, Suite 300, Beverly Hills, CA</div>
                  <div>Reference ID: <span className="font-mono font-bold">AUR-2026-9812</span></div>
                </div>
                <button
                  onClick={resetBooking}
                  className="bg-[#2A383F] text-white px-6 py-2.5 rounded text-xs font-semibold hover:bg-[#1B2428] transition-colors"
                >
                  Done
                </button>
              </div>
            ) : (
              <div>
                {/* Wizard Steps indicator */}
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-neutral-200">
                  <div className="text-xs font-bold text-[#718087] uppercase tracking-wider">
                    Step {bookingStep} of 4: {
                      bookingStep === 1 ? 'Select Treatment' :
                      bookingStep === 2 ? 'Select Doctor' :
                      bookingStep === 3 ? 'Choose Date & Time' : 'Patient Information'
                    }
                  </div>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4].map(step => (
                      <div
                        key={step}
                        className={`w-2.5 h-2.5 rounded-full ${
                          step === bookingStep ? 'bg-[#2A383F]' : step < bookingStep ? 'bg-emerald-600' : 'bg-neutral-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Step 1: Service */}
                {bookingStep === 1 && (
                  <div className="space-y-4">
                    <h4 className="font-serif-luxury font-bold text-lg text-[#1E262B]">
                      Which treatment are you interested in?
                    </h4>
                    <div className="space-y-2">
                      {SERVICES.map(srv => (
                        <div
                          key={srv.id}
                          onClick={() => setSelectedService(srv.id)}
                          className={`p-3 rounded-lg border cursor-pointer transition-colors flex items-center justify-between ${
                            selectedService === srv.id
                              ? 'border-[#2A383F] bg-[#F2EEE7]'
                              : 'border-neutral-200 hover:border-neutral-300'
                          }`}
                        >
                          <div>
                            <div className="text-xs font-bold text-[#1E262B]">{srv.name}</div>
                            <div className="text-[11px] text-[#718087]">{srv.category} · {srv.duration}</div>
                          </div>
                          <div className="text-xs font-mono font-bold text-[#2A383F]">
                            {srv.startingPrice}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 2: Doctor */}
                {bookingStep === 2 && (
                  <div className="space-y-4">
                    <h4 className="font-serif-luxury font-bold text-lg text-[#1E262B]">
                      Select your consulting specialist:
                    </h4>
                    <div className="space-y-3">
                      {DOCTORS.map(doc => (
                        <div
                          key={doc.id}
                          onClick={() => setSelectedDoctor(doc.id)}
                          className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                            selectedDoctor === doc.id
                              ? 'border-[#2A383F] bg-[#F2EEE7]'
                              : 'border-neutral-200 hover:border-neutral-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="font-bold text-sm text-[#1E262B]">{doc.name}</div>
                            <span className="text-[11px] text-[#2A383F] font-medium">{doc.specialty}</span>
                          </div>
                          <div className="text-xs text-[#718087] mt-1">{doc.title}</div>
                          <div className="text-[11px] text-neutral-500 mt-0.5">{doc.credentials}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 3: Date & Time */}
                {bookingStep === 3 && (
                  <div className="space-y-4">
                    <h4 className="font-serif-luxury font-bold text-lg text-[#1E262B]">
                      Select a date and preferred time slot:
                    </h4>
                    <div>
                      <label className="text-xs font-semibold text-neutral-700 block mb-1">Appointment Date</label>
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={e => setSelectedDate(e.target.value)}
                        className="w-full text-xs px-3 py-2 border border-neutral-300 rounded focus:outline-none focus:border-[#2A383F]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-neutral-700 block mb-2">Available Slots</label>
                      <div className="grid grid-cols-3 gap-2">
                        {['09:00 AM', '10:30 AM', '01:00 PM', '02:30 PM', '04:00 PM', '05:15 PM'].map(time => (
                          <button
                            key={time}
                            type="button"
                            onClick={() => setSelectedTime(time)}
                            className={`py-2 text-xs rounded border transition-colors ${
                              selectedTime === time
                                ? 'bg-[#2A383F] text-white border-[#2A383F] font-semibold'
                                : 'border-neutral-200 text-neutral-700 hover:border-neutral-400'
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Contact Details */}
                {bookingStep === 4 && (
                  <form onSubmit={handleBookingSubmit} className="space-y-3">
                    <h4 className="font-serif-luxury font-bold text-lg text-[#1E262B]">
                      Patient Contact Information
                    </h4>
                    <div>
                      <label className="text-xs font-semibold text-neutral-700 block mb-1">Full Legal Name</label>
                      <input
                        type="text"
                        required
                        value={patientName}
                        onChange={e => setPatientName(e.target.value)}
                        placeholder="e.g. Rachel Adams"
                        className="w-full text-xs px-3 py-2 border border-neutral-300 rounded focus:outline-none focus:border-[#2A383F]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-semibold text-neutral-700 block mb-1">Mobile Phone</label>
                        <input
                          type="tel"
                          required
                          value={patientPhone}
                          onChange={e => setPatientPhone(e.target.value)}
                          placeholder="(310) 555-0199"
                          className="w-full text-xs px-3 py-2 border border-neutral-300 rounded focus:outline-none focus:border-[#2A383F]"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-neutral-700 block mb-1">Email Address</label>
                        <input
                          type="email"
                          required
                          value={patientEmail}
                          onChange={e => setPatientEmail(e.target.value)}
                          placeholder="rachel@example.com"
                          className="w-full text-xs px-3 py-2 border border-neutral-300 rounded focus:outline-none focus:border-[#2A383F]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-neutral-700 block mb-1">Primary Smile Goals / Notes</label>
                      <textarea
                        rows={2}
                        value={patientNotes}
                        onChange={e => setPatientNotes(e.target.value)}
                        placeholder="Interested in correcting slight crowding on upper arch..."
                        className="w-full text-xs px-3 py-2 border border-neutral-300 rounded focus:outline-none focus:border-[#2A383F]"
                      />
                    </div>
                  </form>
                )}

                {/* Bottom Navigation Buttons */}
                <div className="flex items-center justify-between pt-6 mt-6 border-t border-neutral-200">
                  {bookingStep > 1 ? (
                    <button
                      type="button"
                      onClick={() => setBookingStep(s => s - 1)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-neutral-600 hover:text-neutral-900"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Back
                    </button>
                  ) : (
                    <div />
                  )}

                  {bookingStep < 4 ? (
                    <button
                      type="button"
                      onClick={() => setBookingStep(s => s + 1)}
                      className="bg-[#2A383F] hover:bg-[#1B2428] text-white px-5 py-2 rounded text-xs font-semibold transition-colors flex items-center gap-1"
                    >
                      Continue
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleBookingSubmit}
                      className="bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-2 rounded text-xs font-semibold transition-colors flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Confirm Consultation Booking
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-[#E6E1D8] bg-[#1E262B] text-[#9EA9AF] py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs">
          <div className="flex items-center gap-3">
            <span className="font-serif-luxury text-base font-bold text-[#FBF9F5]">Aura Aesthetics</span>
            <span>·</span>
            <span>Beverly Hills, CA</span>
          </div>
          <div>© 2026 Aura Facial & Dental Aesthetics. HIPAA compliant concierge care.</div>
        </div>
      </footer>
    </div>
  );
};
