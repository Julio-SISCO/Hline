import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Role } from 'app/models/role';
import { RoleService } from 'app/services/role.service';

@Component({
  selector: 'app-update-role',
  templateUrl: './update-role.component.html',
  styleUrls: ['./update-role.component.scss']
})
export class UpdateRoleComponent implements OnInit {

  currentRoleId:number;
  currentRole:Role=new Role();
  isUpdate:boolean = false;
  updateForm:FormGroup
  constructor(
    private roleService:RoleService,
    private activeModal:NgbActiveModal,
    private formBuilder:FormBuilder
  ) {
    this.updateForm = this.formBuilder.group({
      "libelle":[this.currentRole?.libelle,Validators.required]
    })
   }

  ngOnInit(): void {
    
  }

  update(){
    this.currentRole.libelle = this.updateForm.controls.libelle.value;
    this.roleService.update(this.currentRole,this.currentRoleId).subscribe((data)=>{
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
