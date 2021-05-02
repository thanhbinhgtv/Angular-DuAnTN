import { Component, OnInit } from '@angular/core';
import { ArticleResponseModel } from 'src/app/shared/model/responses/article-response-model';
import { ArticleService } from '../../service/article.service';

@Component({
  selector: 'app-article-manager',
  templateUrl: './article-manager.component.html',
  styleUrls: ['./article-manager.component.css']
})
export class ArticleManagerComponent implements OnInit {
  articles: Array<ArticleResponseModel> = [];
  page = 0;
  arrayPage = new Array();
  numberPage: number;

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
      this.getAllArticleCustomer();
  }

  getAllArticleCustomer(){
      this.articleService.getAllArticleCustomer(this.page).subscribe(data => {
          this.articles = data;
          
          this.numberPage = data[0].pages;
          this.arrayPage = Array(this.numberPage).fill(0).map((x,i)=>i);
      })
  }

  onPage(page: number) {
    this.page = page;
    this.getAllArticleCustomer();
  }

}
