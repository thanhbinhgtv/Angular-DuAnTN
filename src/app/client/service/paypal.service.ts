import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaypalService {

  constructor(private httpClient: HttpClient) { }

  getPaypal(price: number, description: string): Observable<any> {
    return this.httpClient.get(`http://localhost:8080/customer/pay?price=${price}&description=${description}`);
  }
}
