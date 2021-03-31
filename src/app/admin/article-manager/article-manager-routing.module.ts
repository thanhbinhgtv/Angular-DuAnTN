import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleManagerComponent } from './article-manager.component';
import { CreateArticleComponent } from './create-article/create-article.component';
import { DetailArticleComponent } from './detail-article/detail-article.component';
import { UpdateArticleComponent } from './update-article/update-article.component';
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
      path: 'update-article/:id', component: UpdateArticleComponent,
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
