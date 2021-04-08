import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaypalService {

  constructor(private httpClient: HttpClient) { }

  getPaypal(price: number, email: string, description: string): Observable<any> {
    return this.httpClient.get(`http://localhost:8080/pay?price=${price}&email=${email}&description=${description}`);
  }
}
