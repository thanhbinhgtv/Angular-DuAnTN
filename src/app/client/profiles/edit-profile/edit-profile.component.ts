import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerResponseModel } from 'src/app/shared/model/responses/customer-reponse-model';
import { CustomerService } from '../../service/customer.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  customerModel: CustomerResponseModel;
  customerForm: FormGroup;

  constructor( private datepipe: DatePipe, private customerService: CustomerService) { }

  ngOnInit(): void {
      this.getCustomerProfile();

      this.customerForm = new FormGroup({
        customerId: new FormControl(""),
        email: new FormControl(""),
        phone: new FormControl(""),
        cardId: new FormControl(""),
        name: new FormControl(""),
        birthday: new FormControl(""),
        address: new FormControl(""),
      });
  }

  getCustomerProfile(){
      this.customerService.getCustomerProfile().subscribe((data) => {
        let convertData:any = data;
        let convertBirth = new Date(data.birthday);
        convertData.birthday = this.datepipe.transform(convertBirth, 'yyyy-MM-dd');
        this.customerModel = data;

        this.customerForm.patchValue(convertData);
      })
  }
}
