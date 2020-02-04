import { Observable } from 'rxjs';
import { AuthService } from './auth/services/auth.service';
import { Component } from '@angular/core';
import { User } from './auth/models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AuthWeb';

  collapsed = true;

  public user$: Observable<User>;
  public authenticated$: Observable<boolean> = new Observable();


  constructor(
    private authService: AuthService
  ) {
    this.user$ = authService.getUser();
    this.authenticated$ = authService.isAuthenticated();
  }

  logout(): void {
    this.authService.logout();
  }
}
