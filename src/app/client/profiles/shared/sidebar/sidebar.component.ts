import { Component, OnInit } from '@angular/core';
import { CustomerResponseModel } from 'src/app/shared/model/responses/customer-reponse-model';
import { CustomerService } from 'src/app/client/service/customer.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  customerModel: CustomerResponseModel;

  constructor( private customerService: CustomerService) { }

  ngOnInit(): void {
    this.getCustomerProfile();
  }

  getCustomerProfile(){
    this.customerService.getCustomerProfile().subscribe((data) => {
      this.customerModel = data;
    })
  }
}
