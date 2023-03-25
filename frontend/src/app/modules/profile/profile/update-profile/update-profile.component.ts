import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Profile } from 'app/models/profile';
import { ProfileService } from 'app/services/profile.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {

  currentProfileId:number;
  currentProfile:Profile=new Profile();
  isUpdate:boolean = false;
  updateForm:FormGroup
  constructor(
    private profileService:ProfileService,
    private activeModal:NgbActiveModal,
    private formBuilder:FormBuilder
  ) {
    this.updateForm = this.formBuilder.group({
      "nom":[this.currentProfile?.nomProfile,Validators.required]
    })
   }

  ngOnInit(): void {
    
  }

  update(){
    this.currentProfile.nomProfile = this.updateForm.controls.nom.value;
    this.profileService.update(this.currentProfile,this.currentProfileId).subscribe((data)=>{
      if(data.status == 200){
        this.isUpdate = true
        this.activeModal.close(this.isUpdate);
      }
    })
  }
  onClose(){
    this.activeModal.close()
  }

}
