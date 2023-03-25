import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Role } from 'app/models/role';
import { Utilisateur } from 'app/models/utilisateur';
import { AuthService } from 'app/services/auth.service';
import { TokenStorageService } from 'app/services/token-storage.service';
import { UtilisateurService } from 'app/services/utilisateur.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {
createForm:FormGroup;
currentUtilisateur:Utilisateur = new Utilisateur();
userRoles:Role[]=[];
imageSourceforCurrentUser:any
  //----------------auth manage variable---------------
  isloggedin:boolean = false;
  fullUserLogged:Utilisateur;
  userLogged:any;
  admin:boolean = false;
  manager:boolean = false;
  superadmin:boolean = false;
  user:boolean = false;

  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthService,
    private tokenStorageService:TokenStorageService,
    @Inject(UtilisateurService) private utilisateurService:UtilisateurService
  ) { }

  ngOnInit(): void {
    this.createForm = this.formBuilder.group({
      'nom':[this.currentUtilisateur?.nom],
      'prenom':[this.currentUtilisateur.prenom],
      'email':[this.currentUtilisateur.email],
      'adresse':[this.currentUtilisateur.adresse],
      'telephone':[this.currentUtilisateur.telephone],
      'image':[''],
      'enabled':[this.currentUtilisateur.enabled],
      'profile':[this.currentUtilisateur.profile?.nomProfile],
      'password':[this.currentUtilisateur.password],
      'status':[this.currentUtilisateur.statut],
    })
    if(this.currentUtilisateur.imageUrl != undefined && this.currentUtilisateur.imageUrl !=null){
      this.imageSourceforCurrentUser = this.currentUtilisateur.imageUrl
    }
    this.userRoles = this.currentUtilisateur.roles;
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
}
