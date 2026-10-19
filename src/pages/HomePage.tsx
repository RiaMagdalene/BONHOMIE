import React from 'react';
import { dbService } from '../services/db';
import { EventItem } from '../types';
import { ArrowRight, Sparkles, MapPin, Calendar, Clock, Star, Megaphone, Laptop, Compass, Heart, Users } from 'lucide-react';

interface HomePageProps {
  onNavigate: (tab: string, eventId?: number) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const events = dbService.getEvents().slice(0, 4);
  const categories = dbService.getCategories();

  return (
    <div className="min-h-screen bg-[#F7F3E9] text-[#111111] overflow-hidden">
      {/* ========================================================
          HERO SECTION — EXACT MATCH TO SCREENSHOT 2
          Headline: "There's more to campus."
          Stickers, Collage Artwork, Marquee, Glossy Bubbles
         ======================================================== */}
      <section className="relative px-4 sm:px-8 pt-8 pb-16 md:pt-12 md:pb-24 border-b-2 border-black bg-[#F7F3E9] overflow-hidden">
        {/* Subtle decorative grid background pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#000 1.5px, transparent 1.5px)`,
            backgroundSize: '24px 24px',
          }}
        />

        {/* Floating Glossy 3D Bubbles */}
        <div className="absolute top-12 left-6 md:left-24 w-20 h-20 md:w-28 md:h-28 glass-bubble pointer-events-none opacity-90 animate-pulse duration-1000 hidden sm:block" />
        <div className="absolute top-28 right-8 md:right-32 w-16 h-16 md:w-24 md:h-24 glass-bubble-lime pointer-events-none opacity-85 hidden sm:block" />
        <div className="absolute bottom-16 right-1/4 w-14 h-14 glass-bubble pointer-events-none opacity-75 hidden md:block" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Top Left Sticker: "new people, new experiences, same you, just happier" */}
          <div className="hidden lg:block absolute -top-4 left-0 -rotate-6 transform">
            <div className="font-syne text-xs uppercase font-extrabold tracking-tight text-neutral-800 leading-snug">
              <span>new people</span>
              <br />
              <span className="text-[#315CFF]">new experiences</span>
              <br />
              <span>same you,</span>
              <br />
              <span className="italic underline decoration-[#D8FF24] decoration-2">just happier</span>
            </div>
            <div className="w-6 h-6 text-neutral-700 ml-6 -mt-1 font-bold text-lg">✦</div>
          </div>

          {/* Top Right Sticker: "workshops, hackathons, cultural fests, talks & more..." */}
          <div className="hidden lg:block absolute -top-2 right-4 rotate-3 transform text-right">
            <div className="inline-block p-1 bg-[#D8FF24] brutalist-border text-black font-mono-tag text-xs font-black uppercase mb-1">
              ★ CAMPUS PULSE
            </div>
            <div className="font-syne text-xs uppercase font-extrabold text-neutral-700 leading-tight">
              workshops <br />
              hackathons <br />
              cultural fests <br />
              talks <br />
              <span className="text-black">&amp; more... ☻</span>
            </div>
          </div>

