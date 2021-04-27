import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleResponseModel } from 'src/app/shared/model/responses/article-response-model';
import { GoogleMapApiResponse } from 'src/app/shared/model/responses/google-map-api-response';
import { ArticleService } from '../../service/article.service';

@Component({
  selector: 'app-detail-article',
  templateUrl: './detail-article.component.html',
  styleUrls: ['./detail-article.component.css']
})
export class DetailArticleComponent implements OnInit {
  article: ArticleResponseModel;
  articleId: number;

  latitude: number = 21.028511;
  longitude: number = 105.804817;

  constructor(private articleService: ArticleService, private activateRoute: ActivatedRoute, private httpClient: HttpClient) { 
    this.articleId = this.activateRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.getAllArticleNoLogin();
    
  }

  getAllArticleNoLogin(){
    this.articleService.getArticleByIdNoLogin(this.articleId).subscribe((data) =>{
        let convertData:any = data;
        let convertImage = data.image.split(",");
        convertData.image = convertImage;
        
        this.article = convertData;
        // this.loadMap();
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
