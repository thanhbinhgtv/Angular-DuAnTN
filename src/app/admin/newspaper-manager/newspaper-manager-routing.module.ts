import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateNewspaperComponent } from './create-newspaper/create-newspaper.component';
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
      path: 'update-newspaper', component: UpdateNewspaperComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewspaperManagerRoutingModule { }
