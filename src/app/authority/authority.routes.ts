import { Routes } from '@angular/router';

export const AUTHORITY_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('../authority/dashboard/dashboard.component')
      .then(m => m.DashboardComponent) // Lazy-load PrincipleComponent
  },
  {
    path: 'details',
    loadComponent: () => import('../authority/principle/principle.component')
      .then(m => m.PrincipleComponent) // Lazy-load PrincipleComponent
  },

];
