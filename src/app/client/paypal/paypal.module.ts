import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaypalRoutingModule } from './paypal-routing.module';
import { PaypalComponent } from './paypal.component';
import { ViewHandlePaypalComponent } from './view-handle-paypal/view-handle-paypal.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PaypalComponent, 
    ViewHandlePaypalComponent
  ],
  imports: [
    CommonModule,
    PaypalRoutingModule,
    ReactiveFormsModule,
  ]
})
export class PaypalModule { }
