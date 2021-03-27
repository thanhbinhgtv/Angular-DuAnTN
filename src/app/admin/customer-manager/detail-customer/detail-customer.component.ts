import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomersService } from '../Customers.Service';
import { CustomerResponseModel } from '../view-customer/customer-reponse-model';

@Component({
  selector: 'app-detail-customer',
  templateUrl: './detail-customer.component.html',
  styleUrls: ['./detail-customer.component.css']
})
export class DetailCustomerComponent implements OnInit {
  customer: CustomerResponseModel; // call class  model
  customerId: number;

  constructor(private customerService: CustomersService, private activateRoute: ActivatedRoute) {
    this.customerId = this.activateRoute.snapshot.params.id; // chua hieu doan nay
   }

  ngOnInit(): void {
    this.getCustomerById();
  }

  getCustomerById(){
    this.customerService.getCustomerById(this.customerId).subscribe((data) => {
      this.customer = data;
      console.log(data)
    })
  }
}
