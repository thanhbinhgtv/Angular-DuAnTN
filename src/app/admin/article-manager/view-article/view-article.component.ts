import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ArticleManagerService } from '../article-manager.service';
import { ArticleResponseModel } from '../../../shared/model/responses/article-response-model';

@Component({
  selector: 'app-view-article',
  templateUrl: './view-article.component.html',
  styleUrls: ['./view-article.component.css']
})
export class ViewArticleComponent implements OnInit {
  article: Array<ArticleResponseModel> = [];
  page = 0;

  constructor(private articleService: ArticleManagerService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllArticle();
  }

  getAllArticle(){
    this.articleService.getAllArticle(this.page).subscribe((data) =>{
      this.article = data;
    });
  }

  onPage(page: number){
    this.page = page;
    this.getAllArticle();
 }
}
