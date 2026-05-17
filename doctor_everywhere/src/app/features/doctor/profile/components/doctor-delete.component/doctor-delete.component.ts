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

  onDeleteClick(): void {
    // Standard browser confirmation dialog
    const confirmed = window.confirm(
      'Are you sure you want to delete your profile? This action cannot be undone. All your future appointments will be immediately rejected.'
    );

    if (confirmed) {
      this.isDeleting = true;
      this.errorMessage = '';

      this.doctorService.deleteDoctorProfile().subscribe({
        next: (response) => {
          // Profile is deleted and appointments are cancelled on the backend.
          // Clear local tokens and redirect to the home page or login page.
          this.authService.logout(); 
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.isDeleting = false;
          // Capture the 500 error message returned from the backend if it fails
          this.errorMessage = err.error || 'An unexpected error occurred while deleting the profile.';
        }
      });
    }
  }
}
