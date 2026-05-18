import { Component, inject } from '@angular/core';
import { DoctorService } from '../../../services/doctor.service';
import { AuthService } from '../../../../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-delete',
  standalone: true,
  imports: [],
  templateUrl: './doctor-delete.component.html',
  styleUrl: './doctor-delete.component.scss',
})
export class DoctorDeleteComponent {
  private doctorService = inject(DoctorService);
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

    this.doctorService.deleteDoctorProfile().subscribe({
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
