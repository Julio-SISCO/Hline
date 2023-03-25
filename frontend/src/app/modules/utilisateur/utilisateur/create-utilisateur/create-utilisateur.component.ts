import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Image } from 'app/models/image';
import { Profile } from 'app/models/profile';
import { Role } from 'app/models/role';
import { Utilisateur } from 'app/models/utilisateur';
import { AuthService } from 'app/services/auth.service';
import { ImageService } from 'app/services/image.service';
import { ProfileService } from 'app/services/profile.service';
import { RoleService } from 'app/services/role.service';
import { TokenStorageService } from 'app/services/token-storage.service';
import { UtilisateurService } from 'app/services/utilisateur.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-create-utilisateur',
  templateUrl: './create-utilisateur.component.html',
  styleUrls: ['./create-utilisateur.component.scss']
})
export class CreateUtilisateurComponent implements OnInit {

  createForm:FormGroup;
  profiles:Profile[];
  utilisateurs:Utilisateur[];
  utilisateur:Utilisateur=new Utilisateur();
  roleListSelected:Role[]=[];
  roleUtilisateur:Role=new Role();
  imageSelected:any;
  image:Image;
  roles:Role[]=[];
  retrievedImage:any
  //--------------auth manage variable------------
  isloggedin:boolean = false;
  fullUserLogged:Utilisateur;
  userLogged:any;
  admin:boolean = false;
  manager:boolean = false;
  superadmin:boolean = false;
  user:boolean = false;

  constructor(
    private formBuilder:FormBuilder,
    @Inject(UtilisateurService) private utilisateurService:UtilisateurService,
    @Inject(ProfileService) private profileService:ProfileService,
    private toast:NgToastService,
    private route:Router,
    @Inject(RoleService)private roleService:RoleService,
    @Inject(ImageService)private imageService:ImageService,
    private authService:AuthService,
    private tokenStorageService:TokenStorageService
    
  ) 
  {
    this.createForm = this.formBuilder.group({
      'nom':['',Validators.required],
      'prenom':['',Validators.required],
      'email':['',Validators.required],
      'adresse':['',Validators.required],
      'telephone':['',Validators.required],
      'image':['',Validators.required],
      'enabled':['',Validators.required],
      'profile':['',Validators.required],
      'roles':['',Validators.required],
      'password':['',Validators.required],
      'status':['',Validators.required],

    })
   }

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
      if(this.userLogged.roles.length>0){
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
      if(data.status==200){
        this.profiles = data.result;
      }
    })
    this.roleService.getAll().subscribe(data =>{
      if(data.status === 200){
        this.roles = data.result
      }
    })
  }

  saveImage(event:any){
    this.imageSelected = event.target.files[0];
    this.image = new Image();
  }
  

  onCreate(){
    this.utilisateur.nom = this.createForm.controls.nom.value;
    this.utilisateur.prenom = this.createForm.controls.prenom.value;
    this.utilisateur.email = this.createForm.controls.email.value;
    this.utilisateur.adresse = this.createForm.controls.adresse.value;
    this.utilisateur.telephone = this.createForm.controls.telephone.value;
    this.utilisateur.roles = this.roleListSelected;
    this.utilisateur.password = this.createForm.controls.password.value;

    //----------save image for user----------
    const imageLoadData = new FormData()
    imageLoadData.append('imageFile',this.imageSelected,this.imageSelected.name);
    this.imageService.upload(imageLoadData).subscribe(data =>{
      if(data.status === 200){
        this.image = data.result;
        console.log(this.image);
        this.utilisateur.imageProf = this.image;
        console.log('avatar user:'+this.utilisateur.imageProf);
        this.utilisateurService.post(this.utilisateur).subscribe(data =>{
          if(data.status == 200){
            this.route.navigate(["../agri-elevage/utilisateurs"]);
            this.toast.success({detail:"",summary:'Create Success',duration:5000})
          }else{
            this.toast.error({detail:"Error",summary:'An error occurred',duration:5000})
          }
      })
      }else{
        this.toast.error({detail:"Size error",summary:'Image size too long',duration:5000})
      }
    })
  }
  onProfileChange(){
   const idcat = this.createForm.controls.profile.value;
    this.profileService.findById(idcat).subscribe(data=>{
      if(data.status==200){
        this.utilisateur.profile=data.result;
      }
    })
  }
  onRoleChange(){
    const idRole = this.createForm.controls.roles.value
    this.roleService.findById(idRole).subscribe(data =>{
      if(data.status==200){
        this.roleUtilisateur = data.result;
      }
    })
  }
  addRole(){
    if(this.roleListSelected.length>0){
      let repeat = false
      for (let i = 0; i < this.roleListSelected.length; i++) {
        if(this.roleListSelected[i].libelle===this.roleUtilisateur?.libelle){
            repeat = true
        }
      }
      if(!repeat){
        this.roleListSelected.push(this.roleUtilisateur);
      }else{
        this.toast.error({detail:"Error",summary:'Duplicate detected',duration:5000});
      }
     
    }else{
      this.roleListSelected.push(this.roleUtilisateur);
    }
  }

  removeRole(i:number){
    for (let index = 0; index < this.roleListSelected.length; index++) {
      if(index === i){
        this.roleListSelected.splice(i,1);
      }  
    }
  }
  onEnabledChange(){
    this.utilisateur.enabled = this.createForm.controls.enabled.value;
  }
  onStatusChange(){
    this.utilisateur.statut = this.createForm.controls.status.value;
  }
}