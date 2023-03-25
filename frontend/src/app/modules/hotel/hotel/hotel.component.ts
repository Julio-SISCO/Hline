import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hotel } from 'app/models/hotel';
import { HotelService } from 'app/services/hotel.service';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss']
})
export class HotelComponent implements OnInit {
hotels:Hotel[]=[]
imageHotel=[]
admin=true
  constructor(
    private hotelService:HotelService,
    private route:Router
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  slideConfig = {  
    "slidesToShow": 1,  
    "slidesToScroll": 1,  
    "dots": true,  
    "infinite": true,
    "autoplay":true 
  };

  findAll(){
    this.hotelService.getAll().subscribe(data =>{
      console.log("les donnée récuperés ",this.hotels);
      if(data){
        this.hotels = data;
        this.hotels.forEach(h =>{console.log(h.nom)})
      }
    })
  }
  detail(id:any[]){
    this.route.navigate(["/administration/hotels/view/"+id]);
  }
}
