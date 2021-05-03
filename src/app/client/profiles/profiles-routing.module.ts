import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleManagerComponent } from './article-manager/article-manager.component';
import { CreateArticleComponent } from './create-article/create-article.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { FavoritesArticleComponent } from './favorites-article/favorites-article.component';
import { PaymentHistoryComponent } from './payment-history/payment-history.component';
import { HandlePaypalComponent } from './paypal/handle-paypal/handle-paypal.component';
import { ViewPaypalComponent } from './paypal/view-paypal/view-paypal.component';
import { PriceListComponent } from './price-list/price-list.component';
import { ProfilesComponent } from './profiles.component';
import { RechargeHistoryComponent } from './recharge-history/recharge-history.component';
import { UpdateArticleComponent } from './update-article/update-article.component';

const routes: Routes = [{
  path: '', component: ProfilesComponent,
  children: [
    {
      path: 'edit-profile', component: EditProfileComponent,
    },
    {
      path: 'paypal-view', component: ViewPaypalComponent,
    },
    {
      path: 'paypal-handle', component: HandlePaypalComponent,
    },
    {
      path: 'article-manager', component: ArticleManagerComponent,
    },
    {
      path: 'favorite-article', component: FavoritesArticleComponent,
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
      path: 'update-article/:id', component: UpdateArticleComponent,
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
