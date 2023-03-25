import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { CreateUtilisateurComponent } from './utilisateur/create-utilisateur/create-utilisateur.component';
import { DeleteUtilisateurComponent } from './utilisateur/delete-utilisateur/delete-utilisateur.component';
import { UpdateUtilisateurComponent } from './utilisateur/update-utilisateur/update-utilisateur.component';
import { RouterModule } from '@angular/router';
import { UtilisateurRoutes } from './utilisateur-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ViewUserComponent } from './utilisateur/view-user/view-user.component';
import { ManageAccountComponent } from './manage-account/manage-account.component';
import { EditAccountComponent } from './manage-account/edit-account/edit-account.component';
import { ShowProfileComponent } from './manage-account/show-profile/show-profile.component';



@NgModule({
  declarations: [
    UtilisateurComponent,
    CreateUtilisateurComponent,
    DeleteUtilisateurComponent,
    UpdateUtilisateurComponent,
    ViewUserComponent,
    ManageAccountComponent,
    EditAccountComponent,
    ShowProfileComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgbToastModule,
    RouterModule.forChild(UtilisateurRoutes)
  ]
})
export class UtilisateurModule { }
