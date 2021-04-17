import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientPageRoutingModule } from './client-page-routing.module';
import { ClientsPageComponent } from './client-page.component';
import { ClientHomeComponent } from './client-home/client-home.component';
import { ClientRoommatesComponent } from './client-roommates/client-roommates.component';
import { ClientRentRoomComponent } from './client-rent-room/client-rent-room.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { AsideComponent } from './shared/aside/aside.component';
import { SearchbarComponent } from './shared/searchbar/searchbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DetailArticleComponent } from './detail-article/detail-article.component';
import { ClientBlockComponent } from './client-block/client-block.component';
import { ClientTutorialComponent } from './client-tutorial/client-tutorial.component';

@NgModule({
  declarations: [
    ClientsPageComponent,
    ClientHomeComponent,
    ClientRoommatesComponent,
    ClientRentRoomComponent,
    HeaderComponent,
    FooterComponent,
    AsideComponent,
    SearchbarComponent,
    DetailArticleComponent,
    ClientBlockComponent,
    ClientTutorialComponent,
  ],
  imports: [
    CommonModule,
    ClientPageRoutingModule,
    ReactiveFormsModule
  ]
})
export class ClientPageModule { }
