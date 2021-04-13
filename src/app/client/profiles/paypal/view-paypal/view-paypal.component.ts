import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/client/service/customer.service';
import { CustomerResponseModel } from 'src/app/shared/model/responses/customer-reponse-model';

@Component({
  selector: 'app-view-paypal',
  templateUrl: './view-paypal.component.html',
  styleUrls: ['./view-paypal.component.css']
})
export class ViewPaypalComponent implements OnInit {
  customerModel: CustomerResponseModel;

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.getCustomerById();
  }

  getCustomerById(){
    this.customerService.getCustomerById().subscribe((data) => {
      this.customerModel = data;
    })
  }
}
