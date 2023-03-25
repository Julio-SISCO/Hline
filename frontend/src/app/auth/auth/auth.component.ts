import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { TokenStorageService } from 'app/services/token-storage.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(
    private tokenStorageService: TokenStorageService,
    private authService:AuthService,
    private router:Router
  ) { }

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

  toggleActive(){
    const elt:any = document.querySelector(".nav__link");
    if(elt.classList.contains('.active-link')){
      elt.classList.add('active-link');
    }else{
      elt.classList.remove('active-link');
    }
  }

}
