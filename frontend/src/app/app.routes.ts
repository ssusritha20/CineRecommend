import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { authGuard } from './core/guards/auth.guard';
import { ProfileGuard } from './core/services/profile.guard';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'user',
        loadChildren: () => import('./features/user/user.module').then(m => m.UserModule)
      },
      {
        path: 'movies',
        canActivate: [authGuard, ProfileGuard],
        loadChildren: () => import('./features/movies/movies.module').then(m => m.MoviesModule)
      },
      {
        path: '',
        redirectTo: 'movies',
        pathMatch: 'full'
      }
    ]
  }
];
