import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PatientService } from '../services/patient.service';
import { Message } from '../../../shared/models/message.model';
import { Appointment, AppointmentStatus } from '../../../shared/models/appointment.model';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  private svc = inject(PatientService);
  private cdr = inject(ChangeDetectorRef);

  messages: Message[] = [];
  appointments: Appointment[] = [];
  loading = true;
  selectedAppointmentId = '';
  newMessage = '';
  sending = false;

  ngOnInit(): void {
    this.svc.getMyMessages().subscribe(m => { this.messages = m; this.loading = false; this.cdr.detectChanges(); });
    this.svc.getMyAppointments().subscribe(a => {
      this.appointments = a.filter(x => x.statusId !== AppointmentStatus.Cancelled);
      this.cdr.detectChanges();
    });
  }

  send(): void {
    if (!this.newMessage.trim() || !this.selectedAppointmentId) return;
    this.sending = true;
    this.svc.sendMessage(this.selectedAppointmentId, this.newMessage.trim()).subscribe(msg => {
      this.messages.unshift(msg);
      this.newMessage = '';
      this.sending = false;
      this.cdr.detectChanges();
    });
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
