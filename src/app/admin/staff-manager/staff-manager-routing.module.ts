import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateStaffComponent } from './create-staff/create-staff.component';
import { DetailStaffComponent } from './detail-staff/detail-staff.component';
import { StaffManagerComponent } from './staff-manager.component';
import { UpdateStaffComponent } from './update-staff/update-staff.component';
import { ViewStaffComponent } from './view-staff/view-staff.component';

const routes: Routes = [{
  path: '', component: StaffManagerComponent,
  children: [
    {
      path: '', component: ViewStaffComponent,
    },
    {
      path: 'create-staff', component: CreateStaffComponent,
    },
    {
      path: 'update-staff', component: UpdateStaffComponent,
    },
    {
      path: 'detail-staff', component: DetailStaffComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffManagerRoutingModule { }