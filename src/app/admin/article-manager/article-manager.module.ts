import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleManagerRoutingModule } from './article-manager-routing.module';
import { ArticleManagerComponent } from './article-manager.component';
import { CreateArticleComponent } from './create-article/create-article.component';
import { ViewArticleComponent } from './view-article/view-article.component';
import { DetailArticleComponent } from './detail-article/detail-article.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { AgmCoreModule } from '@agm/core';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    ArticleManagerComponent,
    CreateArticleComponent,
    ViewArticleComponent,
    DetailArticleComponent
  ],
  imports: [
    CommonModule,
    ArticleManagerRoutingModule,
    ReactiveFormsModule,
    MatSliderModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyDKZ5wTHBFxhvaU2_82x-QiFllwf0fOnB0",
    }),
    NgxPaginationModule
  ]
})
export class ArticleManagerModule { }
