import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../../shared/services/auth.service';
import { PatientService } from '../services/patient.service';
import { Message } from '../../../shared/models/message.model';
import { UserInfo } from '../../../shared/models/user-identity.model';

@Component({
  selector: 'app-patient-shell',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class PatientShellComponent implements OnInit {
  user$!: Observable<UserInfo | null>;
  unreadCount = 0;

  constructor(private auth: AuthService, private patientSvc: PatientService) {
    this.user$ = this.auth.currentUser$;
  }

  ngOnInit(): void {
    this.patientSvc.getMyMessages().subscribe((msgs: Message[]) => {
      this.unreadCount = msgs.filter((m: Message) => !m.read && !m.fromPatient).length;
    });
  }

  logout(): void { this.auth.logout(); }

  initials(f: string, l: string): string {
    return `${f[0]}${l[0]}`.toUpperCase();
  }
}