import { Routes } from '@angular/router';
import {DashboardGuard} from './app/dashboard/dashboard.guard';
import {AppNode} from '@shared';

export const routes: Routes = [
  {
    path: '',
    redirectTo: AppNode.PUBLIC,
    pathMatch: 'full'
  },
  {
    path: AppNode.PUBLIC,
    loadChildren: () => import('./app/security/security.routes').then(r => r.securityRoutes)
  },
  {
    path: AppNode.AUTHENTICATED,
    canActivate: [DashboardGuard()],
    loadChildren: () => import('./app/dashboard/dashboard.routes').then(r => r.dashboardRoutes)
  },
  {
    path: AppNode.FALL_BACK,
    loadComponent: () => import('./app/shared/routes/global-fall-back-page/global-fall-back-page.component').then(r => r.GlobalFallBackPageComponent)
  }
]
