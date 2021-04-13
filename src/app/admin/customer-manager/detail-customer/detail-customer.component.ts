import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomersService } from '../Customers.Service';
import { CustomerResponseModel } from '../../../shared/model/responses/customer-reponse-model';

@Component({
  selector: 'app-detail-customer',
  templateUrl: './detail-customer.component.html',
  styleUrls: ['./detail-customer.component.css']
})
export class DetailCustomerComponent implements OnInit {
  customer: CustomerResponseModel; // call class  model
  customerId: number;

  constructor(private customerService: CustomersService, private activateRoute: ActivatedRoute, private router: Router, private toastr: ToastrService) {
    this.customerId = this.activateRoute.snapshot.params.id;
   }

  ngOnInit(): void {
    this.getCustomerById();
  }

  getCustomerById(){
    this.customerService.getCustomerById(this.customerId).subscribe((data) => {
      this.customer = data;
    })
  }

  activeCustomers(){
    this.customerService.getActiveCustomer(this.customerId).subscribe((data) => {
      this.toastr.success(data.mess);
      this.router.navigate(['/admin/customer']);
    }, error =>{
        this.toastr.error(error.error.mess);
    });
  }

  blockCustomers(){
    this.customerService.getHiddenCustomer(this.customerId).subscribe((data) => {
      this.toastr.success(data.mess);
      this.router.navigate(['/admin/customer']);
    }, error =>{
        this.toastr.error(error.error.mess);
    });
  }
}
