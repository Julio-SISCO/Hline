import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { CreateProfileComponent } from './profile/create-profile/create-profile.component';
import { UpdateProfileComponent } from './profile/update-profile/update-profile.component';
import { DeleteProfileComponent } from './profile/delete-profile/delete-profile.component';
import { RouterModule } from '@angular/router';
import { ProfileRoutes } from './profile-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    ProfileComponent,
    CreateProfileComponent,
    UpdateProfileComponent,
    DeleteProfileComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgbToastModule,
    RouterModule.forChild(ProfileRoutes)
  ]
})
export class ProfileModule { }
