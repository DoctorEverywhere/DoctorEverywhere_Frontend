import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { DoctorService } from '../services/doctor.service';
import { DoctorProfile, SPECIALTY_LABELS } from '../models/doctor.models';
import { DoctorDeleteComponent } from './components/doctor-delete.component/doctor-delete.component';

@Component({
  selector: 'app-doctor-profile',
  standalone: true,
  imports: [DoctorDeleteComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class DoctorProfileComponent implements OnInit {
  private auth = inject(AuthService);
  private svc  = inject(DoctorService);
  private cdr  = inject(ChangeDetectorRef);

  profile: DoctorProfile | null = null;
  loading = true;
  error = '';

  readonly specialtyLabels = SPECIALTY_LABELS;

  ngOnInit(): void {
    this.svc.getMyProfile().subscribe({
      next: p => {
        this.profile = p;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Failed to load profile.';
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }
}
