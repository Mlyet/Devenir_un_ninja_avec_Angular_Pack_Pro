import { Component, OnDestroy } from '@angular/core';
import { RaceModel } from '../models/race.model';
import { RaceService } from '../race.service';
import { ActivatedRoute } from '@angular/router';
import { PonyWithPositionModel } from '../models/pony.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pr-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.css']
})
export class LiveComponent implements OnDestroy {
  raceModel: RaceModel | null = null;
  poniesWithPosition: Array<PonyWithPositionModel> = [];
  positionSubscription: Subscription | null = null;

  constructor(private raceService: RaceService, private route: ActivatedRoute) {
    const id = +this.route.snapshot.paramMap.get('raceId')!;
    this.raceService.get(id).subscribe(race => (this.raceModel = race));
    this.positionSubscription = this.raceService.live(id).subscribe(positions => (this.poniesWithPosition = positions));
  }

  ngOnDestroy(): void {
    if (this.positionSubscription) {
      this.positionSubscription.unsubscribe();
    }
  }
}
