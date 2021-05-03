import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticleResponseModel } from '../../shared/model/responses/article-response-model';

@Injectable({
  providedIn: 'root'
})
export class ArticleManagerService {

  constructor(private httpClient: HttpClient) { }

  getAllArticle(status: string): Observable<Array<ArticleResponseModel>> {
    return this.httpClient.get<Array<ArticleResponseModel>>(`http://localhost:8080/admin/article?page=0&&limit=1000&&status=${status?status:''}`);
  }

  getArticleById(id: number): Observable<ArticleResponseModel> {
    return this.httpClient.get<ArticleResponseModel>('http://localhost:8080/admin/article/' +id);
  }

  getActive(id: number): Observable<any> {
    return this.httpClient.get('http://localhost:8080/admin/article/active/' +id);
  }

  getHidden(id: number): Observable<any> {
    return this.httpClient.post(`http://localhost:8080/admin/article/hidden/${id}`, "Ok");
  }

  postSuggestFix(id: number): Observable<any> {
    return this.httpClient.post(`http://localhost:8080/admin/article/suggest-fix/${id}`, "Ok");
  }

}
