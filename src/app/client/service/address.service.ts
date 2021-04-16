import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private httpClient: HttpClient) { }

  getAllCity(): Observable<any>{
    return this.httpClient.get<any>('http://localhost:8080/city');
  }

  getDistrictById(cityId: number): Observable<any>{
    return this.httpClient.get<any>(`http://localhost:8080/district?city-id=${cityId}`);
  }

  getWardById(district: number): Observable<any>{
    return this.httpClient.get<any>(`http://localhost:8080/ward?district-id=${district}`);
  }

}
