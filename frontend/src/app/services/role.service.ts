import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from 'app/models/apiResponse';
import { Role } from 'app/models/role';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

const apiUrl = environment.apiurl
@Injectable({
  providedIn: 'root'
})
export class RoleService {
  constructor(
    private http:HttpClient
  ) {}

  getAll():Observable<ApiResponse>{
    return this.http.get<ApiResponse>(apiUrl+'/roles/all');
  }
  findById(id:number):Observable<ApiResponse>{
    return this.http.get<ApiResponse>(apiUrl+'/roles/'+id);
  }
  post(role:Role):Observable<ApiResponse>{
    return this.http.post<ApiResponse>(apiUrl+'/roles/add',role);
  }
  delete(id:number):Observable<ApiResponse>{
    return this.http.delete<ApiResponse>(apiUrl+'/roles/'+id);
  }
  update(role:Role, id:number):Observable<ApiResponse>{
    return this.http.put<ApiResponse>(apiUrl+'/roles/'+id,role)
  }
}
