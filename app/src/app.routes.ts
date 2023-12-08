import { Routes } from '@angular/router';
import {DashboardGuard} from './app/dashboard/dashboard.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'account',
    pathMatch: 'full'
  },
  {
    path: 'account',
    loadChildren: () => import('./app/security/security.routes').then(r => r.securityRoutes)
  },
  {
    path: 'dashboard',
    canActivate: [DashboardGuard()],
    loadChildren: () => import('./app/dashboard/dashboard.routes').then(r => r.dashboardRoutes)
  },
  {
    path: '**',
    loadComponent: () => import('./app/shared/routes/global-fall-back-page/global-fall-back-page.component').then(r => r.GlobalFallBackPageComponent)
  }
]
