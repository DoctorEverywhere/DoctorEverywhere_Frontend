import { Component, inject } from '@angular/core';
import { PatientService } from '../../../../services/patient.service';
import { AuthService } from '../../../../../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-delete',
  standalone: true,
  imports: [],
  templateUrl: './patient-delete.component.html',
  styleUrl: './patient-delete.component.scss',
})
export class PatientDeleteComponent {
  private patientService = inject(PatientService);
  private authService = inject(AuthService);
  private router = inject(Router);

  isDeleting = false;
  errorMessage = '';
  showConfirmDialog = false;

  onDeleteClick(): void {
    this.showConfirmDialog = true;
  }

  onCancel(): void {
    this.showConfirmDialog = false;
  }

  onConfirm(): void {
    this.showConfirmDialog = false;
    this.isDeleting = true;
    this.errorMessage = '';

    this.patientService.deletePatientProfile().subscribe({
      next: () => {
        this.authService.logout();
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.isDeleting = false;
        this.errorMessage = err.error || 'An unexpected error occurred while deleting the profile.';
      }
    });
  }
}