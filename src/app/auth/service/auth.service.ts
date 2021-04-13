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
      return this.httpClient.post('http://localhost:8080/sign-up', signupModel, {responseType: 'text'});
  }

  login(loginModel: LoginModel): Observable<any>{
      return this.httpClient.post<LoginResponse>('http://localhost:8080/login', loginModel)
      .pipe(map(data =>{
        this.localStorage.store('id', data.id);
        this.localStorage.store('image', data.image);
        this.localStorage.store('role', data.role);
        this.localStorage.store('name', data.name);
        this.localStorage.store('email', data.email);
        this.localStorage.store('token', data.token);

        this.loggedIn.emit(true);
        this.username.emit(data.name);
        
        return true;
      }));
  }

  logout() {
    this.localStorage.clear('id');
    this.localStorage.clear('image');
    this.localStorage.clear('role');
    this.localStorage.clear('name');
    this.localStorage.clear('email');
    this.localStorage.clear('token');
  }

  forgotPassword(email: string): Observable<any> {
    return this.httpClient.get('http://localhost:8080/forgot/?email=' + email);
  }

  getId() {
    return this.localStorage.retrieve('id');
  }

  getJwtToken(){
    return this.localStorage.retrieve('token');
  }

  getRole(){
    return this.localStorage.retrieve('role');
  }

  getUserName() {
    return this.localStorage.retrieve('name');
  }

  isLoggedIn(): boolean {   //header
    return this.getJwtToken() != null;
  }
}