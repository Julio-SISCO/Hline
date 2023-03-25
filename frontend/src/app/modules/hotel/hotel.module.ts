import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HotelRoutingModule } from './hotel-routing.module';
import { HotelComponent } from './hotel/hotel.component';
import { CreateHotelComponent } from './hotel/create-hotel/create-hotel.component';
import { DetailHotelComponent } from './hotel/detail-hotel/detail-hotel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg';
import { NgbModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    HotelComponent,
    CreateHotelComponent,
    DetailHotelComponent
  ],
  imports: [
    CommonModule,
    HotelRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgbToastModule,
    SlickCarouselModule,
    NgbModule,
  ]
})
export class HotelModule { }
