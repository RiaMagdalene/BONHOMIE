import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { AuthModal } from './components/AuthModal';
import { HomePage } from './pages/HomePage';
import { EventsPage } from './pages/EventsPage';
import { EventDetailPage } from './pages/EventDetailPage';
import { StudentDashboardPage } from './pages/StudentDashboardPage';
import { OrganizerDashboardPage } from './pages/OrganizerDashboardPage';
import { CreateEventPage } from './pages/CreateEventPage';
import { AttendeeListPage } from './pages/AttendeeListPage';
import { AboutPage } from './pages/AboutPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

const MainLayout: React.FC = () => {
  const { currentUser, openAuthModal } = useAuth();
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedEventId, setSelectedEventId] = useState<number>(1);
  const [editingEventId, setEditingEventId] = useState<number | undefined>(undefined);

  const handleNavigate = (tab: string, eventId?: number) => {
    if (eventId) {
      setSelectedEventId(eventId);
    }
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F7F3E9] text-[#111111] flex flex-col font-sans selection:bg-[#D8FF24] selection:text-black">
      {/* Top Navigation */}
      <Navbar currentTab={currentTab} setCurrentTab={setCurrentTab} />

      {/* Main Page View */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomePage onNavigate={handleNavigate} />
        )}

        {currentTab === 'events' && (
          <EventsPage
            onSelectEvent={(id) => handleNavigate('event-detail', id)}
          />
        )}

        {currentTab === 'event-detail' && (
          <EventDetailPage
            eventId={selectedEventId}
            onBack={() => handleNavigate('events')}
            onNavigateToCalendar={() => handleNavigate('student-dashboard')}
          />
        )}

        {currentTab === 'student-dashboard' && (
          <StudentDashboardPage
            onSelectEvent={(id) => handleNavigate('event-detail', id)}
            onExplore={() => handleNavigate('events')}
          />
        )}

        {currentTab === 'organizer-dashboard' && (
          <OrganizerDashboardPage
            onCreateEvent={() => {
              setEditingEventId(undefined);
              handleNavigate('create-event');
            }}
            onEditEvent={(id) => {
              setEditingEventId(id);
              handleNavigate('create-event');
            }}
            onViewAttendees={(id) => {
              setSelectedEventId(id);
              handleNavigate('attendees');
            }}
            onSelectEvent={(id) => handleNavigate('event-detail', id)}
          />
        )}

        {currentTab === 'create-event' && (
          <CreateEventPage
            editingEventId={editingEventId}
            onBack={() => handleNavigate('organizer-dashboard')}
            onSuccess={(id) => handleNavigate('event-detail', id)}
          />
        )}

        {currentTab === 'attendees' && (
          <AttendeeListPage
            eventId={selectedEventId}
            onBack={() => handleNavigate('organizer-dashboard')}
          />
        )}

        {currentTab === 'about' && (
          <AboutPage
            onJoin={openAuthModal}
            onExploreEvents={() => handleNavigate('events')}
          />
        )}

        {currentTab === 'admin-dashboard' && (
          <AdminDashboardPage />
        )}
      </main>

      {/* Global Authentication Modal */}
      <AuthModal />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
}
