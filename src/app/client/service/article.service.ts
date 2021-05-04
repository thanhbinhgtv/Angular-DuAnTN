import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticlePostRequestModel } from 'src/app/shared/model/requests/article-post-request-model';
import { ArticlePutRequestModel } from 'src/app/shared/model/requests/article-put-request-model';
import { CommentRequestModel } from 'src/app/shared/model/requests/comment-request-model';
import { ArticleResponseModel } from 'src/app/shared/model/responses/article-response-model';
import { CommentResponseModel } from 'src/app/shared/model/responses/comment-response-model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private httpClient: HttpClient) { }

  createArticle(postArticleModel: ArticlePostRequestModel): Observable<any>{
    return this.httpClient.post('http://localhost:8080/customer/article', postArticleModel);
  }

  updateArticle(id: number ,putArticleModel: ArticlePutRequestModel): Observable<any>{
    return this.httpClient.put(`http://localhost:8080/customer/article/${id}`, putArticleModel);
  }

  //No login in Home, Aside (Vip)
  getAllArticleNoLogin(page: number): Observable<Array<ArticleResponseModel>> {
    return this.httpClient.get<Array<ArticleResponseModel>>(`http://localhost:8080/article?page=${page}&&limit=10&&vip=true`);
  }
  //No login in Home, Aside (Vip and noVip)
  getAllArticleNoLogin2(page: number): Observable<Array<ArticleResponseModel>> {
    return this.httpClient.get<Array<ArticleResponseModel>>(`http://localhost:8080/article?page=${page}&&limit=2000`);
  }
  // Rent Room
  getAllArticleNoLogin3(city: number, district: number, ward: number, minPrice: number, maxPrice: number): Observable<Array<ArticleResponseModel>> {
    return this.httpClient.get<Array<ArticleResponseModel>>
    (`http://localhost:8080/article?page=0&&limit=2000&&roommate=false&&city=${city?city:''}&&district=${district?district:''}&&ward=${ward?ward:''}&&minPrice=${minPrice?minPrice:''}&&maxPrice=${maxPrice?maxPrice:''}`);
  }
  // RoomMate
  getAllArticleNoLogin4(city: number, district: number, ward: number, minPrice: number, maxPrice: number): Observable<Array<ArticleResponseModel>> {
    return this.httpClient.get<Array<ArticleResponseModel>>
    (`http://localhost:8080/article?page=0&&limit=2000&&roommate=true&&city=${city?city:''}&&district=${district?district:''}&&ward=${ward?ward:''}&&minPrice=${minPrice?minPrice:''}&&maxPrice=${maxPrice?maxPrice:''}`);
  }
  // Detail Article NoLogin
  getAllArticleNoLoginDetail(): Observable<Array<ArticleResponseModel>> {
    return this.httpClient.get<Array<ArticleResponseModel>>(`http://localhost:8080/article?page=0&&limit=5&&vip=true`);
  }
  getArticleByIdNoLogin(id: number): Observable<ArticleResponseModel> {
    return this.httpClient.get<ArticleResponseModel>(`http://localhost:8080/article/${id}`);
  }
  
  getAllArticleCustomer(page: number): Observable<Array<ArticleResponseModel>> {
    return this.httpClient.get<Array<ArticleResponseModel>>(`http://localhost:8080/customer/article?page=${page}&&limit=10`);
  }

  getAllComment( articleId: number,page: number): Observable<CommentResponseModel> {
    return this.httpClient.get<CommentResponseModel>(`http://localhost:8080/comment/list?article-id=${articleId}&page=${page}&limit=10`);
  }

  postComment(postComment: CommentRequestModel): Observable<any>{
    return this.httpClient.post('http://localhost:8080/customer/comment/add-update', postComment);
  }

  getBuff( articleId: number, point: number): Observable<any> {
    console.log(articleId);
    console.log(point);
    return this.httpClient.get(`http://localhost:8080/customer/article/buff/${articleId}?point=${point}`);
  }
}
