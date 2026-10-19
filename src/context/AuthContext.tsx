import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { dbService } from '../services/db';

interface AuthContextType {
  currentUser: User | null;
  login: (email: string) => boolean;
  signup: (email: string, fullName: string, role: UserRole, extra?: any) => User;
  logout: () => void;
  switchDemoUser: (role: UserRole) => void;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  isAuthModalOpen: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('bonhomie_current_user_id');
    if (saved) {
      const u = dbService.getUserById(parseInt(saved, 10));
      if (u) return u;
    }
    return dbService.getUserByEmail('student@bonhomie.edu') || dbService.getUserByEmail('student1@bonhomie.dev') || null;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('bonhomie_current_user_id', currentUser.user_id.toString());
    } else {
      localStorage.removeItem('bonhomie_current_user_id');
    }
  }, [currentUser]);

  const login = (email: string): boolean => {
    const user = dbService.getUserByEmail(email);
    if (user) {
      setCurrentUser(user);
      setIsAuthModalOpen(false);
      return true;
    }
    // Also handle simple alias logins
    const trimmed = email.trim().toLowerCase();
    if (trimmed === 'student' || trimmed === 'student@bonhomie.edu' || trimmed === 'student1@bonhomie.dev') {
      const u = dbService.getUserByEmail('student@bonhomie.edu') || dbService.getUserByEmail('student1@bonhomie.dev');
      if (u) { setCurrentUser(u); setIsAuthModalOpen(false); return true; }
    }
    if (trimmed === 'organizer' || trimmed === 'organizer@bonhomie.edu' || trimmed === 'organizer@bonhomie.dev') {
      const u = dbService.getUserByEmail('organizer@bonhomie.edu') || dbService.getUserByEmail('organizer@bonhomie.dev');
      if (u) { setCurrentUser(u); setIsAuthModalOpen(false); return true; }
    }
    if (trimmed === 'admin' || trimmed === 'admin@bonhomie.edu' || trimmed === 'admin@bonhomie.dev') {
      const u = dbService.getUserByEmail('admin@bonhomie.edu') || dbService.getUserByEmail('admin@bonhomie.dev');
      if (u) { setCurrentUser(u); setIsAuthModalOpen(false); return true; }
    }
    return false;
  };

  const signup = (email: string, fullName: string, role: UserRole, extra: any = {}): User => {
    const newUser = dbService.registerUser(email, fullName, role, extra);
    setCurrentUser(newUser);
    setIsAuthModalOpen(false);
    return newUser;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const switchDemoUser = (role: UserRole) => {
    if (role === 'STUDENT') {
      const u = dbService.getUserByEmail('student@bonhomie.edu') || dbService.getUserByEmail('student1@bonhomie.dev');
      if (u) setCurrentUser(u);
    } else if (role === 'ORGANIZER') {
      const u = dbService.getUserByEmail('organizer@bonhomie.edu') || dbService.getUserByEmail('organizer@bonhomie.dev');
      if (u) setCurrentUser(u);
    } else if (role === 'ADMIN') {
      const u = dbService.getUserByEmail('admin@bonhomie.edu') || dbService.getUserByEmail('admin@bonhomie.dev');
      if (u) setCurrentUser(u);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        signup,
        logout,
        switchDemoUser,
        openAuthModal: () => setIsAuthModalOpen(true),
        closeAuthModal: () => setIsAuthModalOpen(false),
        isAuthModalOpen,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
