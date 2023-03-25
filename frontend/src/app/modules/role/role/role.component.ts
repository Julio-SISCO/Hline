import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Role } from 'app/models/role';
import { Utilisateur } from 'app/models/utilisateur';
import { AuthService } from 'app/services/auth.service';
import { RoleService } from 'app/services/role.service';
import { TokenStorageService } from 'app/services/token-storage.service';
import { UtilisateurService } from 'app/services/utilisateur.service';
import { NgToastService } from 'ng-angular-popup';
import { DeleteRoleComponent } from './delete-role/delete-role.component';
import { UpdateRoleComponent } from './update-role/update-role.component';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
roles:Role[];
//-------------------auth manage variable---------------
isloggedin:boolean = false;
  fullUserLogged:Utilisateur;
  userLogged:any;
  admin:boolean = false;
  manager:boolean = false;
  superadmin:boolean = false;
  user:boolean = false;

  constructor(
    @Inject(RoleService) private roleService:RoleService,
    private cdr:ChangeDetectorRef,
    private modalService:NgbModal,
    private toast:NgToastService,
    @Inject(UtilisateurService) private utilisateurService:UtilisateurService,
    private authService:AuthService,
    private tokenStorageService:TokenStorageService
  ) { }

  ngOnInit(): void {
    this.findAll();
    this.authManage();
  }

  findAll(){
    this.roleService.getAll().subscribe(data =>{
      if(data){
        this.roles = data.result;
      }
    })
  }

  authManage(){
    const token = this.tokenStorageService.getToken()
    if(token){
      console.log("oui il ya le token");
      this.authService.validateToken(token).subscribe(data =>{
        if(data){
          this.isloggedin = true;
          console.log("valide");
          
        }else{
          this.isloggedin = false;
          console.log("non valide");
        }
      })
    }
    this.userLogged =  this.tokenStorageService.getUser();
    console.log(this.userLogged);
    if(this.userLogged){
      this.utilisateurService.findByEmail(this.userLogged.email).subscribe(data =>{
        if(data){
          this.fullUserLogged = data;
        }
      })
      if(this.userLogged.roles?.length>0){
        for(let r of this.userLogged.roles){
          if(r==="ROLE_ADMINISTRATEUR"){
            this.admin = true;
          }
          if(r==="ROLE_MANAGER"){
            this.manager = true;
          }
          if(r==="ROLE_SUPERADMINISTRATEUR"){
            this.superadmin = true;
          }
          if(r==="ROLE_USER"){
            this.user = true;
          }
        }
      }
    }
  }

  delete(id:number){
    const modalRef = this.modalService.open(DeleteRoleComponent);
    modalRef.componentInstance.currentRoleId = id;
    modalRef.result.then((result) => {
      this.findAll();
      if (result == true){
        this.findAll();
        this.toast.success({detail:"",summary:'Delete Success',duration:5000})
      }
    }).catch((error) => {
      this.toast.error({detail:"",summary:'Delete Failed',duration:5000})
    });
  }
  update(role:Role, id:number){
    const modalRef = this.modalService.open(UpdateRoleComponent);
    modalRef.componentInstance.currentRoleId = id;
    modalRef.componentInstance.currentRole = role;
    modalRef.result.then((result) => {
      this.findAll();
      if (result == true){
        this.findAll();
        this.toast.success({detail:"",summary:'Update Success',duration:5000})
      }
    }).catch((error) => {
      this.toast.error({detail:"",summary:'Update Failed',duration:5000})
    });
  }
}
