import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { TokenStorageService } from './services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  isloggedin:boolean=true;
  constructor(
    private authService:AuthService,
    private tokenStorageService:TokenStorageService,
    private router:Router
  ){

  }
  ngOnInit(){
  //   const token = this.tokenStorageService.getToken()
  //   if(token){
  //     this.authService.validateToken(token).subscribe(data =>{
  //       if(!data){
  //          this.router.navigate(["/auth/login"]);
  //       }
  //     })
  //   }
  }
}
