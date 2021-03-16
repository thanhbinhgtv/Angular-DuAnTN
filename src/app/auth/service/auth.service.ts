import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';
import { SingupModel } from '../singup/singup-model';
import { LoginModel } from '../login/login-model';
import { map } from 'rxjs/operators';
import { LoginResponse } from '../login/login-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<String> = new EventEmitter();

  constructor(private httpClient: HttpClient, private localStorage: LocalStorageService) { }

  signup(signupModel: SingupModel): Observable<any>{
      return this.httpClient.post('http://localhost:8080/signup', signupModel, {responseType: 'text'});
  }

  login(loginModel: LoginModel): Observable<any>{
      return this.httpClient.post<LoginResponse>('http://localhost:8080/login', loginModel)
      .pipe(map(data =>{ 
        this.localStorage.store('role', data.role);
        this.localStorage.store('token', data.token);

        this.loggedIn.emit(true);
        this.username.emit(loginModel.email);
        console.log(loginModel.email);
        
        return true;
      }));
  }

  getJwtToken(){
    return this.localStorage.retrieve('token');
  }

  getUserName() {
    return this.localStorage.retrieve('role');
  }

  isLoggedIn(): boolean {   //header
    return this.getJwtToken() != null;
  }
}