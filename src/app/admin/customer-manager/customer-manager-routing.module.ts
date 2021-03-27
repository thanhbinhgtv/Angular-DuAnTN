import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { CustomerManagerComponent } from './customer-manager.component';
import { DetailCustomerComponent } from './detail-customer/detail-customer.component';
import { UpdateCustomerComponent } from './update-customer/update-customer.component';
import { ViewCustomerComponent } from './view-customer/view-customer.component';

const routes: Routes = [{
  path: '', component: CustomerManagerComponent,
  children: [
    {
      path: '', component: ViewCustomerComponent,
    },
    {
      path: 'create-customer', component: CreateCustomerComponent,
    },
    {
      path: 'update-customer', component: UpdateCustomerComponent,
    },
    {
      path: 'detail-customer/:id', component: DetailCustomerComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerManagerRoutingModule { }
