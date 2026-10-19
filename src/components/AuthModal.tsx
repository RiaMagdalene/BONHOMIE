import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { X, Sparkles, GraduationCap, Users, ShieldCheck, KeyRound, ArrowRight, Check } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, login, signup } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [role, setRole] = useState<UserRole>('STUDENT');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [department, setDepartment] = useState('Computer Science & Engineering');
  const [orgName, setOrgName] = useState('');
  const [error, setError] = useState('');

  if (!isAuthModalOpen) return null;

  const handleUseAccount = (sampleEmail: string, samplePass: string) => {
    setEmail(sampleEmail);
    setPassword(samplePass);
    setIsSignUp(false);
    setError('');
  };

  const handleDirectLogin = (sampleEmail: string) => {
    login(sampleEmail);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isSignUp) {
      if (!email.trim() || !fullName.trim()) {
        setError('Please enter your full name and campus email.');
        return;
      }
      try {
        signup(email.trim(), fullName.trim(), role, {
          roll_number: rollNumber || undefined,
          department,
          organization_name: orgName || undefined,
        });
      } catch (err: any) {
        setError(err.message || 'Failed to create account.');
      }
    } else {
      if (!email.trim()) {
        setError('Please enter your campus email address.');
        return;
      }
      const success = login(email.trim());
      if (!success) {
        setError('No account found matching this email. You can use the sample accounts on the side or create an account with Sign Up.');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#FFFDF6] brutalist-border-thick brutalist-shadow-lg text-black overflow-hidden flex flex-col md:flex-row max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-3 right-3 z-20 p-1.5 bg-[#D8FF24] brutalist-border brutalist-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5 transition-transform"
        >
          <X className="w-4 h-4 text-black" />
        </button>

        {/* ========================================================
            SIDE PANEL: SAMPLE ACCOUNTS (NO REAL PEOPLE PICS, NO "DEMO" MENTIONS)
           ======================================================== */}
        <div className="md:w-5/12 bg-[#F7F3E9] p-6 border-b-2 md:border-b-0 md:border-r-2 border-black flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#D8FF24] brutalist-border font-mono-tag text-[10px] font-bold uppercase mb-2">
              <Sparkles className="w-3 h-3" /> Quick Access
            </div>
            <h3 className="font-display text-lg uppercase tracking-tight text-black">
              Sample Accounts
            </h3>
            <p className="text-[11px] text-neutral-600 mt-1 leading-snug">
              Click any account below to autofill your credentials or log in instantly:
            </p>

            <div className="mt-4 space-y-2.5">
              {/* Student Sample */}
              <div
                onClick={() => handleUseAccount('student@bonhomie.edu', 'student123')}
                className="p-2.5 bg-white brutalist-border brutalist-shadow-sm hover:bg-[#D8FF24] transition-colors cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-[#315CFF] text-white flex items-center justify-center text-xs">
                      🎓
                    </span>
                    <span className="font-display text-xs uppercase">Student</span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDirectLogin('student@bonhomie.edu');
                    }}
                    className="px-2 py-0.5 bg-black text-[#D8FF24] font-mono-tag font-bold text-[9px] uppercase hover:bg-neutral-800"
                  >
                    Log In ➔
                  </button>
                </div>
                <div className="mt-1.5 font-mono-tag text-[10px] text-neutral-700">
                  <span className="block truncate font-semibold">student@bonhomie.edu</span>
                  <span className="text-neutral-500">pass: student123</span>
                </div>
              </div>

              {/* Organizer Sample */}
              <div
                onClick={() => handleUseAccount('organizer@bonhomie.edu', 'org123')}
                className="p-2.5 bg-white brutalist-border brutalist-shadow-sm hover:bg-[#D8FF24] transition-colors cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-[#FF5A4E] text-white flex items-center justify-center text-xs">
                      🏛️
                    </span>
                    <span className="font-display text-xs uppercase">Organizer</span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDirectLogin('organizer@bonhomie.edu');
                    }}
                    className="px-2 py-0.5 bg-black text-[#D8FF24] font-mono-tag font-bold text-[9px] uppercase hover:bg-neutral-800"
                  >
                    Log In ➔
                  </button>
                </div>
                <div className="mt-1.5 font-mono-tag text-[10px] text-neutral-700">
                  <span className="block truncate font-semibold">organizer@bonhomie.edu</span>
                  <span className="text-neutral-500">pass: org123</span>
                </div>
              </div>

              {/* Admin Sample */}
              <div
                onClick={() => handleUseAccount('admin@bonhomie.edu', 'admin123')}
                className="p-2.5 bg-white brutalist-border brutalist-shadow-sm hover:bg-[#D8FF24] transition-colors cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-[#111111] text-[#D8FF24] flex items-center justify-center text-xs">
                      🛡️
                    </span>
                    <span className="font-display text-xs uppercase">Administrator</span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDirectLogin('admin@bonhomie.edu');
                    }}
                    className="px-2 py-0.5 bg-black text-[#D8FF24] font-mono-tag font-bold text-[9px] uppercase hover:bg-neutral-800"
                  >
                    Log In ➔
                  </button>
                </div>
                <div className="mt-1.5 font-mono-tag text-[10px] text-neutral-700">
                  <span className="block truncate font-semibold">admin@bonhomie.edu</span>
                  <span className="text-neutral-500">pass: admin123</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-black/10">
            <span className="font-mono-tag text-[9px] uppercase text-neutral-500 block">
              100% Campus-Verified Platform
            </span>
          </div>
        </div>

        {/* ========================================================
            MAIN FORM: LOGIN & SIGN UP
           ======================================================== */}
        <div className="md:w-7/12 p-6 flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="mb-4">
              <h2 className="text-2xl font-display uppercase tracking-tight">
                {isSignUp ? 'Create Account' : 'Log In'}
              </h2>
              <p className="text-xs text-neutral-600 mt-0.5">
                {isSignUp
                  ? 'Join campus event discovery and register for upcoming sessions.'
                  : 'Welcome back to BonHomie. Enter your campus credentials.'}
              </p>
            </div>

            {/* Mode Switch Tabs */}
            <div className="flex brutalist-border mb-4 bg-neutral-100 p-0.5">
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(false);
                  setError('');
                }}
                className={`flex-1 py-1.5 text-xs font-bold uppercase transition-all ${
                  !isSignUp ? 'bg-[#111111] text-white' : 'text-neutral-600 hover:text-black'
                }`}
              >
                Log In
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(true);
                  setError('');
                }}
                className={`flex-1 py-1.5 text-xs font-bold uppercase transition-all ${
                  isSignUp ? 'bg-[#111111] text-white' : 'text-neutral-600 hover:text-black'
                }`}
              >
                Sign Up
              </button>
            </div>

            {error && (
              <div className="mb-3 p-2 bg-[#FF5A4E]/15 border-2 border-[#FF5A4E] text-xs font-bold text-[#FF5A4E]">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
              {isSignUp && (
                <>
                  <div>
                    <label className="block text-[11px] font-bold uppercase mb-1">Account Type</label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setRole('STUDENT')}
                        className={`py-1 px-2 brutalist-border text-[11px] font-bold flex items-center justify-center gap-1 ${
                          role === 'STUDENT' ? 'bg-[#D8FF24] border-black' : 'bg-white'
                        }`}
                      >
                        <GraduationCap className="w-3 h-3" /> Student
                      </button>
                      <button
                        type="button"
                        onClick={() => setRole('ORGANIZER')}
                        className={`py-1 px-2 brutalist-border text-[11px] font-bold flex items-center justify-center gap-1 ${
                          role === 'ORGANIZER' ? 'bg-[#D8FF24] border-black' : 'bg-white'
                        }`}
                      >
                        <Users className="w-3 h-3" /> Organizer
                      </button>
                      <button
                        type="button"
                        onClick={() => setRole('ADMIN')}
                        className={`py-1 px-2 brutalist-border text-[11px] font-bold flex items-center justify-center gap-1 ${
                          role === 'ADMIN' ? 'bg-[#D8FF24] border-black' : 'bg-white'
                        }`}
                      >
                        <ShieldCheck className="w-3 h-3" /> Admin
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3 py-2 bg-white brutalist-border text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#D8FF24]"
                    />
                  </div>

                  {role === 'ORGANIZER' && (
                    <div>
                      <label className="block text-[11px] font-bold uppercase mb-1">
                        Club / Organization Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Campus Arts Society"
                        value={orgName}
                        onChange={(e) => setOrgName(e.target.value)}
                        className="w-full px-3 py-2 bg-white brutalist-border text-xs focus:outline-none focus:ring-2 focus:ring-[#D8FF24]"
                      />
                    </div>
                  )}
                </>
              )}

              <div>
                <label className="block text-[11px] font-bold uppercase mb-1">Campus Email</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. student@bonhomie.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-white brutalist-border text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#D8FF24]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase mb-1">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-white brutalist-border text-xs focus:outline-none focus:ring-2 focus:ring-[#D8FF24]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 mt-2 bg-[#D8FF24] hover:bg-[#cbf010] text-black font-display uppercase tracking-wide text-xs brutalist-border brutalist-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5 transition-transform cursor-pointer"
              >
                {isSignUp ? 'Create Account' : 'Log In'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
