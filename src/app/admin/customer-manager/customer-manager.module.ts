import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerManagerRoutingModule } from './customer-manager-routing.module';
import { CustomerManagerComponent } from './customer-manager.component';
import { ViewCustomerComponent } from './view-customer/view-customer.component';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { DetailCustomerComponent } from './detail-customer/detail-customer.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CustomerManagerComponent, 
    ViewCustomerComponent, 
    CreateCustomerComponent, 
    DetailCustomerComponent
  ],
  imports: [
    CommonModule,
    CustomerManagerRoutingModule,
    ReactiveFormsModule,
  ]
})
export class CustomerManagerModule { }
