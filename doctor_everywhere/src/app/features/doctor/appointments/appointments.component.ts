import { Component, inject, OnInit } from '@angular/core';
import { DoctorService } from '../services/doctor.service';
import { Appointment } from '../../../shared/models/appointment.model';
import { AppointmentListComponent } from './components/appointment-list/appointment-list.component';
import { WeeklyScheduleComponent } from './components/weekly-schedule/weekly-schedule.component';

@Component({
  selector: 'app-doctor-appointments',
  standalone: true,
  imports: [AppointmentListComponent, WeeklyScheduleComponent],
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class DoctorAppointmentsComponent implements OnInit {
  private svc = inject(DoctorService);

  appointments: Appointment[] = [];
  loading = true;
  activeTab: 'upcoming' | 'past' | 'cancelled' | 'slots' = 'upcoming';

  ngOnInit(): void {
    this.svc.getAppointments().subscribe(a => { this.appointments = a; this.loading = false; });
  }

  private get today(): string { return new Date().toISOString().split('T')[0]; }

  get upcoming():  Appointment[] { return this.appointments.filter(a => a.date >= this.today && a.status !== 'cancelled'); }
  get past():      Appointment[] { return this.appointments.filter(a => a.date <  this.today && a.status !== 'cancelled'); }
  get cancelled(): Appointment[] { return this.appointments.filter(a => a.status === 'cancelled'); }

  get activeList(): Appointment[] {
    return this.activeTab === 'upcoming' ? this.upcoming
         : this.activeTab === 'past'     ? this.past
         : this.cancelled;
  }
}
