import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticleResponseModel } from './view-article/article-response-model';

@Injectable({
  providedIn: 'root'
})
export class ArticleManagerService {

  constructor(private httpClient: HttpClient) { }

  getAllArticle(page: number): Observable<Array<ArticleResponseModel>> {
    return this.httpClient.get<Array<ArticleResponseModel>>(`http://localhost:8080/admin/article?page=${page}&&limit=5`);
  }
}
