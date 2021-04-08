import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleManagerComponent } from './article-manager/article-manager.component';
import { CreateArticleComponent } from './create-article/create-article.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { PaymentHistoryComponent } from './payment-history/payment-history.component';
import { ViewHandlePaypalComponent } from './paypal/handle-paypal/view-handle-paypal.component';
import { PriceListComponent } from './price-list/price-list.component';
import { ProfilesComponent } from './profiles.component';
import { RechargeHistoryComponent } from './recharge-history/recharge-history.component';

const routes: Routes = [{
  path: '', component: ProfilesComponent,
  children: [
    {
      path: 'edit-profile', component: EditProfileComponent,
    },
    {
      path: 'paypal-handle', component: ViewHandlePaypalComponent,
    },

    {
      path: 'article-manager', component: ArticleManagerComponent,
    },
    {
      path: 'payment-history', component: PaymentHistoryComponent,
    },
    {
      path: 'recharge-history', component: RechargeHistoryComponent,
    },
    {
      path: 'create-article', component: CreateArticleComponent,
    },
    {
      path: 'price-list', component: PriceListComponent,
    },

    { path: '**', redirectTo: 'paypal/handle' },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfilesRoutingModule { }
