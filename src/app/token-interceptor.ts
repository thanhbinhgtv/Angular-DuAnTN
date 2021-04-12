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

    constructor(public authService: AuthService, private router: Router){}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const jwtToken = this.authService.getJwtToken();    //Lấy token User đang login
        if (jwtToken != null) {
            const headers = new HttpHeaders().set('token-binh', jwtToken)
                                            .set('Authorization', 'Bearer ' + jwtToken);
            const AuthRequest = request.clone({headers: headers});
            return next.handle(AuthRequest).pipe(catchError(error => {
                if (error instanceof HttpErrorResponse && error.status === 403) {
                    console.log("if");
                    return this.handleAuthErrors(request, next);
                } else {
                    console.log("else");
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
            this.router.navigateByUrl('auth/login');
            this.authService.logout();

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

    addToken(request: HttpRequest<any>, jwtToken: any) {
        return request.clone({headers: request.headers.set('Authorization', 'Bearer ' + jwtToken)});
    }

}