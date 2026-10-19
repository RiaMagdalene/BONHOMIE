export type UserRole = 'STUDENT' | 'ORGANIZER' | 'ADMIN';

export type EventStatus = 'DRAFT' | 'PUBLISHED' | 'CANCELLED' | 'COMPLETED';

export type RegistrationStatus = 'CONFIRMED' | 'CANCELLED';

export interface User {
  user_id: number;
  email: string;
  full_name: string;
  role: UserRole;
  avatar_url?: string;
  roll_number?: string; // For students
  department?: string;
  organization_name?: string; // For organizers
  created_at: string;
}

export interface Category {
  category_id: number;
  name: string;
  slug: string;
  color_hex: string;
  bg_class: string;
  border_class: string;
  description?: string;
}

export interface Venue {
  venue_id: number;
  name: string;
  location: string;
  capacity: number;
  facilities: string[];
}

export interface EventItem {
  event_id: number;
  title: string;
  description: string;
  category_id: number;
  category_name?: string;
  venue_id: number;
  venue_name?: string;
  organizer_id: number;
  organizer_name?: string;
  organizer_org?: string;
  start_time: string; // ISO string e.g. 2026-11-15T18:00:00
  end_time: string;
  registration_deadline: string;
  capacity: number;
  poster_url: string;
  is_online_registration_enabled: boolean;
  status: EventStatus;
  hidden_by_organizer: boolean;
  created_at: string;
  updated_at: string;
  highlights?: string[];
  features?: string[];
  // Calculated dynamically
  confirmed_count?: number;
  available_seats?: number;
  is_full?: boolean;
}

export interface Registration {
  registration_id: number;
  event_id: number;
  student_id: number;
  registered_at: string;
  status: RegistrationStatus;
  cancellation_reason?: string;
  cancelled_at?: string;
  hidden_by_student: boolean;
  // Joined fields
  event_title?: string;
  event_start_time?: string;
  event_poster?: string;
  venue_name?: string;
  category_name?: string;
  student_name?: string;
  student_email?: string;
  student_roll_number?: string;
  student_dept?: string;
}

export interface AuditLog {
  log_id: number;
  operation_type: 'INSERT' | 'UPDATE' | 'DELETE' | 'TRANSACTION' | 'TRIGGER';
  entity: string;
  entity_id?: number;
  description: string;
  executed_by?: string;
  sql_preview: string;
  timestamp: string;
}
