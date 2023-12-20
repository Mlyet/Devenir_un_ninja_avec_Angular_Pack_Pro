import { Component } from '@angular/core';
import { RaceModel } from '../models/race.model';
import { ActivatedRoute } from '@angular/router';
import { RaceService } from '../race.service';
import { PonyModel } from '../models/pony.model';

@Component({
  selector: 'pr-bet',
  templateUrl: './bet.component.html',
  styleUrls: ['./bet.component.css']
})
export class BetComponent {
  raceModel: RaceModel | null = null;
  betFailed = false;

  constructor(private raceService: RaceService, private route: ActivatedRoute) {
    const raceId = +this.route.snapshot.paramMap.get('raceId')!;
    this.raceService.get(raceId).subscribe(race => (this.raceModel = race));
  }

  betOnPony(pony: PonyModel): void {
    if (!this.isPonySelected(pony)) {
      this.raceService.bet(this.raceModel!.id, pony.id).subscribe({
        next: race => (this.raceModel = race),
        error: () => (this.betFailed = true)
      });
    } else {
      this.raceService.cancelBet(this.raceModel!.id).subscribe({
        next: () => (this.raceModel!.betPonyId = undefined),
        error: () => (this.betFailed = true)
      });
    }
  }

  isPonySelected(pony: PonyModel): boolean {
    return pony.id === this.raceModel!.betPonyId;
  }
}