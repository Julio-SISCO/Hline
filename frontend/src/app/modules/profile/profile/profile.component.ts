import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Profile } from 'app/models/profile';
import { Utilisateur } from 'app/models/utilisateur';
import { AuthService } from 'app/services/auth.service';
import { ProfileService } from 'app/services/profile.service';
import { TokenStorageService } from 'app/services/token-storage.service';
import { UtilisateurService } from 'app/services/utilisateur.service';
import { NgToastService } from 'ng-angular-popup';
import { DeleteProfileComponent } from './delete-profile/delete-profile.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profiles:Profile[];
  //--------auth manage variable--------------
  isloggedin:boolean = false;
  fullUserLogged:Utilisateur;
  userLogged:any;
  admin:boolean = false;
  manager:boolean = false;
  superadmin:boolean = false;
  user:boolean = false;
  constructor(
    @Inject(ProfileService) private profileService:ProfileService,
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
  authManage(){
    this.findAll();
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

  findAll(){
    this.profileService.getAll().subscribe(data =>{
      if(data){
        this.profiles = data.result;
      }
    })
  }

  delete(id:number){
    const modalRef = this.modalService.open(DeleteProfileComponent);
    modalRef.componentInstance.currentProfileId = id;
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
  update(profile:Profile, id:number){
    const modalRef = this.modalService.open(UpdateProfileComponent);
    modalRef.componentInstance.currentProfileId = id;
    modalRef.componentInstance.currentProfile = profile;
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
