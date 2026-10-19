# BonHomie — Campus Event Discovery & Management System
> **"Find your people. Share the moment."**  
> *Full-Stack Relational Event Management Platform*

---

## 📌 Project Overview
**BonHomie** is a full-stack campus event discovery and lifecycle management platform built with a high-performance **React + Tailwind CSS** frontend, an **Express/Node.js** architecture, and a **MySQL 8.0+ / Oracle compliant relational database**.

It features an editorial campus collage aesthetic (neon lime `#D8FF24`, deep black `#111111`, cream `#F7F3E9`, blue `#315CFF`, lavender `#A9A2FF`), real-time seat tracking, transaction-safe concurrency, record-by-record navigation, and student calendar integration.

---

## 🎓 Academic Syllabus Compliance Checklist

| Syllabus Requirement | Implementation Details in BonHomie |
| :--- | :--- |
| **1. Database Design** | 7 normalized tables (3NF): `category`, `venue`, `user_account`, `student_profile`, `organizer_profile`, `event`, `registration`, `audit_log`. Includes primary keys, foreign keys, triggers, constraints, views (`v_event_availability`), and stored procedures in `src/database/schema.sql` and `seed.sql`. |
| **2. Front-End Development** | Responsive React SPA with custom brutalist collage art, animated transitions, calendar date picker, and interactive modals without exposing raw database commands to regular users. |
| **3. Back-End Development** | Node.js / Express relational service handling authentication, parameter validation, role enforcement, and SQL DML query processing. |
| **4. Record Viewing & Searching** | **First / Previous / Next / Last Record Navigator** implemented in Attendee List and Database Explorer, plus instant multi-field searching by student name, roll number, and email. |
| **5. DML Operations** | Full **INSERT** (create event, student register), **SELECT** (events & attendees), **UPDATE** (modify capacity, edit event), and **DELETE / SOFT-DELETE** (safe history protection) supported in UI and live in the interactive SQL console. |
| **6. Real-World Processing** | **1. Transaction-Safe Concurrency & Seat Calculation:** `EVENT.capacity - count(confirmed)` with row lock simulation.<br>**2. 24-Hour Cancellation Policy:** Students can only self-cancel $\ge 24$ hours before kickoff.<br>**3. Cascade Cancellation:** Cancelling an event atomically batch-cancels all student registrations.<br>**4. Dual Capacity Trigger:** Enforces `EVENT.capacity <= VENUE.capacity`. |
| **7. Reports & Output** | Live category breakdowns, event popularity rankings, organizer performance metrics, and printable attendance sheets. |

---

## 🗄️ Relational Entity-Relationship (ER) Model

```
   [CATEGORY] 1 ──── N [EVENT] N ──── 1 [VENUE]
                          │
                          │ 1
                          ▼ N
                   [REGISTRATION]
                          ▲ N
                          │ 1
                     [USER_ACCOUNT]
                     ▲           ▲
                 1:1 │           │ 1:1
           [STUDENT_PROFILE]   [ORGANIZER_PROFILE]
```

### Key Constraints & Triggers
1. **Trigger `trg_check_capacity_before_insert`**: Ensures `EVENT.capacity <= VENUE.capacity`.
2. **Unique Key `uq_student_event`**: Enforces that one student cannot hold duplicate active registrations for the same event.
3. **Foreign Keys**: `ON DELETE CASCADE` for profiles and registrations; `ON DELETE RESTRICT` for venues and categories.

---

## 🔑 Demo Accounts (All passwords: `password123`)

| Role | Email | Name / Organization |
| :--- | :--- | :--- |
| **Student** | `student1@bonhomie.dev` | Riya Sharma (23CS1045) |
| **Student** | `student2@bonhomie.dev` | Aarav Patel (23EE2012) |
| **Organizer** | `organizer@bonhomie.dev` | Student Cultural Council (SCC) |
| **Organizer** | `tech.club@bonhomie.dev` | ACM Student Chapter |
| **Administrator** | `admin@bonhomie.dev` | Prof. Vikram Malhotra |

*(Use the single **"Log in"** button or the 1-click Fast-Switch dropdown in the top navbar).*

---

## 📂 Project Structure

```
bonhomie/
├── index.html                   # HTML entry with Archivo Black & Syne typography
├── metadata.json                # AI Studio application metadata
├── package.json                 # Node & React dependencies
├── README.md                    # Academic submission & setup guide
├── src/
│   ├── App.tsx                  # Root layout & route manager
│   ├── index.css                # Brutalist tokens, neon lime styling & glass bubbles
│   ├── main.tsx                 # React DOM mount point
│   ├── types/
│   │   └── index.ts             # TypeScript entity schemas & interfaces
│   ├── context/
│   │   └── AuthContext.tsx      # Role-based auth & 1-click demo switcher
│   ├── components/
│   │   ├── Navbar.tsx           # Single 'Log in' button, brand logo & portal links
│   │   └── AuthModal.tsx        # Login/Sign-up modal with role selector
│   ├── pages/
│   │   ├── HomePage.tsx         # Hero matching mockup: "There's more to campus."
│   │   ├── EventsPage.tsx       # Directory matching mockup: "Find your next event. ★"
│   │   ├── EventDetailPage.tsx  # Poster collage, seat meter & 24h cancellation
│   │   ├── StudentDashboardPage.tsx # "YOUR CAMPUS, YOUR CALENDAR." with calendar view
│   │   ├── OrganizerDashboardPage.tsx # "MAKE SOMETHING HAPPEN." with stats & cascade cancel
│   │   ├── CreateEventPage.tsx  # Megaphone collage & venue trigger validation form
│   │   ├── AttendeeListPage.tsx # Syllabus Item 4: First/Prev/Next/Last navigator
│   │   ├── AboutPage.tsx        # Mockup Screen 6: "not just events. your people."
│   │   ├── AdminDashboardPage.tsx # University governance & audit log explorer
│   │   └── DatabaseAndGitHubHub.tsx # ER diagram, live DML console & GitHub exporter
│   └── database/
│       ├── schema.sql           # MySQL 8.0 DDL with tables, triggers, views & procedures
│       └── seed.sql             # Real campus mock data & test scenarios
└── vite.config.ts
```
