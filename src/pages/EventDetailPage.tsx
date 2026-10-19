import React, { useState } from 'react';
import { dbService } from '../services/db';
import { useAuth } from '../context/AuthContext';
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ShieldAlert,
  Zap,
} from 'lucide-react';

interface EventDetailPageProps {
  eventId: number;
  onBack: () => void;
  onNavigateToCalendar: () => void;
}

export const EventDetailPage: React.FC<EventDetailPageProps> = ({
  eventId,
  onBack,
  onNavigateToCalendar,
}) => {
  const { currentUser, openAuthModal } = useAuth();
  const [event, setEvent] = useState(() => dbService.getEventById(eventId));
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(
    null
  );
  const [isProcessing, setIsProcessing] = useState(false);

  // Check if current logged-in student has an active registration
  const userRegistration = currentUser
    ? dbService
        .getStudentRegistrations(currentUser.user_id, true)
        .find((r) => r.event_id === eventId && r.status === 'CONFIRMED')
    : null;

  if (!event) {
    return (
      <div className="min-h-screen bg-[#F7F3E9] p-8 text-center">
        <h2 className="text-2xl font-display uppercase">Event Not Found</h2>
        <button
          onClick={onBack}
          className="mt-4 px-4 py-2 bg-[#D8FF24] brutalist-border font-bold uppercase text-xs"
        >
          ← Back to Events
        </button>
      </div>
    );
  }

  // Calculate 24-hour cutoff
  const eventStart = new Date(event.start_time).getTime();
  const hoursRemaining = (eventStart - Date.now()) / (1000 * 60 * 60);
  const isCancellationEligible = hoursRemaining >= 24;

  // Handle Registration via Real-World Processing Operation 1 (Row Lock Transaction)
  const handleRegister = () => {
    if (!currentUser) {
      openAuthModal();
      return;
    }

    if (currentUser.role !== 'STUDENT') {
      setFeedback({
        type: 'error',
        message: 'Only registered students can reserve attendee seats for events.',
      });
      return;
    }

    setIsProcessing(true);
    setFeedback(null);

    // Call transactional registration logic in db service
    setTimeout(() => {
      const result = dbService.registerStudentTransactional(
        currentUser.user_id,
        event.event_id,
        currentUser.email
      );

      setIsProcessing(false);
      if (result.success) {
        setFeedback({ type: 'success', message: result.message });
        setEvent(dbService.getEventById(eventId));
      } else {
        setFeedback({ type: 'error', message: result.message });
      }
    }, 250);
  };

  // Handle Cancellation via Real-World Processing Operation 2 (24-Hour Rule)
  const handleCancel = () => {
    if (!currentUser || !userRegistration) return;

    setIsProcessing(true);
    setFeedback(null);

    setTimeout(() => {
      const result = dbService.cancelStudentRegistration(
        userRegistration.registration_id,
        currentUser.user_id,
        currentUser.email
      );

      setIsProcessing(false);
      if (result.success) {
        setFeedback({ type: 'success', message: result.message });
        setEvent(dbService.getEventById(eventId));
      } else {
        setFeedback({ type: 'error', message: result.message });
      }
    }, 250);
  };

  return (
    <div className="min-h-screen bg-[#F7F3E9] text-black pb-16">
      {/* Top Breadcrumb Header */}
      <div className="border-b-2 border-black bg-white px-4 sm:px-8 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider hover:text-[#315CFF] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to events</span>
          </button>

          <span className="text-xs font-mono-tag font-bold text-neutral-500">
            EVENT_ID: #{event.event_id} &bull; {event.status}
          </span>
        </div>
      </div>

      {/* Main Content Area matching Screen 2 of collage */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-8">
        {/* Feedback Alert Banner */}
        {feedback && (
          <div
            className={`mb-6 p-4 brutalist-border-thick brutalist-shadow flex items-start gap-3 ${
              feedback.type === 'success'
                ? 'bg-[#52D6B0] text-black'
                : 'bg-[#FF5A4E] text-white'
            }`}
          >
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            )}
            <div>
              <p className="font-display uppercase text-sm tracking-wide">
                {feedback.type === 'success' ? 'Transaction Committed' : 'Operation Notice'}
              </p>
              <p className="text-xs font-medium mt-0.5">{feedback.message}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ========================================================
              LEFT COLUMN: HUGE RETRO POSTER COLLAGE WITH STICKERS
             ======================================================== */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative bg-black p-3 rounded-xl brutalist-border-thick brutalist-shadow-lg overflow-hidden group">
              <div className="relative h-96 sm:h-[480px] w-full rounded-lg overflow-hidden bg-neutral-900 border border-neutral-700">
                <img
                  src={event.poster_url}
                  alt={event.title}
                  className="w-full h-full object-cover filter contrast-110"
                />

                {/* Poster Stylized Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-between p-6">
                  {/* Top Sticker on poster */}
                  <div className="flex justify-between items-start">
                    <span className="px-3 py-1 bg-[#D8FF24] text-black font-mono-tag font-bold text-xs uppercase brutalist-border rotate-[-3deg]">
                      ★ LIVE ON CAMPUS
                    </span>
                    <span className="w-10 h-10 glass-bubble opacity-90 rounded-full" />
                  </div>

                  {/* Bottom Bold Text on poster matching reference */}
                  <div>
                    <h2 className="font-display text-4xl text-white uppercase tracking-tight leading-none drop-shadow-[2px_2px_0px_#000]">
                      {event.title.split(':')[0]}
                    </h2>
                    <p className="font-syne text-[#D8FF24] text-sm font-bold uppercase tracking-wider mt-1">
                      {event.venue_name}
                    </p>
                  </div>
                </div>

                {/* Floating circular sticker badge */}
                <div className="absolute bottom-6 right-6 w-20 h-20 rounded-full bg-[#FFDF38] text-black brutalist-border flex flex-col items-center justify-center text-center p-1 font-mono-tag text-[9px] font-black uppercase rotate-6 shadow-md pointer-events-none">
                  <span>LIVE MUSIC</span>
                  <span>FOOD &bull; FUN</span>
                  <span>FRIENDS</span>
                </div>
              </div>
            </div>

            {/* Event Highlights Panel */}
            <div className="bg-white p-5 brutalist-border brutalist-shadow-sm">
              <h4 className="font-display text-sm uppercase tracking-wider text-neutral-800 mb-3 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#315CFF]" /> Event Highlights
              </h4>
              <ul className="space-y-2 text-xs text-neutral-700">
                {(event.highlights || [
                  'Verified university organization & facilities',
                  'Networking reception with student leads',
                  'Certificates and attendance credit provided',
                ]).map((hl, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#315CFF] font-bold">✔</span>
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ========================================================
              RIGHT COLUMN: EVENT METADATA, SEAT METER, REGISTRATION ACTION
             ======================================================== */}
          <div className="lg:col-span-7 space-y-6">
            {/* Category Chip */}
            <div className="flex items-center gap-3">
              <span
                className="px-3 py-1 text-xs font-bold uppercase tracking-wider brutalist-border text-white"
                style={{
                  backgroundColor:
                    event.category_id === 1
                      ? '#FF5A4E'
                      : event.category_id === 2
                      ? '#315CFF'
                      : '#52D6B0',
                  color: event.category_id === 3 ? '#000' : '#fff',
                }}
              >
                {event.category_name}
              </span>

              <span className="text-xs font-mono-tag font-bold text-neutral-500 uppercase">
                {event.is_full ? '● Capacity Reached' : '● Registration Open'}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-5xl font-display uppercase tracking-tight leading-tight text-black">
              {event.title}
            </h1>

            {/* Date, Time, Venue, Organizer Info Box */}
            <div className="bg-white p-5 brutalist-border brutalist-shadow-sm space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-neutral-500 shrink-0" />
                <span className="font-semibold">
                  {new Date(event.start_time).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-neutral-500 shrink-0" />
                <span className="font-medium text-neutral-700">
                  {new Date(event.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}{' '}
                  -{' '}
                  {new Date(event.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-neutral-500 shrink-0" />
                <span className="font-medium text-neutral-700">
                  {event.venue_name} &bull; Campus Venue
                </span>
              </div>

              <div className="flex items-center gap-3 pt-2 border-t border-neutral-200">
                <Users className="w-4 h-4 text-neutral-500 shrink-0" />
                <span className="text-xs font-medium text-neutral-600">
                  Organized by{' '}
                  <strong className="text-black font-bold uppercase">{event.organizer_org}</strong>
                </span>
              </div>
            </div>

            {/* Seat Capacity Progress Meter matching mockup */}
            <div className="bg-[#FFFDF6] p-5 brutalist-border brutalist-shadow-sm space-y-2">
              <div className="flex justify-between items-end">
                <div>
                  <span className="text-xs font-bold uppercase text-neutral-500 tracking-wider">
                    Seat Availability
                  </span>
                  <div className="text-2xl font-display tracking-tight text-black">
                    {event.confirmed_count} / {event.capacity}{' '}
                    <span className="text-sm font-sans font-normal text-neutral-600">spots taken</span>
                  </div>
                </div>

                <span
                  className={`text-xs font-mono-tag font-bold px-2 py-0.5 brutalist-border ${
                    event.is_full ? 'bg-[#FF5A4E] text-white' : 'bg-[#D8FF24] text-black'
                  }`}
                >
                  {event.is_full ? 'FULL' : `${event.available_seats} spots remaining`}
                </span>
              </div>

              {/* Visual Progress Bar */}
              <div className="w-full h-3 bg-neutral-200 brutalist-border overflow-hidden">
                <div
                  className="h-full bg-black transition-all duration-500"
                  style={{
                    width: `${Math.min(
                      100,
                      Math.round(((event.confirmed_count || 0) / event.capacity) * 100)
                    )}%`,
                  }}
                />
              </div>
            </div>

            {/* Primary Action Button (REGISTER or CANCEL) */}
            <div className="space-y-3">
              {userRegistration ? (
                /* Already Registered -> Option to Cancel */
                <div className="p-4 bg-[#52D6B0]/20 border-2 border-[#52D6B0] brutalist-shadow-sm space-y-3">
                  <div className="flex items-center gap-2 text-black font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>You are registered for this event!</span>
                  </div>

                  <p className="text-xs text-neutral-700">
                    Registration confirmed on{' '}
                    {new Date(userRegistration.registered_at).toLocaleDateString()}.
                  </p>

                  <div className="pt-2 flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={onNavigateToCalendar}
                      className="px-4 py-2 bg-black text-[#D8FF24] font-display uppercase text-xs brutalist-border"
                    >
                      View on My Calendar
                    </button>

                    <button
                      onClick={handleCancel}
                      disabled={isProcessing}
                      className="px-4 py-2 bg-white hover:bg-red-50 text-[#FF5A4E] font-display uppercase text-xs brutalist-border hover:translate-x-0.5 hover:translate-y-0.5 transition-transform"
                    >
                      {isProcessing ? 'Processing...' : 'Cancel Registration'}
                    </button>
                  </div>

                  <p className="text-[11px] text-neutral-500 font-mono-tag">
                    {isCancellationEligible
                      ? `⏳ 24h Policy: Cancellation is open (${hoursRemaining.toFixed(1)}h remaining).`
                      : `⚠️ 24h Policy: Window closed (event starts within 24 hours).`}
                  </p>
                </div>
              ) : (
                /* Not Registered -> Register Button */
                <button
                  onClick={handleRegister}
                  disabled={event.is_full || isProcessing}
                  className={`w-full py-4 font-display uppercase tracking-wider text-base sm:text-lg brutalist-border-thick brutalist-shadow brutalist-shadow-hover transition-all flex items-center justify-center gap-2 ${
                    event.is_full
                      ? 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
                      : 'bg-[#D8FF24] hover:bg-[#cbf110] text-black cursor-pointer'
                  }`}
                >
                  <Zap className="w-5 h-5" />
                  <span>
                    {isProcessing
                      ? 'Processing Transaction...'
                      : event.is_full
                      ? 'EVENT FULLY BOOKED'
                      : 'REGISTER FOR FREE'}
                  </span>
                </button>
              )}
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-2 pt-1">
              {(event.features || ['Free Entry', 'Food Stalls', 'Live Performances']).map(
                (feat, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-white brutalist-border text-xs font-bold text-neutral-800"
                  >
                    ★ {feat}
                  </span>
                )
              )}
            </div>

            {/* Description */}
            <div className="space-y-2 pt-2">
              <h3 className="font-display text-base uppercase tracking-wider text-black">
                About the event
              </h3>
              <p className="text-sm text-neutral-700 leading-relaxed bg-white p-4 brutalist-border">
                {event.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
