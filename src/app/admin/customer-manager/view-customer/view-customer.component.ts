import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomersService } from '../Customers.Service';
import { CustomerResponseModel } from '../../../shared/model/responses/customer-reponse-model';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css']
})
export class ViewCustomerComponent implements OnInit {
  customers: Array<CustomerResponseModel> = [];
  deleteSuccess: boolean;
  page = 0;
  customerFilter: Array<CustomerResponseModel> = [];  //Empty array to show the many users searched for
  value = '';  //create Empty variable, get data from the search box on the interface side
  status = 0;


  // call api CustomersService
  // call ToastrService => hien thong bao
  constructor(private customerService: CustomersService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getAllCustomer();
  }

  getAllCustomer() {
    this.customerService.getAllCustomers(this.page).subscribe(data => {
      this.customers = data;
    })
  }

  getAllActiveOrHiddenCustomer(deleted: boolean) {
    this.customerService.getAllCustomers(this.page).subscribe(data => {
      const filterData = data.filter(data => data.deleted == deleted);
      this.customers = filterData;
    });
  }

  onPage(page: number) {
    this.page = page;
    this.getAllCustomer();
  }
  // hiep 9/4 -  search customer
  onChange(event: any) {
    console.log(event);
    this.value = event.target.value.toLowerCase(); // lay gia trị tu form
    this.customerFilter = this.status === 0 ? this.customers.filter(customer => customer.name.toLowerCase().includes(this.value) || customer.email.toLowerCase().includes(this.value))
        : this.customers.filter(customer => (customer.name.toLowerCase().includes(this.value) || customer.email.toLowerCase().includes(this.value)) 
        && this.status === 1 ? !customer.deleted : customer.deleted);
  }
}
