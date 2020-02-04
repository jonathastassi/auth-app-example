import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthInfo } from '../models/auth-info';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly API_URL = 'https://localhost:5001/api/auth/';

  private subjUser$: BehaviorSubject<User> = new BehaviorSubject(null);
  private subjLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private http: HttpClient
  ) { }

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.API_URL}register`, user);
  }

  login(user: User): Observable<AuthInfo> {
    return this.http.post<AuthInfo>(`${this.API_URL}login`, user)
      .pipe(
        tap((authInfo: AuthInfo) => {
          localStorage.setItem('token:authApp', authInfo.token);

        })
      );
  }

  isAuthenticated(): Observable<boolean> {
    return this.subjLoggedIn$.asObservable();
  }

  getUser(): Observable<User> {
    return this.subjUser$.asObservable();
  }
}
