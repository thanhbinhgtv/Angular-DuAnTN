import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsPaperPostRequestModel } from './create-newspaper/newspaper-post-request';
import { NewsPaperResponseModel } from '../../shared/model/responses/newspaper-response-model';

@Injectable({
  providedIn: 'root'
})
export class NewspaperService {

  constructor(private http: HttpClient) { }

  getAllNewsPaper(hidden: string, search: string): Observable<Array<NewsPaperResponseModel>> {
    console.log(hidden);
    console.log(search);
    
    return this.http.get<Array<NewsPaperResponseModel>>
    (`http://localhost:8080/admin/new?page=0&&limit=2000&&hidden=${hidden?hidden:''}&&search=${search?search:''}`);
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

  getActiveNewsPaper(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/admin/new/active/${id}`);
  }

  getHiddenNewsPaper(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/admin/new/hidden/${id}`);
  }
}
