import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

import { FullComponent } from './layouts/full/full.component';

export const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'about',
        loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
      },
      {
        path: 'administration',
        loadChildren: () => import('./modules/modules.module').then(m => m.ModulesModule)
      }
    ]
  },
  {
    path: 'auth',
    component:AuthComponent,
    children:[
      {
        path:'',
        loadChildren: () => import('./auth/auth/auth.module').then(m => m.AuthModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/auth/login'
  }
];
