import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'pr-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private builder: NonNullableFormBuilder) {}

  loginCtrl = this.builder.control('', Validators.required);
  passwordCtrl = this.builder.control('', Validators.required);
  birthYearCtrl = this.builder.control<number | null>(null, Validators.required);

  userForm = this.builder.group({
    login: this.loginCtrl,
    password: this.passwordCtrl,
    birthYear: this.birthYearCtrl
  });

  register(): void {}
}
