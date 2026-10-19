import React, { useState } from 'react';
import { dbService } from '../services/db';
import { EventItem } from '../types';
import { Search, Calendar, MapPin, Sparkles, Filter, Users, ArrowRight } from 'lucide-react';

interface EventsPageProps {
  onSelectEvent: (eventId: number) => void;
}

export const EventsPage: React.FC<EventsPageProps> = ({ onSelectEvent }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<'all' | 'this-week' | 'this-month'>('all');

  const categories = dbService.getCategories();
  let events = dbService.getEvents({
    categorySlug: selectedCategory,
    searchQuery: searchQuery,
  });

  return (
    <div className="min-h-screen bg-[#F7F3E9] text-black">
      {/* ========================================================
          HERO BANNER MATCHING SCREEN 1 OF COLLAGE MOCKUP
          "Find your next event. ★"
         ======================================================== */}
      <div className="bg-[#D8FF24] border-b-2 border-black px-4 sm:px-8 py-10 md:py-14 relative overflow-hidden">
        {/* Floating background stickers */}
        <div className="absolute top-4 right-8 w-16 h-16 md:w-20 md:h-20 glass-bubble opacity-80 pointer-events-none hidden sm:block" />
        <div className="absolute bottom-2 right-1/4 -rotate-6 bg-black text-[#D8FF24] px-3 py-1 font-mono-tag font-bold text-xs brutalist-border hidden md:block">
          ⚡ 100% VERIFIED CAMPUS EVENTS
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="inline-block px-2.5 py-0.5 bg-black text-[#D8FF24] font-mono-tag text-xs font-bold uppercase mb-3">
            Campus Discovery
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-display uppercase tracking-tight leading-none text-[#111111]">
            Find your next <br className="hidden sm:inline" />
            event. <span className="text-[#315CFF]">★</span>
          </h1>

          <p className="mt-3 text-sm sm:text-base font-medium text-neutral-800 max-w-xl">
            Workshops, hackathons, cultural fests, talks and more — all in one place.
          </p>

          {/* Search bar inside hero banner matching mockup */}
          <div className="mt-8 max-w-2xl">
            <div className="relative flex items-center bg-white brutalist-border-thick brutalist-shadow">
              <Search className="w-5 h-5 text-neutral-500 ml-4 shrink-0" />
              <input
                type="text"
                placeholder="Search events, clubs, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-3.5 px-3 text-sm sm:text-base bg-transparent font-medium focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-3 py-1 mr-2 text-xs font-bold uppercase bg-neutral-200 hover:bg-neutral-300"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          CATEGORY FILTERS & CONTROLS STRIP
         ======================================================== */}
      <div className="border-b-2 border-black bg-white px-4 sm:px-8 py-4 sticky top-[61px] z-30">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 text-xs font-bold uppercase brutalist-border transition-all whitespace-nowrap ${
                selectedCategory === 'all'
                  ? 'bg-[#111111] text-[#D8FF24] brutalist-shadow-sm'
                  : 'bg-[#F7F3E9] text-black hover:bg-[#D8FF24]'
              }`}
            >
              All
            </button>
            {categories.map((c) => (
              <button
                key={c.category_id}
                onClick={() => setSelectedCategory(c.slug)}
                className={`px-3.5 py-1.5 text-xs font-bold uppercase brutalist-border transition-all whitespace-nowrap ${
                  selectedCategory === c.slug
                    ? 'bg-[#111111] text-[#D8FF24] brutalist-shadow-sm'
                    : 'bg-[#F7F3E9] text-black hover:bg-[#D8FF24]'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>

          {/* Quick Stats Indicator */}
          <div className="text-xs font-mono-tag font-bold text-neutral-600 flex items-center gap-2 shrink-0">
            <span>Showing {events.length} campus event(s)</span>
          </div>
        </div>
      </div>

      {/* ========================================================
          EVENT CARDS GRID (Matches Mockup Layout)
         ======================================================== */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10">
        {events.length === 0 ? (
          <div className="text-center py-16 bg-white brutalist-border p-8">
            <div className="text-4xl mb-3">🔍</div>
            <h3 className="font-display text-xl uppercase">No events matched your search</h3>
            <p className="text-neutral-600 text-sm mt-1 max-w-md mx-auto">
              Try adjusting your search terms or clearing the category filter to see more upcoming events.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-4 px-4 py-2 bg-[#D8FF24] text-black font-display uppercase text-xs brutalist-border"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div
                key={event.event_id}
                className="bg-white brutalist-border-thick brutalist-shadow brutalist-shadow-hover flex flex-col justify-between group overflow-hidden"
              >
                <div>
                  {/* Poster Image Container */}
                  <div className="relative h-48 sm:h-52 overflow-hidden border-b-2 border-black bg-neutral-200">
                    <img
                      src={event.poster_url}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Category Label Chip */}
                    <div className="absolute top-3 left-3">
                      <span
                        className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider brutalist-border text-white shadow-sm"
                        style={{
                          backgroundColor:
                            event.category_id === 1
                              ? '#FF5A4E'
                              : event.category_id === 2
                              ? '#315CFF'
                              : event.category_id === 3
                              ? '#52D6B0'
                              : '#FFDF38',
                          color: event.category_id === 3 || event.category_id === 4 ? '#000' : '#fff',
                        }}
                      >
                        {event.category_name}
                      </span>
                    </div>

                    {/* Capacity Badge */}
                    <div className="absolute bottom-3 right-3">
                      <span
                        className={`px-2 py-0.5 text-[10px] font-mono-tag font-bold uppercase brutalist-border ${
                          event.is_full
                            ? 'bg-[#FF5A4E] text-white'
                            : 'bg-[#D8FF24] text-black'
                        }`}
                      >
                        {event.is_full ? 'FULL' : `${event.available_seats} / ${event.capacity} spots`}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5">
                    <div className="text-[11px] font-mono-tag font-bold text-neutral-500 mb-1 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>
                        {new Date(event.start_time).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                        })}{' '}
                        &bull;{' '}
                        {new Date(event.start_time).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>

                    <h3 className="font-display text-xl uppercase tracking-tight leading-snug group-hover:text-[#315CFF] transition-colors">
                      {event.title}
                    </h3>

                    <p className="text-xs text-neutral-600 line-clamp-2 mt-2 leading-relaxed">
                      {event.description}
                    </p>

                    <div className="mt-4 pt-3 border-t border-neutral-200 flex items-center justify-between text-xs text-neutral-700">
                      <div className="flex items-center gap-1.5 truncate">
                        <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                        <span className="truncate">{event.venue_name}</span>
                      </div>
                      <span className="text-[10px] uppercase font-bold text-neutral-400 shrink-0">
                        {event.organizer_org}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Button */}
                <div className="p-4 pt-0">
                  <button
                    onClick={() => onSelectEvent(event.event_id)}
                    className="w-full py-2.5 bg-[#F7F3E9] group-hover:bg-[#D8FF24] text-black font-display uppercase text-xs brutalist-border transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>View Event Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ========================================================
          PURPLE BOTTOM STICKER BAND (Matches Mockup: "GOOD VIBES ONLY")
         ======================================================== */}
      <div className="bg-[#A9A2FF] border-t-2 border-black py-4 px-4 text-center">
        <div className="flex items-center justify-center gap-3">
          <span className="font-display text-sm md:text-base uppercase tracking-widest text-black">
            ✦ GOOD VIBES ONLY ✦ CAMPUS COLLABORATION ✦ REAL PEOPLE ✦
          </span>
        </div>
      </div>
    </div>
  );
};
