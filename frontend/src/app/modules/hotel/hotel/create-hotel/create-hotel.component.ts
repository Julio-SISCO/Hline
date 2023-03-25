import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Hotel } from 'app/models/hotel';
import { HotelService } from 'app/services/hotel.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-create-hotel',
  templateUrl: './create-hotel.component.html',
  styleUrls: ['./create-hotel.component.scss']
})
export class CreateHotelComponent implements OnInit {
  imageListSelected:any[]=[]
  imageSelected:any
  hotel:Hotel=new Hotel()
  createForm:FormGroup
  regions:any[]=[]

  constructor(
    private formBuilder:FormBuilder,
    private hotelService:HotelService,
    private route:Router,
    private toast:NgToastService
  ) 
  { 
    this.createForm = this.formBuilder.group({
      'nom':['',Validators.required],
      'adresse':['',Validators.required],
      'email':['',Validators.required],
      'tel':['',Validators.required],
      'ville':['',Validators.required],
      'region':['',Validators.required],
      'description':['',Validators.required],
      'nombre_etage':['',Validators.required],
      'note':['',Validators.required],
      'site':['',Validators.required],
    })

  }

  ngOnInit(): void {
    this.regions= ["Maritime","Plâteaux","Centrale","Kara","Savanes"]
  }

  onCreate(){
    this.hotel.nom = this.createForm.controls.nom.value;
    this.hotel.adresse = this.createForm.controls.adresse.value;
    this.hotel.tel = this.createForm.controls.tel.value;
    this.hotel.ville = this.createForm.controls.ville.value;
    this.hotel.site = "https://"+this.createForm.controls.site.value;
    this.hotel.region = this.createForm.controls.region.value;
    this.hotel.email = this.createForm.controls.email.value;
    this.hotel.description = this.createForm.controls.description.value;
    this.hotel.note = this.createForm.controls.note.value;
    this.hotel.nombre_etage = this.createForm.controls.nombre_etage.value;
    this.hotel.longitude = "22.154011"
    this.hotel.latitude = "55.124805"
    console.log("l'hotel:", this.hotel)
    this.hotelService.addHotel(this.hotel).subscribe(data =>{
        if(data){
          this.route.navigate(["../administration/hotels"]);
          this.toast.success({detail:"",summary:'Create Success',duration:5000})
          console.log("l'hôtel:",data)
        }else{
          this.toast.error({detail:"Error",summary:'An error occurred',duration:5000})
        }
    })
  }

  // -------------------------manage image----------------------------
  saveImages(event:any){
    this.imageSelected = event.target.files[0];
    
  }
  
  addImage(){
    let repeat = false
    if(this.imageListSelected.length>0){
      for (let i = 0; i < this.imageListSelected.length; i++) {
        if(this.imageListSelected[i].name == this.imageSelected.name){
          if(this.imageListSelected[i].size===this.imageSelected.size){
            repeat = true 
          }
        }
      }
      if(!repeat && (this.imageSelected.type=="image/jpg" || 
        this.imageSelected.type=="image/jpeg" || this.imageSelected.type=="image/png") ){
        this.imageListSelected.push(this.imageSelected);
        this.toast.success({detail:"Success",summary:'Image added',duration:5000})
      }

      if(repeat && (this.imageSelected.type=="image/jpg" || 
      this.imageSelected.type=="image/jpeg" || this.imageSelected.type=="image/png") ){
        console.log("je suis dans repeate");
        this.toast.error({detail:"Error",summary:'Duplicate image',duration:5000});
      }
      if(this.imageSelected.type!="image/jpg" || this.imageSelected.type!="image/jpeg" ||
        this.imageSelected.type!="image/png"){
          this.toast.error({detail:"Error",summary:'Type not supported',duration:5000});
      }
    } 
    if(this.imageListSelected.length == 0 && (this.imageSelected.type=="image/jpg" || 
    this.imageSelected.type=="image/jpeg" || this.imageSelected.type=="image/png" ) ){
    this.imageListSelected.push(this.imageSelected);
    console.log(this.imageListSelected.length);
    this.toast.success({detail:"Success",summary:'Image added',duration:5000})
  }
   console.log(this.imageListSelected);
    
}
// saveImagesForProduct(){
//   if(this.imageListSelected.length >0){
//     for(let i of this.imageListSelected){
//       const imageLoadData = new FormData()
//       imageLoadData.append('imageFile',i,i.name);
//       this.imageService.upload(imageLoadData).subscribe(data =>{
//           if(data.status===200){
//             this.imageService.getImage(data.result.idImage).subscribe(resultat =>{
//               data.result.imageUrl = 'data:image/jpg;base64,'+resultat.result.picByte
//               this.imageService.update(data.result,data.result.idImage).subscribe(response =>{
//                 this.imageListeSaveForProduct.push(response.result)
//                 console.log(this.imageListeSaveForProduct);
//               });
//             })
//           }else{
//             this.toast.error({detail:"Error",summary:'Data too long',duration:5000})
//           }
//         }
//       )
//     }
//   }else{
//     this.toast.error({detail:"Error",summary:'Error on adding',duration:5000})
//   }
//}


  removeImage(i:number){
    for (let index = 0; index < this.imageListSelected.length; index++) {
      if(index === i){
        this.imageListSelected.splice(i,1);
      }  
    }
  }
  
}
