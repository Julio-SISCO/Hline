import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateHotelComponent } from './hotel/create-hotel/create-hotel.component';
import { DetailHotelComponent } from './hotel/detail-hotel/detail-hotel.component';
import { HotelComponent } from './hotel/hotel.component';

const routes: Routes = [
  {
    path: '',
    component: HotelComponent,
  },
  {
    path: 'create',
    component: CreateHotelComponent
  },
  {
    path: 'view/:id',
    component: DetailHotelComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HotelRoutingModule { }
