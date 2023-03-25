import { Component, Inject, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RoleService } from 'app/services/role.service';

@Component({
  selector: 'app-delete-role',
  templateUrl: './delete-role.component.html',
  styleUrls: ['./delete-role.component.scss']
})
export class DeleteRoleComponent implements OnInit {

  isDelete = false
  currentRoleId:number
  constructor(
    @Inject(RoleService) private roleService:RoleService,
    private activeModal:NgbActiveModal

  ) { }

  ngOnInit(): void {
  }

  delete(){
    this.roleService.delete(this.currentRoleId).subscribe((data)=>{
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
