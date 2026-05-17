import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Appointment } from '../../../../../shared/models/appointment.model';

@Component({
  selector: 'app-today-schedule',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './today-schedule.component.html',
  styleUrls: ['./today-schedule.component.scss']
})
export class TodayScheduleComponent {
  @Input() appointments: Appointment[] = [];
  @Input() loading = false;

  initials(name: string): string {
    return name.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase();
  }


  getTime(startingAt: string): string {
    return startingAt.split('T')[1].slice(0, 5);
  }
}
