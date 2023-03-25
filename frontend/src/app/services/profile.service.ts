import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from 'app/models/apiResponse';
import { Profile } from 'app/models/profile';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

const apiUrl = environment.apiurl
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(
    private http:HttpClient
  ) {}

  getAll():Observable<ApiResponse>{
    return this.http.get<ApiResponse>(apiUrl+'/profiles/all');
  }
  findById(id:number):Observable<ApiResponse>{
    return this.http.get<ApiResponse>(apiUrl+'/profiles/'+id);
  }
  post(profile:Profile):Observable<ApiResponse>{
    return this.http.post<ApiResponse>(apiUrl+'/profiles/add',profile);
  }
  delete(id:number):Observable<ApiResponse>{
    return this.http.delete<ApiResponse>(apiUrl+'/profiles/'+id);
  }
  update(profile:Profile, id:number):Observable<ApiResponse>{
    return this.http.put<ApiResponse>(apiUrl+'/profiles/'+id,profile)
  }
}
