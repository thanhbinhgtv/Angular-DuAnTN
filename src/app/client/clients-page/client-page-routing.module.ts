import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientHomeComponent } from './client-home/client-home.component';
import { ClientRentRoomComponent } from './client-rent-room/client-rent-room.component';
import { ClientRoommatesComponent } from './client-roommates/client-roommates.component';
import { ClientsPageComponent } from './client-page.component';
import { DetailArticleComponent } from './detail-article/detail-article.component';
import { ClientBlogComponent } from './client-blog/client-blog.component';
import { ClientTutorialComponent } from './client-tutorial/client-tutorial.component';
import { DetailNewpaperComponent } from './detail-newpaper/detail-newpaper.component';

const routes: Routes = [{
  path: '', component: ClientsPageComponent,
  children: [
    {
      path: 'home', component: ClientHomeComponent,
    },
    {
      path: '', component: ClientHomeComponent,
    },
    {
      path: 'room-mates', component: ClientRoommatesComponent,
    },
    {
      path: 'rent-room', component: ClientRentRoomComponent,
    },
    {
      path: 'detail-article/:id', component: DetailArticleComponent,
    },
    {
      path: 'detail-newpaper', component: DetailNewpaperComponent,
    },
    {
      path: 'blog', component: ClientBlogComponent,
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
