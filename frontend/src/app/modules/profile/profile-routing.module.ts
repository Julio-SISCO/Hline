import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateProfileComponent } from "./profile/create-profile/create-profile.component";
import { ProfileComponent } from "./profile/profile.component";
import { UpdateProfileComponent } from "./profile/update-profile/update-profile.component";

export const ProfileRoutes: Routes = [
    {
      path: '',
      component: ProfileComponent,
    },
    {
      path: 'create',
      component: CreateProfileComponent
    },
    {
      path: 'update',
      component: UpdateProfileComponent
    }
  ];