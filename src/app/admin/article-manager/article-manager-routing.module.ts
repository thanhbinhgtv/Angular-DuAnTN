import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleManagerComponent } from './article-manager.component';
import { CreateArticleComponent } from './create-article/create-article.component';
import { DetailArticleComponent } from './detail-article/detail-article.component';
import { ViewArticleComponent } from './view-article/view-article.component';

const routes: Routes = [{
  path: '', component: ArticleManagerComponent,
  children: [
    {
      path: '', component: ViewArticleComponent,
    },
    {
      path: 'create-article', component: CreateArticleComponent,
    },
    {
      path: 'detail-article/:id', component: DetailArticleComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleManagerRoutingModule { }
