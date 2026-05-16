import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Appointment } from '../../../../../shared/models/appointment.model';

export interface SendMessageEvent {
  appointmentId: string;
  content: string;
}

@Component({
  selector: 'app-message-compose',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './message-compose.component.html'
})
export class MessageComposeComponent {
  @Input()  appointments: Appointment[] = [];
  @Input()  sending = false;
  @Output() messageSent = new EventEmitter<SendMessageEvent>();

  selectedAppointmentId = '';
  content = '';

  send(): void {
    if (!this.content.trim() || !this.selectedAppointmentId) return;
    this.messageSent.emit({ appointmentId: this.selectedAppointmentId, content: this.content.trim() });
    this.content = '';
  }
}
