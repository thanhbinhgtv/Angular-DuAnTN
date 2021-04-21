import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleResponseModel } from 'src/app/shared/model/responses/article-response-model';
import { ArticleService } from '../../service/article.service';

@Component({
  selector: 'app-detail-article',
  templateUrl: './detail-article.component.html',
  styleUrls: ['./detail-article.component.css']
})
export class DetailArticleComponent implements OnInit {
  article: ArticleResponseModel;
  articleId: number;

  constructor(private articleService: ArticleService, private activateRoute: ActivatedRoute) { 
    this.articleId = this.activateRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.getAllArticleNoLogin();
  }

  getAllArticleNoLogin(){
    this.articleService.getArticleByIdNoLogin(this.articleId).subscribe((data) =>{
        let convertData:any = data;
        let convertImage = data.image.split(",");
        convertData.image = convertImage;
      
        this.article = convertData;
    });
  }
}
