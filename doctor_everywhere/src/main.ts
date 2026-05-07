// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { App } from './app/app';
import { APP_ROUTES } from './app/app.routes';
import { authInterceptor } from './app/auth/interceptors/auth.interceptor';

bootstrapApplication(App, {
  providers: [
    provideRouter(APP_ROUTES, withComponentInputBinding()),
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
  ],
}).catch(err => console.error(err));