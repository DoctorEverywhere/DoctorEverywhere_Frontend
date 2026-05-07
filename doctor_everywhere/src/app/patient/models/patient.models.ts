export interface Doctor {
  id: string;
  firstName: string;
  lastName: string;
  specialty: string;
  address: string;
  latitude: number;
  longitude: number;
  distanceKm?: number;
  rating: number;
  reviewCount: number;
  availableSlots: number;
}

export interface TimeSlot {
  id: string;
  date: string;
  time: string;
  available: boolean;
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  notes?: string;
  createdAt: string;
}

export type AppointmentStatus = 'pending' | 'confirmed' | 'rejected' | 'modified' | 'cancelled';

export interface AppointmentRequest {
  doctorId: string;
  slotId: string;
  notes?: string;
}

export interface Message {
  id: string;
  appointmentId: string;
  doctorName: string;
  content: string;
  sentAt: string;
  fromPatient: boolean;
  read: boolean;
}