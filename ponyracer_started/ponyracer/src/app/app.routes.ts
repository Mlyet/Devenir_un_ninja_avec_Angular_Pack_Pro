import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { loggedInGuard } from './logged-in.guard';

export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'races',
    loadChildren: () => import('./races/races.module').then(m => m.RacesModule),
    canActivate: [loggedInGuard]
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
  }
];
