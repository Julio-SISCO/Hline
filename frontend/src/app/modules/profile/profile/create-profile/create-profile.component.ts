import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Profile } from 'app/models/profile';
import { ProfileService } from 'app/services/profile.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss']
})
export class CreateProfileComponent implements OnInit {
  createForm:FormGroup;
  profile:Profile;
  constructor(
    private formBuilder:FormBuilder,
    @Inject(ProfileService) private profileService:ProfileService,
    private toast:NgToastService,
    private route:Router
  ) {
    this.createForm = this.formBuilder.group({
      'nom':['',Validators.required]
    })
   }

  ngOnInit(): void {

  }

  onCreate(){
    this.profile = new Profile();
    this.profile.nomProfile = this.createForm.controls.nom.value;
        this.profileService.post(this.profile).subscribe(data =>{
          if(data.status=200){
            this.route.navigate(["../agri-elevage/profile-utilisateur"]);
            this.toast.success({detail:"",summary:'Create Success',duration:5000})
          }else{
            this.toast.error({detail:"Error",summary:'An error occurred',duration:5000})
          }
      })
      
  }


}
