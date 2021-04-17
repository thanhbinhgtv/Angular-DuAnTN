import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientHomeComponent } from './client-home/client-home.component';
import { ClientRentRoomComponent } from './client-rent-room/client-rent-room.component';
import { ClientRoommatesComponent } from './client-roommates/client-roommates.component';
import { ClientsPageComponent } from './client-page.component';
import { DetailArticleComponent } from './detail-article/detail-article.component';
import { ClientBlockComponent } from './client-block/client-block.component';
import { ClientTutorialComponent } from './client-tutorial/client-tutorial.component';

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
    {
      path: 'block', component: ClientBlockComponent,
    },
    {
      path: 'tutorial', component: ClientTutorialComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientPageRoutingModule { }
