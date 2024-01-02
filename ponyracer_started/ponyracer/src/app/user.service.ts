import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

import { UserModel } from './models/user.model';
import { Observable } from 'rxjs';
import { WsService } from './ws.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // userUrl = 'https://ponyracer.ninja-squad.com';
  userEvents = new BehaviorSubject<UserModel | null>(null);

  constructor(private http: HttpClient, private wsService: WsService) {
    this.retrieveUser();
  }

  register(login: string, password: string, birthYear: number): Observable<UserModel> {
    const body = { login, password, birthYear };
    return this.http.post<UserModel>(environment.baseUrl + '/api/users', body);
  }

  authenticate(credentials: { login: string; password: string }): Observable<UserModel> {
    return this.http
      .post<UserModel>(environment.baseUrl + '/api/users/authentication', credentials)
      .pipe(tap(user => this.storeLoggedInUser(user)));
  }

  storeLoggedInUser(user: UserModel): void {
    window.localStorage.setItem('rememberMe', JSON.stringify(user));
    this.userEvents.next(user);
  }

  retrieveUser(): void {
    const value = window.localStorage.getItem('rememberMe');
    if (value) {
      const user = JSON.parse(value) as UserModel;
      this.userEvents.next(user);
    }
  }

  logout(): void {
    this.userEvents.next(null);
    window.localStorage.removeItem('rememberMe');
  }

  getCurrentUser(): UserModel | null {
    return this.userEvents.getValue();
  }
  scoreUpdates(userId: number): Observable<UserModel> {
    return this.wsService.connect(`/player/${userId}`);
  }
}
