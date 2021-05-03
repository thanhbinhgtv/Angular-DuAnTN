import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth-guard/auth.guard';
import { ClientHomeComponent } from './clients-page/client-home/client-home.component';
import { ClientComponent } from './client.component';
import { ConfirmPaymentComponent } from './profiles/paypal/confirm-payment/confirm-payment.component';
import { AdminGuard } from '../auth/auth-guard/admin.guard';

const routes: Routes = [{
  path: '', component: ClientComponent,
  children: [
    {
      path: 'confirm-payment', component: ConfirmPaymentComponent,
    },
    {
      path: '',
      loadChildren: () => import('./clients-page/client-page.module')
        .then(m => m.ClientPageModule), canActivate: [AdminGuard],
    },
    {
      path: 'profile',
      loadChildren: () => import('./profiles/profiles.module')
        .then(m => m.ProfilesModule), canActivate: [AuthGuard, AdminGuard],
    },

    { path: '**', redirectTo: '' },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
