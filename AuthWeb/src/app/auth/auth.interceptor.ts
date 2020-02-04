import { AuthService } from './services/auth.service';
import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private authService: AuthService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const token = localStorage.getItem('token:authApp');
        if (token) {
            const authReq = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
            return next.handle(authReq)
                .pipe(
                    catchError(
                        (err) => {
                            if (err instanceof HttpErrorResponse) {
                                if (err.status === 401 || err.status === 0) {
                                    this.authService.logout();
                                }
                            }
                            return throwError(err);
                        }
                    )
                )
        }
        return next.handle(req);
    }
}
