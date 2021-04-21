import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/client/service/article.service';
import { NewpaperService } from 'src/app/client/service/newpaper.service';
import { ArticleResponseModel } from 'src/app/shared/model/responses/article-response-model';
import { NewsPaperResponseModel } from 'src/app/shared/model/responses/newspaper-response-model';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {
  page = 0;
  articles: Array<ArticleResponseModel> = [];
  newpapers : Array<NewsPaperResponseModel> = [];

  constructor(private articleService: ArticleService, private newpaperService: NewpaperService) { }

  ngOnInit(): void {
      this.getAllArticleNoLogin();
      this.getAllNewpaperNoLogin();
  }

  getAllArticleNoLogin(){
    this.articleService.getAllArticleNoLogin(this.page).subscribe((data) =>{
        this.articles = data;
    });
  }

  getAllNewpaperNoLogin(){
      this.newpaperService.getAllNewpaperNoLogin(this.page).subscribe(data => {
          this.newpapers = data;
      })
  }
}
