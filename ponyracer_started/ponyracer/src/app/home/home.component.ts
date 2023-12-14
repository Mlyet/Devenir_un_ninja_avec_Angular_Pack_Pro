import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../user.service';
import { UserModel } from '../models/user.model';

@Component({
  selector: 'pr-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnDestroy {
  user: UserModel | null = null;
  userEventsSubscription: Subscription | null = null;

  constructor(userService: UserService) {
    this.userEventsSubscription = userService.userEvents.subscribe(reponse => (this.user = reponse));
  }

  ngOnDestroy(): void {
    this.userEventsSubscription?.unsubscribe();
  }
}
