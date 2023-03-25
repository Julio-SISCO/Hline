import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

@Injectable({
  providedIn: 'root'
})

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor(
    private authService:AuthService
  ) { }
  signout():void{
    window.sessionStorage.clear();
  }
  public saveToken(token:string):void{
    window.sessionStorage.removeItem(TOKEN_KEY);
    this.authService.validateToken(token).subscribe(data =>{
        if(data){
          console.log("stockage fait");
          window.sessionStorage.setItem(TOKEN_KEY,token);
          window.location.reload();
        }
      
    })

  }

  public getToken():string|null{
    return window.sessionStorage.getItem(TOKEN_KEY);
  }
  public saveUser(user:any):void{
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  public getUser():any{
    const user = window.sessionStorage.getItem(USER_KEY);
    if(user){
      return JSON.parse(user);
    }
    return {};
  }
}
