import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleManagerRoutingModule } from './article-manager-routing.module';
import { ArticleManagerComponent } from './article-manager.component';
import { CreateArticleComponent } from './create-article/create-article.component';
import { UpdateArticleComponent } from './update-article/update-article.component';
import { ViewArticleComponent } from './view-article/view-article.component';

@NgModule({
  declarations: [
    ArticleManagerComponent,
    CreateArticleComponent,
    UpdateArticleComponent,
    ViewArticleComponent
  ],
  imports: [
    CommonModule,
    ArticleManagerRoutingModule
  ]
})
export class ArticleManagerModule { }
