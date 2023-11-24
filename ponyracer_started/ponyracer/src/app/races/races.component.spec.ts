import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { RacesComponent } from './races.component';
import { RaceComponent } from '../race/race.component';
import { PonyComponent } from '../pony/pony.component';
import { FromNowPipe } from '../from-now.pipe';

describe('RacesComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      declarations: [RacesComponent, RaceComponent, PonyComponent, FromNowPipe]
    })
  );

  it('should display every race', () => {
    const fixture = TestBed.createComponent(RacesComponent);
    fixture.detectChanges();
    const debugElement = fixture.debugElement;
    const races = debugElement.queryAll(By.directive(RaceComponent));
    expect(races.length).withContext('You should have two `RaceComponent` displayed').toBe(2);
  });
});
