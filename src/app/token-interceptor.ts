import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, switchMap, take, filter } from 'rxjs/operators';
import { LoginResponse } from "./auth/login/login-response";
import { AuthService } from "./auth/service/auth.service";

@Injectable({
    providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
    constructor(public authService: AuthService, private toastr: ToastrService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (this.authService.getJwtToken()) {
            request = this.addToken(request, this.authService.getJwtToken());
        }
        return next.handle(request).pipe(catchError(error => {
            if (error instanceof HttpErrorResponse && error.status === 401) {
                this.toastr.info("Token hết hạn, đang làm mới Token");
                return this.handle401Error(request, next);
            }if (error instanceof HttpErrorResponse && error.status === 403) {
                this.toastr.info("Bạn không có quyền truy cập");
                return throwError(error);
            } else {
                return throwError(error);
            }
        }));
    }

    private addToken(request: HttpRequest<any>, token: string) {
        return request.clone({
            setHeaders: {
                'Authorization': `Bearer ${token}`
            }
        });
    }

    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);
            return this.authService.refreshToken().pipe(                
                switchMap((token: any) => {
                    console.log("refreshToken");
                    this.isRefreshing = false;
                    this.refreshTokenSubject.next(token.jwt);
                    return next.handle(this.addToken(request, token.jwt));
                })
            );
        } else {
            return this.refreshTokenSubject.pipe(
            filter(token => token != null),
            take(1),
            switchMap(jwt => {
                return next.handle(this.addToken(request, jwt));
            }));
        }
    }
}
// https://tienanhvn.blogspot.com/2019/08/angular-jwt-authorization-with-refresh-token-and-http-interceptor.html