import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChambreRoutingModule } from './chambre-routing.module';
import { ChambreComponent } from './chambre/chambre.component';
import { CreateChambreComponent } from './chambre/create-chambre/create-chambre.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg';
import { NgbModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { SlickCarouselModule } from 'ngx-slick-carousel';


@NgModule({
  declarations: [
    ChambreComponent,
    CreateChambreComponent
  ],
  imports: [
    CommonModule,
    ChambreRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgbToastModule,
    SlickCarouselModule,
    NgbModule,
  ]
})
export class ChambreModule { }
