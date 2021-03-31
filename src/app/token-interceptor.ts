import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
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

    constructor(public authService: AuthService, private router: Router){}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const jwtToken = this.authService.getJwtToken();    //Lấy token User đang login

        // if (req.url.indexOf('refresh') !== -1 || req.url.indexOf('login') !== -1) {
        //     //Kiểm tra hết hạn
        //     return next.handle(req);
        //   }

        if (jwtToken) {         // nếu có mã JwtToken trong localStorage thì:
            return next.handle(this.addToken(request, jwtToken)).pipe(catchError(error => {
                if (error instanceof HttpErrorResponse && error.status === 403) {
                    return this.handleAuthErrors(request, next);
                } else {
                    return throwError(error);
                }
            }));
        }else{
            console.log("Token = null");
        }
        return next.handle(request);
    }

    private handleAuthErrors(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!this.isTokenRefreshing) {
            this.isTokenRefreshing = true;

            //Đặt refreshTokenSubject thành null để các lệnh gọi API tiếp theo sẽ đợi cho đến khi mã thông báo mới được truy xuất
            this.refreshTokenSubject.next(null);
            // T
            this.authService.logout();
            this.router.navigateByUrl('login');

            // return this.authService.getJwtToken().pipe(    //Làm mới token (after change)
            //     switchMap((TokenResponse: LoginResponse) => {
            //         this.isTokenRefreshing = false;
            //         this.refreshTokenSubject.next(TokenResponse.token);
            //         return next.handle(this.addToken(req, TokenResponse.token));
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
            headers: req.headers.set('Authorization', 'Bearer ' + jwtToken)
        });
    }

}