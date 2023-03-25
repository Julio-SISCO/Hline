import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'app/models/userModel';
import { AuthService } from 'app/services/auth.service';
import { TokenStorageService } from 'app/services/token-storage.service';
import Validation from 'app/utils/validation';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form:FormGroup;
  userModel:UserModel;
  submitted = false;
  isSuccessfull = false;
  isSignupFailed=false;
  errorMessage:string;
  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthService,
    private tokenStorageService:TokenStorageService,
    private router:Router,
    private toast:NgToastService,
    ) {
      this.form = this.formBuilder.group({
        firstName:['',[Validators.required]],
        lastName:['',[Validators.required]],
        email:['',[Validators.email,Validators.required]],
        password:['',[Validators.min(8),Validators.required]],
        confirmPassword:['', [Validators.min(8),Validators.required]],
        acceptTerms:[false,Validators.requiredTrue]
      },
      {
        validators:[Validation.match('password','confirmPassword')]
      })
     }

  ngOnInit(): void {
    const token = this.tokenStorageService.getToken()
    if(token){
      this.authService.validateToken(token).subscribe(data =>{
        if(data){
          this.router.navigate(["/dashboard"]);
        }
      })
    }
  }
  
  get f():{[key:string]:AbstractControl}{
    return this.form.controls;
  }

  onSubmit():void{
    this.submitted = true;
    console.log(this.form.controls.lastName.value);
    console.log(this.form.controls.firstName.value);
    console.log(this.form.controls.email.value);
    console.log(this.form.controls.password.value);
    console.log(this.form.controls.confirmPassword.value);
    if(this.form.invalid){
      console.log("invalide");
    }else{
      this.userModel = new UserModel();
      this.userModel.lastName = this.form.controls.lastName.value;
      this.userModel.firstName = this.form.controls.firstName.value;
      this.userModel.email = this.form.controls.email.value;
      this.userModel.password = this.form.controls.password.value;
      this.authService.register(this.userModel).subscribe(
        data =>{
          if(data.result!=null){
            console.log(data.result);
            this.isSuccessfull=true
            this.isSignupFailed = false;
            this.redirectPage();
            this.toast.success({detail:"Thank!",summary:'your register success',duration:5000})
          }else{
            this.toast.error({detail:"Error",summary:'An error occured, try again',duration:5000})
          }
          
        }
        
        // ,err => {
        //   this.errorMessage = err.error.message;
        //   this.isSignupFailed = true;
          
        // }
      )
    }
  }

  onReset():void{
    this.submitted = false;
    this.form.reset();
  }
  redirectPage():void{
    //window.location.reload();
    this.router.navigate(["/auth/login"]);
  }


}
