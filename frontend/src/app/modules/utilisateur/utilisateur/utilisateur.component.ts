import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Utilisateur } from 'app/models/utilisateur';
import { AuthService } from 'app/services/auth.service';
import { ImageService } from 'app/services/image.service';
import { TokenStorageService } from 'app/services/token-storage.service';
import { UtilisateurService } from 'app/services/utilisateur.service';
import { NgToastService } from 'ng-angular-popup';
import { DeleteUtilisateurComponent } from './delete-utilisateur/delete-utilisateur.component';
import { UpdateUtilisateurComponent } from './update-utilisateur/update-utilisateur.component';
import { ViewUserComponent } from './view-user/view-user.component';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.scss']
})
export class UtilisateurComponent implements OnInit {
  utilisateurs:Utilisateur[];
  status:string='';
  //----------------auth manage variable---------------
  isloggedin:boolean = false;
  fullUserLogged:Utilisateur;
  userLogged:any;
  admin:boolean = false;
  manager:boolean = false;
  superadmin:boolean = false;
  user:boolean = false;

  constructor(
    @Inject(ImageService) private imageService:ImageService,
    private cdr:ChangeDetectorRef,
    private modalService:NgbModal,
    private toast:NgToastService,
    private authService:AuthService,
    private tokenStorageService:TokenStorageService,
    @Inject(UtilisateurService) private utilisateurService:UtilisateurService

  ) { }

  ngOnInit(): void {
    this.findAll();
    this.authManage();
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

  findAll(){
    this.utilisateurService.getAll().subscribe(data =>{
      if(data){
        this.utilisateurs = data.result;
        for (let utilisateur of this.utilisateurs) {
          if(utilisateur.enabled == true){
            this.status = "success"
          }else{
            this.status = "warning"
          }
          if(utilisateur.imageProf!=null){
            this.imageService.getImage(utilisateur.imageProf.idImage).subscribe(result =>{
              if(result.status === 200){
                utilisateur.imageUrl = 'data:image/jpg;base64,'+result.result.picByte
                this.utilisateurService.update(utilisateur,utilisateur.idUti).subscribe(data=>{});
              }
            })
          }
        }
      }
    })
  }

  delete(id:number){
    const modalRef = this.modalService.open(DeleteUtilisateurComponent);
    modalRef.componentInstance.currentUtilisateurId = id;
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

  update(utilisateur:Utilisateur, id:number){
    const modalRef = this.modalService.open(UpdateUtilisateurComponent,{size:"xl",backdrop:"static",keyboard:false});
    modalRef.componentInstance.currentUtilisateurId = id;
    modalRef.componentInstance.currentUtilisateur = utilisateur;
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
  view(utilisateur:Utilisateur){
    const modalRef = this.modalService.open(ViewUserComponent);
    modalRef.componentInstance.currentUtilisateur = utilisateur;
  }
}
