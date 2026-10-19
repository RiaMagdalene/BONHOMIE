-- =========================================================================
-- BONHOMIE CAMPUS EVENT MANAGEMENT SYSTEM
-- Relational Database Schema (MySQL 8.0+ / Oracle Compatible)
-- =========================================================================

CREATE DATABASE IF NOT EXISTS bonhomie;
USE bonhomie;

-- Drop dependent tables in reverse order if re-running
DROP TABLE IF EXISTS audit_log;
DROP TABLE IF EXISTS registration;
DROP TABLE IF EXISTS event;
DROP TABLE IF EXISTS organizer_profile;
DROP TABLE IF EXISTS student_profile;
DROP TABLE IF EXISTS user_account;
DROP TABLE IF EXISTS venue;
DROP TABLE IF EXISTS category;

-- =========================================================================
-- 1. CATEGORY TABLE (Normalized category lookup)
-- =========================================================================
CREATE TABLE category (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    slug VARCHAR(50) NOT NULL UNIQUE,
    color_hex VARCHAR(7) NOT NULL DEFAULT '#D8FF24',
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- =========================================================================
-- 2. VENUE TABLE (Physical campus facilities with max safe capacities)
-- =========================================================================
CREATE TABLE venue (
    venue_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(120) NOT NULL UNIQUE,
    location VARCHAR(200) NOT NULL,
    capacity INT NOT NULL,
    facilities TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_venue_capacity CHECK (capacity > 0)
) ENGINE=InnoDB;

-- =========================================================================
-- 3. USER_ACCOUNT TABLE (Base credentials and role-based access)
-- =========================================================================
CREATE TABLE user_account (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(120) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    role ENUM('STUDENT', 'ORGANIZER', 'ADMIN') NOT NULL DEFAULT 'STUDENT',
    avatar_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- =========================================================================
-- 4. STUDENT_PROFILE TABLE (1-to-1 extension of user_account)
-- =========================================================================
CREATE TABLE student_profile (
    student_id INT PRIMARY KEY,
    roll_number VARCHAR(30) NOT NULL UNIQUE,
    department VARCHAR(100) NOT NULL,
    year_of_study INT NOT NULL CHECK (year_of_study BETWEEN 1 AND 5),
    CONSTRAINT fk_student_user FOREIGN KEY (student_id) 
        REFERENCES user_account(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- =========================================================================
-- 5. ORGANIZER_PROFILE TABLE (1-to-1 extension of user_account)
-- =========================================================================
CREATE TABLE organizer_profile (
    organizer_id INT PRIMARY KEY,
    organization_name VARCHAR(120) NOT NULL,
    department VARCHAR(100),
    phone VARCHAR(20),
    CONSTRAINT fk_organizer_user FOREIGN KEY (organizer_id) 
        REFERENCES user_account(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- =========================================================================
-- 6. EVENT TABLE (Core event entity with venue and organizer relationships)
-- =========================================================================
CREATE TABLE event (
    event_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    category_id INT NOT NULL,
    venue_id INT NOT NULL,
    organizer_id INT NOT NULL,
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    registration_deadline DATETIME NOT NULL,
    capacity INT NOT NULL,
    poster_url VARCHAR(500),
    is_online_registration_enabled BOOLEAN DEFAULT TRUE,
    status ENUM('DRAFT', 'PUBLISHED', 'CANCELLED', 'COMPLETED') NOT NULL DEFAULT 'DRAFT',
    hidden_by_organizer BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_event_category FOREIGN KEY (category_id) 
        REFERENCES category(category_id) ON DELETE RESTRICT,
    CONSTRAINT fk_event_venue FOREIGN KEY (venue_id) 
        REFERENCES venue(venue_id) ON DELETE RESTRICT,
    CONSTRAINT fk_event_organizer FOREIGN KEY (organizer_id) 
        REFERENCES user_account(user_id) ON DELETE RESTRICT,
    CONSTRAINT chk_event_capacity CHECK (capacity > 0),
    CONSTRAINT chk_event_dates CHECK (end_time > start_time),
    CONSTRAINT chk_reg_deadline CHECK (registration_deadline <= start_time)
) ENGINE=InnoDB;

-- Index for searching and filtering performance
CREATE INDEX idx_event_status_start ON event(status, start_time);
CREATE INDEX idx_event_category ON event(category_id);
CREATE INDEX idx_event_organizer ON event(organizer_id);

-- =========================================================================
-- 7. REGISTRATION TABLE (M-to-M junction between STUDENT and EVENT)
-- =========================================================================
CREATE TABLE registration (
    registration_id INT AUTO_INCREMENT PRIMARY KEY,
    event_id INT NOT NULL,
    student_id INT NOT NULL,
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('CONFIRMED', 'CANCELLED') NOT NULL DEFAULT 'CONFIRMED',
    cancellation_reason VARCHAR(255),
    cancelled_at DATETIME,
    hidden_by_student BOOLEAN DEFAULT FALSE,
    
    CONSTRAINT fk_reg_event FOREIGN KEY (event_id) 
        REFERENCES event(event_id) ON DELETE CASCADE,
    CONSTRAINT fk_reg_student FOREIGN KEY (student_id) 
        REFERENCES user_account(user_id) ON DELETE CASCADE,
    CONSTRAINT uq_student_event UNIQUE (student_id, event_id)
) ENGINE=InnoDB;

CREATE INDEX idx_reg_event_status ON registration(event_id, status);
CREATE INDEX idx_reg_student_status ON registration(student_id, status);

-- =========================================================================
-- 8. AUDIT_LOG TABLE (DML and Transaction tracking)
-- =========================================================================
CREATE TABLE audit_log (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    operation_type ENUM('INSERT', 'UPDATE', 'DELETE', 'TRANSACTION', 'TRIGGER') NOT NULL,
    entity VARCHAR(50) NOT NULL,
    entity_id INT,
    description TEXT NOT NULL,
    executed_by VARCHAR(100),
    sql_preview TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- =========================================================================
-- TRIGGERS: Business Rule Enforcement
-- =========================================================================

-- Trigger 1: Ensure event capacity does NOT exceed venue physical capacity before insert
DELIMITER $$
CREATE TRIGGER trg_check_capacity_before_insert
BEFORE INSERT ON event
FOR EACH ROW
BEGIN
    DECLARE v_venue_cap INT;
    SELECT capacity INTO v_venue_cap FROM venue WHERE venue_id = NEW.venue_id;
    
    IF NEW.capacity > v_venue_cap THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Capacity constraint violation: Event capacity cannot exceed physical venue capacity.';
    END IF;
END$$

-- Trigger 2: Ensure event capacity does NOT exceed venue physical capacity before update
CREATE TRIGGER trg_check_capacity_before_update
BEFORE UPDATE ON event
FOR EACH ROW
BEGIN
    DECLARE v_venue_cap INT;
    SELECT capacity INTO v_venue_cap FROM venue WHERE venue_id = NEW.venue_id;
    
    IF NEW.capacity > v_venue_cap THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Capacity constraint violation: Event capacity cannot exceed physical venue capacity.';
    END IF;
END$$
DELIMITER ;

-- =========================================================================
-- VIEWS: Dynamic Calculated Seat Availability & Reports
-- =========================================================================

-- View 1: Real-time availability calculation (capacity - confirmed registrations)
CREATE OR REPLACE VIEW v_event_availability AS
SELECT 
    e.event_id,
    e.title,
    e.status,
    e.start_time,
    e.end_time,
    e.capacity,
    c.name AS category_name,
    v.name AS venue_name,
    COUNT(CASE WHEN r.status = 'CONFIRMED' THEN 1 END) AS confirmed_seats,
    (e.capacity - COUNT(CASE WHEN r.status = 'CONFIRMED' THEN 1 END)) AS available_seats,
    CASE 
        WHEN e.status = 'CANCELLED' THEN 'CANCELLED'
        WHEN (e.capacity - COUNT(CASE WHEN r.status = 'CONFIRMED' THEN 1 END)) <= 0 THEN 'FULL'
        ELSE 'AVAILABLE'
    END AS seat_status
FROM event e
JOIN category c ON e.category_id = c.category_id
JOIN venue v ON e.venue_id = v.venue_id
LEFT JOIN registration r ON e.event_id = r.event_id
GROUP BY e.event_id, e.title, e.status, e.start_time, e.end_time, e.capacity, c.name, v.name;

-- View 2: Organizer event performance summary
CREATE OR REPLACE VIEW v_organizer_performance AS
SELECT 
    u.user_id AS organizer_id,
    u.full_name,
    op.organization_name,
    COUNT(DISTINCT e.event_id) AS total_events,
    SUM(CASE WHEN e.status = 'PUBLISHED' THEN 1 ELSE 0 END) AS active_events,
    COUNT(CASE WHEN r.status = 'CONFIRMED' THEN 1 END) AS total_attendees,
    ROUND(
        (COUNT(CASE WHEN r.status = 'CONFIRMED' THEN 1 END) / NULLIF(SUM(e.capacity), 0)) * 100, 
        1
    ) AS fill_rate_percentage
FROM user_account u
JOIN organizer_profile op ON u.user_id = op.organizer_id
LEFT JOIN event e ON u.user_id = e.organizer_id AND e.hidden_by_organizer = FALSE
LEFT JOIN registration r ON e.event_id = r.event_id
GROUP BY u.user_id, u.full_name, op.organization_name;

-- =========================================================================
-- STORED PROCEDURES: Real-World Processing Operations
-- =========================================================================

-- Operation 1: Transaction-Safe Student Registration with Row Lock
DELIMITER $$
CREATE PROCEDURE sp_register_student_transactional(
    IN p_student_id INT,
    IN p_event_id INT,
    OUT p_result_code VARCHAR(30),
    OUT p_result_message VARCHAR(255)
)
proc_label: BEGIN
    DECLARE v_capacity INT;
    DECLARE v_confirmed INT;
    DECLARE v_status VARCHAR(20);
    DECLARE v_deadline DATETIME;
    DECLARE v_existing_status VARCHAR(20);

    -- Start Atomic Transaction
    START TRANSACTION;

    -- Row Lock the Event record
    SELECT capacity, status, registration_deadline 
    INTO v_capacity, v_status, v_deadline
    FROM event 
    WHERE event_id = p_event_id 
    FOR UPDATE;

    -- Validation 1: Event existence & status
    IF v_status IS NULL OR v_status != 'PUBLISHED' THEN
        SET p_result_code = 'NOT_PUBLISHED';
        SET p_result_message = 'Cannot register: This event is not currently published.';
        ROLLBACK;
        LEAVE proc_label;
    END IF;

    -- Validation 2: Deadline check
    IF NOW() > v_deadline THEN
        SET p_result_code = 'DEADLINE_PASSED';
        SET p_result_message = 'Registration closed: The deadline for this event has passed.';
        ROLLBACK;
        LEAVE proc_label;
    END IF;

    -- Validation 3: Check existing registration
    SELECT status INTO v_existing_status 
    FROM registration 
    WHERE student_id = p_student_id AND event_id = p_event_id;

    IF v_existing_status = 'CONFIRMED' THEN
        SET p_result_code = 'ALREADY_REGISTERED';
        SET p_result_message = 'You are already registered for this event.';
        ROLLBACK;
        LEAVE proc_label;
    END IF;

    -- Validation 4: Seat Capacity Check
    SELECT COUNT(*) INTO v_confirmed 
    FROM registration 
    WHERE event_id = p_event_id AND status = 'CONFIRMED';

    IF v_confirmed >= v_capacity THEN
        SET p_result_code = 'EVENT_FULL';
        SET p_result_message = 'Registration rejected: Event has reached maximum capacity.';
        ROLLBACK;
        LEAVE proc_label;
    END IF;

    -- Perform Registration (UPSERT logic to reuse cancelled record if exists)
    INSERT INTO registration (event_id, student_id, status, registered_at, hidden_by_student)
    VALUES (p_event_id, p_student_id, 'CONFIRMED', NOW(), FALSE)
    ON DUPLICATE KEY UPDATE 
        status = 'CONFIRMED', 
        registered_at = NOW(), 
        cancellation_reason = NULL, 
        cancelled_at = NULL, 
        hidden_by_student = FALSE;

    -- Log transaction
    INSERT INTO audit_log (operation_type, entity, entity_id, description, executed_by)
    VALUES ('TRANSACTION', 'REGISTRATION', p_event_id, CONCAT('Student ', p_student_id, ' registered successfully with row-lock.'), CONCAT('USER_', p_student_id));

    COMMIT;
    SET p_result_code = 'SUCCESS';
    SET p_result_message = 'Registration confirmed successfully!';
END$$

-- Operation 2: Cascade Event Cancellation
CREATE PROCEDURE sp_cancel_event_cascade(
    IN p_organizer_id INT,
    IN p_event_id INT,
    IN p_reason VARCHAR(255),
    OUT p_affected_registrations INT
)
BEGIN
    START TRANSACTION;

    -- Verify ownership
    IF NOT EXISTS (SELECT 1 FROM event WHERE event_id = p_event_id AND organizer_id = p_organizer_id) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Unauthorized: Only event creator can cancel.';
    END IF;

    -- 1. Mark event as CANCELLED
    UPDATE event 
    SET status = 'CANCELLED', updated_at = NOW() 
    WHERE event_id = p_event_id;

    -- 2. Cascade cancel all confirmed registrations
    UPDATE registration 
    SET status = 'CANCELLED', 
        cancellation_reason = COALESCE(p_reason, 'Event cancelled by organizer'),
        cancelled_at = NOW()
    WHERE event_id = p_event_id AND status = 'CONFIRMED';

    SET p_affected_registrations = ROW_COUNT();

    INSERT INTO audit_log (operation_type, entity, entity_id, description, executed_by)
    VALUES ('TRANSACTION', 'EVENT_CASCADE_CANCEL', p_event_id, 
            CONCAT('Event cancelled with cascade update on ', p_affected_registrations, ' registrations.'),
            CONCAT('ORGANIZER_', p_organizer_id));

    COMMIT;
END$$
DELIMITER ;
