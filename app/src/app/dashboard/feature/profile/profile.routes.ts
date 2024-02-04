import {Routes} from '@angular/router';

export const profileRoutes:Routes=[
  {
    path: 'detail',
    loadComponent: () => import('./page/profile-page/profile-page.component')
      .then(c => c.ProfilePageComponent)
  },
  {
    path: 'update',
    loadComponent: () => import('./page/profile-update-page/profile-update-page.component')
      .then(c => c.ProfileUpdatePageComponent)
  }
]
