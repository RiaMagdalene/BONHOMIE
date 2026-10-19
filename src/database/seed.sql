-- =========================================================================
-- BONHOMIE CAMPUS EVENT MANAGEMENT SYSTEM
-- Meaningful Sample Seed Data (MySQL 8.0+ / Oracle Compatible)
-- =========================================================================

USE bonhomie;

-- Categories
INSERT INTO category (category_id, name, slug, color_hex, description) VALUES
(1, 'Cultural', 'cultural', '#FF5A4E', 'Campus fests, live acoustic nights, dance showcases and art exhibits.'),
(2, 'Hackathons', 'hackathons', '#315CFF', 'Competitive coding, sprint hackathons, and product build-offs.'),
(3, 'Workshops', 'workshops', '#52D6B0', 'Hands-on technical, creative, and professional development sessions.'),
(4, 'Sports', 'sports', '#FFDF38', 'Inter-branch tournaments, athletics, chess, and esports leagues.'),
(5, 'Talks', 'talks', '#A9A2FF', 'Distinguished alumni keynotes, tech talks, and career fireside chats.');

-- Venues
INSERT INTO venue (venue_id, name, location, capacity, facilities) VALUES
(1, 'Open Air Theatre (OAT)', 'North Campus Central Lawns', 600, 'Stage acoustics, spotlight rigging, green room, open turf seating'),
(2, 'Main Auditorium', 'Academic Block A, Ground Floor', 450, 'Surround audio, dual 4K laser projectors, HVAC, tiered seating'),
(3, 'LH 101 Innovation Hall', 'Science & Engineering Complex', 100, 'Dual whiteboards, workstation pods, gigabit LAN, recording cam'),
(4, 'Campus Sports Arena & Grounds', 'South Athletic Precinct', 800, 'Synthetic track, floodlit turf, referee booths, first-aid station');

