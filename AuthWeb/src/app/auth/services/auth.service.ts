import { Router } from '@angular/router';
import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthInfo } from '../models/auth-info';
import { tap, map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly API_URL = 'https://localhost:5001/api/auth/';

  private subjUser$: BehaviorSubject<User> = new BehaviorSubject(null);
  private subjLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.API_URL}register`, user);
  }

  login(user: User): Observable<AuthInfo> {
    return this.http.post<AuthInfo>(`${this.API_URL}login`, user)
      .pipe(
        tap((authInfo: AuthInfo) => {
          localStorage.setItem('token:authApp', authInfo.token);
          this.subjLoggedIn$.next(true);
          this.subjUser$.next(authInfo.user);
        })
      );
  }

  isAuthenticated(): Observable<boolean> {
    const token = localStorage.getItem('token:authApp');
    if (token && !this.subjLoggedIn$.value) {
      return this.checkTokenValidation();
    }

    return this.subjLoggedIn$.asObservable();
  }

  checkTokenValidation(): Observable<boolean> {
    return this.http.get<User>(`${this.API_URL}me`)
      .pipe(
        tap((user: User) => {
          if (user) {
            this.subjLoggedIn$.next(true);
            this.subjUser$.next(user);
          }
        }),
        map((user: User) => user ? true : false),
        catchError((err) => {
          this.logout();
          return of(false);
        })
      );
  }

  getUser(): Observable<User> {
    return this.subjUser$.asObservable();
  }

  logout(): void {
    localStorage.removeItem('token:authApp');
    this.subjLoggedIn$.next(false);
    this.subjUser$.next(null);
    this.router.navigateByUrl('/auth/login');
  }
}
