import { Component, OnInit } from '@angular/core';
import { ArticleResponseModel } from '../model/responses/article-response-model';
import { ArticleManagerService } from '../../admin/article-manager/article-manager.service'

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  articles: Array<ArticleResponseModel> = [];
  page: number = 0;

  // key: string = 'name'; //set default
  // reverse: boolean = false;

  // sort(key){
  //   this.key = key;
  //   this.reverse = !this.reverse;
  // }

  constructor( private articleService: ArticleManagerService) { }

  ngOnInit(): void {
    this.getAllArticle();
  }

  getAllArticle(){
    this.articleService.getAllArticle(this.page).subscribe((data) =>{
      this.articles = data;
      console.log(data);
    });
  }

  handlePageChange(event) {
    this.page = event;
    this.getAllArticle();
    // this.retrieveTutorials();
  }
}
