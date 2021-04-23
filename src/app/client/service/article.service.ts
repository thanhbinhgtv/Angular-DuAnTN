import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticlePostRequestModel } from 'src/app/shared/model/requests/article-post-request-model';
import { ArticleResponseModel } from 'src/app/shared/model/responses/article-response-model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private httpClient: HttpClient) { }

  createArticle(postArticleModel: ArticlePostRequestModel): Observable<any>{
    return this.httpClient.post('http://localhost:8080/customer/article', postArticleModel);
  }

  //No login
  getAllArticleNoLogin(page: number): Observable<Array<ArticleResponseModel>> {
    return this.httpClient.get<Array<ArticleResponseModel>>(`http://localhost:8080/article?page=${page}&&limit=10`);
  }

  getAllArticleNoLogin2(page: number): Observable<Array<ArticleResponseModel>> {
    return this.httpClient.get<Array<ArticleResponseModel>>(`http://localhost:8080/article?page=${page}&&limit=20`);
  }

  getArticleByIdNoLogin(id: number): Observable<ArticleResponseModel> {
    return this.httpClient.get<ArticleResponseModel>(`http://localhost:8080/article/${id}`);
  }
  
  getAllArticleCustomer(page: number): Observable<Array<ArticleResponseModel>> {
    return this.httpClient.get<Array<ArticleResponseModel>>(`http://localhost:8080/customer/article?page=${page}&&limit=10`);
  }

}
