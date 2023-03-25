import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Image } from 'app/models/image';
import { Profile } from 'app/models/profile';
import { Role } from 'app/models/role';
import { Utilisateur } from 'app/models/utilisateur';
import { ImageService } from 'app/services/image.service';
import { ProfileService } from 'app/services/profile.service';
import { RoleService } from 'app/services/role.service';
import { UtilisateurService } from 'app/services/utilisateur.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-update-utilisateur',
  templateUrl: './update-utilisateur.component.html',
  styleUrls: ['./update-utilisateur.component.scss']
})
export class UpdateUtilisateurComponent implements OnInit {
  currentUtilisateurId:number;
  currentUtilisateur:Utilisateur=new Utilisateur();
  isUpdate:boolean = false;
  updateForm:FormGroup;
  profiles:Profile[];
  idUtilisateur:number;
  roleUtilisateur:Role;
  roles:Role[];
  imageSelected:any;
  image:Image;
  imageSourceforCurrentUser:any
  

  constructor(
    private utilisateurService:UtilisateurService,
    private profileService:ProfileService,
    private roleService:RoleService,
    private activeModal:NgbActiveModal,
    private toast:NgToastService,
    private formBuilder:FormBuilder,
    @Inject(ImageService)private imageService:ImageService,
  ) {
   }

  ngOnInit(): void {
    this.findAll();
    console.log(this.currentUtilisateur);
    
    this.updateForm = this.formBuilder.group({
      'nom':[this.currentUtilisateur.nom,Validators.required],
      'prenom':[this.currentUtilisateur.prenom,Validators.required],
      'email':[this.currentUtilisateur.email,Validators.required],
      'adresse':[this.currentUtilisateur.adresse,Validators.required],
      'telephone':[this.currentUtilisateur.telephone,Validators.required],
      'image':[''],
      'enabled':['',Validators.required],
      'profile':[this.currentUtilisateur.profile?.idProf,Validators.required],
      'roles':[''],
      'status':['',Validators.required],
    })
  }

  findAll(){
    this.profileService.getAll().subscribe(data =>{
      if(data.status==200){
        this.profiles = data.result;
      }
    })
    this.roleService.getAll().subscribe(data =>{
      if(data.status == 200){
        this.roles = data.result
      }
    })
    if(this.currentUtilisateur.imageUrl != undefined && this.currentUtilisateur.imageUrl !=null){
      this.imageSourceforCurrentUser = this.currentUtilisateur.imageUrl
    }
  }
  update(){
    this.currentUtilisateur.nom = this.updateForm.controls.nom.value;
    this.currentUtilisateur.prenom = this.updateForm.controls.prenom.value;
    this.currentUtilisateur.email = this.updateForm.controls.email.value;
    this.currentUtilisateur.adresse = this.updateForm.controls.adresse.value;
    this.currentUtilisateur.telephone = this.updateForm.controls.telephone.value;

    if((this.currentUtilisateur.imageUrl === null || this.currentUtilisateur.imageUrl != null)&&this.imageSelected===null){
      const imageLoadData = new FormData()
      imageLoadData.append('imageFile',this.imageSelected,this.imageSelected?.name);
      this.imageService.upload(imageLoadData).subscribe(data =>{
        console.log("upload ...");
        if(data.status === 200){
          this.image = data.result;
          console.log(this.image);
          this.currentUtilisateur.imageProf = this.image;
          console.log('avatar user:'+this.currentUtilisateur.imageProf);
          this.utilisateurService.update(this.currentUtilisateur, this.currentUtilisateur.idUti).subscribe(data =>{
            if(data.status == 200){
              this.isUpdate = true
              this.activeModal.close(this.isUpdate);
            }else{
              this.toast.error({detail:"Error",summary:'An error occurred',duration:5000})
            }
        })
        }else{
          this.toast.error({detail:"Size error",summary:'Image size too long',duration:5000})
        }
      })
    }else{
      this.utilisateurService.update(this.currentUtilisateur,this.currentUtilisateurId).subscribe((data)=>{
        if(data.status == 200){
          this.isUpdate = true
          this.activeModal.close(this.isUpdate);
        }
      })
    }

  }

  saveImage(event:any){
    this.imageSelected = event.target.files[0];
    this.image = new Image();
  }

   onProfileChange(){
    const idcat = this.updateForm.controls.profile.value;
     this.profileService.findById(idcat).subscribe(data=>{
       if(data.status==200){
         this.currentUtilisateur.profile=data.result;
       }
     })
   }
  onRoleChange(){
    const idRole = this.updateForm.controls.roles.value
    this.roleService.findById(idRole).subscribe(data =>{
    if(data.status==200){
        this.roleUtilisateur = data.result;
      }
    })
   }
   addRole(){
     if(this.currentUtilisateur.roles.length>0){
       let repeat = false
       for (let i = 0; i < this.currentUtilisateur.roles.length; i++) {
         if(this.currentUtilisateur.roles[i].libelle===this.roleUtilisateur?.libelle){
             repeat = true
         }
       }
       if(!repeat){
        this.currentUtilisateur.roles.push(this.roleUtilisateur);
       }else{
         this.toast.error({detail:"Error",summary:'Duplicate detected',duration:5000});
       }
      
     }else{
       this.currentUtilisateur.roles.push(this.roleUtilisateur);
     }
   }
 
   removeRole(i:number){
     for (let index = 0; index < this.currentUtilisateur.roles.length; index++) {
       if(index === i){
        this.currentUtilisateur.roles.splice(i,1);
       }  
     }
    }
   onEnabledChange(){
    this.currentUtilisateur.enabled = this.updateForm.controls.enabled.value;
    console.log(this.currentUtilisateur.enabled);
    
  }
   onStatusChange(){
     this.currentUtilisateur.statut = this.updateForm.controls.status.value;
   }

  onClose(){
    this.activeModal.close()
  }

}
