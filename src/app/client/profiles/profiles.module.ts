import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfilesRoutingModule } from './profiles-routing.module';
import { ArticleManagerComponent } from './article-manager/article-manager.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { ProfilesComponent } from './profiles.component';
import { HandlePaypalComponent } from './paypal/handle-paypal/handle-paypal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { PaymentHistoryComponent } from './payment-history/payment-history.component';
import { RechargeHistoryComponent } from './recharge-history/recharge-history.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { CreateArticleComponent } from './create-article/create-article.component';
import { PriceListComponent } from './price-list/price-list.component';
import { ViewPaypalComponent } from './paypal/view-paypal/view-paypal.component';
import { ConfirmPaymentComponent } from './paypal/confirm-payment/confirm-payment.component';
import { FavoritesArticleComponent } from './favorites-article/favorites-article.component';
import { AgmCoreModule } from '@agm/core';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    ProfilesComponent,
    HandlePaypalComponent,
    ArticleManagerComponent,
    PaymentHistoryComponent,
    RechargeHistoryComponent,
    EditProfileComponent,
    CreateArticleComponent,
    PriceListComponent,
    ViewPaypalComponent,
    ConfirmPaymentComponent,
    FavoritesArticleComponent,
  ],
  imports: [
    CommonModule,
    ProfilesRoutingModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyDKZ5wTHBFxhvaU2_82x-QiFllwf0fOnB0",
    }),
    CKEditorModule,
  ]
})
export class ProfilesModule { }
