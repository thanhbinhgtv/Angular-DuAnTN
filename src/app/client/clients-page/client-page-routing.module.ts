import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientHomeComponent } from './client-home/client-home.component';
import { ClientRentRoomComponent } from './client-rent-room/client-rent-room.component';
import { ClientRoommatesComponent } from './client-roommates/client-roommates.component';
import { ClientsPageComponent } from './client-page.component';
import { DetailArticleComponent } from './detail-article/detail-article.component';

const routes: Routes = [{
  path: '', component: ClientsPageComponent,
  children: [
    {
      path: 'home', component: ClientHomeComponent,
    },
    {
      path: 'room-mates', component: ClientRoommatesComponent,
    },
    {
      path: 'rent-room', component: ClientRentRoomComponent,
    },
    {
      path: 'detail-article', component: DetailArticleComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientPageRoutingModule { }
