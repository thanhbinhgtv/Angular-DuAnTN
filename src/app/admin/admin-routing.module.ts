import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth-guard/auth.guard';
import { AdminProfilesComponent } from './admin-profiles/admin-profiles.component';
import { AdminComponent } from './admin.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [{
  path: '', component: AdminComponent,
  children: [
    {
      path: 'home', component: HomeComponent,
    },
    {
      path: 'profile', component: AdminProfilesComponent,
    },
    {
      path: 'staff',
      loadChildren: () => import('./staff-manager/staff-manager.module')
        .then(m => m.StaffManagerModule), canActivate: [AuthGuard],
    },
    {
      path: 'article',
      loadChildren: () => import('./article-manager/article-manager.module')
        .then(m => m.ArticleManagerModule), canActivate: [AuthGuard],
    },
    {
      path: 'customer',
      loadChildren: () => import('./customer-manager/customer-manager.module')
        .then(m => m.CustomerManagerModule), canActivate: [AuthGuard],
    },
    {
      path: 'newspaper',
      loadChildren: () => import('./newspaper-manager/newspaper-manager.module')
        .then(m => m.NewspaperManagerModule), canActivate: [AuthGuard],
    },
    {
      path: 'statistical',
      loadChildren: () => import('./statistical/statistical.module')
        .then(m => m.StatisticalModule), canActivate: [AuthGuard],
    },

    { path: '**', redirectTo: 'home' },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule { }