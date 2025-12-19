import { Routes } from '@angular/router';

export const TOOLS_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'icon-manager',
    pathMatch: 'full',
  },
  {
    path: 'icon-manager',
    loadComponent: () =>
      import('./icon-manager/icon-manager.component').then((m) => m.IconManagerComponent),
  },
];
