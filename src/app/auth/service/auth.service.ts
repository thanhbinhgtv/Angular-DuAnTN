import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SingupModel } from '../singup/singup-model';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private httpClient: HttpClient) { }

  signup(signupModel: SingupModel): Observable<any>{
    return this.httpClient.post('http://localhost:8080/api/auth/signup', signupModel, {responseType: 'text'});
 }
}