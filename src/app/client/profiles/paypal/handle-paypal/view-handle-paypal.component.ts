import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomersService } from 'src/app/admin/customer-manager/Customers.Service';
import { CustomerResponseModel } from 'src/app/admin/customer-manager/view-customer/customer-reponse-model';
import { AuthService } from 'src/app/auth/service/auth.service';
import { PaypalService } from '../../../service/paypal.service';

@Component({
  selector: 'app-view-handle-paypal',
  templateUrl: './view-handle-paypal.component.html',
  styleUrls: ['./view-handle-paypal.component.css']
})
export class ViewHandlePaypalComponent implements OnInit {
  paypalForm: FormGroup;
  customerModel: CustomerResponseModel;
  constomerId: number;

  constructor( private customerService: CustomersService, private paypalService: PaypalService, private authService: AuthService, private router: Router, private toastr: ToastrService) { 
    this.constomerId = this.authService.getId();
  }

  ngOnInit(): void {
    this.getCustomerById();

    this.paypalForm = new FormGroup({
      money: new FormControl("", [Validators.required, Validators.max(10000)]),
      description: new FormControl(""),
    });
  }

  getPaypal(){
    const money = this.paypalForm.get('money').value;
    const description = this.paypalForm.get('description').value;
    this.toastr.info("Vui lòng chờ giây lát");
    
    this.paypalService.getPaypal(money, this.customerModel.email, description).subscribe((data) => {
      window.open(data.mess);
    })
    
  }

  getCustomerById(){
    this.customerService.getCustomerById(this.constomerId).subscribe((data) => {
      this.customerModel = data;
    })
  }
}
