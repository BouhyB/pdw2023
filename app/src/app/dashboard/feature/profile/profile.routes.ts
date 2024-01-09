import {Routes} from '@angular/router';

export const profileRoutes:Routes=[
  {
    path: 'detail/:id',
    loadComponent: () => import('./page/profile-page/profile-page.component')
      .then(c => c.ProfilePageComponent)
  }
]
