import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./modal-ui.component').then((m) => m.ModalUiComponent),
  },
] satisfies Routes;
