import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [{
  path: '', component: AdminComponent,
  children: [
    {
      path: 'home', component: HomeComponent,
    },
    {
      path: 'staff',
      loadChildren: () => import('./staff-manager/staff-manager.module')
        .then(m => m.StaffManagerModule),
    },
    { path: '**', redirectTo: 'home' },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule { }