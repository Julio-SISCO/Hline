import { Component, Inject, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfileService } from 'app/services/profile.service';

@Component({
  selector: 'app-delete-profile',
  templateUrl: './delete-profile.component.html',
  styleUrls: ['./delete-profile.component.scss']
})
export class DeleteProfileComponent implements OnInit {

  isDelete = false
  currentProfileId:number
  constructor(
    @Inject(ProfileService) private profileService:ProfileService,
    private activeModal:NgbActiveModal

  ) { }

  ngOnInit(): void {
  }

  delete(){
    this.profileService.delete(this.currentProfileId).subscribe((data)=>{
      if(data.status == 200){
        this.isDelete = true
        this.activeModal.close(this.isDelete);
      }
    })
  }

  onClose() {
    this.activeModal.close();
  }
}
