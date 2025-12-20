import { Routes } from '@angular/router';

export const HEALTH_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/health-monitor/health-monitor.component').then(
        (m) => m.HealthMonitorComponent,
      ),
  },
];
