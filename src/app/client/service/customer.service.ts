import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerResponseModel } from 'src/app/shared/model/responses/customer-reponse-model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient: HttpClient) { }

  getCustomerProfile(): Observable<CustomerResponseModel>{
    return this.httpClient.get<CustomerResponseModel>('http://localhost:8080/customer/profile');
  }

  getFavorite(id: number): Observable<any>{
    return this.httpClient.get(`http://localhost:8080/customer/favorite-article/add-remove?article-id=${id}`);
  }

  getListFavorites(page: number): Observable<any>{
    return this.httpClient.get(`http://localhost:8080/customer/favorite-article?page=${page}&limit=10`);
  }

  postUpdateProfile(CustomerResponseModel: CustomerResponseModel): Observable<any>{
    return this.httpClient.post('http://localhost:8080/customer/update-profile', CustomerResponseModel);
  }

  postEditImage(strImage: string): Observable<any>{
    return this.httpClient.post(`http://localhost:8080/customer/avatar`, strImage);
  }
}
