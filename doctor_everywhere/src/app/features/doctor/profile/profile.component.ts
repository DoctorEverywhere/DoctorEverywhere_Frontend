import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { DoctorService } from '../services/doctor.service';
import { DoctorProfile, SPECIALTY_LABELS } from '../models/doctor.models';

@Component({
  selector: 'app-doctor-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class DoctorProfileComponent implements OnInit {
  private auth = inject(AuthService);
  private svc  = inject(DoctorService);

  profile: DoctorProfile | null = null;
  loading = true;
  error = '';

  readonly specialtyLabels = SPECIALTY_LABELS;

  ngOnInit(): void {
    const rawId = this.auth.getCurrentUser()?.id ?? '1';
    const doctorId = parseInt(rawId, 10) || 1;

    this.svc.getDoctorProfile(doctorId).subscribe({
      next: p  => { this.profile = p; this.loading = false; },
      error: () => { this.error = 'Failed to load profile. Please try again.'; this.loading = false; },
    });
  }
}
