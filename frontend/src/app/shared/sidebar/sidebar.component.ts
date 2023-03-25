import { Component, AfterViewInit, OnInit, Inject } from '@angular/core';
import { ROUTES } from './menu-items';
import { RouteInfo } from './sidebar.metadata';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Utilisateur } from 'app/models/utilisateur';
import { UtilisateurService } from 'app/services/utilisateur.service';
import { TokenStorageService } from 'app/services/token-storage.service';
import { AuthService } from 'app/services/auth.service';
//declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  showMenu = '';
  showSubMenu = '';
  public sidebarnavItems:RouteInfo[]=[];
  //-------------auth manage variable----------------
  isloggedin:boolean = true;
  fullUserLogged:Utilisateur;
  userLogged:any;
  admin:boolean = false;
  manager:boolean = false;
  superadmin:boolean = false;
  user:boolean = false;
  // this is for the open close
  addExpandClass(element: string) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(UtilisateurService) private utilisateurService:UtilisateurService,
    private authService:AuthService,
    private tokenStorageService:TokenStorageService
  ) {}

  // End open close
  ngOnInit() {
    this.sidebarnavItems = ROUTES.filter(sidebarnavItem => sidebarnavItem);
    //this.authManage();
  }
  authManage(){
    const token = this.tokenStorageService.getToken()
    if(token){
      this.authService.validateToken(token).subscribe(data =>{
        if(data){
          this.isloggedin = true;
          
        }else{
          this.isloggedin = false;
          console.log("non valide");
        }
      })
    }
    this.userLogged =  this.tokenStorageService.getUser();
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
