import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticalRoutingModule } from './statistical-routing.module';
import { StatisticalArticleComponent } from './statistical-article/statistical-article.component';
import { StatisticalStaffActionComponent } from './statistical-staff-action/statistical-staff-action.component';
import { StatisticalCustomerComponent } from './statistical-customer/statistical-customer.component';
import { StatisticalCountRequestComponent } from './statistical-count-request/statistical-count-request.component';
import { StatisticalRevenueComponent } from './statistical-revenue/statistical-revenue.component';
import { StatisticalComponent } from './statistical.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    StatisticalArticleComponent,
    StatisticalStaffActionComponent,
    StatisticalCustomerComponent,
    StatisticalCountRequestComponent,
    StatisticalRevenueComponent,
    StatisticalComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StatisticalRoutingModule,
  ]
})
export class StatisticalModule { }
