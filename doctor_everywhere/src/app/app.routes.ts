import { Routes } from '@angular/router';
import { UserRole } from './auth/models/auth.models';
import { roleGuard } from './auth/guards/auth.guard';

const patientGuard = roleGuard(UserRole.Patient);
// const doctorGuard  = roleGuard(UserRole.Doctor);
// const managerGuard = roleGuard(UserRole.Manager);

export const APP_ROUTES: Routes = [
  // ── Auth (public) ──────────────────────────────────────────────────────
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.routes').then(m => m.AUTH_ROUTES),
  },

  // ── Patient ────────────────────────────────────────────────────────────
  {
    path: 'patient',
    //canActivate: [patientGuard],
    loadChildren: () =>
      import('./patient/patient.routes').then(m => m.PATIENT_ROUTES),
  },

  // ── Doctor (uncomment when ready) ─────────────────────────────────────
  // {
  //   path: 'doctor',
  //   canActivate: [doctorGuard],
  //   loadChildren: () =>
  //     import('./doctor/doctor.routes').then(m => m.DOCTOR_ROUTES),
  // },

  // ── Manager (uncomment when ready) ────────────────────────────────────
  // {
  //   path: 'manager',
  //   canActivate: [managerGuard],
  //   loadChildren: () =>
  //     import('./manager/manager.routes').then(m => m.MANAGER_ROUTES),
  // },

  // ── Default ────────────────────────────────────────────────────────────
  // { path: '',   redirectTo: 'auth/login', pathMatch: 'full' },
  // { path: '**', redirectTo: 'auth/login' },
{ path: '', redirectTo: 'patient/dashboard', pathMatch: 'full' },
{ path: '**', redirectTo: 'patient/dashboard' },
];