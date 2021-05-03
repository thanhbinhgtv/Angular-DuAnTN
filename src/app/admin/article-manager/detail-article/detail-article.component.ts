import { Component, OnInit } from '@angular/core';
import {FormControl,  FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ArticleManagerService } from '../article-manager.service';
import { ArticleResponseModel } from '../../../shared/model/responses/article-response-model';
import { GoogleMapApiResponse } from 'src/app/shared/model/responses/google-map-api-response';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-detail-article',
  templateUrl: './detail-article.component.html',
  styleUrls: ['./detail-article.component.css']
})
export class DetailArticleComponent implements OnInit {
  articleForm: FormGroup;
  articleId: number;
  article: ArticleResponseModel;

  latitude: number = 21.028511;
  longitude: number = 105.804817;
  isLoading: boolean = false;
  
  constructor(private ArticleService: ArticleManagerService, private activateRoute: ActivatedRoute,
     private router: Router, private toastr: ToastrService, private httpClient: HttpClient) {
    this.articleId = this.activateRoute.snapshot.params.id;
   }

   ngOnInit(): void {
    this.getStaffById();

    this.articleForm = new FormGroup({
      articleId: new FormControl({value:"", disabled:true}),
      title: new FormControl({value:"", disabled:true}),
      content: new FormControl({value:"", disabled:true}),
      customerId: new FormControl({value:"", disabled:true}),
      description: new FormControl({value:"", disabled:true}),
    });
  }

  getStaffById(){
    this.ArticleService.getArticleById(this.articleId).subscribe((data) => {
        let convertData:any = data;
        let convertImage = data.image.split(",");
        convertData.image = convertImage;
        
        this.articleForm.patchValue(data);
        this.article = convertData;
        console.log(this.article);

        // this.loadMap();
    });
  }

  active(){
    this.isLoading = true;
    this.ArticleService.getActive(this.articleId).subscribe((data) => {
      this.isLoading = false;
      this.toastr.success(data.mess);
      this.router.navigate(['/admin/article']);
    }, (error) => {
      this.isLoading = false;
      this.toastr.error(error.error.mess);
    });
  }

  hidden(){
    this.isLoading = true;
    this.ArticleService.getHidden(this.articleId).subscribe((data) => {
      this.isLoading = false;
      this.toastr.success(data.mess);
      this.router.navigate(['/admin/article']);
    }, (error) => {
      this.isLoading = false;
      this.toastr.error(error.error.mess);
    });
  }

  suggestFix(){
    this.isLoading = true;
    this.ArticleService.postSuggestFix(this.articleId).subscribe((data) => {
      this.isLoading = false;
      this.toastr.success(data.mess);
      this.router.navigate(['/admin/article']);
    }, (error) => {
      this.isLoading = false;
      this.toastr.error(error.error.mess);
    });
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
