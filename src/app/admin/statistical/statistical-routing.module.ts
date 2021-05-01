import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatisticalArticleComponent } from './statistical-article/statistical-article.component';
import { StatisticalCountRequestComponent } from './statistical-count-request/statistical-count-request.component';
import { StatisticalCustomerComponent } from './statistical-customer/statistical-customer.component';
import { StatisticalRevenueComponent } from './statistical-revenue/statistical-revenue.component';
import { StatisticalStaffActionComponent } from './statistical-staff-action/statistical-staff-action.component';
import { StatisticalComponent } from './statistical.component';

const routes: Routes = [{
  path: '', component: StatisticalComponent,
  children: [
    {
      path: 'revenue', component: StatisticalRevenueComponent,
    },
    {
      path: 'count-request', component: StatisticalCountRequestComponent,
    },
    {
      path: 'staff-action', component: StatisticalStaffActionComponent,
    },
    {
      path: 'customer', component: StatisticalCustomerComponent,
    },
    {
      path: 'article', component: StatisticalArticleComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticalRoutingModule { }
