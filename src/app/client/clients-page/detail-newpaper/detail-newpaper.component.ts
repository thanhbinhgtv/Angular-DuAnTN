import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ArticleResponseModel } from 'src/app/shared/model/responses/article-response-model';
import { NewsPaperResponseModel } from 'src/app/shared/model/responses/newspaper-response-model';
import { ArticleService } from '../../service/article.service';
import { CustomerService } from '../../service/customer.service';
import { NewpaperService } from '../../service/newpaper.service';

@Component({
  selector: 'app-detail-newpaper',
  templateUrl: './detail-newpaper.component.html',
  styleUrls: ['./detail-newpaper.component.css']
})
export class DetailNewpaperComponent implements OnInit {
  newPaperId: number
  new : NewsPaperResponseModel;
  articleVip: Array<ArticleResponseModel> = [];

  constructor(private articleService: ArticleService, private newspaperService: NewpaperService,
     private activateRoute: ActivatedRoute, private customerService: CustomerService, private toastr: ToastrService) { 
      this.newPaperId = this.activateRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.getNewpaperById();
    this.getAllArticleNoLogin2();
  }

  getNewpaperById(){
    this.newspaperService.getNewpaperByIdNoLogin(this.newPaperId).subscribe((data) => {
        this.new = data;
    })
  }

  // Tin Vip
  getAllArticleNoLogin2(){
    this.articleService.getAllArticleNoLoginDetail().subscribe((data) =>{
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

}
