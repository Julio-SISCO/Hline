import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chambre } from 'app/models/chambre';
import { Hotel } from 'app/models/hotel';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

const apiUrl = environment.apiurl
@Injectable({
  providedIn: 'root'
})
export class ChambreService {

  constructor(
    private http:HttpClient
  ) { }
  getAll(hotel:Hotel):Observable<Chambre[]>{
    return this.http.get<Chambre[]>(apiUrl+"/chambre/"+hotel);
  }
  findById(id:number):Observable<Chambre>{
    return this.http.get<Chambre>(apiUrl+'/'+id);
  }
  addChambre(chambre:Chambre):Observable<Chambre>{
    return this.http.post<Chambre>(apiUrl+"/chambre",chambre)
  }
  
}
