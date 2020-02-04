import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly API_URL = 'https://localhost:5001/api/auth/';

  constructor(
    private http: HttpClient
  ) { }

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.API_URL}register`, user);
  }
}
