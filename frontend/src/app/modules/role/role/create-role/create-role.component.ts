import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from 'app/models/role';
import { RoleService } from 'app/services/role.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.scss']
})
export class CreateRoleComponent implements OnInit {

  createForm:FormGroup;
  role:Role;
  constructor(
    private formBuilder:FormBuilder,
    @Inject(RoleService) private roleService:RoleService,
    private toast:NgToastService,
    private route:Router
  ) {
    this.createForm = this.formBuilder.group({
      'libelle':['',Validators.required]
    })
   }

  ngOnInit(): void {

  }

  onCreate(){
    this.role = new Role();
    this.role.libelle = this.createForm.controls.libelle.value;
    this.role.utilisateurs = [];
        this.roleService.post(this.role).subscribe(data =>{
          if(data.status=200){
            this.route.navigate(["../agri-elevage/roles"]);
            this.toast.success({detail:"",summary:'Create Success',duration:5000})
          }else{
            this.toast.error({detail:"Error",summary:'An error occurred',duration:5000})
          }
      })
      
  }


}
