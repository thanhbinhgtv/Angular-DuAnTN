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
  articles: Array<ArticleResponseModel> = [];
  page = 0;

  constructor(private articleService: ArticleService, private customerService: CustomerService, private toastr: ToastrService) { }

  ngOnInit(): void {
      this.getAllArticleNoLogin();
  }

  getAllArticleNoLogin(){
      this.articleService.getAllArticleNoLogin(this.page).subscribe((data) =>{
        this.articles = data;
      });
  }

  onFavorite(id: number){
      this.customerService.getFavorite(id).subscribe(data => {
        this.toastr.success(data.mess);
      });
  }

  // getAllArticleNoLogin2(){
  //   this.articleService.getAllArticleNoLogin2(this.page).subscribe((data) =>{
  //     this.articles = data;
  //   });
  // }
}
