import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaypalComponent } from './paypal.component';
import { ViewHandlePaypalComponent } from './view-handle-paypal/view-handle-paypal.component';

const routes: Routes = [{
  path: '', component: PaypalComponent,
  children: [
    {
      path: 'handle', component: ViewHandlePaypalComponent,
    },
    // {
    //   path: 'create-staff', component: CreateStaffComponent,
    // },
    { path: '**', redirectTo: 'handle' },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaypalRoutingModule { }
