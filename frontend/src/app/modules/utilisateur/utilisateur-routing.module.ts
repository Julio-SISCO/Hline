import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateUtilisateurComponent } from "./utilisateur/create-utilisateur/create-utilisateur.component";
import { UpdateUtilisateurComponent } from "./utilisateur/update-utilisateur/update-utilisateur.component";
import { UtilisateurComponent } from "./utilisateur/utilisateur.component";

export const UtilisateurRoutes: Routes = [
    {
      path: '',
      component: UtilisateurComponent,
    },
    {
      path: 'create',
      component: CreateUtilisateurComponent
    },
    {
      path: 'update',
      component: UpdateUtilisateurComponent
    }
  ];
