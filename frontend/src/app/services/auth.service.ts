import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from 'app/models/apiResponse';
import { JwtResponse } from 'app/models/jwtResponse';
import { LoginModel } from 'app/models/loginModel';
import { UserModel } from 'app/models/userModel';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

const apiUrl = environment.apiurl
const httpOptions = {
  headers : new HttpHeaders ({'Content-Type':'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  login(loginModel:LoginModel):Observable<JwtResponse>{
    return this.http.post<JwtResponse>(apiUrl+'/authmanage/login',loginModel,httpOptions)
  }
  register(userModel:UserModel):Observable<ApiResponse>{
    return this.http.post<ApiResponse>(apiUrl+'/authmanage/register',userModel,httpOptions)
  }
  validateToken(token:string):Observable<any>{
    return this.http.get(apiUrl+'/authmanage/validate-token/'+token,httpOptions)
  }
  
}
