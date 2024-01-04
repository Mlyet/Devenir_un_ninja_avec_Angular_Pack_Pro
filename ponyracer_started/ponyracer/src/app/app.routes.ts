import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RacesComponent } from './races/races.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { BetComponent } from './bet/bet.component';
import { LiveComponent } from './live/live.component';
import { loggedInGuard } from './logged-in.guard';
import { PendingRacesComponent } from './races/pending-races/pending-races.component';
import { FinishedRacesComponent } from './races/finished-races/finished-races.component';
import { racesResolver } from './races.resolver';
import { raceResolver } from './race.resolver';

export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'races',
    canActivate: [loggedInGuard],
    children: [
      {
        path: '',
        component: RacesComponent,
        children: [
          { path: '', pathMatch: 'full', redirectTo: 'pending' },
          {
            path: 'pending',
            component: PendingRacesComponent,
            resolve: {
              races: racesResolver
            }
          },
          {
            path: 'finished',
            component: FinishedRacesComponent,
            resolve: {
              races: racesResolver
            }
          }
        ]
      },
      {
        path: ':raceId',
        component: BetComponent,
        resolve: {
          race: raceResolver
        }
      },
      {
        path: ':raceId/live',
        component: LiveComponent,
        resolve: {
          race: raceResolver
        }
      }
    ]
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent }
];
