import React, { useState } from 'react';
import { dbService } from '../services/db';
import { useAuth } from '../context/AuthContext';
import { EventItem } from '../types';
import {
  ArrowLeft,
  Megaphone,
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  Image as ImageIcon,
  Check,
  AlertCircle,
} from 'lucide-react';

interface CreateEventPageProps {
  onBack: () => void;
  onSuccess: (eventId: number) => void;
  editingEventId?: number;
}

export const CreateEventPage: React.FC<CreateEventPageProps> = ({
  onBack,
  onSuccess,
  editingEventId,
}) => {
  const { currentUser } = useAuth();
  const existing = editingEventId ? dbService.getEventById(editingEventId) : undefined;

  const [title, setTitle] = useState(existing?.title || '');
  const [description, setDescription] = useState(existing?.description || '');
  const [categoryId, setCategoryId] = useState<number>(existing?.category_id || 1);
  const [venueId, setVenueId] = useState<number>(existing?.venue_id || 1);
  const [startTime, setStartTime] = useState(
    existing?.start_time ? existing.start_time.slice(0, 16) : '2026-11-20T18:00'
  );
  const [endTime, setEndTime] = useState(
    existing?.end_time ? existing.end_time.slice(0, 16) : '2026-11-20T21:00'
  );
  const [deadline, setDeadline] = useState(
    existing?.registration_deadline ? existing.registration_deadline.slice(0, 16) : '2026-11-19T23:59'
  );
  const [capacity, setCapacity] = useState<number>(existing?.capacity || 100);
  const [posterUrl, setPosterUrl] = useState(
    existing?.poster_url || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800'
  );
  const [isOnlineRegistrationEnabled, setIsOnlineRegistrationEnabled] = useState(
    existing?.is_online_registration_enabled ?? true
  );

  const [error, setError] = useState<string | null>(null);

  const venues = dbService.getVenues();
  const categories = dbService.getCategories();
  const selectedVenue = venues.find((v) => v.venue_id === venueId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!currentUser) return;

    if (!title.trim() || !description.trim()) {
      setError('Please provide a title and detailed description.');
      return;
    }

    if (selectedVenue && capacity > selectedVenue.capacity) {
      setError(
        `Trigger Constraint Violation: The event capacity (${capacity}) exceeds the maximum physical venue capacity of ${selectedVenue.capacity} seats for ${selectedVenue.name}.`
      );
      return;
    }

    try {
      if (editingEventId && existing) {
        const updated = dbService.updateEvent(
          editingEventId,
          {
            title,
            description,
            category_id: categoryId,
            venue_id: venueId,
            start_time: startTime,
            end_time: endTime,
            registration_deadline: deadline,
            capacity: Number(capacity),
            poster_url: posterUrl,
            is_online_registration_enabled: isOnlineRegistrationEnabled,
          },
          currentUser.email
        );
        onSuccess(updated.event_id);
      } else {
        const created = dbService.createEvent(
          {
            title,
            description,
            category_id: categoryId,
            venue_id: venueId,
            organizer_id: currentUser.user_id,
            start_time: startTime,
            end_time: endTime,
            registration_deadline: deadline,
            capacity: Number(capacity),
            poster_url: posterUrl,
            is_online_registration_enabled: isOnlineRegistrationEnabled,
            status: 'PUBLISHED',
            highlights: [
              'Interactive sessions with club officers',
              'Complimentary refreshments & badges',
              'Open networking round',
            ],
            features: ['Free Entry', 'Campus Verified', 'Direct Q&A'],
          },
          currentUser.email
        );
        onSuccess(created.event_id);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to save event to database.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F3E9] text-black pb-16">
      {/* Top Header */}
      <div className="border-b-2 border-black bg-white px-4 sm:px-8 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider hover:text-[#315CFF]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Cancel and return</span>
          </button>
          <span className="font-mono-tag text-xs font-bold uppercase text-neutral-500">
            {editingEventId ? `Edit Event #${editingEventId}` : 'New Event Submission'}
          </span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ========================================================
              LEFT COLUMN: COLLAGE ILLUSTRATION MATCHING SCREEN 5
              "CREATE EVENT" & Megaphone & Stickers
             ======================================================== */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#D8FF24] p-6 brutalist-border-thick brutalist-shadow-lg relative overflow-hidden">
              <div className="inline-block px-2.5 py-0.5 bg-black text-[#D8FF24] font-mono-tag text-[10px] font-bold uppercase mb-3">
                ★ PUBLISH &amp; INSPIRE
              </div>

              <h2 className="text-4xl sm:text-5xl font-display uppercase tracking-tight text-[#111111] leading-none mb-2">
                CREATE <br /> EVENT
              </h2>

              <p className="font-syne font-bold text-xs uppercase text-neutral-800 tracking-wide mb-6">
                Bring your ideas to screen.
              </p>

              {/* Megaphone and Stickers Graphic Area */}
              <div className="relative h-64 bg-white brutalist-border p-4 flex flex-col justify-between overflow-hidden">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 bg-[#FF5A4E] text-white flex items-center justify-center brutalist-border rotate-[-6deg]">
                    <Megaphone className="w-6 h-6" />
                  </div>
                  <div className="w-16 h-16 glass-bubble rounded-full opacity-90" />
                </div>

                <div className="self-end bg-[#FFDF38] text-black px-3 py-1 brutalist-border font-display text-[10px] uppercase rotate-3">
                  IDEAS TURN INTO EVENTS
                </div>

                <div className="pt-4 border-t border-neutral-200">
                  <span className="font-mono-tag text-[10px] font-bold uppercase text-neutral-500 block">
                    Campus Database Rule:
                  </span>
                  <p className="text-[11px] text-neutral-700 mt-0.5 font-medium">
                    Event capacity is verified against physical venue limits via triggers.
                  </p>
                </div>
              </div>
            </div>

            {/* Selected Venue Capacity Info Card */}
            {selectedVenue && (
              <div className="bg-white p-4 brutalist-border brutalist-shadow-sm text-xs space-y-1.5">
                <span className="font-mono-tag font-bold uppercase text-neutral-400">
                  Selected Venue Limits
                </span>
                <p className="font-display text-sm text-black uppercase">{selectedVenue.name}</p>
                <p className="text-neutral-600">Location: {selectedVenue.location}</p>
                <p className="font-mono-tag font-bold text-[#315CFF]">
                  Maximum Safe Capacity: {selectedVenue.capacity} seats
                </p>
              </div>
            )}
          </div>

          {/* ========================================================
              RIGHT COLUMN: EVENT DETAILS FORM
             ======================================================== */}
          <div className="lg:col-span-7 bg-white brutalist-border-thick brutalist-shadow p-6 md:p-8">
            <h3 className="font-display text-2xl uppercase tracking-tight mb-6 pb-2 border-b-2 border-black">
              Event Details
            </h3>

            {error && (
              <div className="mb-6 p-4 bg-[#FF5A4E]/15 border-2 border-[#FF5A4E] text-xs font-bold text-[#FF5A4E] flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase mb-1">Event Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. After Hours: Campus Music Night"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F7F3E9] brutalist-border text-sm font-semibold focus:outline-none focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Category *</label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-[#F7F3E9] brutalist-border text-xs font-bold focus:outline-none focus:bg-white"
                  >
                    {categories.map((c) => (
                      <option key={c.category_id} value={c.category_id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Campus Venue *</label>
                  <select
                    value={venueId}
                    onChange={(e) => setVenueId(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-[#F7F3E9] brutalist-border text-xs font-bold focus:outline-none focus:bg-white"
                  >
                    {venues.map((v) => (
                      <option key={v.venue_id} value={v.venue_id}>
                        {v.name} (Max {v.capacity} seats)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Start Date &amp; Time *</label>
                  <input
                    type="datetime-local"
                    required
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full px-3.5 py-2 bg-[#F7F3E9] brutalist-border text-xs font-medium focus:outline-none focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase mb-1">End Date &amp; Time *</label>
                  <input
                    type="datetime-local"
                    required
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full px-3.5 py-2 bg-[#F7F3E9] brutalist-border text-xs font-medium focus:outline-none focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1">Registration Deadline *</label>
                <input
                  type="datetime-local"
                  required
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full px-3.5 py-2 bg-[#F7F3E9] brutalist-border text-xs font-medium focus:outline-none focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1">
                  Target Seat Capacity *
                  {selectedVenue && (
                    <span className="text-neutral-500 font-normal ml-2">
                      (Venue limit: {selectedVenue.capacity})
                    </span>
                  )}
                </label>
                <input
                  type="number"
                  required
                  min={1}
                  max={selectedVenue ? selectedVenue.capacity : 1000}
                  value={capacity}
                  onChange={(e) => setCapacity(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-[#F7F3E9] brutalist-border text-sm font-semibold focus:outline-none focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1">Description *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe what your event is about, schedule, guest speakers..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3 bg-[#F7F3E9] brutalist-border text-xs font-medium focus:outline-none focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1">Poster Image URL</label>
                <input
                  type="url"
                  value={posterUrl}
                  onChange={(e) => setPosterUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2 bg-[#F7F3E9] brutalist-border text-xs focus:outline-none focus:bg-white"
                />
                <div className="flex gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() =>
                      setPosterUrl('https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800')
                    }
                    className="px-2 py-1 bg-neutral-100 brutalist-border text-[10px] font-bold"
                  >
                    Music Preset
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setPosterUrl('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800')
                    }
                    className="px-2 py-1 bg-neutral-100 brutalist-border text-[10px] font-bold"
                  >
                    Hackathon Preset
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setPosterUrl('https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800')
                    }
                    className="px-2 py-1 bg-neutral-100 brutalist-border text-[10px] font-bold"
                  >
                    Workshop Preset
                  </button>
                </div>
              </div>

              {/* Toggle Enable Online Registration */}
              <div className="p-3 bg-[#F7F3E9] brutalist-border flex items-center justify-between">
                <div>
                  <p className="font-bold text-xs uppercase">Enable Online Student Registration</p>
                  <p className="text-[10px] text-neutral-600">
                    Students will be able to RSVP directly with atomic seat reservation
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={isOnlineRegistrationEnabled}
                  onChange={(e) => setIsOnlineRegistrationEnabled(e.target.checked)}
                  className="w-5 h-5 accent-[#111111]"
                />
              </div>

              {/* Form Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t-2 border-black">
                <button
                  type="button"
                  onClick={onBack}
                  className="px-5 py-2.5 bg-neutral-100 text-black font-display uppercase text-xs brutalist-border"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#D8FF24] hover:bg-[#c9f010] text-black font-display uppercase text-xs brutalist-border brutalist-shadow-sm"
                >
                  {editingEventId ? 'Save Changes' : 'Create Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
