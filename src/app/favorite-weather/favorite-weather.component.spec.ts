import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteWeatherComponent } from './favorite-weather.component';

describe('FavoriteWeatherComponent', () => {
  let component: FavoriteWeatherComponent;
  let fixture: ComponentFixture<FavoriteWeatherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoriteWeatherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
