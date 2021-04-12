import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { ClientRoommatesComponent } from './client-roommates/client-roommates.component';
import { ClientRentRoomComponent } from './client-rent-room/client-rent-room.component';

@NgModule({
  declarations: [
    ClientComponent,
    ClientRoommatesComponent,
    ClientRentRoomComponent,
  ],
  imports: [
    CommonModule,
    ClientRoutingModule
  ]
})
export class ClientModule { }
