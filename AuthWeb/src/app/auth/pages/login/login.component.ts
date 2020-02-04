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
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.register(this.formLogin.value)
      .subscribe((data) => {
        alert("Registro efetuado com sucesso!");
        this.router.navigateByUrl('/auth/login');
      },
      err => {
        console.log(err);
      });
  }

}
