export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const;
export type Day = typeof DAYS[number];

export const TIME_SLOTS = [
  '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'
] as const;

export type WeeklySchedule = Record<Day, string[]>;

export interface AvailabilityRange {
  start: string;
  end: string;
}

export type WeeklyAvailability = Record<Day, AvailabilityRange[]>;

export interface AvailabilitySlot {
  dayOfWeek: Day;
  startTime: string;
  endTime: string;
}

export interface SaveSlotsRequest {
  slots: AvailabilitySlot[];
}

export interface DoctorOffice {
  id: number;
  name: string;
  address: string;
  city: string;
  postalCode: string;
  latitude: number;
  longitude: number;
}

export interface DoctorProfile {
  id: number;
  firstName: string;
  lastName: string;
  specialty: number;
  office: DoctorOffice;
}

export const SPECIALTY_LABELS: Record<number, string | undefined> = {
  0: 'General Practicioner',
  1: 'Cardiologist',
  2: 'Dermatologist',
  3: 'Neurologist',
  4: 'Pediatrician',
  5: 'Psychiatrist',
  6: 'Orthopedic',
  7: 'Gynecologist',
  8: 'Dentist',
  9: 'Ophthalmologist',
};

export interface DoctorRequest {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  time: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}
