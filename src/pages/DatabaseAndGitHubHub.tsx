import React, { useState } from 'react';
import { dbService } from '../services/db';
import { useAuth } from '../context/AuthContext';
import {
  Database,
  Terminal,
  FileCode,
  GitBranch,
  Copy,
  Check,
  Download,
  Share2,
  ExternalLink,
  ShieldCheck,
  Layers,
  ArrowRight,
  Code,
  Zap,
} from 'lucide-react';

export const DatabaseAndGitHubHub: React.FC = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'er-diagram' | 'dml-console' | 'sql-scripts' | 'github-guide' | 'real-world'>('er-diagram');
  const [sqlQuery, setSqlQuery] = useState("SELECT * FROM event WHERE status = 'PUBLISHED';");
  const [queryResult, setQueryResult] = useState<any>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleRunSQL = (e: React.FormEvent) => {
    e.preventDefault();
    const res = dbService.executeDML(sqlQuery, currentUser?.email || 'admin@bonhomie.dev');
    setQueryResult(res);
  };

  return (
    <div className="min-h-screen bg-[#F7F3E9] text-black pb-16">
      {/* Hero Header */}
      <div className="bg-[#111111] text-white border-b-2 border-black px-4 sm:px-8 py-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#D8FF24] text-black font-mono-tag text-xs font-bold uppercase mb-2">
              <Database className="w-3.5 h-3.5" /> DA-2 Database Application Submission Center
            </div>
            <h1 className="text-3xl sm:text-5xl font-display uppercase tracking-tight text-[#FFFDF6]">
              Database Design &amp; GitHub Hub
            </h1>
            <p className="text-xs text-neutral-400 mt-1 max-w-2xl leading-relaxed">
              Complete academic deliverables: Normalized MySQL 8 schema, ER Diagram, interactive DML executor, real-world transaction operations, and one-click GitHub push guide.
            </p>
          </div>

          <div className="flex gap-2">
            <span className="px-3 py-1 bg-[#D8FF24] text-black font-mono-tag font-bold text-xs brutalist-border">
              MySQL 8.0 &bull; 3NF Normalized
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8">
        {/* Navigation Tabs */}
        <div className="flex border-b-2 border-black gap-2 mb-8 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('er-diagram')}
            className={`px-4 py-2.5 font-display uppercase text-xs transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'er-diagram' ? 'bg-black text-[#D8FF24]' : 'bg-white hover:bg-neutral-100'
            }`}
          >
            <Layers className="w-4 h-4" /> 1. ER Diagram &amp; Schema Design
          </button>

          <button
            onClick={() => setActiveTab('dml-console')}
            className={`px-4 py-2.5 font-display uppercase text-xs transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'dml-console' ? 'bg-black text-[#D8FF24]' : 'bg-white hover:bg-neutral-100'
            }`}
          >
            <Terminal className="w-4 h-4" /> 2. Live SQL DML Console
          </button>

          <button
            onClick={() => setActiveTab('real-world')}
            className={`px-4 py-2.5 font-display uppercase text-xs transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'real-world' ? 'bg-black text-[#D8FF24]' : 'bg-white hover:bg-neutral-100'
            }`}
          >
            <Zap className="w-4 h-4" /> 3. Real-World Processing
          </button>

          <button
            onClick={() => setActiveTab('sql-scripts')}
            className={`px-4 py-2.5 font-display uppercase text-xs transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'sql-scripts' ? 'bg-black text-[#D8FF24]' : 'bg-white hover:bg-neutral-100'
            }`}
          >
            <FileCode className="w-4 h-4" /> 4. Schema &amp; Seed SQL Files
          </button>

          <button
            onClick={() => setActiveTab('github-guide')}
            className={`px-4 py-2.5 font-display uppercase text-xs transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'github-guide' ? 'bg-black text-[#D8FF24]' : 'bg-white hover:bg-neutral-100'
            }`}
          >
            <GitBranch className="w-4 h-4" /> 5. Push to GitHub Guide
          </button>
        </div>

        {/* ========================================================
            TAB 1: ER DIAGRAM & SCHEMA DESIGN
           ======================================================== */}
        {activeTab === 'er-diagram' && (
          <div className="space-y-6">
            <div className="bg-white p-6 brutalist-border-thick brutalist-shadow">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-black mb-6">
                <div>
                  <h3 className="font-display text-xl uppercase tracking-tight">
                    Relational Entity-Relationship (ER) Architecture
                  </h3>
                  <p className="text-xs text-neutral-600">
                    Fully normalized to Third Normal Form (3NF) with primary keys, foreign key constraints, checks, and triggers.
                  </p>
                </div>
                <span className="px-3 py-1 bg-[#D8FF24] text-black font-mono-tag font-bold text-xs brutalist-border">
                  7 Normalized Entities
                </span>
              </div>

              {/* Entity Schema Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* 1. CATEGORY */}
                <div className="p-4 bg-[#F7F3E9] brutalist-border text-xs space-y-2">
                  <div className="flex items-center justify-between border-b border-black pb-1.5">
                    <span className="font-display uppercase text-black font-bold">CATEGORY</span>
                    <span className="font-mono-tag text-[10px] text-neutral-500">Lookup</span>
                  </div>
                  <ul className="space-y-1 font-mono-tag text-[11px]">
                    <li className="font-bold text-[#315CFF]">🔑 category_id (INT, PK)</li>
                    <li>name (VARCHAR 50, UNIQUE)</li>
                    <li>slug (VARCHAR 50, UNIQUE)</li>
                    <li>color_hex (VARCHAR 7)</li>
                    <li>description (TEXT)</li>
                  </ul>
                  <p className="text-[10px] text-neutral-500 pt-1 border-t border-neutral-200">
                    Rel: 1 Category ➔ Many Events (1:N)
                  </p>
                </div>

                {/* 2. VENUE */}
                <div className="p-4 bg-[#F7F3E9] brutalist-border text-xs space-y-2">
                  <div className="flex items-center justify-between border-b border-black pb-1.5">
                    <span className="font-display uppercase text-black font-bold">VENUE</span>
                    <span className="font-mono-tag text-[10px] text-neutral-500">Physical Site</span>
                  </div>
                  <ul className="space-y-1 font-mono-tag text-[11px]">
                    <li className="font-bold text-[#315CFF]">🔑 venue_id (INT, PK)</li>
                    <li>name (VARCHAR 120, UNIQUE)</li>
                    <li>location (VARCHAR 200)</li>
                    <li className="font-semibold text-emerald-700">capacity (INT, CHECK &gt; 0)</li>
                    <li>facilities (TEXT)</li>
                  </ul>
                  <p className="text-[10px] text-neutral-500 pt-1 border-t border-neutral-200">
                    Rel: 1 Venue ➔ Many Events (1:N)
                  </p>
                </div>

                {/* 3. USER_ACCOUNT */}
                <div className="p-4 bg-[#F7F3E9] brutalist-border text-xs space-y-2">
                  <div className="flex items-center justify-between border-b border-black pb-1.5">
                    <span className="font-display uppercase text-black font-bold">USER_ACCOUNT</span>
                    <span className="font-mono-tag text-[10px] text-neutral-500">Base Auth</span>
                  </div>
                  <ul className="space-y-1 font-mono-tag text-[11px]">
                    <li className="font-bold text-[#315CFF]">🔑 user_id (INT, PK)</li>
                    <li>email (VARCHAR 120, UNIQUE)</li>
                    <li>password_hash (VARCHAR 255)</li>
                    <li>full_name (VARCHAR 100)</li>
                    <li className="font-bold text-purple-700">role (ENUM: STUDENT, ORGANIZER, ADMIN)</li>
                  </ul>
                  <p className="text-[10px] text-neutral-500 pt-1 border-t border-neutral-200">
                    Subtyped via student_profile &amp; organizer_profile (1:1)
                  </p>
                </div>

                {/* 4. EVENT */}
                <div className="p-4 bg-[#FFFDF6] brutalist-border-thick text-xs space-y-2 lg:col-span-2">
                  <div className="flex items-center justify-between border-b border-black pb-1.5">
                    <span className="font-display uppercase text-black font-bold text-sm">EVENT (Core Entity)</span>
                    <span className="font-mono-tag text-[10px] text-neutral-500">Main Relation</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 font-mono-tag text-[11px]">
                    <ul className="space-y-1">
                      <li className="font-bold text-[#315CFF]">🔑 event_id (INT, PK)</li>
                      <li>title (VARCHAR 150)</li>
                      <li className="text-neutral-700">category_id (INT, FK ➔ CATEGORY)</li>
                      <li className="text-neutral-700">venue_id (INT, FK ➔ VENUE)</li>
                      <li className="text-neutral-700">organizer_id (INT, FK ➔ USER_ACCOUNT)</li>
                    </ul>
                    <ul className="space-y-1">
                      <li>start_time, end_time (DATETIME)</li>
                      <li>registration_deadline (DATETIME)</li>
                      <li className="font-bold text-amber-700">capacity (INT, CHECK &gt; 0)</li>
                      <li className="font-bold text-emerald-700">status (ENUM: DRAFT, PUBLISHED, CANCELLED, COMPLETED)</li>
                      <li>hidden_by_organizer (BOOLEAN)</li>
                    </ul>
                  </div>
                  <div className="text-[10px] bg-[#D8FF24]/40 p-2 brutalist-border font-mono-tag mt-2">
                    ⚡ Trigger: trg_check_capacity_before_insert ensures EVENT.capacity &le; VENUE.capacity.
                  </div>
                </div>

                {/* 5. REGISTRATION */}
                <div className="p-4 bg-[#FFFDF6] brutalist-border-thick text-xs space-y-2">
                  <div className="flex items-center justify-between border-b border-black pb-1.5">
                    <span className="font-display uppercase text-black font-bold text-sm">REGISTRATION (Junction)</span>
                    <span className="font-mono-tag text-[10px] text-neutral-500">M:N Connection</span>
                  </div>
                  <ul className="space-y-1 font-mono-tag text-[11px]">
                    <li className="font-bold text-[#315CFF]">🔑 registration_id (INT, PK)</li>
                    <li>event_id (INT, FK ➔ EVENT)</li>
                    <li>student_id (INT, FK ➔ USER_ACCOUNT)</li>
                    <li>registered_at (TIMESTAMP)</li>
                    <li className="font-bold text-purple-700">status (ENUM: CONFIRMED, CANCELLED)</li>
                    <li>cancellation_reason (VARCHAR 255)</li>
                    <li>hidden_by_student (BOOLEAN)</li>
                    <li className="text-red-600 font-bold">UQ: (student_id, event_id)</li>
                  </ul>
                  <p className="text-[10px] text-neutral-500 pt-1 border-t border-neutral-200">
                    Calculated availability: EVENT.capacity - COUNT(confirmed registrations)
                  </p>
                </div>
              </div>

              {/* Cardinality Matrix */}
              <div className="mt-8 pt-6 border-t-2 border-black">
                <h4 className="font-display text-sm uppercase tracking-wide mb-3">
                  Cardinality &amp; Referential Integrity Rules
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-neutral-100 brutalist-border">
                    <strong className="block mb-1">User ➔ Profiles (1 : 1)</strong>
                    <p className="text-neutral-600">
                      ON DELETE CASCADE ensures student and organizer records purge cleanly if user account is deleted.
                    </p>
                  </div>
                  <div className="p-3 bg-neutral-100 brutalist-border">
                    <strong className="block mb-1">Venue / Category ➔ Event (1 : N)</strong>
                    <p className="text-neutral-600">
                      ON DELETE RESTRICT prevents accidental deletion of active campus halls or categories used by events.
                    </p>
                  </div>
                  <div className="p-3 bg-neutral-100 brutalist-border">
                    <strong className="block mb-1">Event ➔ Registrations (1 : N)</strong>
                    <p className="text-neutral-600">
                      Atomic cascade updates handle cancellations, preserving audit history with soft-delete flags.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 2: LIVE SQL DML CONSOLE (Item 5 of Syllabus)
           ======================================================== */}
        {activeTab === 'dml-console' && (
          <div className="space-y-6">
            <div className="bg-white p-6 brutalist-border-thick brutalist-shadow">
              <div className="flex items-center justify-between pb-4 border-b-2 border-black mb-4">
                <div>
                  <h3 className="font-display text-xl uppercase tracking-tight">
                    Interactive SQL &amp; DML Console
                  </h3>
                  <p className="text-xs text-neutral-600">
                    Syllabus Requirement 5: Execute SELECT, INSERT, UPDATE, and DELETE operations directly through the interface.
                  </p>
                </div>
                <span className="px-2.5 py-1 bg-[#D8FF24] text-black font-mono-tag text-xs font-bold uppercase brutalist-border">
                  Live Engine
                </span>
              </div>

              {/* Quick sample query presets */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs font-bold uppercase self-center mr-2">Sample Queries:</span>
                <button
                  onClick={() => setSqlQuery("SELECT * FROM event WHERE status = 'PUBLISHED';")}
                  className="px-2.5 py-1 bg-[#F7F3E9] hover:bg-[#D8FF24] brutalist-border text-[11px] font-mono-tag font-bold"
                >
                  SELECT Published Events
                </button>
                <button
                  onClick={() => setSqlQuery('SELECT * FROM registration;')}
                  className="px-2.5 py-1 bg-[#F7F3E9] hover:bg-[#D8FF24] brutalist-border text-[11px] font-mono-tag font-bold"
                >
                  SELECT Registrations
                </button>
                <button
                  onClick={() => setSqlQuery('SELECT * FROM user_account;')}
                  className="px-2.5 py-1 bg-[#F7F3E9] hover:bg-[#D8FF24] brutalist-border text-[11px] font-mono-tag font-bold"
                >
                  SELECT Users
                </button>
                <button
                  onClick={() => setSqlQuery('SELECT * FROM audit_log;')}
                  className="px-2.5 py-1 bg-[#F7F3E9] hover:bg-[#D8FF24] brutalist-border text-[11px] font-mono-tag font-bold"
                >
                  SELECT Audit Log
                </button>
                <button
                  onClick={() => setSqlQuery('UPDATE event SET capacity = 250 WHERE event_id = 1;')}
                  className="px-2.5 py-1 bg-[#F7F3E9] hover:bg-[#D8FF24] brutalist-border text-[11px] font-mono-tag font-bold"
                >
                  UPDATE Event Capacity
                </button>
              </div>

              <form onSubmit={handleRunSQL} className="space-y-4">
                <div className="relative">
                  <textarea
                    rows={4}
                    value={sqlQuery}
                    onChange={(e) => setSqlQuery(e.target.value)}
                    className="w-full p-4 bg-neutral-900 text-[#D8FF24] font-mono-tag text-xs brutalist-border focus:outline-none"
                    placeholder="Enter your SQL query here (e.g. SELECT * FROM event;)"
                  />
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-[11px] text-neutral-500 font-mono-tag">
                    Supports ANSI SQL SELECT, UPDATE, INSERT, and DELETE syntax
                  </span>

                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#D8FF24] hover:bg-[#cbf110] text-black font-display uppercase text-xs brutalist-border brutalist-shadow-sm flex items-center gap-2"
                  >
                    <Terminal className="w-4 h-4" />
                    <span>Execute SQL Query</span>
                  </button>
                </div>
              </form>

              {/* Execution Results View */}
              {queryResult && (
                <div className="mt-6 pt-6 border-t-2 border-black">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-display text-sm uppercase">Query Execution Result</span>
                    <span className="font-mono-tag text-xs font-bold text-[#315CFF]">
                      {queryResult.rowsAffected !== undefined
                        ? `${queryResult.rowsAffected} row(s) returned / affected`
                        : 'Done'}
                    </span>
                  </div>

                  {queryResult.error ? (
                    <div className="p-3 bg-red-100 border border-red-500 text-red-700 text-xs font-mono-tag">
                      Error: {queryResult.error}
                    </div>
                  ) : Array.isArray(queryResult.result) ? (
                    <div className="overflow-x-auto max-h-80 bg-neutral-50 brutalist-border">
                      <table className="w-full text-left text-[11px] font-mono-tag border-collapse">
                        <thead>
                          <tr className="bg-neutral-200 border-b border-black">
                            {Object.keys(queryResult.result[0] || {}).map((k) => (
                              <th key={k} className="p-2 border-r border-neutral-300">
                                {k}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {queryResult.result.map((row: any, idx: number) => (
                            <tr key={idx} className="border-b border-neutral-200 hover:bg-neutral-100">
                              {Object.values(row).map((val: any, cidx: number) => (
                                <td key={cidx} className="p-2 border-r border-neutral-200 truncate max-w-[200px]">
                                  {typeof val === 'object' ? JSON.stringify(val) : String(val)}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="p-3 bg-[#D8FF24]/40 brutalist-border text-xs font-bold">
                      {queryResult.message || 'SQL operation executed successfully.'}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 3: REAL-WORLD PROCESSING OPERATIONS (Item 6 of Syllabus)
           ======================================================== */}
        {activeTab === 'real-world' && (
          <div className="space-y-6">
            <div className="bg-white p-6 brutalist-border-thick brutalist-shadow space-y-6">
              <div className="border-b-2 border-black pb-4">
                <span className="px-2.5 py-0.5 bg-[#D8FF24] text-black font-mono-tag text-xs font-bold uppercase">
                  Syllabus Requirement 6
                </span>
                <h3 className="font-display text-2xl uppercase tracking-tight mt-1">
                  Real-World Processing Operations
                </h3>
                <p className="text-xs text-neutral-600 mt-1">
                  The syllabus explicitly requires implementing meaningful business processing beyond simple CRUD.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Operation 1 */}
                <div className="p-5 bg-[#F7F3E9] brutalist-border space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#111111] text-[#D8FF24] flex items-center justify-center font-bold text-xs">
                      1
                    </span>
                    <h4 className="font-display text-sm uppercase">
                      Seat Availability &amp; Concurrency Lock
                    </h4>
                  </div>
                  <p className="text-xs text-neutral-700 leading-relaxed">
                    <strong>Formula:</strong> Available Seats = EVENT.capacity - COUNT(confirmed registrations).
                    Runs inside an atomic transaction using row-level locking (<code className="bg-white px-1 font-mono-tag">SELECT ... FOR UPDATE</code>). If confirmed count reaches capacity, rollback occurs and registration is rejected.
                  </p>
                  <div className="bg-white p-3 brutalist-border font-mono-tag text-[10px] text-neutral-800">
                    START TRANSACTION;<br />
                    SELECT capacity FROM event WHERE event_id = 1 FOR UPDATE;<br />
                    -- If active &gt;= capacity THEN ROLLBACK;<br />
                    COMMIT;
                  </div>
                </div>

                {/* Operation 2 */}
                <div className="p-5 bg-[#F7F3E9] brutalist-border space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#111111] text-[#D8FF24] flex items-center justify-center font-bold text-xs">
                      2
                    </span>
                    <h4 className="font-display text-sm uppercase">
                      24-Hour Cancellation Cutoff Enforcement
                    </h4>
                  </div>
                  <p className="text-xs text-neutral-700 leading-relaxed">
                    Students can only self-cancel if the remaining time until start is at least 24.0 hours (<code className="bg-white px-1 font-mono-tag">event.start_time - NOW() &ge; 24h</code>). Within 24 hours of kickoff, cancellations are locked to prevent wasted resources.
                  </p>
                  <div className="bg-white p-3 brutalist-border font-mono-tag text-[10px] text-neutral-800">
                    IF (TIMESTAMPDIFF(HOUR, NOW(), event.start_time) &lt; 24) THEN<br />
                    &nbsp;&nbsp;SIGNAL SQLSTATE &apos;45000&apos; SET MESSAGE_TEXT = &apos;24h policy&apos;;<br />
                    END IF;
                  </div>
                </div>

                {/* Operation 3 */}
                <div className="p-5 bg-[#F7F3E9] brutalist-border space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#111111] text-[#D8FF24] flex items-center justify-center font-bold text-xs">
                      3
                    </span>
                    <h4 className="font-display text-sm uppercase">
                      Cascade Event Cancellation
                    </h4>
                  </div>
                  <p className="text-xs text-neutral-700 leading-relaxed">
                    When an organizer cancels an event, all active student registrations are automatically batch-cancelled with cancellation reasons and audit timestamps in a single atomic transaction.
                  </p>
                  <div className="bg-white p-3 brutalist-border font-mono-tag text-[10px] text-neutral-800">
                    UPDATE event SET status = &apos;CANCELLED&apos; WHERE event_id = ?;<br />
                    UPDATE registration SET status = &apos;CANCELLED&apos; WHERE event_id = ?;
                  </div>
                </div>

                {/* Operation 4 */}
                <div className="p-5 bg-[#F7F3E9] brutalist-border space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#111111] text-[#D8FF24] flex items-center justify-center font-bold text-xs">
                      4
                    </span>
                    <h4 className="font-display text-sm uppercase">
                      Dual Capacity Trigger Constraint
                    </h4>
                  </div>
                  <p className="text-xs text-neutral-700 leading-relaxed">
                    Enforces that no event can declare a capacity exceeding its physical venue capacity (<code className="bg-white px-1 font-mono-tag">EVENT.capacity &le; VENUE.capacity</code>). Trigger prevents unsafe over-allocation.
                  </p>
                  <div className="bg-white p-3 brutalist-border font-mono-tag text-[10px] text-neutral-800">
                    CREATE TRIGGER trg_check_capacity_before_insert<br />
                    BEFORE INSERT ON event FOR EACH ROW...
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 4: SCHEMA & SEED SQL FILES (Exportable for GitHub)
           ======================================================== */}
        {activeTab === 'sql-scripts' && (
          <div className="space-y-6">
            <div className="bg-white p-6 brutalist-border-thick brutalist-shadow space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-black">
                <div>
                  <h3 className="font-display text-xl uppercase tracking-tight">
                    Exportable MySQL 8.0 &amp; Oracle SQL Scripts
                  </h3>
                  <p className="text-xs text-neutral-600">
                    Ready to copy or save into your repository root under <code className="font-bold">/database/schema.sql</code> and <code className="font-bold">/database/seed.sql</code>.
                  </p>
                </div>
              </div>

              {/* schema.sql block */}
              <div>
                <div className="flex items-center justify-between bg-neutral-100 p-2 brutalist-border border-b-0">
                  <span className="font-mono-tag text-xs font-bold uppercase">database/schema.sql</span>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `-- BONHOMIE SCHEMA\n-- Run: mysql -u root -p < database/schema.sql\n\nCREATE DATABASE IF NOT EXISTS bonhomie;\nUSE bonhomie;\n-- (See complete schema.sql in project root)`,
                        'schema'
                      )
                    }
                    className="px-2.5 py-1 bg-white hover:bg-[#D8FF24] brutalist-border text-xs font-bold flex items-center gap-1"
                  >
                    {copiedKey === 'schema' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'schema' ? 'Copied!' : 'Copy Script'}</span>
                  </button>
                </div>
                <pre className="p-4 bg-neutral-900 text-neutral-200 text-[11px] font-mono-tag max-h-72 overflow-y-auto brutalist-border">
                  {`-- CATEGORY, VENUE, USER_ACCOUNT, STUDENT_PROFILE, ORGANIZER_PROFILE, EVENT, REGISTRATION, AUDIT_LOG
CREATE TABLE category (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    slug VARCHAR(50) NOT NULL UNIQUE,
    color_hex VARCHAR(7) NOT NULL DEFAULT '#D8FF24',
    description VARCHAR(255)
);

CREATE TABLE venue (
    venue_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(120) NOT NULL UNIQUE,
    location VARCHAR(200) NOT NULL,
    capacity INT NOT NULL CHECK (capacity > 0)
);

CREATE TABLE event (
    event_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    category_id INT NOT NULL REFERENCES category(category_id),
    venue_id INT NOT NULL REFERENCES venue(venue_id),
    organizer_id INT NOT NULL REFERENCES user_account(user_id),
    start_time DATETIME NOT NULL,
    capacity INT NOT NULL CHECK (capacity > 0),
    status ENUM('DRAFT', 'PUBLISHED', 'CANCELLED', 'COMPLETED') DEFAULT 'DRAFT'
);

CREATE TABLE registration (
    registration_id INT AUTO_INCREMENT PRIMARY KEY,
    event_id INT NOT NULL REFERENCES event(event_id) ON DELETE CASCADE,
    student_id INT NOT NULL REFERENCES user_account(user_id) ON DELETE CASCADE,
    status ENUM('CONFIRMED', 'CANCELLED') DEFAULT 'CONFIRMED',
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uq_student_event (student_id, event_id)
);`}
                </pre>
              </div>

              {/* seed.sql block */}
              <div className="pt-4">
                <div className="flex items-center justify-between bg-neutral-100 p-2 brutalist-border border-b-0">
                  <span className="font-mono-tag text-xs font-bold uppercase">database/seed.sql</span>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `-- Sample Seed Data for BonHomie\nINSERT INTO category ...\nINSERT INTO venue ...\nINSERT INTO event ...`,
                        'seed'
                      )
                    }
                    className="px-2.5 py-1 bg-white hover:bg-[#D8FF24] brutalist-border text-xs font-bold flex items-center gap-1"
                  >
                    {copiedKey === 'seed' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'seed' ? 'Copied!' : 'Copy Seed SQL'}</span>
                  </button>
                </div>
                <pre className="p-4 bg-neutral-900 text-neutral-200 text-[11px] font-mono-tag max-h-48 overflow-y-auto brutalist-border">
                  {`INSERT INTO category (category_id, name, slug) VALUES 
(1, 'Cultural', 'cultural'), (2, 'Hackathons', 'hackathons'), (3, 'Workshops', 'workshops');

INSERT INTO venue (venue_id, name, capacity) VALUES 
(1, 'Open Air Theatre (OAT)', 600), (2, 'Main Auditorium', 450);

INSERT INTO event (event_id, title, category_id, venue_id, organizer_id, capacity, status) VALUES 
(1, 'After Hours: Campus Music Night', 1, 1, 2, 200, 'PUBLISHED'),
(2, 'Code for Impact Hackathon 2026', 2, 2, 3, 150, 'PUBLISHED');`}
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 5: GITHUB PUSH GUIDE & REPOSITORY SETUP
           ======================================================== */}
        {activeTab === 'github-guide' && (
          <div className="space-y-6">
            <div className="bg-white p-6 brutalist-border-thick brutalist-shadow space-y-6">
              <div className="border-b-2 border-black pb-4">
                <span className="px-2.5 py-0.5 bg-[#D8FF24] text-black font-mono-tag text-xs font-bold uppercase">
                  Terminal Commands
                </span>
                <h3 className="font-display text-2xl uppercase tracking-tight mt-1">
                  How to Push BonHomie to Your GitHub
                </h3>
                <p className="text-xs text-neutral-600 mt-1">
                  Step-by-step commands to push frontend, backend, and database schema to your personal GitHub repository for professor review.
                </p>
              </div>

              {/* Git Commands Box */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-display text-xs uppercase tracking-wider">
                    Copy and run these in your project directory:
                  </span>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `git init\ngit add .\ngit commit -m "feat: complete bonhomie full-stack event platform with MySQL schema, ER diagram, and DML engine"\ngit branch -M main\n# Replace URL below with your GitHub repo URL:\ngit remote add origin https://github.com/<your-username>/bonhomie.git\ngit push -u origin main`,
                        'git-commands'
                      )
                    }
                    className="px-3 py-1 bg-[#D8FF24] text-black font-mono-tag font-bold text-xs brutalist-border flex items-center gap-1.5"
                  >
                    {copiedKey === 'git-commands' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'git-commands' ? 'Copied Commands!' : 'Copy All Commands'}</span>
                  </button>
                </div>

                <div className="p-4 bg-neutral-900 text-[#D8FF24] font-mono-tag text-xs brutalist-border space-y-2 overflow-x-auto">
                  <p><span className="text-neutral-500"># 1. Initialize local git repository</span></p>
                  <p>git init</p>
                  <p><span className="text-neutral-500"># 2. Stage all source code, schema, and assets</span></p>
                  <p>git add .</p>
                  <p><span className="text-neutral-500"># 3. Commit with descriptive message</span></p>
                  <p>git commit -m &quot;feat: complete bonhomie full-stack campus event platform&quot;</p>
                  <p><span className="text-neutral-500"># 4. Set default main branch</span></p>
                  <p>git branch -M main</p>
                  <p><span className="text-neutral-500"># 5. Link your GitHub remote (replace with your repo URL)</span></p>
                  <p>git remote add origin https://github.com/&lt;your-username&gt;/bonhomie.git</p>
                  <p><span className="text-neutral-500"># 6. Push code to GitHub!</span></p>
                  <p>git push -u origin main</p>
                </div>
              </div>

              {/* Academic Submission README Template */}
              <div className="p-4 bg-[#F7F3E9] brutalist-border space-y-2">
                <span className="font-display text-xs uppercase text-black block">
                  📄 Included Project Structure for Professor
                </span>
                <p className="text-xs text-neutral-700">
                  Your project repository is organized exactly according to academic software engineering standards:
                </p>
                <div className="font-mono-tag text-[11px] bg-white p-3 brutalist-border space-y-1">
                  <p>📁 bonhomie/</p>
                  <p>&nbsp;&nbsp;├── 📁 src/ (React + Tailwind + Motion UI matching mockups)</p>
                  <p>&nbsp;&nbsp;├── 📁 src/services/ (Relational DML engine, Concurrency locks, 24h cutoff)</p>
                  <p>&nbsp;&nbsp;├── 📁 src/database/ (schema.sql, seed.sql with normalized tables &amp; triggers)</p>
                  <p>&nbsp;&nbsp;├── 📄 README.md (Setup instructions, viva talking points, and ER diagram explanation)</p>
                  <p>&nbsp;&nbsp;└── 📄 package.json</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
