import React, { useState } from 'react';
import { dbService } from '../services/db';
import { useAuth } from '../context/AuthContext';
import { Registration } from '../types';
import {
  ArrowLeft,
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Users,
  CheckCircle2,
  XCircle,
  Download,
} from 'lucide-react';

interface AttendeeListPageProps {
  eventId: number;
  onBack: () => void;
}

export const AttendeeListPage: React.FC<AttendeeListPageProps> = ({ eventId, onBack }) => {
  const { currentUser } = useAuth();
  const event = dbService.getEventById(eventId);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const nav = dbService.getRecordNavigation('REGISTRATIONS', {
    eventId,
    searchQuery,
  });

  const totalRecords = nav.total;
  const currentRecord: Registration | null = nav.getAtIndex(currentIndex);

  const goToFirst = () => setCurrentIndex(0);
  const goToLast = () => setCurrentIndex(Math.max(0, totalRecords - 1));
  const goToPrevious = () => setCurrentIndex((prev) => Math.max(0, prev - 1));
  const goToNext = () => setCurrentIndex((prev) => Math.min(totalRecords - 1, prev + 1));

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
            <span>Back to Organizer Dashboard</span>
          </button>
          <span className="font-mono-tag text-xs font-bold uppercase text-neutral-500">
            Attendee Directory &bull; Record Navigation
          </span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-8">
        {/* Event Header Card */}
        <div className="bg-[#D8FF24] p-6 brutalist-border-thick brutalist-shadow mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="inline-block px-2.5 py-0.5 bg-black text-[#D8FF24] font-mono-tag text-xs font-bold uppercase mb-1">
              Attendee Roster
            </span>
            <h1 className="text-2xl sm:text-4xl font-display uppercase tracking-tight text-black">
              {event?.title || `Event #${eventId}`}
            </h1>
            <p className="text-xs font-medium text-neutral-800 mt-1">
              Venue: {event?.venue_name} &bull; Capacity: {event?.capacity} &bull; Registered: {totalRecords}
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs font-mono-tag font-bold uppercase block text-neutral-700">
              Seat Fill Rate
            </span>
            <div className="text-3xl font-display">
              {event ? Math.round((totalRecords / event.capacity) * 100) : 0}%
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-4 brutalist-border brutalist-shadow-sm mb-6 flex items-center gap-3">
          <Search className="w-4 h-4 text-neutral-400 shrink-0" />
          <input
            type="text"
            placeholder="Search attendee by name, student email, or roll number..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentIndex(0);
            }}
            className="w-full text-xs font-medium bg-transparent focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                setCurrentIndex(0);
              }}
              className="text-xs font-bold uppercase px-2 py-1 bg-neutral-200"
            >
              Clear
            </button>
          )}
        </div>

        {/* Record Navigator */}
        <div className="bg-white p-5 brutalist-border-thick brutalist-shadow mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-black">
            <div>
              <h3 className="font-display text-base uppercase tracking-tight">
                Single Record Inspector
              </h3>
              <p className="text-xs text-neutral-600">
                Browse through registered attendees record by record (First, Previous, Next, Last).
              </p>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center gap-1.5 self-center">
              <button
                onClick={goToFirst}
                disabled={currentIndex === 0 || totalRecords === 0}
                className="px-2.5 py-1.5 bg-[#F7F3E9] hover:bg-[#D8FF24] disabled:opacity-40 disabled:hover:bg-[#F7F3E9] brutalist-border text-xs font-bold flex items-center gap-1"
                title="View First Record"
              >
                <ChevronsLeft className="w-4 h-4" />
                <span className="hidden sm:inline">First</span>
              </button>

              <button
                onClick={goToPrevious}
                disabled={currentIndex === 0 || totalRecords === 0}
                className="px-2.5 py-1.5 bg-[#F7F3E9] hover:bg-[#D8FF24] disabled:opacity-40 disabled:hover:bg-[#F7F3E9] brutalist-border text-xs font-bold flex items-center gap-1"
                title="View Previous Record"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Prev</span>
              </button>

              <span className="px-3 py-1 font-mono-tag font-bold text-xs bg-neutral-100 brutalist-border">
                {totalRecords > 0 ? `${currentIndex + 1} of ${totalRecords}` : '0 of 0'}
              </span>

              <button
                onClick={goToNext}
                disabled={currentIndex >= totalRecords - 1 || totalRecords === 0}
                className="px-2.5 py-1.5 bg-[#F7F3E9] hover:bg-[#D8FF24] disabled:opacity-40 disabled:hover:bg-[#F7F3E9] brutalist-border text-xs font-bold flex items-center gap-1"
                title="View Next Record"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={goToLast}
                disabled={currentIndex >= totalRecords - 1 || totalRecords === 0}
                className="px-2.5 py-1.5 bg-[#F7F3E9] hover:bg-[#D8FF24] disabled:opacity-40 disabled:hover:bg-[#F7F3E9] brutalist-border text-xs font-bold flex items-center gap-1"
                title="View Last Record"
              >
                <span className="hidden sm:inline">Last</span>
                <ChevronsRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Current Inspected Record Card */}
          {currentRecord ? (
            <div className="mt-4 p-4 bg-[#F7F3E9] brutalist-border grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-[10px] font-mono-tag font-bold uppercase text-neutral-400 block">
                  Student Name
                </span>
                <p className="font-display text-sm uppercase text-black">
                  {currentRecord.student_name}
                </p>
                <p className="text-neutral-600">{currentRecord.student_email}</p>
              </div>

              <div>
                <span className="text-[10px] font-mono-tag font-bold uppercase text-neutral-400 block">
                  Academic Roll Number
                </span>
                <p className="font-mono-tag font-bold text-sm text-[#315CFF]">
                  {currentRecord.student_roll_number || '23CS1045'}
                </p>
                <p className="text-neutral-600">{currentRecord.student_dept || 'Engineering'}</p>
              </div>

              <div>
                <span className="text-[10px] font-mono-tag font-bold uppercase text-neutral-400 block">
                  Registration Timestamp
                </span>
                <p className="font-mono-tag font-bold text-neutral-800">
                  {new Date(currentRecord.registered_at).toLocaleString()}
                </p>
                <span className="inline-block mt-1 px-2 py-0.5 bg-[#52D6B0] text-black font-mono-tag font-bold text-[10px] brutalist-border">
                  {currentRecord.status}
                </span>
              </div>
            </div>
          ) : (
            <div className="p-6 text-center text-xs text-neutral-500">
              No attendee records found for this query.
            </div>
          )}
        </div>

        {/* Full Table View */}
        <div className="bg-white brutalist-border-thick brutalist-shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg uppercase tracking-tight">Full Attendee Roster</h3>
            <span className="font-mono-tag text-xs font-bold text-neutral-500">
              {nav.records.length} records in database
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b-2 border-black font-mono-tag uppercase text-[11px] text-neutral-600">
                  <th className="py-2.5 px-3">#</th>
                  <th className="py-2.5 px-3">Student Name</th>
                  <th className="py-2.5 px-3">Email Address</th>
                  <th className="py-2.5 px-3">Roll Number</th>
                  <th className="py-2.5 px-3">Registration Time</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {nav.records.map((r: Registration, idx: number) => (
                  <tr
                    key={r.registration_id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`cursor-pointer transition-colors ${
                      currentIndex === idx ? 'bg-[#D8FF24]/30 font-semibold' : 'hover:bg-neutral-50'
                    }`}
                  >
                    <td className="py-3 px-3 font-mono-tag font-bold">{idx + 1}</td>
                    <td className="py-3 px-3 font-bold">{r.student_name}</td>
                    <td className="py-3 px-3 text-neutral-600">{r.student_email}</td>
                    <td className="py-3 px-3 font-mono-tag text-[#315CFF]">
                      {r.student_roll_number || '23CS1045'}
                    </td>
                    <td className="py-3 px-3 text-neutral-600">
                      {new Date(r.registered_at).toLocaleDateString()} &bull;{' '}
                      {new Date(r.registered_at).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td className="py-3 px-3">
                      {r.status === 'CONFIRMED' ? (
                        <span className="px-2 py-0.5 bg-[#52D6B0] text-black font-mono-tag font-bold text-[10px] brutalist-border">
                          Confirmed
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 bg-[#FF5A4E] text-white font-mono-tag font-bold text-[10px] brutalist-border">
                          Cancelled
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
