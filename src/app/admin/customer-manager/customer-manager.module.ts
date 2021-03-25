import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerManagerRoutingModule } from './customer-manager-routing.module';
import { CustomerManagerComponent } from './customer-manager.component';
import { ViewCustomerComponent } from './view-customer/view-customer.component';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { UpdateCustomerComponent } from './update-customer/update-customer.component';
import { DetailCustomerComponent } from './detail-customer/detail-customer.component';


@NgModule({
  declarations: [
    CustomerManagerComponent, 
    ViewCustomerComponent, 
    CreateCustomerComponent, 
    UpdateCustomerComponent, 
    DetailCustomerComponent
  ],
  imports: [
    CommonModule,
    CustomerManagerRoutingModule
  ]
})
export class CustomerManagerModule { }
