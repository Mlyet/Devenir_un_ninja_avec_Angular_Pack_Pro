import { Component, OnDestroy } from '@angular/core';
import { UserService } from '../user.service';
import { EMPTY, Subscription, catchError, concat, of, switchMap } from 'rxjs';
import { UserModel } from '../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'pr-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnDestroy {
  navbarCollapsed = true;
  user: UserModel | null = null;
  userEventsSubscription: Subscription | null = null;

  constructor(private userService: UserService, private router: Router) {
    this.userEventsSubscription = this.userService.userEvents
      .pipe(switchMap(user => (user ? concat(of(user), this.userService.scoreUpdates(user.id).pipe(catchError(() => EMPTY))) : of(null))))
      .subscribe(userWithScore => (this.user = userWithScore));
  }
  toggleNavbar(): void {
    // console.log(this.navbarCollapsed);
    this.navbarCollapsed = !this.navbarCollapsed;
  }

  logout(event: Event): void {
    event.preventDefault();
    this.userService.logout();
    this.router.navigateByUrl('/');
  }

  ngOnDestroy(): void {
    this.userEventsSubscription?.unsubscribe();
  }
}
