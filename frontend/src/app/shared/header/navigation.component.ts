import { Component, AfterViewInit, EventEmitter, Output, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Utilisateur } from 'app/models/utilisateur';
import { EditAccountComponent } from 'app/modules/utilisateur/manage-account/edit-account/edit-account.component';
import { ShowProfileComponent } from 'app/modules/utilisateur/manage-account/show-profile/show-profile.component';
import { AuthService } from 'app/services/auth.service';
import { ImageService } from 'app/services/image.service';
import { TokenStorageService } from 'app/services/token-storage.service';
import { UtilisateurService } from 'app/services/utilisateur.service';
import { NgToastService } from 'ng-angular-popup';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

declare var $: any;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements AfterViewInit, OnInit {


  @Output() toggleSidebar = new EventEmitter<void>();
  public config: PerfectScrollbarConfigInterface = {};
  public showSearch = false;
    //----------------auth manage variable---------------
    isloggedin:boolean = false;
    fullUserLogged:Utilisateur;
    userLogged:any;
    admin:boolean = false;
    manager:boolean = false;
    superadmin:boolean = false;
    user:boolean = false;
  constructor(
    private router:Router,
    private cdr:ChangeDetectorRef,
    private toast:NgToastService,
    ) {
  }
  ngOnInit(){
    // this.authManage();
    // this.getPanier();
    
  }
  logout(){
    window.location.reload();
  }
  ngAfterViewInit() { }
}
