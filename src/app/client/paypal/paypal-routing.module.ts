import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaypalComponent } from './paypal.component';
import { ViewHandlePaypalComponent } from './view-handle-paypal/view-handle-paypal.component';

const routes: Routes = [{
  path: '', component: PaypalComponent,
  children: [
    {
      path: '', component: ViewHandlePaypalComponent,
    },
    // {
    //   path: 'create-staff', component: CreateStaffComponent,
    // },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaypalRoutingModule { }
