import { Injectable } from '@angular/core';
import { RaceModel } from './models/race.model';
import { Observable, interval, map, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PonyWithPositionModel } from './models/pony.model';

// import { PonyModel } from './models/pony.model';

@Injectable({
  providedIn: 'root'
})
export class RaceService {
  // racesUrl = 'https://ponyracer.ninja-squad.com';

  constructor(private http: HttpClient) {}

  list(): Observable<Array<RaceModel>> {
    return this.http.get<Array<RaceModel>>(environment.baseUrl + '/api/races?status=PENDING');
  }
  bet(raceId: number, ponyId: number) {
    return this.http.post<RaceModel>(environment.baseUrl + `/api/races/${raceId}/bets`, { ponyId });
  }

  get(raceId: number): Observable<RaceModel> {
    return this.http.get<RaceModel>(environment.baseUrl + '/api/races/' + raceId);
  }
  cancelBet(raceId: number): Observable<void> {
    return this.http.delete<void>(environment.baseUrl + `/api/races/${raceId}/bets`);
  }
  live(raceId: number): Observable<Array<PonyWithPositionModel>> {
    return interval(1000).pipe(
      take(101),
      map(position => [
        {
          id: 1,
          name: 'Superb Runner',
          color: 'BLUE',
          position
        },
        {
          id: 2,
          name: 'Awesome Fridge',
          color: 'GREEN',
          position
        },
        {
          id: 3,
          name: 'Great Bottle',
          color: 'ORANGE',
          position
        },
        {
          id: 4,
          name: 'Little Flower',
          color: 'YELLOW',
          position
        },
        {
          id: 5,
          name: 'Nice Rock',
          color: 'PURPLE',
          position
        }
      ])
    );
  }
}
