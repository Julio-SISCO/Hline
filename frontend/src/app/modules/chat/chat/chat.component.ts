import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Utilisateur } from 'app/models/utilisateur';
import { AuthService } from 'app/services/auth.service';
import { ImageService } from 'app/services/image.service';
import { TokenStorageService } from 'app/services/token-storage.service';
import { UtilisateurService } from 'app/services/utilisateur.service';
import * as $ from 'jquery';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  utilisateurs:Utilisateur[]=[];
  userToDiscuteWhith:Utilisateur;
  //----------------auth manage variable---------------
  isloggedin:boolean = false;
  fullUserLogged:Utilisateur;
  userLogged:any;
  admin:boolean = false;
  manager:boolean = false;
  superadmin:boolean = false;
  user:boolean = false;
  constructor(
    private modalService: NgbModal,
    private tokenStorageService:TokenStorageService,
    private authService:AuthService,
    private utilisateurService:UtilisateurService,
    private route:Router,
    @Inject(ImageService) private imageService:ImageService,
    private cdr:ChangeDetectorRef,
    private toast:NgToastService,
  ) { }

  ngOnInit(): void {
    $('#action_menu_btn').click(function(){
      $('.action_menu').toggle();
    });
    this.authManage();
    this.utilisateurService.getAll().subscribe(data =>{
      if(data.status === 200){
        for(let u of data.result){
          if(u.idUti != this.fullUserLogged.idUti){
            this.utilisateurs.push(u)
          }
        }
      }
    })
  }

  UserToDiscuteWhith(u:Utilisateur){
    this.userToDiscuteWhith = new Utilisateur();
    this.userToDiscuteWhith = u;
  }

  authManage(){
    const token = this.tokenStorageService.getToken()
    if(token){
      console.log("loggin ...");
      this.authService.validateToken(token).subscribe(data =>{
        if(data){
          this.isloggedin = true;
          
        }else{
          this.isloggedin = false;
          this.route.navigate(["/auth/login"]);
          console.log("non valide");
        }
      })
    }else{
      this.route.navigate(["/auth/login"]);
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
