import React from 'react';
import { ArrowRight, Sparkles, Heart, Users, Compass, Laptop, Smile } from 'lucide-react';

interface AboutPageProps {
  onJoin: () => void;
  onExploreEvents: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onJoin, onExploreEvents }) => {
  return (
    <div className="min-h-screen bg-[#F7F3E9] text-black pb-20">
      {/* ========================================================
          HERO BANNER & COLLAGE MATCHING SCREEN 6 OF MOCKUP
          "not just events. your people."
         ======================================================== */}
      <section className="px-4 sm:px-8 pt-12 pb-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Huge Headline & Lavender Community Card */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-block px-3 py-1 bg-[#D8FF24] text-black font-mono-tag font-bold text-xs uppercase brutalist-border">
              ★ The Campus Story
            </div>

            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-display uppercase tracking-tight text-[#111111] leading-[0.92]">
              not just <br />
              events. <br />
              <span className="text-[#315CFF] underline decoration-[#FFDF38] decoration-4">
                your people.
              </span>
            </h1>

            {/* Lavender Description Card matching mockup */}
            <div className="p-6 bg-[#A9A2FF] text-black brutalist-border-thick brutalist-shadow-lg rotate-[-1deg] transform space-y-4">
              <p className="font-syne text-sm sm:text-base font-bold leading-relaxed">
                BonHomie is more than a platform — it&apos;s a shared heartbeat for our university. We bring together students&apos; creativity, curious minds and doers who make campus brighter, bolder and barrier-free.
              </p>

              <button
                onClick={onJoin}
                className="px-5 py-3 bg-[#D8FF24] hover:bg-[#cbf010] text-black font-display uppercase text-xs sm:text-sm brutalist-border brutalist-shadow-sm flex items-center gap-2 transition-transform cursor-pointer"
              >
                <span>JOIN OUR COMMUNITY</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Layered Collage Panels */}
          <div className="lg:col-span-5 relative space-y-4">
            {/* Top Photo Frame */}
            <div className="bg-white p-3 brutalist-border-thick brutalist-shadow rotate-2 transform">
              <img
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=700"
                alt="Campus architecture and courtyard"
                className="w-full h-52 object-cover brutalist-border"
              />
              <div className="pt-2 flex items-center justify-between font-mono-tag text-[10px] font-bold uppercase text-neutral-500">
                <span>CAMPUS QUAD &bull; FALL 2026</span>
                <span className="text-black">COMMUNITY &bull; MOMENTS</span>
              </div>
            </div>

            {/* Sticker Badges Row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#FFDF38] text-black p-4 brutalist-border rotate-[-3deg] text-xs">
                <p className="font-display uppercase text-sm leading-tight">
                  DIFFERENT PEOPLE <br /> SAME CAMPUS
                </p>
                <Smile className="w-5 h-5 mt-2" />
              </div>

              <div className="bg-black text-[#D8FF24] p-4 brutalist-border rotate-1 text-xs space-y-1">
                <p className="font-mono-tag font-bold uppercase">FIND FRIENDS</p>
                <p className="font-mono-tag font-bold uppercase">FIND OPPORTUNITIES</p>
                <p className="font-mono-tag font-bold uppercase text-white">FIND BONHOMIE</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Campus Pillars */}
      <section className="bg-white border-y-2 border-black py-16 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-mono-tag text-xs font-bold uppercase text-neutral-500">
              Core Principles
            </span>
            <h2 className="text-3xl sm:text-5xl font-display uppercase tracking-tight mt-1">
              Built by Students, for Students
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-[#F7F3E9] brutalist-border brutalist-shadow space-y-3">
              <div className="w-10 h-10 bg-[#FF5A4E] text-white flex items-center justify-center brutalist-border font-bold">
                01
              </div>
              <h3 className="font-display text-lg uppercase tracking-tight">Zero Fluff Discovery</h3>
              <p className="text-xs text-neutral-700 leading-relaxed">
                No scattered WhatsApp forwards or expired flyers. Every verified club event has an official venue, real-time seat tracking, and instant registration.
              </p>
            </div>

            <div className="p-6 bg-[#F7F3E9] brutalist-border brutalist-shadow space-y-3">
              <div className="w-10 h-10 bg-[#315CFF] text-white flex items-center justify-center brutalist-border font-bold">
                02
              </div>
              <h3 className="font-display text-lg uppercase tracking-tight">Atomic Concurrency</h3>
              <p className="text-xs text-neutral-700 leading-relaxed">
                Powered by transaction row-locks (`SELECT ... FOR UPDATE`), you never experience double-booked seats or over-capacity overcrowding.
              </p>
            </div>

            <div className="p-6 bg-[#F7F3E9] brutalist-border brutalist-shadow space-y-3">
              <div className="w-10 h-10 bg-[#52D6B0] text-black flex items-center justify-center brutalist-border font-bold">
                03
              </div>
              <h3 className="font-display text-lg uppercase tracking-tight">Respectful Policies</h3>
              <p className="text-xs text-neutral-700 leading-relaxed">
                Fair 24-hour cancellation cutoffs protect organizers, while soft-hide capabilities keep student history tidy without altering database audit trails.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Banner */}
      <div className="bg-[#D8FF24] border-b-2 border-black py-4 px-4 overflow-hidden">
        <div className="flex items-center justify-around font-display uppercase text-sm tracking-wider text-black">
          <span>WORKSHOPS</span>
          <span>&bull;</span>
          <span>HACKATHONS</span>
          <span>&bull;</span>
          <span>CULTURAL FESTS</span>
          <span>&bull;</span>
          <span>TALKS</span>
          <span>&bull;</span>
          <span>SPORTS &amp; MORE...</span>
        </div>
      </div>
    </div>
  );
};
