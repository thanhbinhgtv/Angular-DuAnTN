import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfilesRoutingModule } from './profiles-routing.module';
import { ArticleManagerComponent } from './article-manager/article-manager.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { ProfilesComponent } from './profiles.component';
import { ViewHandlePaypalComponent } from './paypal/handle-paypal/view-handle-paypal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { PaymentHistoryComponent } from './payment-history/payment-history.component';
import { RechargeHistoryComponent } from './recharge-history/recharge-history.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { CreateArticleComponent } from './create-article/create-article.component';
import { PriceListComponent } from './price-list/price-list.component';


@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    ProfilesComponent,
    ViewHandlePaypalComponent,
    ArticleManagerComponent,
    PaymentHistoryComponent,
    RechargeHistoryComponent,
    EditProfileComponent,
    CreateArticleComponent,
    PriceListComponent,
  ],
  imports: [
    CommonModule,
    ProfilesRoutingModule,
    ReactiveFormsModule
  ]
})
export class ProfilesModule { }
