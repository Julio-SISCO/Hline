import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hotel } from 'app/models/hotel';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

const apiUrl = environment.apiurl
@Injectable({
  providedIn: 'root'
})
export class HotelService {
  constructor(
    private http:HttpClient
    ) { }
  getAll():Observable<Hotel[]>{
    return this.http.get<Hotel[]>(apiUrl+"/hotel");
  }
  findById(id:number):Observable<Hotel>{
    return this.http.get<Hotel>(apiUrl+'/'+id);
  }
  addHotel(hotel:Hotel):Observable<Hotel>{
    return this.http.post<Hotel>(apiUrl+"/hotel",hotel)
  }
  
}
