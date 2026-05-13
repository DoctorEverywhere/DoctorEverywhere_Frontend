import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DoctorRequest } from '../../../models/doctor.models';

@Component({
  selector: 'app-pending-requests-preview',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './pending-requests-preview.component.html',
  styleUrls: ['./pending-requests-preview.component.scss']
})
export class PendingRequestsPreviewComponent {
  @Input()  requests: DoctorRequest[] = [];
  @Output() accepted = new EventEmitter<string>();
  @Output() rejected = new EventEmitter<string>();

  initials(name: string): string {
    return name.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase();
  }

  formatDate(d: string): string {
    return new Date(d).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });
  }

  timeAgo(iso: string): string {
    const diff = Date.now() - new Date(iso).getTime();
    const m = Math.floor(diff / 60000);
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    return `${Math.floor(h / 24)}d ago`;
  }
}
