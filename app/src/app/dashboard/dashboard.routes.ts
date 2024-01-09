import {Routes} from '@angular/router';

export const dashboardRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./router/dashboard-router/dashboard-router.component')
      .then(c => c.DashboardRouterComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./home/page/dashboard-home-page/dashboard-home-page.component')
          .then(c => c.DashboardHomePageComponent),
      },
      {
        path: 'profile',
        loadChildren: () => import('./feature/profile/profile.routes')
          .then(r => r.profileRoutes)
      }
    ]
  }
]

