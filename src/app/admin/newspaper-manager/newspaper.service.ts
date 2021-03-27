import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsPaperResponseModel } from './view-newspaper/newspaper-response-model';

@Injectable({
  providedIn: 'root'
})
export class NewspaperService {

  constructor(private http: HttpClient) { }

  getAllNewsPaper(page: number): Observable<Array<NewsPaperResponseModel>> {
    return this.http.get<Array<NewsPaperResponseModel>>(`http://localhost:8080/admin/new?page=${page}&&limit=5`);
  }
}
