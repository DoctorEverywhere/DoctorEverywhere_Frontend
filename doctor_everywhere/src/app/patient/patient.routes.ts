import { Routes } from '@angular/router';
import { PatientShellComponent } from './dashboard/dashboard.component';

export const PATIENT_ROUTES: Routes = [
  {
    path: '',
    component: PatientShellComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard/home.component').then(m => m.PatientHomeComponent),
      },
      {
        path: 'search',
        loadComponent: () =>
          import('./search/search.component').then(m => m.SearchComponent),
      },
      {
        path: 'appointments',
        loadComponent: () =>
          import('./appointments/appointments.component').then(m => m.AppointmentsComponent),
      },
      {
        path: 'messages',
        loadComponent: () =>
          import('./messages/messages.component').then(m => m.MessagesComponent),
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
];