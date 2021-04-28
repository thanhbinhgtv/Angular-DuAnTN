import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaypalService {

  constructor(private httpClient: HttpClient) { }

  getPaypal(price: number): Observable<any> {
    return this.httpClient.get(`http://localhost:8080/customer/pay?price=${price}`);
  }

  // Nạp Tiền
  getTransaction1(page: number): Observable<any> {
    return this.httpClient.get(`http://localhost:8080/customer/transaction?page=${page}&&limit=10&&type=true`);
  }

  // Thanh Toán
  getTransaction2(page: number): Observable<any> {
    return this.httpClient.get(`http://localhost:8080/customer/transaction?page=${page}&&limit=10&&type=false`);
  }
}
