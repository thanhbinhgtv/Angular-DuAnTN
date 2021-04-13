import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientPageRoutingModule } from './client-page-routing.module';
import { ClientsPageComponent } from './client-page.component';
import { ClientHomeComponent } from './client-home/client-home.component';
import { ClientRoommatesComponent } from './client-roommates/client-roommates.component';
import { ClientRentRoomComponent } from './client-rent-room/client-rent-room.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';


@NgModule({
  declarations: [
    ClientsPageComponent,
    ClientHomeComponent,
    ClientRoommatesComponent,
    ClientRentRoomComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    ClientPageRoutingModule
  ]
})
export class ClientPageModule { }
