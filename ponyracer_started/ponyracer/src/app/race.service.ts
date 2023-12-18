import { Injectable } from '@angular/core';
import { RaceModel } from './models/race.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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
}
