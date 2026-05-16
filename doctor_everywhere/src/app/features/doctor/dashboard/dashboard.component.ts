import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../../shared/services/auth.service';
import { DoctorService } from '../services/doctor.service';
import { Appointment } from '../../../shared/models/appointment.model';
import { Message } from '../../../shared/models/message.model';
import { DoctorRequest } from '../models/doctor.models';
import { UserInfo } from '../../../shared/models/user-identity.model';
import { StatCardsComponent } from './components/stat-cards/stat-cards.component';
import { TodayScheduleComponent } from './components/today-schedule/today-schedule.component';
import { PendingRequestsPreviewComponent } from './components/pending-requests-preview/pending-requests-preview.component';

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [AsyncPipe, RouterLink, StatCardsComponent, TodayScheduleComponent, PendingRequestsPreviewComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DoctorDashboardComponent implements OnInit {
  private auth = inject(AuthService);
  private svc  = inject(DoctorService);

  readonly user$: Observable<UserInfo | null> = this.auth.currentUser$;

  todayAppointments: Appointment[] = [];
  pendingRequests: DoctorRequest[]  = [];
  unreadMessages: Message[]         = [];
  loading = true;

  ngOnInit(): void {
    const today = new Date().toISOString().split('T')[0];

    this.svc.getAppointments().subscribe(appts => {
      this.todayAppointments = appts.filter(a => a.date === today && a.status !== 'cancelled');
      this.loading = false;
    });

    this.svc.getRequests().subscribe(reqs => {
      this.pendingRequests = reqs.filter(r => r.status === 'pending').slice(0, 3);
    });

    this.svc.getMessages().subscribe(msgs => {
      this.unreadMessages = msgs.filter(m => m.fromPatient && !m.read);
    });
  }

  accept(id: string): void {
    this.svc.acceptRequest(id).subscribe(() => {
      this.pendingRequests = this.pendingRequests.filter(r => r.id !== id);
    });
  }

  reject(id: string): void {
    this.svc.rejectRequest(id).subscribe(() => {
      this.pendingRequests = this.pendingRequests.filter(r => r.id !== id);
    });
  }
}
