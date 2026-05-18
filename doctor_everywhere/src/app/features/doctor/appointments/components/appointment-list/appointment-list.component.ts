import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { Appointment, AppointmentStatus } from '../../../../../shared/models/appointment.model';

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [NgClass],
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss']
})
export class AppointmentListComponent {
  @Input() appointments: Appointment[] = [];
  @Input() loading = false;
  @Input() label = 'appointments';

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
