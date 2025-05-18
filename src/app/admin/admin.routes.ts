import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
  {
    path: 'add-teacher',
    loadComponent: () =>
      import('../admin/add-teacher/add-teacher.component').then((m) => m.AddTeacherComponent), // Lazy-load DashboardHomeComponent
  },
]