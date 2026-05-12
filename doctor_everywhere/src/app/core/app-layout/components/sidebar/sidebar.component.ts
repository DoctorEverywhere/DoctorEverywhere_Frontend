import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserRole, UserInfo } from '../../../../shared/models/user-identity.model';
import { AuthService } from '../../../../shared/services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink], // Added RouterLink
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  private auth = inject(AuthService);
  private router = inject(Router); // Inject Router

  public UserRole = UserRole; // Make UserRole accessible in the template

  currentUser$: Observable<UserInfo | null> = this.auth.currentUser$;
  role$: Observable<UserRole | undefined> = this.currentUser$.pipe(
    map(user => user?.role)
  );

  constructor() { }

  ngOnInit(): void {
  }

  // Restoring placeholder methods if they were part of the original working version
  initials(firstName: string, lastName: string): string {
    if (!firstName || !lastName) return '';
    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
  }

  isDoctor(): Observable<boolean> {
    return this.role$.pipe(map(role => role === UserRole.Doctor));
  }

  isPatient(): Observable<boolean> {
    return this.role$.pipe(map(role => role === UserRole.Patient));
  }

  isManager(): Observable<boolean> {
    return this.role$.pipe(map(role => role === UserRole.Manager));
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/auth/login']); // Redirect to login page after logout
  }
}
