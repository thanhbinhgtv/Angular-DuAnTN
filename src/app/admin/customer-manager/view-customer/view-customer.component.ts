import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomersService } from '../Customers.Service';
import { CustomerResponseModel } from './customer-reponse-model';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css']
})
export class ViewCustomerComponent implements OnInit {
  customers: Array<CustomerResponseModel> = [];
  deleteSuccess : boolean;
  page = 0;

  // call api CustomersService
  // call ToastrService => hien thong bao
  constructor(private customerService:  CustomersService, private toastr: ToastrService){
  }

  ngOnInit(): void {
    this.getAllCustomer();
  }

  getAllCustomer(){
    this.customerService.getAllCustomers(this.page).subscribe(customer =>{
      this.customers = customer;
    })
  }

  onPage(page: number){
    this.page = page;
    this.getAllCustomer();
 }

}
