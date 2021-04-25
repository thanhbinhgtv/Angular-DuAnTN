import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsPaperResponseModel } from 'src/app/shared/model/responses/newspaper-response-model';

@Injectable({
  providedIn: 'root'
})
export class NewpaperService {

  constructor(private httpClient: HttpClient) { }

  // No Login
  getAllNewpaperNoLogin(page: number): Observable<Array<NewsPaperResponseModel>> {
    return this.httpClient.get<Array<NewsPaperResponseModel>>(`http://localhost:8080/new?page=${page}&&limit=8`);
  }

  getNewpaperByIdNoLogin(newId: number): Observable<NewsPaperResponseModel> {
    return this.httpClient.get<NewsPaperResponseModel>(`http://localhost:8080/new/${newId}`);
  }
}
