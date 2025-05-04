import { Routes } from '@angular/router';

export const STAFF_ROUTES: Routes = [
  {
    path: 'drr',
    loadComponent: () => import('../staff/drr/drr.component')
      .then(m => m.DrrComponent) // Lazy-load DashboardHomeComponent
  },
  // {
  //   path: 'ic',
  //   loadComponent: () => import('../pages/issued-certificate/issued-certificate.component')
  //     .then(m => m.IssuedCertificateComponent) // Lazy-load DashboardSettingsComponent
  // }
];
