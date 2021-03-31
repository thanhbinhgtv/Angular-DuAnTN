import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
  },
  {
    path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'client', loadChildren: () => import('./client/client.module').then(m => m.ClientModule),
  },

  { path: '**', redirectTo: 'admin' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
