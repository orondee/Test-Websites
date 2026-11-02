import React, { useState } from 'react';
import { 
  Dumbbell, 
  Calendar, 
  Clock, 
  User, 
  Check, 
  ArrowRight, 
  X, 
  Sparkles, 
  Flame, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

interface FitnessClass {
  id: string;
  title: string;
  instructor: string;
  time: string;
  day: string;
  duration: string;
  spotsLeft: number;
  level: string;
  category: 'reformer' | 'strength' | 'recovery';
}

const SCHEDULE: FitnessClass[] = [
  {
    id: 'f1',
    title: 'Dynamic Reformer Jumpboard',
    instructor: 'Sasha Mikhailov',
    time: '07:30 AM',
    day: 'Monday',
    duration: '50 min',
    spotsLeft: 2,
    level: 'Intermediate / Advanced',
    category: 'reformer'
  },
  {
    id: 'f2',
    title: 'Athletic Hypertrophy & Core',
    instructor: 'Marcus Vance',
    time: '09:00 AM',
    day: 'Monday',
    duration: '55 min',
    spotsLeft: 4,
    level: 'All Levels',
    category: 'strength'
  },
  {
    id: 'f3',
    title: 'Classical Pilates Flow & Alignment',
    instructor: 'Elena Rostova',
    time: '12:15 PM',
    day: 'Monday',
    duration: '50 min',
    spotsLeft: 1,
    level: 'Foundations',
    category: 'reformer'
  },
  {
    id: 'f4',
    title: 'Infrared Sound Bath & Deep Stretch',
    instructor: 'Kaia Lin',
    time: '06:30 PM',
    day: 'Monday',
    duration: '60 min',
    spotsLeft: 5,
    level: 'Restorative',
    category: 'recovery'
  },
  {
    id: 'f5',
    title: 'Cardio Reformer Burn & Sculpt',
    instructor: 'Sasha Mikhailov',
    time: '08:00 AM',
    day: 'Tuesday',
    duration: '50 min',
    spotsLeft: 0,
    level: 'High Intensity',
    category: 'reformer'
  },
  {
    id: 'f6',
    title: 'Kettlebell Strength Conditioning',
    instructor: 'Marcus Vance',
    time: '05:30 PM',
    day: 'Tuesday',
    duration: '55 min',
    spotsLeft: 3,
    level: 'Intermediate',
    category: 'strength'
  }
];

export const FitnessDemo: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDay, setSelectedDay] = useState<string>('Monday');
  const [bookingClass, setBookingClass] = useState<FitnessClass | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');

  const filtered = SCHEDULE.filter(item => {
    const matchDay = item.day === selectedDay;
    const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
    return matchDay && matchCat;
  });

  const handleBookSpot = (cls: FitnessClass) => {
    setBookingClass(cls);
    setBookingConfirmed(false);
  };

  const handleConfirmPass = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingConfirmed(true);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-emerald-500 selection:text-black">
      {/* Brand Header */}
      <header className="border-b border-zinc-800 bg-black/90 backdrop-blur-md sticky top-0 z-30 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-sm">
            F
          </div>
          <div>
            <div className="font-bold tracking-widest text-sm uppercase text-white">
              Forma Athletic Club
            </div>
            <div className="text-[10px] text-zinc-400 tracking-wider font-mono">
              Reformer Pilates & Strength Studio
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="hidden sm:flex items-center gap-2 text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>3 Studios Open · SoHo, NYC</span>
          </div>
          <button
            onClick={() => handleBookSpot(SCHEDULE[0])}
            className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-4 py-2 rounded-lg text-xs transition-colors flex items-center gap-1.5"
          >
            <span>Book First Class ($35)</span>
          </button>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="py-14 px-6 border-b border-zinc-800 bg-gradient-to-b from-black to-zinc-950">
        <div className="max-w-5xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
            <span>Spring 2026 Studio Timetable</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white max-w-xl">
            Precision Movement. Uncompromising Strength.
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm max-w-lg leading-relaxed">
            Custom Allegro 2 Reformers, expert athletic conditioning, and infrared recovery suites. Select your session and reserve your reformer spot below.
          </p>

          {/* Day & Category Filters */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-zinc-900">
            {/* Days */}
            <div className="flex items-center gap-1.5 bg-zinc-900 p-1.5 rounded-xl border border-zinc-800">
              {['Monday', 'Tuesday'].map(day => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    selectedDay === day
                      ? 'bg-emerald-500 text-black'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>

            {/* Categories */}
            <div className="flex items-center gap-1.5 bg-zinc-900 p-1.5 rounded-xl border border-zinc-800">
              {[
                { id: 'all', label: 'All Sessions' },
                { id: 'reformer', label: 'Reformer' },
                { id: 'strength', label: 'Strength' },
                { id: 'recovery', label: 'Recovery' }
              ].map(c => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    selectedCategory === c.id
                      ? 'bg-zinc-800 text-white font-bold'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Class Schedule Grid */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="space-y-4">
          {filtered.map(cls => (
            <div
              key={cls.id}
              className="bg-zinc-900/90 border border-zinc-800/80 hover:border-zinc-700 p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-black border border-zinc-800 flex flex-col items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-emerald-400 mb-1" />
                  <span className="text-[10px] font-mono text-zinc-300 font-bold">
                    {cls.time.split(' ')[0]}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase font-mono tracking-wider font-bold text-emerald-400">
                      {cls.category}
                    </span>
                    <span className="text-zinc-600">·</span>
                    <span className="text-xs text-zinc-400">{cls.duration}</span>
                    <span className="text-zinc-600">·</span>
                    <span className="text-xs text-zinc-400">{cls.level}</span>
                  </div>
                  <h3 className="text-base font-bold text-white">
                    {cls.title}
                  </h3>
                  <div className="text-xs text-zinc-400 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-zinc-500" />
                    <span>Lead Coach: {cls.instructor}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-4 pt-3 md:pt-0 border-t md:border-t-0 border-zinc-800">
                <div className="text-right">
                  {cls.spotsLeft > 0 ? (
                    <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                      {cls.spotsLeft} {cls.spotsLeft === 1 ? 'spot left' : 'spots left'}
                    </span>
                  ) : (
                    <span className="text-xs font-mono text-zinc-500 font-bold bg-zinc-800 px-2.5 py-1 rounded-full">
                      Class Full (Waitlist)
                    </span>
                  )}
                </div>

                <button
                  onClick={() => handleBookSpot(cls)}
                  disabled={cls.spotsLeft === 0}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-30 text-black font-bold text-xs rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>Book Spot</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Pass Modal */}
      {bookingClass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-md w-full p-6 space-y-5 text-zinc-200">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-lg font-bold text-white">Reserve Reformer Pass</h4>
                <p className="text-xs text-emerald-400 font-mono mt-0.5">
                  {bookingClass.title} · {bookingClass.time}
                </p>
              </div>
              <button
                onClick={() => setBookingClass(null)}
                className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {bookingConfirmed ? (
              <div className="p-6 bg-emerald-950/30 border border-emerald-800/60 rounded-xl space-y-3 text-center">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                  <Check className="w-5 h-5" />
                </div>
                <h5 className="font-bold text-white text-sm">Class Spot Confirmed!</h5>
                <p className="text-xs text-zinc-300">
                  You are booked for {bookingClass.title} with {bookingClass.instructor}. Arrive 10 minutes prior with grip socks.
                </p>
                <button
                  onClick={() => setBookingClass(null)}
                  className="mt-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-xs font-semibold"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleConfirmPass} className="space-y-4 text-xs">
                <div>
                  <label className="block text-zinc-400 mb-1 font-mono">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Jordan Vance"
                    value={guestName}
                    onChange={e => setGuestName(e.target.value)}
                    className="w-full bg-black border border-zinc-800 rounded-lg p-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1 font-mono">Email for Calendar Invite</label>
                  <input
                    type="email"
                    required
                    placeholder="jordan@example.com"
                    value={guestEmail}
                    onChange={e => setGuestEmail(e.target.value)}
                    className="w-full bg-black border border-zinc-800 rounded-lg p-2.5 text-white"
                  />
                </div>

                <div className="p-3 bg-black rounded-xl border border-zinc-800 flex items-center justify-between">
                  <span className="text-xs text-zinc-400">Drop-in Single Session Pass:</span>
                  <span className="font-mono text-sm font-bold text-emerald-400">$35.00</span>
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-3 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Confirm Single Pass Reservation</span>
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
export default FitnessDemo;
