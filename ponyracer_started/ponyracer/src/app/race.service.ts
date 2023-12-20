import { Injectable } from '@angular/core';
import { LiveRaceModel, RaceModel } from './models/race.model';
import { Observable, map, takeWhile } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PonyWithPositionModel } from './models/pony.model';
import { WsService } from './ws.service';

// import { PonyModel } from './models/pony.model';

@Injectable({
  providedIn: 'root'
})
export class RaceService {
  // racesUrl = 'https://ponyracer.ninja-squad.com';

  constructor(private http: HttpClient, private wsService: WsService) {}

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
    return this.wsService.connect<LiveRaceModel>(`/race/${raceId}`).pipe(
      takeWhile(liveRace => liveRace.status !== 'FINISHED'),
      map(liveRace => liveRace.ponies)
    );
  }
}
