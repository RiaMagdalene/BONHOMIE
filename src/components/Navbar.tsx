import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Calendar, PlusCircle, LogOut, ChevronDown, Shield, Users, User as UserIcon } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, setCurrentTab }) => {
  const { currentUser, logout, openAuthModal, switchDemoUser } = useAuth();
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#D8FF24] border-b-2 border-[#111111] px-4 md:px-8 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo matching the screenshot */}
        <button
          onClick={() => setCurrentTab('home')}
          className="flex items-center gap-2 group text-left cursor-pointer"
        >
          <div className="text-2xl md:text-3xl font-display uppercase tracking-tighter text-[#111111] group-hover:scale-105 transition-transform flex items-center gap-1.5">
            bonhomie
          </div>
        </button>

        {/* Center Nav Links (No 'For Organizers', no duplicate 'Join', no 'DB & GitHub Hub') */}
        <nav className="hidden md:flex items-center gap-6 font-semibold text-sm">
          <button
            onClick={() => setCurrentTab('events')}
            className={`transition-colors uppercase tracking-wider text-xs font-bold hover:text-black cursor-pointer ${
              currentTab === 'events' ? 'text-black border-b-2 border-black pb-0.5' : 'text-neutral-800'
            }`}
          >
            Events
          </button>

          <button
            onClick={() => setCurrentTab('about')}
            className={`transition-colors uppercase tracking-wider text-xs font-bold hover:text-black cursor-pointer ${
              currentTab === 'about' ? 'text-black border-b-2 border-black pb-0.5' : 'text-neutral-800'
            }`}
          >
            About
          </button>

          {/* Role-Specific Portal Links */}
          {currentUser?.role === 'STUDENT' && (
            <button
              onClick={() => setCurrentTab('student-dashboard')}
              className={`flex items-center gap-1.5 transition-colors uppercase tracking-wider text-xs font-bold cursor-pointer ${
                currentTab === 'student-dashboard'
                  ? 'text-black border-b-2 border-black pb-0.5'
                  : 'text-neutral-800 hover:text-black'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" /> My Calendar &amp; Events
            </button>
          )}

          {currentUser?.role === 'ORGANIZER' && (
            <>
              <button
                onClick={() => setCurrentTab('organizer-dashboard')}
                className={`flex items-center gap-1.5 transition-colors uppercase tracking-wider text-xs font-bold cursor-pointer ${
                  currentTab === 'organizer-dashboard'
                    ? 'text-black border-b-2 border-black pb-0.5'
                    : 'text-neutral-800 hover:text-black'
                }`}
              >
                <Users className="w-3.5 h-3.5" /> Organizer Dashboard
              </button>
              <button
                onClick={() => setCurrentTab('create-event')}
                className={`flex items-center gap-1.5 transition-colors uppercase tracking-wider text-xs font-bold cursor-pointer ${
                  currentTab === 'create-event'
                    ? 'text-black border-b-2 border-black pb-0.5'
                    : 'text-neutral-800 hover:text-black'
                }`}
              >
                <PlusCircle className="w-3.5 h-3.5" /> + Create Event
              </button>
            </>
          )}

          {currentUser?.role === 'ADMIN' && (
            <button
              onClick={() => setCurrentTab('admin-dashboard')}
              className={`flex items-center gap-1.5 transition-colors uppercase tracking-wider text-xs font-bold cursor-pointer ${
                currentTab === 'admin-dashboard'
                  ? 'text-black border-b-2 border-black pb-0.5'
                  : 'text-neutral-800 hover:text-black'
              }`}
            >
              <Shield className="w-3.5 h-3.5" /> Admin Portal
            </button>
          )}
        </nav>

        {/* Right Section: Single Auth Button (When logged out) or User Avatar & Role Switcher */}
        <div className="flex items-center gap-3">
          {!currentUser ? (
            /* Single 'Log in' button as requested */
            <button
              onClick={openAuthModal}
              className="px-5 py-2 bg-[#111111] hover:bg-neutral-800 text-[#D8FF24] font-display uppercase tracking-wide text-xs brutalist-border brutalist-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5 transition-transform cursor-pointer"
            >
              Log in
            </button>
          ) : (
            <div className="flex items-center gap-2 relative">
              {/* Profile Chip with Quick Role Switcher */}
              <div className="relative">
                <button
                  onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-[#FFFDF6] brutalist-border brutalist-shadow-sm hover:bg-white text-xs font-bold transition-colors cursor-pointer"
                >
                  <div className="w-6 h-6 rounded-full bg-[#111111] text-[#D8FF24] flex items-center justify-center text-xs font-mono-tag border border-black overflow-hidden">
                    {currentUser.role === 'STUDENT' ? '🎓' : currentUser.role === 'ORGANIZER' ? '🏛️' : '🛡️'}
                  </div>
                  <div className="text-left hidden sm:block">
                    <span className="block truncate max-w-[120px] leading-tight">
                      {currentUser.full_name}
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-neutral-500 font-mono-tag">
                      {currentUser.role}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-neutral-600" />
                </button>

                {/* Switch Account Dropdown */}
                {showRoleDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-white brutalist-border brutalist-shadow-lg p-2 z-50 animate-fade-in text-xs">
                    <div className="px-2 py-1.5 mb-1.5 border-b border-neutral-200">
                      <p className="font-bold text-neutral-900">{currentUser.full_name}</p>
                      <p className="text-[10px] text-neutral-500 truncate">{currentUser.email}</p>
                    </div>

                    <p className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                      Switch Role:
                    </p>

                    <button
                      onClick={() => {
                        switchDemoUser('STUDENT');
                        setShowRoleDropdown(false);
                      }}
                      className={`w-full text-left px-2 py-1.5 rounded flex items-center justify-between hover:bg-neutral-100 ${
                        currentUser.role === 'STUDENT' ? 'font-bold bg-[#D8FF24]/40' : ''
                      }`}
                    >
                      <span className="flex items-center gap-1.5">🎓 Student</span>
                      {currentUser.role === 'STUDENT' && <span className="text-[10px] text-neutral-500">Active</span>}
                    </button>

                    <button
                      onClick={() => {
                        switchDemoUser('ORGANIZER');
                        setShowRoleDropdown(false);
                      }}
                      className={`w-full text-left px-2 py-1.5 rounded flex items-center justify-between hover:bg-neutral-100 ${
                        currentUser.role === 'ORGANIZER' ? 'font-bold bg-[#D8FF24]/40' : ''
                      }`}
                    >
                      <span className="flex items-center gap-1.5">🏛️ Organizer</span>
                      {currentUser.role === 'ORGANIZER' && <span className="text-[10px] text-neutral-500">Active</span>}
                    </button>

                    <button
                      onClick={() => {
                        switchDemoUser('ADMIN');
                        setShowRoleDropdown(false);
                      }}
                      className={`w-full text-left px-2 py-1.5 rounded flex items-center justify-between hover:bg-neutral-100 ${
                        currentUser.role === 'ADMIN' ? 'font-bold bg-[#D8FF24]/40' : ''
                      }`}
                    >
                      <span className="flex items-center gap-1.5">🛡️ Administrator</span>
                      {currentUser.role === 'ADMIN' && <span className="text-[10px] text-neutral-500">Active</span>}
                    </button>

                    <div className="border-t border-neutral-200 mt-2 pt-1">
                      <button
                        onClick={() => {
                          logout();
                          setShowRoleDropdown(false);
                        }}
                        className="w-full text-left px-2 py-1.5 text-[#FF5A4E] hover:bg-red-50 flex items-center gap-1.5 font-bold cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" /> Log Out
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Direct Log Out Button */}
              <button
                onClick={logout}
                title="Log Out"
                className="p-1.5 bg-[#FFFDF6] brutalist-border brutalist-shadow-sm hover:bg-red-50 text-neutral-800 hover:text-[#FF5A4E] transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile nav bar row */}
      <div className="flex md:hidden items-center justify-between pt-2 border-t border-black/10 mt-2 overflow-x-auto gap-2 text-xs font-bold">
        <button
          onClick={() => setCurrentTab('events')}
          className={`px-2 py-1 uppercase whitespace-nowrap ${currentTab === 'events' ? 'bg-black text-[#D8FF24]' : ''}`}
        >
          Events
        </button>
        <button
          onClick={() => setCurrentTab('about')}
          className={`px-2 py-1 uppercase whitespace-nowrap ${currentTab === 'about' ? 'bg-black text-[#D8FF24]' : ''}`}
        >
          About
        </button>
        {currentUser?.role === 'STUDENT' && (
          <button
            onClick={() => setCurrentTab('student-dashboard')}
            className={`px-2 py-1 uppercase whitespace-nowrap ${currentTab === 'student-dashboard' ? 'bg-black text-[#D8FF24]' : ''}`}
          >
            My Calendar
          </button>
        )}
        {currentUser?.role === 'ORGANIZER' && (
          <button
            onClick={() => setCurrentTab('organizer-dashboard')}
            className={`px-2 py-1 uppercase whitespace-nowrap ${currentTab === 'organizer-dashboard' ? 'bg-black text-[#D8FF24]' : ''}`}
          >
            Dashboard
          </button>
        )}
        {currentUser?.role === 'ADMIN' && (
          <button
            onClick={() => setCurrentTab('admin-dashboard')}
            className={`px-2 py-1 uppercase whitespace-nowrap ${currentTab === 'admin-dashboard' ? 'bg-black text-[#D8FF24]' : ''}`}
          >
            Admin
          </button>
        )}
      </div>
    </header>
  );
};
