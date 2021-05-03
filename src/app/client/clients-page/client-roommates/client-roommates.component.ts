import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ArticleResponseModel } from 'src/app/shared/model/responses/article-response-model';
import { ArticleService } from '../../service/article.service';
import { CustomerService } from '../../service/customer.service';

@Component({
  selector: 'app-client-roommates',
  templateUrl: './client-roommates.component.html',
  styleUrls: ['./client-roommates.component.css']
})
export class ClientRoommatesComponent implements OnInit {
  article: Array<ArticleResponseModel> = [];
  page = 0;
  cityId: number
  districtId: number;
  wardId: number;
  minPrice: number;
  maxPrice: number;

  constructor(private articleService: ArticleService, private customerService: CustomerService, private toastr: ToastrService, private activateRoute: ActivatedRoute) { 
    this.activateRoute.queryParams.subscribe(params => {
      this.cityId = params['city'];
      this.districtId = params['district'];
      this.wardId = params['ward'];
      this.minPrice = params['minPrice'];
      this.maxPrice = params['maxPrice'];
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
    if(this.minPrice?.toString() === "undefined"){
      this.minPrice = null;
    }
    if(this.maxPrice?.toString() === "undefined"){
      this.maxPrice = null;
    }
    
    this.articleService.getAllArticleNoLogin4(this.cityId, this.districtId,this.wardId, this.minPrice, this.maxPrice).subscribe((data) =>{
      this.article = data;
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

}
