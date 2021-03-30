import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CustomerResponseModel } from './view-customer/customer-reponse-model';

@Injectable({
    providedIn: 'root'
})
export class CustomersService{
    constructor(private http: HttpClient) {}

    // lấy về danh sách người dùng
    getAllCustomers(page: number): Observable<Array<CustomerResponseModel>>{
        return this.http.get<Array<CustomerResponseModel>>(`http://localhost:8080/admin/customers?page=${page}&&limit=5`);
    }
    
    //
    getCustomerById(id: number): Observable<CustomerResponseModel>{
        return this.http.get<CustomerResponseModel>('http://localhost:8080/admin/customers/' + id);
    }

    // createCustomer(postCustomerModel: )
}