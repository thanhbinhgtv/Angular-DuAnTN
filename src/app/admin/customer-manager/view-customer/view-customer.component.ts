import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomersService } from '../Customers.Service';
import { CustomerResponseModel } from '../../../shared/model/responses/customer-reponse-model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css']
})
export class ViewCustomerComponent implements OnInit {
  customers: Array<CustomerResponseModel> = [];
  page = 0;
  deleted: string = '';
  search: string = '';
  deletedForm = new FormControl('');
  searchForm = new FormControl('');

  constructor(private customerService: CustomersService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getAllCustomer();
  }

  getAllCustomer() {
    this.customerService.getAllCustomers(this.deleted, this.search).subscribe(data => {
      this.customers = data;
    })
  }

  Search(){
    this.deleted = this.deletedForm.value;
    this.search = this.searchForm.value;
    this.getAllCustomer();
  }

}
