import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formRegister = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    passwordConfirm: ['', [Validators.required, Validators.minLength(6)]],
  }, { validator: this.matchingPasswords });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  matchingPasswords(group: FormGroup) {
    if (group) {
      const password = group.controls.password.value;
      const passwordConfirm = group.controls.passwordConfirm.value;

      if (password === passwordConfirm) {
        return null;
      }
    }
    return { matching: false };
  }

  onSubmit() {
    this.authService.register(this.formRegister.value)
      .subscribe((data) => {
        console.log(data);
      },
      err => {
        console.log(err);
      });
  }

}
