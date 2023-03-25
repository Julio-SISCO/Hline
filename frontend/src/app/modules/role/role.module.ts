import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleComponent } from './role/role.component';
import { CreateRoleComponent } from './role/create-role/create-role.component';
import { UpdateRoleComponent } from './role/update-role/update-role.component';
import { DeleteRoleComponent } from './role/delete-role/delete-role.component';
import { RouterModule } from '@angular/router';
import { RoleRoutes } from './role-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    RoleComponent,
    CreateRoleComponent,
    UpdateRoleComponent,
    DeleteRoleComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgbToastModule,
    RouterModule.forChild(RoleRoutes)
  ]
})
export class RoleModule { }
