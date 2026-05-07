import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientService } from '../services/patient.service';
import { Appointment } from '../models/patient.models';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {
  appointments: Appointment[] = [];
  loading = true;
  activeTab: 'upcoming' | 'past' = 'upcoming';

  constructor(private svc: PatientService) {}

  ngOnInit(): void {
    this.svc.getMyAppointments().subscribe(a => { this.appointments = a; this.loading = false; });
  }

  get today(): string { return new Date().toISOString().split('T')[0]; }

  get upcoming(): Appointment[] {
    return this.appointments.filter(a => a.date >= this.today && a.status !== 'cancelled');
  }
  get past(): Appointment[] {
    return this.appointments.filter(a => a.date < this.today || a.status === 'cancelled');
  }

  cancel(id: string): void {
    this.svc.cancelAppointment(id).subscribe(() => {
      const a = this.appointments.find(x => x.id === id);
      if (a) a.status = 'cancelled';
    });
  }

  statusClass(s: string): string {
    return ({ confirmed: 'status-confirmed', pending: 'status-pending', rejected: 'status-rejected', modified: 'status-modified', cancelled: 'status-cancelled' })[s] ?? '';
  }

  formatDate(d: string): string {
    return new Date(d).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  }
}