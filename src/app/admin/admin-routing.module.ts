import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { HomeComponent } from './home/home.component';
import { ViewStaffComponent } from './staff-manager/view-staff/view-staff.component';

const routes: Routes = [{
  path: '', component: AdminComponent,
  children: [
    {
      path: 'home-admin', component: HomeComponent,
    },
    {
      path: 'view-staff', component: ViewStaffComponent,
    },
    
    { path: '**', redirectTo: 'home-admin' },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule { }