import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { PatientService } from '../services/patient.service';
import { Appointment, AppointmentStatus } from '../../../shared/models/appointment.model';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [NgClass],
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {
  private svc = inject(PatientService);
  private cdr = inject(ChangeDetectorRef);

  appointments: Appointment[] = [];
  loading = true;
  activeTab: 'upcoming' | 'past' | 'cancelled' = 'upcoming';

  ngOnInit(): void {
    this.svc.getMyAppointments().subscribe({
      next: a => { this.appointments = a; this.loading = false; this.cdr.detectChanges(); },
      error: () => { this.loading = false; this.cdr.detectChanges(); }
    });
  }

  get today(): string { return new Date().toISOString().split('T')[0]; }

  get upcoming(): Appointment[] {
    return this.appointments.filter(a =>
      a.startingAt.split('T')[0] >= this.today && a.statusId !== AppointmentStatus.Cancelled
    );
  }
  get past(): Appointment[] {
    return this.appointments.filter(a =>
      a.startingAt.split('T')[0] < this.today && a.statusId !== AppointmentStatus.Cancelled
    );
  }
  get cancelled(): Appointment[] {
    return this.appointments.filter(a => a.statusId === AppointmentStatus.Cancelled);
  }

  get activeList(): Appointment[] {
    return this.activeTab === 'upcoming' ? this.upcoming
         : this.activeTab === 'past'     ? this.past
         : this.cancelled;
  }

  cancel(id: number): void {
    this.svc.cancelAppointment(id).subscribe(() => {
      const a = this.appointments.find(x => x.id === id);
      if (a) a.statusId = AppointmentStatus.Cancelled;
      this.cdr.detectChanges();
    });
  }

  getDate(startingAt: string): string { return startingAt.split('T')[0]; }
  getTime(startingAt: string): string { return startingAt.split('T')[1].slice(0, 5); }

  statusLabel(statusId: AppointmentStatus): string {
    return AppointmentStatus[statusId]?.toLowerCase() ?? 'unknown';
  }

  statusClass(statusId: AppointmentStatus): string {
    const map: Record<number, string> = {
      [AppointmentStatus.Confirmed]:   'status-confirmed',
      [AppointmentStatus.Pending]:     'status-pending',
      [AppointmentStatus.Rejected]:    'status-rejected',
      [AppointmentStatus.Rescheduled]: 'status-modified',
      [AppointmentStatus.Cancelled]:   'status-cancelled',
    };
    return map[statusId] ?? '';
  }

  formatDate(d: string): string {
    return new Date(d).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  }
}
