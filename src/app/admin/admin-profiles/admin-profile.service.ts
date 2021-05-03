import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminProfileResponse } from 'src/app/shared/model/responses/admin-profile-response';

@Injectable({
  providedIn: 'root'
})
export class AdminProfileService {

  constructor(private httpClient: HttpClient) { }

  getProfileAdmin(): Observable<AdminProfileResponse> {
    return this.httpClient.get<AdminProfileResponse>('http://localhost:8080/admin/profile');
  }
}
