import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, switchMap, take, filter } from 'rxjs/operators';
import { LoginResponse } from "./auth/login/login-response";
import { AuthService } from "./auth/service/auth.service";

@Injectable({
    providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
    isTokenRefreshing = false;
    refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject(null);

    constructor(public authService: AuthService) { }
    
    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {

        if (req.url.indexOf('refresh') !== -1 || req.url.indexOf('login') !== -1) {
            return next.handle(req);
        }
        const jwtToken = this.authService.getJwtToken();    //Lấy token User đang login

        if (jwtToken) {         // kiểm tra xem có mã JwtToken trong localStorage hay ko
            return next.handle(this.addToken(req, jwtToken)).pipe(catchError(error => {
                if (error instanceof HttpErrorResponse && error.status === 403) {
                    return this.handleAuthErrors(req, next);
                } else {
                    return throwError(error);
                }
            }));
        }
        return next.handle(req);

    }

    private handleAuthErrors(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!this.isTokenRefreshing) {
            this.isTokenRefreshing = true;

            //Đặt refreshTokenSubject thành null để các lệnh gọi API tiếp theo sẽ đợi cho đến khi mã thông báo mới được truy xuất
            this.refreshTokenSubject.next(null);

            // return this.authService.refreshToken().pipe(    //Làm mới token
            //     switchMap((refreshTokenResponse: LoginResponse) => {
            //         this.isTokenRefreshing = false;
            //         this.refreshTokenSubject.next(refreshTokenResponse.authenticationToken);
            //         return next.handle(this.addToken(req, refreshTokenResponse.authenticationToken));
            //     })
            // )
        } else {
            // Nếu isTokenRefreshing là true, chúng ta sẽ đợi cho đến khi refreshTokenSubject có giá trị không phải null
            // có nghĩa là mã thông báo mới đã sẵn sàng và có thể thử lại yêu cầu một lần nữa
            return this.refreshTokenSubject.pipe(
                filter(result => result !== null),
                take(1),
                switchMap((res) => {
                    return next.handle(this.addToken(req,
                        this.authService.getJwtToken()))
                })
            );
        }
    }

    addToken(req: HttpRequest<any>, jwtToken: any) {
        return req.clone({
            headers: req.headers.set('Authorization',
                'Bearer ' + jwtToken)
        });
    }
}