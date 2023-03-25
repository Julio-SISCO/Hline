import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateRoleComponent } from "./role/create-role/create-role.component";
import { RoleComponent } from "./role/role.component";
import { UpdateRoleComponent } from "./role/update-role/update-role.component";

export const RoleRoutes: Routes = [
    {
      path: '',
      component: RoleComponent,
    },
    {
      path: 'create',
      component: CreateRoleComponent
    },
    {
      path: 'update',
      component: UpdateRoleComponent
    }
  ];