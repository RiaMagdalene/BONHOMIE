import React, { useState } from 'react';
import { dbService } from '../services/db';
import { useAuth } from '../context/AuthContext';
import { Registration, EventItem } from '../types';
import {
  Calendar as CalendarIcon,
  CheckCircle2,
  XCircle,
  EyeOff,
  Clock,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Smile,
} from 'lucide-react';

interface StudentDashboardPageProps {
  onSelectEvent: (eventId: number) => void;
  onExplore: () => void;
}

export const StudentDashboardPage: React.FC<StudentDashboardPageProps> = ({
  onSelectEvent,
  onExplore,
}) => {
  const { currentUser, openAuthModal } = useAuth();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'my-events' | 'profile'>('dashboard');
  const [includeHidden, setIncludeHidden] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<number>(10); // Nov 2026 = 10 in 0-indexed JS Date
  const [notification, setNotification] = useState<string | null>(null);

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#F7F3E9] p-12 text-center">
        <h2 className="text-2xl font-display uppercase">Student Log In Required</h2>
        <p className="text-sm text-neutral-600 mt-2">
          Log in with your student account to access your personalized campus calendar and registration history.
        </p>
        <button
          onClick={openAuthModal}
          className="mt-4 px-6 py-3 bg-[#D8FF24] brutalist-border font-display uppercase text-xs"
        >
          Log in Now
        </button>
      </div>
    );
  }

  const registrations = dbService.getStudentRegistrations(currentUser.user_id, includeHidden);

  const handleCancelRegistration = (regId: number) => {
    const res = dbService.cancelStudentRegistration(regId, currentUser.user_id, currentUser.email);
    setNotification(res.message);
  };

  const handleHideRegistration = (regId: number) => {
    const success = dbService.hideStudentRegistration(regId, currentUser.user_id);
    if (success) {
      setNotification('Cancelled record removed from your view (preserved in database audit logs).');
    }
  };

  // Calendar dates with registrations
  const eventDays = registrations
    .filter((r) => r.status === 'CONFIRMED' && r.event_start_time)
    .map((r) => new Date(r.event_start_time!).getDate());

  return (
    <div className="min-h-screen bg-[#F7F3E9] text-black pb-16">
      {/* ========================================================
          HERO BANNER MATCHING SCREEN 3 OF COLLAGE MOCKUP
          "YOUR CAMPUS, YOUR CALENDAR."
         ======================================================== */}
      <div className="bg-[#D8FF24] border-b-2 border-black px-4 sm:px-8 py-10 md:py-12 relative overflow-hidden">
        {/* Right floating bubble badge matching mockup */}
        <div className="absolute top-4 right-8 md:right-16 flex flex-col items-center pointer-events-none hidden sm:flex">
          <div className="w-16 h-16 md:w-20 md:h-20 glass-bubble flex items-center justify-center text-center p-2">
            <span className="font-mono-tag text-[9px] font-black uppercase text-white leading-tight">
              GOOD THINGS <br /> AHEAD
            </span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-block px-2.5 py-0.5 bg-black text-[#D8FF24] font-mono-tag text-xs font-bold uppercase mb-2">
            Student Portal &bull; {currentUser.roll_number || 'Enrolled Student'}
          </div>

          <h1 className="text-4xl sm:text-6xl font-display uppercase tracking-tight text-[#111111] leading-none">
            Your Campus, <br />
            Your Calendar.
          </h1>

          <p className="mt-3 text-sm sm:text-base font-medium text-neutral-800 max-w-xl">
            Keep track of your registrations, upcoming events and never miss what&apos;s happening on campus.
          </p>
        </div>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-4">
          <div className="p-3 bg-[#D8FF24] brutalist-border flex items-center justify-between text-xs font-bold">
            <span>ℹ️ {notification}</span>
            <button onClick={() => setNotification(null)} className="underline uppercase">
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          MAIN DASHBOARD & CALENDAR GRID
         ======================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Mini Sidebar */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-white p-4 brutalist-border brutalist-shadow-sm space-y-1">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full text-left px-3 py-2 text-xs font-bold uppercase brutalist-border flex items-center gap-2 transition-all ${
                  activeTab === 'dashboard'
                    ? 'bg-[#111111] text-[#D8FF24]'
                    : 'bg-[#F7F3E9] text-black hover:bg-[#D8FF24]'
                }`}
              >
                <CalendarIcon className="w-4 h-4" /> Dashboard
              </button>

              <button
                onClick={() => setActiveTab('my-events')}
                className={`w-full text-left px-3 py-2 text-xs font-bold uppercase brutalist-border flex items-center gap-2 transition-all ${
                  activeTab === 'my-events'
                    ? 'bg-[#111111] text-[#D8FF24]'
                    : 'bg-[#F7F3E9] text-black hover:bg-[#D8FF24]'
                }`}
              >
                <Sparkles className="w-4 h-4" /> My Registrations ({registrations.length})
              </button>

              <button
                onClick={onExplore}
                className="w-full text-left px-3 py-2 text-xs font-bold uppercase brutalist-border flex items-center gap-2 bg-[#F7F3E9] text-black hover:bg-[#D8FF24] transition-all"
              >
                <ArrowRight className="w-4 h-4" /> Explore Events
              </button>
            </div>

            {/* Profile Overview Card */}
            <div className="bg-white p-4 brutalist-border brutalist-shadow-sm text-xs space-y-2">
              <span className="font-mono-tag font-bold uppercase text-neutral-400 block">
                Student Profile
              </span>
              <p className="font-display text-base uppercase text-black">{currentUser.full_name}</p>
              <p className="text-neutral-600">{currentUser.email}</p>
              <div className="pt-2 border-t border-neutral-200">
                <span className="px-2 py-0.5 bg-[#D8FF24] brutalist-border text-[10px] font-mono-tag font-bold">
                  {currentUser.department || 'Undergraduate'}
                </span>
              </div>
            </div>

            {/* Show / Hide cancelled records toggle */}
            <div className="p-3 bg-[#FFFDF6] brutalist-border text-xs flex items-center justify-between">
              <span className="font-medium text-neutral-700">Show hidden history:</span>
              <button
                onClick={() => setIncludeHidden(!includeHidden)}
                className={`px-2 py-1 text-[10px] font-bold uppercase brutalist-border ${
                  includeHidden ? 'bg-black text-white' : 'bg-neutral-200 text-black'
                }`}
              >
                {includeHidden ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>

          {/* Center Column: Upcoming Registrations Table */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white brutalist-border-thick brutalist-shadow p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-lg uppercase tracking-tight">
                  Upcoming Registrations
                </h3>
                <span className="text-xs font-mono-tag font-bold text-neutral-500">
                  {registrations.filter((r) => r.status === 'CONFIRMED').length} Active
                </span>
              </div>

              {registrations.length === 0 ? (
                <div className="p-8 text-center bg-[#F7F3E9] brutalist-border">
                  <p className="font-medium text-xs text-neutral-600 mb-3">
                    You haven&apos;t registered for any events yet.
                  </p>
                  <button
                    onClick={onExplore}
                    className="px-4 py-2 bg-[#D8FF24] brutalist-border text-xs font-display uppercase"
                  >
                    Find Events to Join
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {registrations.map((reg) => (
                    <div
                      key={reg.registration_id}
                      className="p-3 bg-[#F7F3E9] brutalist-border flex items-center justify-between gap-3 group"
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <img
                          src={
                            reg.event_poster ||
                            'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=120'
                          }
                          alt={reg.event_title}
                          className="w-12 h-12 object-cover brutalist-border shrink-0"
                        />
                        <div className="overflow-hidden">
                          <h4
                            onClick={() => onSelectEvent(reg.event_id)}
                            className="font-display text-xs uppercase tracking-tight truncate cursor-pointer hover:text-[#315CFF]"
                          >
                            {reg.event_title}
                          </h4>
                          <p className="text-[11px] text-neutral-600 truncate">
                            {reg.event_start_time
                              ? new Date(reg.event_start_time).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                })
                              : 'TBD'}{' '}
                            &bull; {reg.venue_name || 'Campus Venue'}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {reg.status === 'CONFIRMED' ? (
                          <span className="px-2 py-0.5 bg-[#52D6B0] text-black font-mono-tag font-bold text-[10px] brutalist-border">
                            Confirmed
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 bg-[#FF5A4E] text-white font-mono-tag font-bold text-[10px] brutalist-border">
                            Cancelled
                          </span>
                        )}

                        {reg.status === 'CONFIRMED' ? (
                          <button
                            onClick={() => handleCancelRegistration(reg.registration_id)}
                            title="Cancel Registration (24h rule applies)"
                            className="p-1 hover:bg-neutral-200 brutalist-border text-neutral-600 hover:text-red-600 text-[10px] font-bold"
                          >
                            Cancel
                          </button>
                        ) : (
                          <button
                            onClick={() => handleHideRegistration(reg.registration_id)}
                            title="Hide from dashboard view (keeps database row)"
                            className="p-1 hover:bg-neutral-200 brutalist-border text-neutral-600 text-[10px] font-bold flex items-center gap-1"
                          >
                            <EyeOff className="w-3 h-3" /> Hide
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* My Events Quick Grid */}
            <div className="bg-white brutalist-border p-5">
              <h4 className="font-display text-sm uppercase tracking-wider mb-3">
                Events You&apos;re Attending
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {registrations
                  .filter((r) => r.status === 'CONFIRMED')
                  .slice(0, 2)
                  .map((r) => (
                    <div
                      key={r.registration_id}
                      onClick={() => onSelectEvent(r.event_id)}
                      className="cursor-pointer bg-[#F7F3E9] p-2.5 brutalist-border hover:bg-[#D8FF24] transition-colors"
                    >
                      <p className="font-display text-xs uppercase truncate">{r.event_title}</p>
                      <p className="text-[10px] text-neutral-600 mt-1">
                        {r.event_start_time
                          ? new Date(r.event_start_time).toLocaleDateString()
                          : ''}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* ========================================================
              RIGHT COLUMN: INTERACTIVE MONTHLY CALENDAR & YELLOW STICKER
             ======================================================== */}
          <div className="lg:col-span-4 space-y-4">
            {/* Interactive Campus Calendar */}
            <div className="bg-white brutalist-border-thick brutalist-shadow p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="font-display text-sm uppercase">November 2026</span>
                <div className="flex items-center gap-1">
                  <button className="p-1 bg-[#F7F3E9] brutalist-border text-neutral-600 hover:text-black">
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-1 bg-[#F7F3E9] brutalist-border text-neutral-600 hover:text-black">
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Weekday headers */}
              <div className="grid grid-cols-7 gap-1 text-center font-mono-tag text-[10px] font-bold text-neutral-400 mb-2">
                <span>S</span>
                <span>M</span>
                <span>T</span>
                <span>W</span>
                <span>T</span>
                <span>F</span>
                <span>S</span>
              </div>

              {/* Days grid with event dots matching mockup */}
              <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold">
                {/* Blank days before Nov 1 2026 (Nov 1 2026 is a Sunday) */}
                {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
                  const hasEvent = eventDays.includes(day);
                  const isMusicNight = day === 15;
                  const isHackathon = day === 12;

                  return (
                    <div
                      key={day}
                      className={`h-8 flex flex-col items-center justify-center relative rounded-sm text-[11px] ${
                        hasEvent
                          ? 'bg-[#315CFF] text-white font-bold'
                          : isMusicNight
                          ? 'bg-[#FF5A4E] text-white font-bold'
                          : 'hover:bg-neutral-100 text-neutral-800'
                      }`}
                    >
                      <span>{day}</span>
                      {hasEvent && (
                        <span className="w-1 h-1 bg-[#D8FF24] rounded-full absolute bottom-1" />
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-200 flex items-center justify-between text-[11px] text-neutral-600">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 bg-[#315CFF] inline-block" /> Registered Event
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 bg-[#FF5A4E] inline-block" /> Campus Highlight
                </span>
              </div>
            </div>

            {/* Yellow Sticker matching mockup: SHOW UP BE KIND MAKE FRIENDS */}
            <div className="p-4 bg-[#FFDF38] text-black brutalist-border-thick brutalist-shadow -rotate-1 transform">
              <div className="flex items-center gap-3">
                <Smile className="w-8 h-8 text-black shrink-0" />
                <div>
                  <h4 className="font-display text-sm uppercase leading-tight">
                    SHOW UP <br /> BE KIND <br /> MAKE FRIENDS
                  </h4>
                  <p className="text-[10px] text-neutral-800 mt-1 font-mono-tag">
                    CAMPUS CULTURE 2026
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
