import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { DoctorService } from '../services/doctor.service';
import { Message } from '../../../shared/models/message.model';
import { Appointment, AppointmentStatus } from '../../../shared/models/appointment.model';
import { MessageComposeComponent, SendMessageEvent } from './components/message-compose/message-compose.component';
import { MessageListComponent } from './components/message-list/message-list.component';

@Component({
  selector: 'app-doctor-messages',
  standalone: true,
  imports: [MessageComposeComponent, MessageListComponent],
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class DoctorMessagesComponent implements OnInit {
  private svc = inject(DoctorService);
  private cdr = inject(ChangeDetectorRef);

  messages: Message[]         = [];
  appointments: Appointment[] = [];
  loading = true;
  sending = false;

  ngOnInit(): void {
    this.svc.getMessages().subscribe(m => { this.messages = m; this.loading = false; this.cdr.detectChanges(); });
    this.svc.getAppointments().subscribe(a => {
      this.appointments = a.filter(x => x.statusId !== AppointmentStatus.Cancelled);
      this.cdr.detectChanges();
    });
  }

  onSend(event: SendMessageEvent): void {
    this.sending = true;
    this.svc.sendMessage(event.appointmentId, event.content).subscribe(msg => {
      this.messages.unshift(msg);
      this.sending = false;
      this.cdr.detectChanges();
    });
  }
}
