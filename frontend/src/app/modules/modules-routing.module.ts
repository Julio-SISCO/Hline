import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ModulesComponent } from "./modules.component";

export const ModulesRoutes: Routes = [
  {
    path: '',
    component:ModulesComponent,
  },
  {
    path: 'hotels',
    loadChildren: () => import('./hotel/hotel.module').then(m => m.HotelModule)
  },
  {
    path: 'chambres',
    loadChildren: () => import('./chambre/chambre.module').then(m => m.ChambreModule)
  },
  {
    path: 'discussions',
    loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule)

  },
  {
    path: 'utilisateurs',
    loadChildren: () => import('./utilisateur/utilisateur.module').then(m => m.UtilisateurModule)

  },
  {
    path: 'profile-utilisateur',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)

  },
  {
    path: 'roles',
    loadChildren: () => import('./role/role.module').then(m => m.RoleModule)

  },
];