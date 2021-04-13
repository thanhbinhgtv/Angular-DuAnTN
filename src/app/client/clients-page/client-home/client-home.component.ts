import { Component, OnInit } from '@angular/core';
import { ArticleManagerService } from 'src/app/admin/article-manager/article-manager.service';
import { ArticleResponseModel } from 'src/app/shared/model/responses/article-response-model';
import { ArticleService } from '../../service/article.service';

@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.component.html',
  styleUrls: ['./client-home.component.css']
})
export class ClientHomeComponent implements OnInit {
  articles: Array<ArticleResponseModel> = [];
  page = 0;

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    this.getAllArticle();
  }

  getAllArticle(){
    this.articleService.getAllArticle(this.page).subscribe((data) =>{
      this.articles = data;
    });
  }
}
