import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { weatherItem } from '../weather-item';
import { Observable, Subscription } from 'rxjs';
import * as weatherDataActions from '../store/weatherData.actions';
import * as fromWeatherDataState from '../store/weatherData.reducers';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-favorite-weather',
  templateUrl: './favorite-weather.component.html',
  styleUrls: ['./favorite-weather.component.css']
})
export class FavoriteWeatherComponent implements OnInit {
  favoriteWeathers:weatherItem[]=[];
  fav:Observable<{favoriteLocations:weatherItem}>;

  constructor(private weatherService:WeatherService,private store:Store<fromWeatherDataState.AppState>) {

/*
    if (localStorage.length > 0) {
      this.favoriteWeathers=JSON.parse(localStorage.getItem("favoriteItems"));
      // We have items
    } else {
      this.favoriteWeathers=this.weatherService.weatherItems;

    }
    */





   }
  ngOnInit() {
    this.store.select('weatherData').subscribe(data=>
      {
        console.log("frog"+data);
        
        this.favoriteWeathers=data.favoriteLocations;
      });
  

  }

}
