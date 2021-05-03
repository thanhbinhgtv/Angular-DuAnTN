import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ArticleResponseModel } from 'src/app/shared/model/responses/article-response-model';
import { ArticleService } from '../../service/article.service';
import { CustomerService } from '../../service/customer.service';

@Component({
  selector: 'app-client-rent-room',
  templateUrl: './client-rent-room.component.html',
  styleUrls: ['./client-rent-room.component.css']
})
export class ClientRentRoomComponent implements OnInit {
  article: Array<ArticleResponseModel> = [];
  page = 0;
  arrayPage = new Array();
  numberPage: number;
  cityId: number
  districtId: number;
  wardId: number;

  constructor(private articleService: ArticleService, private customerService: CustomerService, private toastr: ToastrService, private activateRoute: ActivatedRoute) { 
    this.activateRoute.queryParams.subscribe(params => {
      this.cityId = params['city'];
      this.districtId = params['district'];
      this.wardId = params['ward'];
    });
  }

  ngOnInit(): void {
    this.getAllArticleNoLogin();
  }

  getAllArticleNoLogin(){
    if(this.cityId?.toString() === "undefined"){
        this.cityId = null;
    }
    if(this.districtId?.toString() === "undefined"){
      this.districtId = null;
    }
    if(this.wardId?.toString() === "undefined"){
      this.wardId = null;
    }
    
    this.articleService.getAllArticleNoLogin3(this.page, this.cityId, this.districtId,this.wardId).subscribe((data) =>{
      this.article = data;
      
      this.numberPage = data[0].pages;
      this.arrayPage = Array(this.numberPage).fill(0).map((x,i)=>i);
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

  onPage(page: number) {
    this.page = page;
    this.getAllArticleNoLogin();
  }

}
