import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommentRequestModel } from 'src/app/shared/model/requests/comment-request-model';
import { ArticleResponseModel } from 'src/app/shared/model/responses/article-response-model';
import { CommentResponseModel } from 'src/app/shared/model/responses/comment-response-model';
import { GoogleMapApiResponse } from 'src/app/shared/model/responses/google-map-api-response';
import { ArticleService } from '../../service/article.service';
import { CustomerService } from '../../service/customer.service';

@Component({
  selector: 'app-detail-article',
  templateUrl: './detail-article.component.html',
  styleUrls: ['./detail-article.component.css']
})
export class DetailArticleComponent implements OnInit {
  article: ArticleResponseModel;
  articleVip: Array<ArticleResponseModel> = [];
  comments:  CommentResponseModel;
  commentModel: CommentRequestModel;
  commentForm: FormGroup;
  articleId: number;
  isloading: boolean = false;

  latitude: number = 21.028511;
  longitude: number = 105.804817;

  constructor(private articleService: ArticleService, private activateRoute: ActivatedRoute,
     private httpClient: HttpClient, private toastr: ToastrService, private customerService: CustomerService) { 

    this.articleId = this.activateRoute.snapshot.params.id;
    this.commentModel = {} as CommentRequestModel;
  }

  ngOnInit(): void {
    this.getAllArticleNoLogin();
    this.getAllArticleNoLogin2();
    this.getListComment();

    this.commentForm = new FormGroup({
      star: new FormControl("",[Validators.required, Validators.min(1), Validators.max(5)]),
      comment: new FormControl(""),
    });
  }

  getAllArticleNoLogin(){
    this.articleService.getArticleByIdNoLogin(this.articleId).subscribe((data) =>{
        let convertData:any = data;
        let convertImage = data.image.split(",");
        convertData.image = convertImage;
        
        this.article = convertData;
        this.loadMap();
    });
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

  postComment(){
    this.isloading = true;
    this.commentModel.articleId = this.articleId;
    this.commentModel.start = this.commentForm.get('star').value;
    this.commentModel.comment = this.commentForm.get('comment').value;

    this.articleService.postComment(this.commentModel).subscribe((data) => {
      this.toastr.success("Cảm ơn bạn đã đánh giá bài viết này");
      this.commentForm.get('comment').setValue('');
      this.getListComment();
      this.isloading = false;
    }, error =>{
      this.toastr.error(error.error.mess);
    })
  }

  getListComment(){
    this.articleService.getAllComment(this.articleId, 0).subscribe((data) => {
        this.comments = data;
        console.log(data);
        
    })
  }

  loadMap(){
      this.httpClient.get<GoogleMapApiResponse>(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.article.location.wardName}, ${this.article.location.districtName}, ${this.article.location.cityName}&key=${"AIzaSyDKZ5wTHBFxhvaU2_82x-QiFllwf0fOnB0"}`).subscribe(data => {
          console.log(data);
          this.latitude = data.results[0].geometry.location.lat;
          this.longitude = data.results[0].geometry.location.lng;
          console.log(data.results[0].geometry.location.lat);
      });
  }

}
