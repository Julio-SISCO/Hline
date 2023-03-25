import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from 'app/models/apiResponse';
import { Image } from 'app/models/image';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

const apiUrl = environment.apiurl

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  constructor(
    private http:HttpClient
  ) {}

  upload(imageFile:any):Observable<ApiResponse>{
    return this.http.post<ApiResponse>(apiUrl+'/images/upload',imageFile);
  }
  getImage(imageId:number):Observable<ApiResponse>{
    return this.http.get<ApiResponse>(apiUrl+'/images/get/'+imageId);
  }
  delete(id:number):Observable<ApiResponse>{
    return this.http.delete<ApiResponse>(apiUrl+'/images/'+id);
  }
  update(image:any, id:number):Observable<ApiResponse>{
    return this.http.put<ApiResponse>(apiUrl+'/images/'+id,image)
  }
}
