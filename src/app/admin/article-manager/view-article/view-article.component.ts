import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ArticleManagerService } from '../article-manager.service';
import { ArticleResponseModel } from './article-response-model';

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
    this.getAllStaff();
  }

  getAllStaff(){
    this.articleService.getAllArticle(this.page).subscribe((data) =>{
      console.log(data);
      this.article = data;
    });
  }
}
