import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from 'app/models/apiResponse';
import { Utilisateur } from 'app/models/utilisateur';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

const apiUrl = environment.apiurl
@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  constructor(
    private http:HttpClient
  ) {}

  getAll():Observable<ApiResponse>{
    return this.http.get<ApiResponse>(apiUrl+'/utilisateurs/all');
  }
  findById(id:number):Observable<ApiResponse>{
    return this.http.get<ApiResponse>(apiUrl+'/utilisateurs/'+id);
  }
  findByEmail(email:string):Observable<any>{
    return this.http.get(apiUrl+'/utilisateurs/findByEmail/'+email);
  }
  post(utilisateur:Utilisateur):Observable<ApiResponse>{
    return this.http.post<ApiResponse>(apiUrl+'/utilisateurs/add',utilisateur);
  }
  delete(id:number):Observable<ApiResponse>{
    return this.http.delete<ApiResponse>(apiUrl+'/utilisateurs/'+id);
  }
  update(utilisateur:Utilisateur, id:number):Observable<ApiResponse>{
    return this.http.put<ApiResponse>(apiUrl+'/utilisateurs/'+id,utilisateur)
  }
}
