// Matches backend AppointmentStatus enum exactly
export enum AppointmentStatus {
  Pending     = 0,
  Confirmed   = 1,
  Cancelled   = 2,
  Rejected    = 3,
  Rescheduled = 4,
}

// Matches backend AppointmentDto exactly
export interface Appointment {
  id: number;
  patientId: number;
  doctorId: number;
  startingAt: string;    // ISO datetime: "2026-05-20T09:00:00"
  statusId: AppointmentStatus;
  requestedAt: string;   // ISO datetime
  doctorName: string;
  patientName: string;
}

// Sent to POST /api/appointment/request?doctorId={id}
export interface CreateAppointmentRequest {
  startingAt: string;    // ISO datetime — doctorId goes as query param
}
