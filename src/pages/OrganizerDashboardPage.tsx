import React, { useState } from 'react';
import { dbService } from '../services/db';
import { useAuth } from '../context/AuthContext';
import { EventItem } from '../types';
import {
  PlusCircle,
  Calendar,
  Users,
  BarChart3,
  TrendingUp,
  AlertTriangle,
  Eye,
  Edit3,
  XCircle,
  EyeOff,
  CheckCircle2,
} from 'lucide-react';

interface OrganizerDashboardPageProps {
  onCreateEvent: () => void;
  onEditEvent: (eventId: number) => void;
  onViewAttendees: (eventId: number) => void;
  onSelectEvent: (eventId: number) => void;
}

export const OrganizerDashboardPage: React.FC<OrganizerDashboardPageProps> = ({
  onCreateEvent,
  onEditEvent,
  onViewAttendees,
  onSelectEvent,
}) => {
  const { currentUser, openAuthModal } = useAuth();
  const [includeHidden, setIncludeHidden] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(
    null
  );
  const [cancellationModal, setCancellationModal] = useState<{
    isOpen: boolean;
    eventId?: number;
    title?: string;
  }>({ isOpen: false });
  const [cancellationReason, setCancellationReason] = useState('Inclement weather / campus schedule update');

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#F7F3E9] p-12 text-center">
        <h2 className="text-2xl font-display uppercase">Organizer Authentication Required</h2>
        <button
          onClick={openAuthModal}
          className="mt-4 px-6 py-3 bg-[#D8FF24] brutalist-border font-display uppercase text-xs"
        >
          Log in as Organizer
        </button>
      </div>
    );
  }

  // Get events created by this organizer
  const events = dbService.getEvents({
    organizerId: currentUser.user_id,
    includeHidden,
  });

  const reports = dbService.getReports();
  const totalEventsCount = events.length;
  const totalRegistrationsCount = events.reduce((acc, curr) => acc + (curr.confirmed_count || 0), 0);
  const totalCapacitySum = events.reduce((acc, curr) => acc + curr.capacity, 0);
  const avgAttendanceRate =
    totalCapacitySum > 0 ? Math.round((totalRegistrationsCount / totalCapacitySum) * 100) : 0;

  // Handle Cascade Cancellation (Real-World Processing Operation 3)
  const confirmCascadeCancellation = () => {
    if (!cancellationModal.eventId) return;

    const res = dbService.cancelEventCascade(
      cancellationModal.eventId,
      currentUser.user_id,
      cancellationReason,
      currentUser.email
    );

    setCancellationModal({ isOpen: false });
    if (res.success) {
      setFeedback({ type: 'success', message: res.message });
    } else {
      setFeedback({ type: 'error', message: res.message });
    }
  };

  const handleHideEvent = (eventId: number) => {
    const success = dbService.hideOrganizerEvent(eventId, currentUser.user_id);
    if (success) {
      setFeedback({
        type: 'success',
        message: 'Event hidden from ordinary dashboard view (preserved for institutional reports).',
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F3E9] text-black pb-16">
      {/* ========================================================
          HERO BANNER MATCHING SCREEN 4 OF COLLAGE MOCKUP
          "MAKE SOMETHING HAPPEN."
         ======================================================== */}
      <div className="bg-[#D8FF24] border-b-2 border-black px-4 sm:px-8 py-10 md:py-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
          <div>
            <div className="inline-block px-2.5 py-0.5 bg-black text-[#D8FF24] font-mono-tag text-xs font-bold uppercase mb-2">
              Organizer Suite &bull; {currentUser.organization_name || currentUser.full_name}
            </div>

            <h1 className="text-4xl sm:text-6xl font-display uppercase tracking-tight text-[#111111] leading-none">
              Make Something <br /> Happen.
            </h1>

            <p className="mt-3 text-sm sm:text-base font-medium text-neutral-800 max-w-xl">
              Create, manage and track your events — all in one place.
            </p>
          </div>

          <button
            onClick={onCreateEvent}
            className="px-6 py-3.5 bg-black text-[#D8FF24] hover:bg-neutral-800 font-display uppercase text-xs sm:text-sm brutalist-border brutalist-shadow brutalist-shadow-hover flex items-center gap-2 cursor-pointer transition-transform self-start md:self-auto"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ Create Event</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8">
        {/* Feedback Alert */}
        {feedback && (
          <div
            className={`mb-6 p-3.5 brutalist-border flex items-center justify-between text-xs font-bold ${
              feedback.type === 'success' ? 'bg-[#52D6B0]' : 'bg-[#FF5A4E] text-white'
            }`}
          >
            <span>{feedback.message}</span>
            <button onClick={() => setFeedback(null)} className="underline uppercase">
              Dismiss
            </button>
          </div>
        )}

        {/* 3 Metric Stat Cards matching mockup */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-5 brutalist-border-thick brutalist-shadow">
            <span className="text-xs font-mono-tag font-bold uppercase text-neutral-500">
              Total Events
            </span>
            <div className="text-4xl font-display mt-1 text-black">{totalEventsCount}</div>
            <p className="text-[11px] text-neutral-600 mt-2">Active &amp; published campaigns</p>
          </div>

          <div className="bg-white p-5 brutalist-border-thick brutalist-shadow">
            <span className="text-xs font-mono-tag font-bold uppercase text-neutral-500">
              Total Registrations
            </span>
            <div className="text-4xl font-display mt-1 text-[#315CFF]">
              {totalRegistrationsCount}
            </div>
            <p className="text-[11px] text-neutral-600 mt-2">Confirmed student attendees</p>
          </div>

          <div className="bg-white p-5 brutalist-border-thick brutalist-shadow">
            <span className="text-xs font-mono-tag font-bold uppercase text-neutral-500">
              Avg. Attendance Rate
            </span>
            <div className="text-4xl font-display mt-1 text-black">{avgAttendanceRate}%</div>
            <p className="text-[11px] text-neutral-600 mt-2">Capacity fill performance</p>
          </div>
        </div>

        {/* Two Columns: Left = Your Events Table, Right = Charts & Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ========================================================
              LEFT COLUMN: YOUR EVENTS MANAGEMENT TABLE
             ======================================================== */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white brutalist-border-thick brutalist-shadow p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b-2 border-black">
                <div>
                  <h3 className="font-display text-xl uppercase tracking-tight">Your Events</h3>
                  <p className="text-xs text-neutral-600">
                    Live database view of all events under your stewardship.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIncludeHidden(!includeHidden)}
                    className="text-xs font-mono-tag font-bold text-neutral-600 hover:text-black flex items-center gap-1"
                  >
                    <span>{includeHidden ? 'Hide Cancelled History' : 'Show Cancelled'}</span>
                  </button>
                </div>
              </div>

              {events.length === 0 ? (
                <div className="p-8 text-center bg-[#F7F3E9] brutalist-border">
                  <p className="font-medium text-xs text-neutral-600 mb-3">
                    No events registered yet under this organizer account.
                  </p>
                  <button
                    onClick={onCreateEvent}
                    className="px-4 py-2 bg-[#D8FF24] brutalist-border text-xs font-display uppercase"
                  >
                    Create Your First Event
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b-2 border-black font-mono-tag uppercase text-[11px] text-neutral-600">
                        <th className="py-2.5 px-2">Event</th>
                        <th className="py-2.5 px-2">Date &amp; Time</th>
                        <th className="py-2.5 px-2">Venue</th>
                        <th className="py-2.5 px-2">Registrations</th>
                        <th className="py-2.5 px-2">Status</th>
                        <th className="py-2.5 px-2 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200">
                      {events.map((ev) => (
                        <tr key={ev.event_id} className="hover:bg-neutral-50 transition-colors">
                          <td className="py-3 px-2 font-bold max-w-[160px]">
                            <div className="flex items-center gap-2">
                              <img
                                src={ev.poster_url}
                                alt={ev.title}
                                className="w-8 h-8 object-cover brutalist-border shrink-0"
                              />
                              <span
                                onClick={() => onSelectEvent(ev.event_id)}
                                className="truncate cursor-pointer hover:underline"
                              >
                                {ev.title}
                              </span>
                            </div>
                          </td>

                          <td className="py-3 px-2 text-neutral-600 whitespace-nowrap">
                            {new Date(ev.start_time).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                            })}
                          </td>

                          <td className="py-3 px-2 text-neutral-600 truncate max-w-[120px]">
                            {ev.venue_name}
                          </td>

                          <td className="py-3 px-2 font-mono-tag font-bold whitespace-nowrap">
                            {ev.is_full ? (
                              <span className="text-[#FF5A4E]">Full ({ev.capacity})</span>
                            ) : (
                              <span>
                                {ev.confirmed_count} / {ev.capacity}
                              </span>
                            )}
                          </td>

                          <td className="py-3 px-2 whitespace-nowrap">
                            {ev.status === 'PUBLISHED' && (
                              <span className="px-2 py-0.5 bg-[#52D6B0] text-black font-mono-tag font-bold text-[10px] brutalist-border">
                                Ongoing
                              </span>
                            )}
                            {ev.status === 'CANCELLED' && (
                              <span className="px-2 py-0.5 bg-[#FF5A4E] text-white font-mono-tag font-bold text-[10px] brutalist-border">
                                Cancelled
                              </span>
                            )}
                            {ev.status === 'DRAFT' && (
                              <span className="px-2 py-0.5 bg-neutral-200 text-black font-mono-tag font-bold text-[10px] brutalist-border">
                                Draft
                              </span>
                            )}
                          </td>

                          <td className="py-3 px-2 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-1.5">
                              {/* View Attendees with Navigation */}
                              <button
                                onClick={() => onViewAttendees(ev.event_id)}
                                className="px-2 py-1 bg-[#111111] text-[#D8FF24] font-bold text-[10px] uppercase brutalist-border hover:bg-neutral-800"
                                title="View and navigate attendee records"
                              >
                                Attendees ({ev.confirmed_count})
                              </button>

                              {/* Edit Event */}
                              {ev.status !== 'CANCELLED' && (
                                <button
                                  onClick={() => onEditEvent(ev.event_id)}
                                  className="p-1 bg-[#F7F3E9] hover:bg-[#D8FF24] brutalist-border text-neutral-800"
                                  title="Edit Event"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                </button>
                              )}

                              {/* Cascade Cancel */}
                              {ev.status !== 'CANCELLED' ? (
                                <button
                                  onClick={() =>
                                    setCancellationModal({
                                      isOpen: true,
                                      eventId: ev.event_id,
                                      title: ev.title,
                                    })
                                  }
                                  className="p-1 bg-white hover:bg-red-50 text-[#FF5A4E] brutalist-border"
                                  title="Cascade Cancel Event"
                                >
                                  <XCircle className="w-3.5 h-3.5" />
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleHideEvent(ev.event_id)}
                                  className="p-1 bg-white hover:bg-neutral-100 text-neutral-500 brutalist-border"
                                  title="Hide from view"
                                >
                                  <EyeOff className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* ========================================================
              RIGHT COLUMN: REGISTRATION OVERVIEW & EVENT POPULARITY
             ======================================================== */}
          <div className="lg:col-span-4 space-y-6">
            {/* Registration Overview Donut Chart Representation */}
            <div className="bg-white brutalist-border-thick brutalist-shadow p-5">
              <h4 className="font-display text-sm uppercase tracking-wider mb-4 flex items-center justify-between">
                <span>Registration Overview</span>
                <span className="font-mono-tag text-xs font-bold text-[#315CFF]">
                  {totalRegistrationsCount} Total
                </span>
              </h4>

              <div className="space-y-3">
                {reports.categoryBreakdown.map((cat) => (
                  <div key={cat.categoryId} className="space-y-1">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="flex items-center gap-1.5">
                        <span
                          className="w-2.5 h-2.5 inline-block brutalist-border"
                          style={{ backgroundColor: cat.colorHex }}
                        />
                        {cat.categoryName}
                      </span>
                      <span className="font-mono-tag">{cat.registrationCount} regs</span>
                    </div>
                    <div className="w-full h-2 bg-neutral-100 brutalist-border overflow-hidden">
                      <div
                        className="h-full"
                        style={{
                          backgroundColor: cat.colorHex,
                          width: `${Math.min(
                            100,
                            totalRegistrationsCount > 0
                              ? Math.round((cat.registrationCount / totalRegistrationsCount) * 100)
                              : 0
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sticker Graphic: BIGGER IDEAS TOGETHER */}
            <div className="p-5 bg-[#A9A2FF] text-black brutalist-border-thick brutalist-shadow -rotate-1">
              <div className="flex items-center gap-3">
                <span className="text-3xl">💡</span>
                <div>
                  <h4 className="font-display text-sm uppercase leading-tight">
                    BIGGER IDEAS <br /> TOGETHER.
                  </h4>
                  <p className="text-[10px] text-neutral-800 mt-1 font-mono-tag">
                    Cross-disciplinary student collaboration
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cascade Cancellation Modal */}
      {cancellationModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white brutalist-border-thick brutalist-shadow-lg p-6 max-w-md w-full">
            <div className="flex items-center gap-2 text-[#FF5A4E] mb-3">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="font-display text-lg uppercase">Cascade Cancel Event?</h3>
            </div>

            <p className="text-xs text-neutral-700 leading-relaxed mb-4">
              <strong>Real-World Processing Operation 3:</strong> Cancelling this event will
              automatically batch-cancel all active student registrations in a single atomic
              transaction and send cancellation notices.
            </p>

            <div className="mb-4">
              <label className="block text-xs font-bold uppercase mb-1">Cancellation Reason</label>
              <textarea
                value={cancellationReason}
                onChange={(e) => setCancellationReason(e.target.value)}
                rows={2}
                className="w-full p-2 bg-[#F7F3E9] brutalist-border text-xs font-medium focus:outline-none"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setCancellationModal({ isOpen: false })}
                className="px-3 py-2 bg-neutral-200 text-xs font-bold uppercase brutalist-border"
              >
                Keep Event
              </button>
              <button
                onClick={confirmCascadeCancellation}
                className="px-4 py-2 bg-[#FF5A4E] text-white text-xs font-display uppercase brutalist-border"
              >
                Confirm Cascade Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
