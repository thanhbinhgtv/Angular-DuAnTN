import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewspaperManagerRoutingModule } from './newspaper-manager-routing.module';
import { ViewNewspaperComponent } from './view-newspaper/view-newspaper.component';
import { CreateNewspaperComponent } from './create-newspaper/create-newspaper.component';
import { UpdateNewspaperComponent } from './update-newspaper/update-newspaper.component';
import { NewspaperManagerComponent } from './newspaper-manager.component';

@NgModule({
  declarations: [
    NewspaperManagerComponent,
    ViewNewspaperComponent, 
    CreateNewspaperComponent, 
    UpdateNewspaperComponent
  ],
  imports: [
    CommonModule,
    NewspaperManagerRoutingModule
  ]
})
export class NewspaperManagerModule { }
