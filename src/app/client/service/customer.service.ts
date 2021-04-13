import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerResponseModel } from 'src/app/admin/customer-manager/view-customer/customer-reponse-model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient: HttpClient) { }

  getCustomerById(): Observable<CustomerResponseModel>{
    return this.httpClient.get<CustomerResponseModel>('http://localhost:8080/customer/profile');
}
}
