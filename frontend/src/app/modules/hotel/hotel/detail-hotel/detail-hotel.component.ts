import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hotel } from 'app/models/hotel';

@Component({
  selector: 'app-detail-hotel',
  templateUrl: './detail-hotel.component.html',
  styleUrls: ['./detail-hotel.component.scss']
})
export class DetailHotelComponent implements OnInit {
  hotelLoad:Hotel=new Hotel()
  constructor(
    private activateRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    let hotel = this.activateRoute.snapshot.paramMap.get('id')
    const tab = hotel?.split(',')
    this.hotelLoad.nom=tab![0]
    this.hotelLoad.adresse=tab![1]+' '+tab![2]
    this.hotelLoad.description=tab![3]
    console.log(this.hotelLoad)
  }

}
