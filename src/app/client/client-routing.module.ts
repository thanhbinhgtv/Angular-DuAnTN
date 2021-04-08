import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth-guard/auth.guard';
import { ClientHomeComponent } from './client-home/client-home.component';
import { ClientComponent } from './client.component';

const routes: Routes = [{
  path: '', component: ClientComponent,
  children: [
    {
      path: 'home', component: ClientHomeComponent,
    },
    {
      path: 'profile',
      loadChildren: () => import('./profiles/profiles.module')
        .then(m => m.ProfilesModule), canActivate: [AuthGuard],
    },

    { path: '**', redirectTo: 'paypal' },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
