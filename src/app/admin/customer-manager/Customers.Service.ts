import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CustomerResponseModel } from '../../shared/model/responses/customer-reponse-model';

@Injectable({
    providedIn: 'root'
})
export class CustomersService{
    constructor(private http: HttpClient) {}

    getAllCustomers(page: number): Observable<Array<CustomerResponseModel>>{
        return this.http.get<Array<CustomerResponseModel>>(`http://localhost:8080/admin/customers?page=${page}&&limit=10`);
    }
    
    getCustomerById(id: number): Observable<CustomerResponseModel>{
        return this.http.get<CustomerResponseModel>('http://localhost:8080/admin/customers/' + id);
    }

    getActiveCustomer(id: number): Observable<any> {
        return this.http.get<any>(`http://localhost:8080/admin/customers/active/${id}`);
      }
    
    getHiddenCustomer(id: number): Observable<any> {
        return this.http.get<any>(`http://localhost:8080/admin/customers/block/${id}`);
    }

}