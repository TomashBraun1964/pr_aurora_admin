// src/app/pages/ui-demo/ui-demo.routes.ts
import { Routes } from '@angular/router';

export const UI_DEMO_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'button-ui',
    pathMatch: 'full',
  },
  {
    path: 'button-ui',
    loadComponent: () => import('./button-ui/button-ui.component').then((m) => m.ButtonUiComponent),
  },

  {
    path: 'toggle-ui',
    loadComponent: () => import('./toggle-ui/toggle-ui.component').then((m) => m.ToggleUiComponent),
  },
  {
    path: 'input-ui',
    loadComponent: () => import('./input-ui/input-ui.component').then((m) => m.InputUiComponent),
  },
];
