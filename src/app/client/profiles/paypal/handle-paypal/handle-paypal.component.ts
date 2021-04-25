import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomersService } from 'src/app/admin/customer-manager/Customers.Service';
import { CustomerResponseModel } from 'src/app/shared/model/responses/customer-reponse-model';
import { AuthService } from 'src/app/auth/service/auth.service';
import { CustomerService } from 'src/app/client/service/customer.service';
import { PaypalService } from '../../../service/paypal.service';

@Component({
  selector: 'app-handle-paypal',
  templateUrl: './handle-paypal.component.html',
  styleUrls: ['./handle-paypal.component.css']
})
export class HandlePaypalComponent implements OnInit {
  paypalForm: FormGroup;
  customerModel: CustomerResponseModel;
  constomerId: number;

  constructor( private customerService: CustomerService, private paypalService: PaypalService, private authService: AuthService, private router: Router, private toastr: ToastrService) { 
    this.constomerId = this.authService.getId();
  }

  ngOnInit(): void {
    this.getCustomerProfile();

    this.paypalForm = new FormGroup({
      money: new FormControl("", [Validators.required, Validators.max(10000)]),
      description: new FormControl(""),
    });
  }

  getPaypal(){
    const money = this.paypalForm.get('money').value;
    const description = this.paypalForm.get('description').value;
    this.toastr.info("Vui lòng chờ giây lát");
    
    this.paypalService.getPaypal(money, description).subscribe((data) => {
      window.location.replace(data.mess);
    })
    
  }

  getCustomerProfile(){
    this.customerService.getCustomerProfile().subscribe((data) => {
      this.customerModel = data;
    })
  }
}
