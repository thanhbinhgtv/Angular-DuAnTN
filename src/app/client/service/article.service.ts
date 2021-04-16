import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticleResponseModel } from 'src/app/shared/model/responses/article-response-model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private httpClient: HttpClient) { }

  //No login
  getAllArticleNoLogin(page: number): Observable<Array<ArticleResponseModel>> {
    return this.httpClient.get<Array<ArticleResponseModel>>(`http://localhost:8080/article?page=${page}&&limit=10`);
  }
  
  getAllArticleCustomer(page: number): Observable<Array<ArticleResponseModel>> {
    return this.httpClient.get<Array<ArticleResponseModel>>(`http://localhost:8080/customer/article?page=${page}&&limit=10`);
  }

}
