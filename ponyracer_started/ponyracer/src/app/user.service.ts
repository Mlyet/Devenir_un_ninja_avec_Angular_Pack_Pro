import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { UserModel } from './models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userUrl = 'https://ponyracer.ninja-squad.com';

  constructor(private http: HttpClient) {}

  register(login: string, password: string, birthYear: number): Observable<UserModel> {
    const body = { login, password, birthYear };
    return this.http.post<UserModel>(this.userUrl + '/api/users', body);
  }
}
