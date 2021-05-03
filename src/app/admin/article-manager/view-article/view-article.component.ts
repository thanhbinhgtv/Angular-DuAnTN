import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ArticleManagerService } from '../article-manager.service';
import { ArticleResponseModel } from '../../../shared/model/responses/article-response-model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-view-article',
  templateUrl: './view-article.component.html',
  styleUrls: ['./view-article.component.css']
})
export class ViewArticleComponent implements OnInit {
  article: Array<ArticleResponseModel> = [];
  page = 0;
  status: string = '';
  search: string = '';
  searchForm = new FormControl('');
  statusForm = new FormControl('');
  constructor(private articleService: ArticleManagerService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllArticle();
  }

  getAllArticle(){
    this.articleService.getAllArticle(this.status, this.search).subscribe((data) =>{
      this.article = data;
    });
  }

  Search(){
    this.status = this.statusForm.value;
    this.search = this.searchForm.value;
    this.getAllArticle();
  }

}