-- Users (Password for all accounts is 'password123' hashed with bcrypt)
INSERT INTO user_account (user_id, email, password_hash, full_name, role, avatar_url) VALUES
(1, 'admin@bonhomie.dev', '$2a$10$wT8KzL4y1hPmsl9.9Lp/XeW0yY0J5j0kQz1L7g7p1yX7o.wYkE4u.', 'Prof. Vikram Malhotra', 'ADMIN', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'),
(2, 'organizer@bonhomie.dev', '$2a$10$wT8KzL4y1hPmsl9.9Lp/XeW0yY0J5j0kQz1L7g7p1yX7o.wYkE4u.', 'Student Cultural Council', 'ORGANIZER', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'),
(3, 'tech.club@bonhomie.dev', '$2a$10$wT8KzL4y1hPmsl9.9Lp/XeW0yY0J5j0kQz1L7g7p1yX7o.wYkE4u.', 'ACM Student Chapter', 'ORGANIZER', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150'),
(4, 'student1@bonhomie.dev', '$2a$10$wT8KzL4y1hPmsl9.9Lp/XeW0yY0J5j0kQz1L7g7p1yX7o.wYkE4u.', 'Riya Sharma', 'STUDENT', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'),
(5, 'student2@bonhomie.dev', '$2a$10$wT8KzL4y1hPmsl9.9Lp/XeW0yY0J5j0kQz1L7g7p1yX7o.wYkE4u.', 'Aarav Patel', 'STUDENT', 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150'),
(6, 'student3@bonhomie.dev', '$2a$10$wT8KzL4y1hPmsl9.9Lp/XeW0yY0J5j0kQz1L7g7p1yX7o.wYkE4u.', 'Ananya Iyer', 'STUDENT', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150'),
(7, 'student4@bonhomie.dev', '$2a$10$wT8KzL4y1hPmsl9.9Lp/XeW0yY0J5j0kQz1L7g7p1yX7o.wYkE4u.', 'Kabir Mehta', 'STUDENT', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150'),
(8, 'student5@bonhomie.dev', '$2a$10$wT8KzL4y1hPmsl9.9Lp/XeW0yY0J5j0kQz1L7g7p1yX7o.wYkE4u.', 'Zoya Khan', 'STUDENT', 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150'),
(9, 'student6@bonhomie.dev', '$2a$10$wT8KzL4y1hPmsl9.9Lp/XeW0yY0J5j0kQz1L7g7p1yX7o.wYkE4u.', 'Dev Sen', 'STUDENT', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150');

-- Student Profiles
INSERT INTO student_profile (student_id, roll_number, department, year_of_study) VALUES
(4, '23CS1045', 'Computer Science & Engineering', 3),
(5, '23EE2012', 'Electrical & Electronics', 3),
(6, '24ME3090', 'Mechanical Engineering', 2),
(7, '22BT1004', 'Biotechnology', 4),
(8, '24DS4055', 'Data Science & AI', 2),
(9, '25CE5021', 'Civil Engineering', 1);

-- Organizer Profiles
INSERT INTO organizer_profile (organizer_id, organization_name, department, phone) VALUES
(2, 'Student Cultural Council (SCC)', 'Dean of Student Affairs', '+91 98765 43210'),
(3, 'ACM Student Chapter', 'Department of Computing', '+91 98765 43211');

-- Events (matching the UI mockup references)
INSERT INTO event (event_id, title, description, category_id, venue_id, organizer_id, start_time, end_time, registration_deadline, capacity, poster_url, is_online_registration_enabled, status) VALUES
(1, 'After Hours: Campus Music Night', 
'After Hours is the ultimate campus music night — a celebration of student talent, good vibes and great company. Come for the music, stay for the memories! Featuring indie acoustic sets, student band battle, and DJ closing session.', 
1, 1, 2, '2026-11-15 18:00:00', '2026-11-15 22:00:00', '2026-11-14 23:59:00', 200, 
'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800', 
TRUE, 'PUBLISHED'),

(2, 'Code for Impact Hackathon 2026', 
'A 24-hour sprint tackling UN Sustainable Development Goals through code, hardware prototypes, and AI solutions. Mentor clinics, lightning pitch rounds, and $2,500 prize pool.', 
2, 2, 3, '2026-11-12 09:00:00', '2026-11-13 17:00:00', '2026-11-10 23:59:00', 150, 
'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800', 
TRUE, 'PUBLISHED'),

(3, 'Intro to Digital Art & Motion Design', 
'Learn the foundational workflows of modern digital illustration, vector styling, and 2D keyframing from industry guest designers. Laptops provided.', 
3, 3, 2, '2026-11-18 10:00:00', '2026-11-18 13:00:00', '2026-11-17 18:00:00', 50, 
'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800', 
TRUE, 'PUBLISHED'),

(4, 'Inter-Branch Sports Day', 
'Annual multi-sport athletics meet. Track and field sprints, relay races, badminton playoffs, and tug-of-war. Deliberately set to capacity 2 to demonstrate concurrency & full event state.', 
4, 4, 2, '2026-11-22 08:00:00', '2026-11-22 17:00:00', '2026-11-20 20:00:00', 2, 
'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800', 
TRUE, 'PUBLISHED'),

(5, 'Future of Generative AI & Career Paths', 
'Fireside dialogue with senior engineers from top research labs on agentic architectures, open weights, and breaking into AI engineering.', 
5, 2, 3, '2026-11-25 16:30:00', '2026-11-25 18:30:00', '2026-11-24 23:59:00', 120, 
'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800', 
TRUE, 'PUBLISHED');

-- Registrations (Pre-seeded to match mockups)
-- Event 1 (After Hours): 4 confirmed
INSERT INTO registration (event_id, student_id, registered_at, status) VALUES
(1, 4, '2026-11-01 10:14:00', 'CONFIRMED'),
(1, 5, '2026-11-01 11:20:00', 'CONFIRMED'),
(1, 6, '2026-11-02 09:10:00', 'CONFIRMED'),
(1, 7, '2026-11-02 14:45:00', 'CONFIRMED');

-- Event 2 (Hackathon): 3 confirmed
INSERT INTO registration (event_id, student_id, registered_at, status) VALUES
(2, 4, '2026-11-03 16:22:00', 'CONFIRMED'),
(2, 8, '2026-11-04 10:11:00', 'CONFIRMED'),
(2, 9, '2026-11-04 12:30:00', 'CONFIRMED');

-- Event 3 (Digital Art): 2 confirmed
INSERT INTO registration (event_id, student_id, registered_at, status) VALUES
(3, 4, '2026-11-05 14:00:00', 'CONFIRMED'),
(3, 6, '2026-11-05 15:20:00', 'CONFIRMED');

-- Event 4 (Sports Day): Capacity 2 with 2 confirmed (Deliberately FULL for testing!)
INSERT INTO registration (event_id, student_id, registered_at, status) VALUES
(4, 5, '2026-11-06 08:30:00', 'CONFIRMED'),
(4, 7, '2026-11-06 09:15:00', 'CONFIRMED');

-- Audit Log Initial Seed
INSERT INTO audit_log (operation_type, entity, entity_id, description, executed_by, sql_preview) VALUES
('INSERT', 'DATABASE', 1, 'Initial database schema and tables provisioned with foreign keys & check constraints.', 'SYSTEM', 'CREATE TABLE category...'),
('TRIGGER', 'VENUE', 1, 'Capacity constraint triggers compiled and registered for execution.', 'SYSTEM', 'CREATE TRIGGER trg_check_capacity_before_insert...'),
('INSERT', 'EVENT', 1, 'After Hours: Campus Music Night published by Student Cultural Council.', 'organizer@bonhomie.dev', 'INSERT INTO event VALUES (...)');
