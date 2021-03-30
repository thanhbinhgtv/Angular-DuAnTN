import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateNewspaperComponent } from './create-newspaper/create-newspaper.component';
import { DetailNewspaperComponent } from './detail-newspaper/detail-newspaper.component';
import { NewspaperManagerComponent } from './newspaper-manager.component';
import { UpdateNewspaperComponent } from './update-newspaper/update-newspaper.component';
import { ViewNewspaperComponent } from './view-newspaper/view-newspaper.component';

const routes: Routes = [{
  path: '', component: NewspaperManagerComponent,
  children: [
    {
      path: '', component: ViewNewspaperComponent,
    },
    {
      path: 'create-newspaper', component: CreateNewspaperComponent,
    },
    {
      path: 'update-newspaper/:id', component: UpdateNewspaperComponent,
    },
    {
      path: 'detail-newspaper/:id', component: DetailNewspaperComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewspaperManagerRoutingModule { }
