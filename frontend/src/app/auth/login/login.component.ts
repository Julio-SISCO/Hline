import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel } from 'app/models/loginModel';
import { AuthService } from 'app/services/auth.service';
import { TokenStorageService } from 'app/services/token-storage.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form:FormGroup;
  loginModel:LoginModel;
  isLoggedIn = false;
  isLoginFailed = false;
  submitted = false;
  errorMessage:string;
  roles:string[] = [];
  constructor(
    private formBuilder:FormBuilder,
    private tokenStorageService:TokenStorageService,
    private authService:AuthService,
    private router:Router,
    private toast:NgToastService,
    ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username:['',Validators.required],
      password:['',Validators.required]
    })
    if(this.tokenStorageService.getToken()){
      this.isLoggedIn = true;
      this.roles = this.tokenStorageService.getUser().roles;
      this.router.navigate(["/api/dashboard"]);
    }
    

  }

  get f():{[key:string]:AbstractControl}{
    return this.form.controls;
  }
  onSubmit():void{
    this.submitted = true;
    this.loginModel = new LoginModel()
    this.loginModel.email = this.form.controls.username.value;
    this.loginModel.password = this.form.controls.password.value;

    this.authService.login(this.loginModel).subscribe(
      data =>{
        if(data.token!=null){
          console.log(data.email);
          this.tokenStorageService.saveToken(data.token);
          this.tokenStorageService.saveUser(data);
          this.isLoggedIn = true;
          this.isLoginFailed = false;
          this.roles = this.tokenStorageService.getUser().roles
          
        }else{

        }
        let token = this.tokenStorageService.getToken();
        if(token){ 
          this.authService.validateToken(token).subscribe(data =>{
            if(data){
              this.redirectPage();
            }
          })
        } else {
          console.log("il y a erreur de token absence");
          this.errorMessage = "Invalid login";
        }
      }
      ,err=>{
        this.isLoginFailed = true
        this.errorMessage = "Identifiant ou mot de passe incorrect";
      }
    );
  }

  redirectPage():void{
    this.router.navigate(["/dashboard"]);
  }

}
