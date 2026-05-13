import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { Appointment } from '../../../../../shared/models/appointment.model';

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

  statusClass(s: string): string {
    return ({ confirmed: 'status-confirmed', pending: 'status-pending', rejected: 'status-rejected', modified: 'status-modified', cancelled: 'status-cancelled' } as Record<string, string>)[s] ?? '';
  }

  formatDate(d: string): string {
    return new Date(d).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  }
}
