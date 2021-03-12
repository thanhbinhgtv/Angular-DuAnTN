import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'admin', loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule),
  },
  {
     path: '**', redirectTo: 'admin' ,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