          {/* Center Main Headline from Screenshot: "There's more to campus." */}
          <div className="text-center max-w-4xl mx-auto mt-4 mb-4">
            <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[6.5rem] font-display uppercase tracking-tight text-[#111111] leading-[0.94] break-words">
              There&apos;s more <br />
              <span className="relative inline-block">
                to campus.
                {/* Yellow star accent */}
                <span className="absolute -top-2 -right-6 sm:-top-3 sm:-right-8 text-[#FFDF38] text-3xl sm:text-5xl md:text-6xl select-none font-sans drop-shadow-[2px_2px_0px_#000]">
                  ★
                </span>
              </span>
            </h1>

            {/* Supporting Tagline & Subtext */}
            <p className="mt-6 text-base sm:text-lg md:text-xl font-medium text-neutral-700 max-w-2xl mx-auto leading-relaxed">
              <span className="font-bold text-black">Find your people. Share the moment.</span>
              <br />
              Discover workshops, hackathons, cultural fests and the people who make them unforgettable.
            </p>

            {/* CTA Button matching mockup: Lime button with Arrow */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => onNavigate('events')}
                className="px-8 py-4 bg-[#D8FF24] hover:bg-[#c9f010] text-[#111111] font-display uppercase tracking-wider text-sm sm:text-base brutalist-border-thick brutalist-shadow brutalist-shadow-hover flex items-center gap-3 transition-transform cursor-pointer"
              >
                <span>FIND YOUR NEXT EVENT</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => onNavigate('about')}
                className="px-6 py-4 bg-white hover:bg-neutral-50 text-black font-syne font-bold uppercase text-xs sm:text-sm brutalist-border brutalist-shadow-sm transition-transform cursor-pointer"
              >
                Learn About BonHomie
              </button>
            </div>
          </div>

          {/* ========================================================
              CAMPUS COLLAGE COMPOSITION (Matching Image 2 exactly)
              Left: Megaphone, Laptop </>, Books "LEARN CREATE CONNECT", Yellow Badge "GOOD VIBES GREAT EVENTS"
              Center: Clocktower & Student crowd illustration
              Right: Directional Signpost, Yellow marquee "CAMPUS FEST :)"
             ======================================================== */}
          <div className="mt-12 relative w-full rounded-2xl brutalist-border-thick bg-[#EBE5D6] overflow-hidden p-6 md:p-10 brutalist-shadow-lg">
            {/* Collage Background Elements */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-10">
              {/* Left Column of Collage */}
              <div className="md:col-span-3 space-y-4">
                {/* Yellow Badge Sticker: GOOD VIBES GREAT EVENTS */}
                <div className="inline-block bg-[#FFDF38] text-black p-3 brutalist-border brutalist-shadow-sm -rotate-3 transform">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">☻</span>
                    <span className="font-display text-xs uppercase leading-tight">
                      GOOD VIBES <br /> GREAT EVENTS
                    </span>
                  </div>
                </div>

                {/* Megaphone & Tech Illustration */}
                <div className="bg-white p-4 brutalist-border brutalist-shadow-sm rotate-1">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#315CFF] text-white flex items-center justify-center brutalist-border">
                      <Laptop className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-mono-tag font-bold text-xs uppercase">&lt;24h / HACKS&gt;</p>
                      <p className="text-[11px] text-neutral-600">UN SDG Challenge</p>
                    </div>
                  </div>
                </div>

                {/* Sticker: LEARN CREATE CONNECT */}
                <div className="bg-[#FF5A4E] text-white p-3 brutalist-border brutalist-shadow-sm -rotate-2">
                  <p className="font-display text-xs uppercase tracking-wide">
                    LEARN • CREATE • CONNECT
                  </p>
                </div>
              </div>

              {/* Center Column: Iconic Clocktower & Walking Students Illustration Banner */}
              <div className="md:col-span-6 relative flex flex-col items-center justify-center text-center">
                <div className="relative w-full rounded-xl overflow-hidden brutalist-border bg-[#F7F3E9] p-4">
                  <img
                    src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=900"
                    alt="Campus Clocktower & Students"
                    className="w-full h-56 md:h-72 object-cover rounded-lg filter contrast-125 saturate-150"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4 text-left">
                    <span className="inline-block self-start px-2 py-0.5 bg-[#D8FF24] text-black font-mono-tag font-bold text-[10px] uppercase mb-1">
                      Central Campus
                    </span>
                    <h3 className="text-white font-display text-xl uppercase tracking-tight">
                      Central Lawn &amp; Open Air Grounds
                    </h3>
                    <p className="text-neutral-200 text-xs">
                      Where 4,000+ students gather each semester.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Directional Signpost & Ribbon */}
              <div className="md:col-span-3 space-y-4">
                {/* Directional Signpost */}
                <div className="bg-black text-[#D8FF24] p-4 brutalist-border brutalist-shadow-sm rotate-2">
                  <div className="space-y-1.5 text-xs font-display uppercase tracking-wider">
                    <div className="border-b border-neutral-700 pb-1 flex items-center justify-between">
                      <span>WORKSHOPS</span> <span>➔</span>
                    </div>
                    <div className="border-b border-neutral-700 pb-1 flex items-center justify-between">
                      <span>HACKATHONS</span> <span>➔</span>
                    </div>
                    <div className="border-b border-neutral-700 pb-1 flex items-center justify-between">
                      <span>CULTURAL FESTS</span> <span>➔</span>
                    </div>
                    <div className="border-b border-neutral-700 pb-1 flex items-center justify-between">
                      <span>TALKS &amp; SPORTS</span> <span>➔</span>
                    </div>
                  </div>
                </div>

