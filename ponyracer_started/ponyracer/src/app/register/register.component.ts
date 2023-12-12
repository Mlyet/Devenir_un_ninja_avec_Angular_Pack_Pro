import { Component } from '@angular/core';
import { AbstractControl, NonNullableFormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../user.service';

@Component({
  selector: 'pr-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private builder: NonNullableFormBuilder, private userService: UserService, private router: Router) {}

  registrationFailed = false;
  maxYear = new Date().getFullYear();

  // loginCtrl = this.builder.control('', Validators.compose([Validators.required, Validators.minLength(3)]));

  loginCtrl = this.builder.control('', [Validators.required, Validators.minLength(3)]);
  passwordCtrl = this.builder.control('', Validators.required);
  confirmPasswordCtrl = this.builder.control('', Validators.required);
  birthYearCtrl = this.builder.control<number | null>(null, [Validators.required, Validators.min(1900), Validators.max(this.maxYear)]);

  passwordGroup = this.builder.group(
    {
      password: this.passwordCtrl,
      confirmPassword: this.confirmPasswordCtrl // here
    },
    {
      validators: RegisterComponent.passwordMatch
    }
  );

  userForm = this.builder.group({
    login: this.loginCtrl,
    passwordForm: this.passwordGroup,
    birthYear: this.birthYearCtrl
  });

  static passwordMatch(control: AbstractControl): ValidationErrors | null {
    // return control.value.passwordCtrl === control.value.confirmPasswordCtrl
    // ?
    //   null
    // : {matchingError: true}
    const password = control.get('password')!.value;
    const confirmPassword = control.get('confirmPassword')!.value;
    return password !== confirmPassword ? { matchingError: true } : null;
  }

  register(): void {
    const formValue = this.userForm.value;
    this.userService.register(formValue.login!, formValue.passwordForm!.password!, formValue.birthYear!).subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: () => (this.registrationFailed = true)
    });
  }
}
