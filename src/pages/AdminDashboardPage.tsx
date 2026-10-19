import React, { useState } from 'react';
import { dbService } from '../services/db';
import { useAuth } from '../context/AuthContext';
import { EventItem, User, Registration, AuditLog } from '../types';
import {
  Shield,
  Users,
  Calendar,
  Database,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Search,
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'users' | 'events' | 'logs'>('events');
  const [feedback, setFeedback] = useState<string | null>(null);

  const users = dbService.getUsers();
  const events = dbService.getEvents({ includeHidden: true });
  const reports = dbService.getReports();
  const auditLogs = reports.auditLogs;

  const handleResetData = () => {
    if (window.confirm('Reset all sample data back to original seeded state?')) {
      dbService.resetDatabase();
      setFeedback('Database restored to default verified state.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F3E9] text-black pb-16">
      {/* Admin Header */}
      <div className="bg-[#111111] text-[#D8FF24] border-b-2 border-black px-4 sm:px-8 py-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-block px-2.5 py-0.5 bg-[#D8FF24] text-black font-mono-tag text-xs font-bold uppercase mb-2">
              University System Administration
            </div>
            <h1 className="text-3xl sm:text-5xl font-display uppercase tracking-tight text-white">
              Admin Governance Portal
            </h1>
            <p className="text-xs text-neutral-400 mt-1">
              Logged in as {currentUser?.full_name} &bull; Full Database Read/Write/Audit Authority
            </p>
          </div>

          <button
            onClick={handleResetData}
            className="px-4 py-2 bg-white text-black hover:bg-neutral-100 font-display text-xs uppercase brutalist-border flex items-center gap-1.5 self-start sm:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restore Default Data</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8">
        {feedback && (
          <div className="mb-6 p-3 bg-[#52D6B0] brutalist-border text-xs font-bold flex items-center justify-between">
            <span>✓ {feedback}</span>
            <button onClick={() => setFeedback(null)} className="underline uppercase">
              Dismiss
            </button>
          </div>
        )}

        {/* Global Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 brutalist-border brutalist-shadow">
            <span className="text-[10px] font-mono-tag font-bold uppercase text-neutral-400">
              Total Accounts
            </span>
            <p className="text-3xl font-display text-black mt-1">{users.length}</p>
          </div>

          <div className="bg-white p-4 brutalist-border brutalist-shadow">
            <span className="text-[10px] font-mono-tag font-bold uppercase text-neutral-400">
              Campus Events
            </span>
            <p className="text-3xl font-display text-[#315CFF] mt-1">{events.length}</p>
          </div>

          <div className="bg-white p-4 brutalist-border brutalist-shadow">
            <span className="text-[10px] font-mono-tag font-bold uppercase text-neutral-400">
              Registrations
            </span>
            <p className="text-3xl font-display text-[#52D6B0] mt-1">
              {reports.totalRegistrations}
            </p>
          </div>

          <div className="bg-white p-4 brutalist-border brutalist-shadow">
            <span className="text-[10px] font-mono-tag font-bold uppercase text-neutral-400">
              Audit Transactions
            </span>
            <p className="text-3xl font-display text-neutral-800 mt-1">{auditLogs.length}</p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b-2 border-black gap-2 mb-6">
          <button
            onClick={() => setActiveTab('events')}
            className={`px-4 py-2 font-display uppercase text-xs transition-all ${
              activeTab === 'events' ? 'bg-black text-[#D8FF24]' : 'bg-white hover:bg-neutral-100'
            }`}
          >
            All Events ({events.length})
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 font-display uppercase text-xs transition-all ${
              activeTab === 'users' ? 'bg-black text-[#D8FF24]' : 'bg-white hover:bg-neutral-100'
            }`}
          >
            Users &amp; Roles ({users.length})
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`px-4 py-2 font-display uppercase text-xs transition-all ${
              activeTab === 'logs' ? 'bg-black text-[#D8FF24]' : 'bg-white hover:bg-neutral-100'
            }`}
          >
            Audit &amp; DML Transaction Log ({auditLogs.length})
          </button>
        </div>

        {/* Tab 1: All Events */}
        {activeTab === 'events' && (
          <div className="bg-white brutalist-border-thick brutalist-shadow p-6 overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b-2 border-black font-mono-tag uppercase text-[11px] text-neutral-500">
                  <th className="py-2.5 px-2">ID</th>
                  <th className="py-2.5 px-2">Event Title</th>
                  <th className="py-2.5 px-2">Category</th>
                  <th className="py-2.5 px-2">Venue</th>
                  <th className="py-2.5 px-2">Organizer</th>
                  <th className="py-2.5 px-2">Capacity</th>
                  <th className="py-2.5 px-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {events.map((ev) => (
                  <tr key={ev.event_id} className="hover:bg-neutral-50">
                    <td className="py-3 px-2 font-mono-tag font-bold">#{ev.event_id}</td>
                    <td className="py-3 px-2 font-bold">{ev.title}</td>
                    <td className="py-3 px-2">{ev.category_name}</td>
                    <td className="py-3 px-2">{ev.venue_name}</td>
                    <td className="py-3 px-2 text-neutral-600">{ev.organizer_name}</td>
                    <td className="py-3 px-2 font-mono-tag">
                      {ev.confirmed_count} / {ev.capacity}
                    </td>
                    <td className="py-3 px-2">
                      <span className="px-2 py-0.5 bg-neutral-100 font-mono-tag font-bold text-[10px] brutalist-border">
                        {ev.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 2: Users */}
        {activeTab === 'users' && (
          <div className="bg-white brutalist-border-thick brutalist-shadow p-6 overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b-2 border-black font-mono-tag uppercase text-[11px] text-neutral-500">
                  <th className="py-2.5 px-2">User ID</th>
                  <th className="py-2.5 px-2">Full Name</th>
                  <th className="py-2.5 px-2">Campus Email</th>
                  <th className="py-2.5 px-2">Role</th>
                  <th className="py-2.5 px-2">Roll / Org</th>
                  <th className="py-2.5 px-2">Department</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {users.map((u) => (
                  <tr key={u.user_id} className="hover:bg-neutral-50">
                    <td className="py-3 px-2 font-mono-tag font-bold">#{u.user_id}</td>
                    <td className="py-3 px-2 font-bold">{u.full_name}</td>
                    <td className="py-3 px-2 font-mono-tag">{u.email}</td>
                    <td className="py-3 px-2">
                      <span className="px-2 py-0.5 bg-[#D8FF24] text-black font-mono-tag font-bold text-[10px] brutalist-border">
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-neutral-600">
                      {u.roll_number || u.organization_name || '—'}
                    </td>
                    <td className="py-3 px-2 text-neutral-600">{u.department || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 3: Audit Logs */}
        {activeTab === 'logs' && (
          <div className="bg-white brutalist-border-thick brutalist-shadow p-6 space-y-3">
            <p className="text-xs text-neutral-600 mb-2">
              Full transactional and DML history recorded by the relational engine:
            </p>
            {auditLogs.map((log) => (
              <div key={log.log_id} className="p-3 bg-[#F7F3E9] brutalist-border text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 bg-black text-[#D8FF24] font-mono-tag font-bold text-[10px]">
                    {log.operation_type} &bull; {log.entity}
                  </span>
                  <span className="font-mono-tag text-[10px] text-neutral-500">
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <p className="font-semibold text-black">{log.description}</p>
                <div className="font-mono-tag text-[10px] bg-white p-2 brutalist-border overflow-x-auto text-neutral-800">
                  {log.sql_preview}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