                {/* Marquee Ribbon: CAMPUS FEST */}
                <div className="bg-[#D8FF24] text-black px-4 py-2 brutalist-border font-display text-xs uppercase flex items-center justify-between -rotate-1">
                  <span>CAMPUS FEST 2026</span>
                  <span className="text-base">☻</span>
                </div>

                <div className="bg-[#A9A2FF] text-black p-3 brutalist-border rotate-1 text-xs font-bold">
                  <p className="font-mono-tag uppercase">⚡ 100% Free Entry</p>
                  <p className="text-[10px] text-neutral-800">For all enrolled university students</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          CATEGORY DISCOVERY STRIP
         ======================================================== */}
      <section className="bg-black text-white py-6 border-b-2 border-black overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-4 min-w-max">
          <span className="font-mono-tag text-xs uppercase text-[#D8FF24] font-bold tracking-widest flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" /> EXPLORE BY CATEGORY:
          </span>
          <div className="flex items-center gap-3">
            {categories.map((c) => (
              <button
                key={c.category_id}
                onClick={() => onNavigate('events')}
                className="px-4 py-1.5 brutalist-border text-xs font-bold uppercase transition-all bg-neutral-900 hover:bg-[#D8FF24] hover:text-black hover:-translate-y-0.5"
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          FEATURED UPCOMING EVENTS (Matches Screen 1 of Mockups)
         ======================================================== */}
      <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-block px-3 py-1 bg-[#D8FF24] text-black font-mono-tag font-bold text-xs uppercase brutalist-border mb-2">
              ★ Curated Lineup
            </div>
            <h2 className="text-3xl sm:text-5xl font-display uppercase tracking-tight">
              Featured Events
            </h2>
            <p className="text-neutral-600 text-sm mt-1">
              Live capacity tracking with atomic transaction safety.
            </p>
          </div>

          <button
            onClick={() => onNavigate('events')}
            className="self-start sm:self-auto px-5 py-2.5 bg-black text-[#D8FF24] font-display uppercase text-xs brutalist-border brutalist-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5 transition-transform flex items-center gap-2"
          >
            <span>View All Events</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event) => (
            <div
              key={event.event_id}
              className="bg-white brutalist-border-thick brutalist-shadow brutalist-shadow-hover flex flex-col h-full group"
            >
              {/* Event Poster Image */}
              <div className="relative h-48 overflow-hidden border-b-2 border-black bg-neutral-100">
                <img
                  src={event.poster_url}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span
                    className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider brutalist-border text-white shadow-sm"
                    style={{ backgroundColor: event.category_id === 1 ? '#FF5A4E' : event.category_id === 2 ? '#315CFF' : '#52D6B0', color: event.category_id === 3 ? '#000' : '#fff' }}
                  >
                    {event.category_name}
                  </span>
                </div>

                {/* Capacity Status Badge */}
                <div className="absolute bottom-3 right-3">
                  <span
                    className={`px-2 py-0.5 text-[10px] font-mono-tag font-bold uppercase brutalist-border ${
                      event.is_full
                        ? 'bg-[#FF5A4E] text-white'
                        : 'bg-[#D8FF24] text-black'
                    }`}
                  >
                    {event.is_full ? 'SOLD OUT' : `${event.available_seats} spots left`}
                  </span>
                </div>
              </div>

              {/* Event Content */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-lg uppercase tracking-tight group-hover:text-[#315CFF] transition-colors line-clamp-1">
                    {event.title}
                  </h3>
                  <p className="text-xs text-neutral-600 line-clamp-2 mt-1">
                    {event.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-200 space-y-1.5 text-xs text-neutral-700">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                    <span>{new Date(event.start_time).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                    <span className="truncate">{event.venue_name}</span>
                  </div>
                </div>

                <div className="mt-4 pt-2">
                  <button
                    onClick={() => onNavigate('event-detail', event.event_id)}
                    className="w-full py-2 bg-[#F7F3E9] group-hover:bg-[#D8FF24] text-black font-display uppercase text-xs brutalist-border transition-colors flex items-center justify-center gap-1"
                  >
                    <span>View &amp; Register</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          COMMUNITY STORY STRIP (Matches Screen 6: NOT JUST EVENTS. YOUR PEOPLE.)
         ======================================================== */}
      <section className="bg-[#111111] text-white py-16 px-4 sm:px-8 border-y-2 border-black relative overflow-hidden">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-block px-3 py-1 bg-[#D8FF24] text-black font-mono-tag font-bold text-xs uppercase brutalist-border">
              ★ CAMPUS ETHOS
            </div>
            <h2 className="text-4xl sm:text-6xl font-display uppercase leading-tight tracking-tight text-[#FFFDF6]">
              Not just events. <br />
              <span className="text-[#D8FF24] underline decoration-wavy decoration-[#FF5A4E]">
                Your people.
              </span>
            </h2>
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed max-w-xl">
              BonHomie is more than a discovery app — it&apos;s a shared campus hub where ideas turn into teams, acoustic sessions turn into lifelong friendships, and quiet study halls turn into vibrant community fests.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <span className="px-3 py-1 bg-neutral-900 brutalist-border text-xs font-mono-tag text-[#52D6B0]">
                ✓ Verified Student Clubs
              </span>
              <span className="px-3 py-1 bg-neutral-900 brutalist-border text-xs font-mono-tag text-[#FFDF38]">
                ✓ Transaction-Safe Capacity
              </span>
              <span className="px-3 py-1 bg-neutral-900 brutalist-border text-xs font-mono-tag text-[#A9A2FF]">
                ✓ Realtime Student Calendar
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="p-6 bg-[#A9A2FF] text-black brutalist-border-thick brutalist-shadow-lime rotate-2">
              <div className="flex items-center justify-between mb-4">
                <span className="font-display text-sm uppercase">Join Campus Hub</span>
                <Sparkles className="w-5 h-5 text-black" />
              </div>
              <p className="font-syne font-bold text-lg mb-4">
                &ldquo;Came for the hackathon snacks, ended up founding a startup with my teammate.&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-black text-[#D8FF24] flex items-center justify-center font-bold text-base">
                  ⚡
                </div>
                <div>
                  <p className="font-bold text-xs">Campus Community Member</p>
                  <p className="text-[10px] text-neutral-800">Student &bull; Class of &apos;26</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          BRUTALIST FOOTER
         ======================================================== */}
      <footer className="bg-[#F7F3E9] py-12 px-4 sm:px-8 border-t-2 border-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-display uppercase tracking-tight">bonhomie</span>
            <span className="text-xs text-neutral-500 font-mono-tag">
              &copy; 2026 BonHomie. Find your people. Share the moment.
            </span>
          </div>

          <div className="flex items-center gap-6 text-xs font-bold uppercase">
            <button onClick={() => onNavigate('events')} className="hover:text-[#315CFF] cursor-pointer">
              Directory
            </button>
            <button onClick={() => onNavigate('about')} className="hover:text-[#315CFF] cursor-pointer">
              About
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
