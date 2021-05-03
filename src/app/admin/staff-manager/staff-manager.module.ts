import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffManagerRoutingModule } from './staff-manager-routing.module';
import { StaffManagerComponent } from './staff-manager.component';
import { ViewStaffComponent } from './view-staff/view-staff.component';
import { CreateStaffComponent } from './create-staff/create-staff.component';
import { DetailStaffComponent } from './detail-staff/detail-staff.component';
import { UpdateStaffComponent } from './update-staff/update-staff.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    StaffManagerComponent,
    ViewStaffComponent,
    CreateStaffComponent,
    DetailStaffComponent,
    UpdateStaffComponent,
  ],
  imports: [
    CommonModule,
    StaffManagerRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    NgxPaginationModule
  ]
})
export class StaffManagerModule { }
