import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
// import { ViewHomeComponent } from './home-admin/view-home.component';
import { AdminComponent } from './admin.component';


@NgModule({
  declarations: [
    // ViewHomeComponent,
    AdminComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
