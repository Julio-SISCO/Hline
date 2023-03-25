import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ModulesRoutes } from './modules-routing.module';
import { ModulesComponent } from './modules.component';




@NgModule({
  declarations: [
    ModulesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ModulesRoutes),
  ]
})
export class ModulesModule { }
