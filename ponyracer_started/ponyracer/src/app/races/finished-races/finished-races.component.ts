import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RaceModel } from 'src/app/models/race.model';

@Component({
  templateUrl: './finished-races.component.html',
  styleUrls: ['./finished-races.component.css']
})
export class FinishedRacesComponent {
  races: Array<RaceModel>;
  page = 1;
  constructor(route: ActivatedRoute) {
    this.races = route.snapshot.data['races'];
  }
}
