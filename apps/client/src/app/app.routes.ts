import { Route } from '@angular/router';
import { Patients } from './pages/patients/patients';

export const appRoutes: Route[] = [
  { path: 'patients', component: Patients },
  { path: '', redirectTo: '/patients', pathMatch: 'full' },
];
