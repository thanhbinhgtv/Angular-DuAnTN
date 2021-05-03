import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CustomerResponseModel } from '../../shared/model/responses/customer-reponse-model';

@Injectable({
    providedIn: 'root'
})
export class CustomersService{
    constructor(private http: HttpClient) {}

    getAllCustomers(deleted: string, search: string): Observable<Array<CustomerResponseModel>>{
        return this.http.get<Array<CustomerResponseModel>>
        (`http://localhost:8080/admin/customers?page=0&&limit=2000&&status=${deleted?deleted:''}&&search=${search?search:''}`);
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