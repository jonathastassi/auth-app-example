import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.login(this.formLogin.value)
      .subscribe((data) => {
        alert("Login efetuado com sucesso!");
        this.router.navigateByUrl('/');
      },
      err => {
        console.log(err);
      });
  }

}
