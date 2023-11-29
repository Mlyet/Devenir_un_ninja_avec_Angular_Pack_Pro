import { Component, OnDestroy, OnInit } from '@angular/core';
import { RaceModel } from '../models/race.model';
import { RaceService } from '../race.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pr-races',
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.css']
})
export class RacesComponent implements OnInit, OnDestroy {
  races: RaceModel[] = [];
  sub: Subscription = new Subscription();
  constructor(private raceService: RaceService) {}

  ngOnInit() {
    this.sub = this.raceService.list().subscribe(reponse => (this.races = reponse));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
