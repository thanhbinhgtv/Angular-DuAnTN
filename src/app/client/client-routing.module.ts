import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth-guard/auth.guard';
import { ClientComponent } from './client.component';

const routes: Routes = [{
  path: '', component: ClientComponent,
  children: [
    // {
    //   path: 'home', component: HomeComponent,
    // },
    {
      path: 'paypal',
      loadChildren: () => import('./paypal/paypal.module')
        .then(m => m.PaypalModule), canActivate: [AuthGuard],
    },

    { path: '**', redirectTo: 'paypal' },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
