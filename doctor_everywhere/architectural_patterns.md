# Frontend Architecture — DoctorEverywhere

## Structure
```
src/app/
├── app.config.ts         ← Application-level providers (HttpClient, Router, Interceptors)
├── app.routes.ts         ← Top-level routing (lazy loads feature modules)
├── app.ts                ← Root component
│
├── core/                 ← Singleton infrastructure (one instance for the whole app)
│   ├── guards/           ← Route access control
│   │   └── auth.guard.ts
│   ├── interceptors/     ← HTTP middleware
│   │   └── jwt.interceptor.ts
│   └── app-layout/       ← Shell layout (sidebar, footer)
│
├── shared/               ← Reusable across features
│   ├── models/           ← TypeScript interfaces (type definitions)
│   └── services/         ← Auth service (used by everyone)
│
└── features/             ← Feature-specific code
    ├── auth/             ← Login, Register
    ├── patient/          ← Patient dashboard, search, appointments, messages
    ├── doctor/           ← Doctor dashboard, profile, requests, appointments
    └── manager/          ← Manager analytics
```
---

## Architectural Patterns

**Standalone Components**
No NgModules. Every component declares its own `imports[]`. Simpler, less boilerplate, Angular 19 default.

**Lazy Loading**
Each feature is a separate JS bundle, loaded only when the user navigates to it. A doctor never downloads patient code and vice versa — faster initial load.

**Route Guards**
- `authGuard` — redirects unauthenticated users to `/auth/login`
- `roleGuard(role)` — redirects wrong-role users to their own dashboard
- `publicGuard` — redirects already logged-in users away from `/auth/*`

**JWT Interceptor**
Automatically attaches `Authorization: Bearer <token>` to every HTTP request. Catches 401 responses globally and triggers logout — no manual handling needed in services or components.

**Service Layer**
No component ever calls the API directly. Every HTTP call lives in a feature service (`patient.service.ts`, `doctor.service.ts`). If the API changes, only the service changes.

**Smart / Dumb Components**
Page-level components fetch data from services and pass it down via `@Input()`. Sub-components only receive data and emit events — easy to reuse and test.

**Reactive State**
`AuthService` holds `currentUser$` as a `BehaviorSubject<UserInfo | null>`. Guards, the sidebar, and components all subscribe to it. On login or logout, the entire app reacts automatically.

**Environment Config**
`environment.apiUrl` is the single source for the API base URL — one change switches between local and production.

**Mock Mode**
`PatientService` and `DoctorService` both support `USE_MOCK = true` to return in-memory data without a running backend.

---

## Request Flow

```
User visits /doctor/dashboard
      ↓
  authGuard       → no token?       → /auth/login
      ↓
  roleGuard       → wrong role?     → /patient/dashboard
      ↓
  AppLayout renders (Sidebar + Footer + <router-outlet>)
      ↓
  DoctorDashboardComponent (smart)
      ↓
  DoctorService.getAppointments()
      ↓
  jwtInterceptor attaches Bearer token
      ↓
  GET /api/appointment/my
      ↓
  Data passed via @Input() to child components
