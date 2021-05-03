import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ArticleResponseModel } from 'src/app/shared/model/responses/article-response-model';
import { ArticleService } from '../../service/article.service';
import { CustomerService } from '../../service/customer.service';

@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.component.html',
  styleUrls: ['./client-home.component.css']
})
export class ClientHomeComponent implements OnInit {
  articleVip: Array<ArticleResponseModel> = [];
  articleNoVip: Array<ArticleResponseModel> = [];
  page = 0;
  arrayPage = new Array();
  numberPage: number;

  constructor(private articleService: ArticleService, private customerService: CustomerService, private toastr: ToastrService) { }

  ngOnInit(): void {
      this.getAllArticleNoLogin();
      this.getAllArticleNoLogin2();
  }

  getAllArticleNoLogin(){
      this.articleService.getAllArticleNoLogin(this.page).subscribe((data) =>{
        this.articleVip = data;
      });
  }

  onFavorite(article: any){
      this.customerService.getFavorite(article.articleId).subscribe(data => {
        article.liked = article.liked? false:true;
        if(article.liked == true){
          article.countLike = article.countLike+1;
        }
        if(article.liked == false){
          article.countLike = article.countLike-1;
        }
        this.toastr.info(data.mess);
      });
  }

  getAllArticleNoLogin2(){
    this.articleService.getAllArticleNoLogin2(this.page).subscribe((data) =>{
      this.articleNoVip = data;
      // console.log(Math.round(3145000/100000)/10.0);
      
      this.numberPage = data[0].pages;
      this.arrayPage = Array(this.numberPage).fill(0).map((x,i)=>i);
    });
  }

  onPage(page: number) {
    this.page = page;
    this.getAllArticleNoLogin2();
  }

}
