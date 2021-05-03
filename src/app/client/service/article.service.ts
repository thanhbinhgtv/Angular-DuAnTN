import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticlePostRequestModel } from 'src/app/shared/model/requests/article-post-request-model';
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

  //No login in Home, Aside (Vip)
  getAllArticleNoLogin(page: number): Observable<Array<ArticleResponseModel>> {
    return this.httpClient.get<Array<ArticleResponseModel>>(`http://localhost:8080/article?page=${page}&&limit=10&&vip=true`);
  }
  //No login in Home, Aside (Vip and noVip)
  getAllArticleNoLogin2(page: number): Observable<Array<ArticleResponseModel>> {
    return this.httpClient.get<Array<ArticleResponseModel>>(`http://localhost:8080/article?page=${page}&&limit=20`);
  }
  // Rent Room
  getAllArticleNoLogin3(page: number, city: number, district: number, ward: number, minPrice: number, maxPrice: number): Observable<Array<ArticleResponseModel>> {
    return this.httpClient.get<Array<ArticleResponseModel>>
    (`http://localhost:8080/article?page=${page}&&limit=10&&roommate=false&&city=${city?city:''}&&district=${district?district:''}&&ward=${ward?ward:''}&&minPrice=${minPrice?minPrice:''}&&maxPrice=${maxPrice?maxPrice:''}`);
  }
  // RoomMate
  getAllArticleNoLogin4(page: number, city: number, district: number, ward: number): Observable<Array<ArticleResponseModel>> {
    return this.httpClient.get<Array<ArticleResponseModel>>
    (`http://localhost:8080/article?page=${page}&&limit=10&&roommate=true&&city=${city?city:''}&&district=${district?district:''}&&ward=${ward?ward:''}`);
  }

  getArticleByIdNoLogin(id: number): Observable<ArticleResponseModel> {
    return this.httpClient.get<ArticleResponseModel>(`http://localhost:8080/article/${id}`);
  }
  
  getAllArticleCustomer(page: number): Observable<Array<ArticleResponseModel>> {
    return this.httpClient.get<Array<ArticleResponseModel>>(`http://localhost:8080/customer/article?page=${page}&&limit=10`);
  }

  getAllComment( articleId: number,page: number): Observable<CommentResponseModel> {
    return this.httpClient.get<CommentResponseModel>(`http://localhost:8080/comment/list?article-id=15&page=${page}&limit=10`);
  }

  postComment(postComment: CommentRequestModel): Observable<any>{
    return this.httpClient.post('http://localhost:8080/customer/comment/add-update', postComment);
  }

}
