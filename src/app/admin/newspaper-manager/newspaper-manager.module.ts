import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewspaperManagerRoutingModule } from './newspaper-manager-routing.module';
import { ViewNewspaperComponent } from './view-newspaper/view-newspaper.component';
import { CreateNewspaperComponent } from './create-newspaper/create-newspaper.component';
import { UpdateNewspaperComponent } from './update-newspaper/update-newspaper.component';
import { NewspaperManagerComponent } from './newspaper-manager.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DetailNewspaperComponent } from './detail-newspaper/detail-newspaper.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    NewspaperManagerComponent,
    ViewNewspaperComponent, 
    CreateNewspaperComponent, 
    UpdateNewspaperComponent, 
    DetailNewspaperComponent
  ],
  imports: [
    CommonModule,
    NewspaperManagerRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class NewspaperManagerModule { }
