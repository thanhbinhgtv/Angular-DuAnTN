import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsPaperPostRequestModel } from './create-newspaper/newspaper-post-request';
import { NewsPaperResponseModel } from './view-newspaper/newspaper-response-model';

@Injectable({
  providedIn: 'root'
})
export class NewspaperService {

  constructor(private http: HttpClient) { }

  getAllNewsPaper(page: number): Observable<Array<NewsPaperResponseModel>> {
    return this.http.get<Array<NewsPaperResponseModel>>(`http://localhost:8080/admin/new?page=${page}&&limit=5`);
  }

  getNewpaperById(id: number): Observable<NewsPaperResponseModel> {
    return this.http.get<NewsPaperResponseModel>('http://localhost:8080/admin/new/' +id);
  }

  createNewpaper(postNewpaperModel: NewsPaperPostRequestModel): Observable<any>{
    return this.http.post('http://localhost:8080/admin/new', postNewpaperModel);
  }

  updateNewspaper(id: number, updateNewspaperModel: NewsPaperPostRequestModel): Observable<any>{
    return this.http.put('http://localhost:8080/admin/new/'+id, updateNewspaperModel);
  }

  deleteNewspaper(id: number): Observable<any> {
    return this.http.delete('http://localhost:8080/admin/new/' + id);
  }

}
