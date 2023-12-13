import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'pr-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router, private userService: UserService) {}

  credentials = {
    login: '',
    password: ''
  };
  authenticationFailed = false;

  authenticate(): void {
    this.userService.authenticate(this.credentials).subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: () => (this.authenticationFailed = true)
    });
  }
}
