import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { authGuard } from './shared/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',component:LoginComponent
  },
  {
    // canActivate:[authGuard],
    path: 'admin/landing',
    loadComponent: () =>
      import('../app/admin/landing/landing.component').then(m => m.LandingComponent),
      loadChildren:() => import('../app/admin/admin.routes').then(m => m.ADMIN_ROUTES)
  
  },
  {
    // canActivate:[authGuard],
    path: 'authority',
    loadComponent: () => import('../app/authority/landing/landing.component').then(m => m.LandingComponent),
      loadChildren:() => import('../app/authority/authority.routes').then(m => m.AUTHORITY_ROUTES) 
  },
  {
    // canActivate:[authGuard],
    path: 'staff',
    loadComponent: () => import('../app/staff/landing/landing.component').then(m => m.LandingComponent),
    loadChildren: () => import('../app/staff/staff.routes').then(m => m.STAFF_ROUTES) // Load child routes
  },
];
