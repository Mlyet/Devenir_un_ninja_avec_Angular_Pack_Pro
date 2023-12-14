import { Component, OnDestroy } from '@angular/core';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';
import { UserModel } from '../models/user.model';

@Component({
  selector: 'pr-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnDestroy {
  navbarCollapsed = true;
  user: UserModel | null = null;
  userEventsSubscription: Subscription | null = null;

  constructor(private userService: UserService) {
    this.userEventsSubscription = this.userService.userEvents.subscribe(user => (this.user = user));
  }
  toggleNavbar() {
    // console.log(this.navbarCollapsed);
    this.navbarCollapsed = !this.navbarCollapsed;
  }

  ngOnDestroy(): void {
    this.userEventsSubscription?.unsubscribe();
  }
}
