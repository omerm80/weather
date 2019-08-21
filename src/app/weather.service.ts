import { Injectable, EventEmitter, Output, Pipe } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { weatherItem } from './weather-item';
import { Observable,Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/operator/catch';

import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { ThrowStmt } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})

@Pipe({
  name: 'temperatureConverter'
 })
 
export class WeatherService {
 weatherItems:weatherItem[]=[];
 weeklyWeather:weatherItem[]=[];
 lat:any;
 lng:any;
 isCelcius:true;
//tyourLocationCity=
 currentSelectedLocation:weatherItem=new weatherItem("","","",false);
 
 statusUpdate= new EventEmitter<weatherItem>();
   private urlAutoCompelte = 'http://api.accuweather.com/locations/v1/postalcodes/search.json?q=90210&apikey=A4PU6JArZGdndMQCddKZGFYkYsT5NP0Z';
  private key = 'LxShCxIdc7t2OstDsQjlER7G50GM3FQq';
  constructor(private http: HttpClient) {}
  // get weather by coordinates

  searchWeatherData(cityName:string):Observable<any>
  {
    return  this.http.get(
      'http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey='+this.key+'&q='+cityName)
       .pipe(
        map((res:Response)=>res),
        catchError(err => {
          return throwError(err);
        })
      );

      
    
  }

  getCurrentCondtions(locationKey:string)
  {
    return  this.http.get(
      'http://dataservice.accuweather.com/currentconditions/v1/'+locationKey+'?apikey='+this.key+'&details=true')
      .map((res:Response)=>res);
      
      
  }

  getWeeklyForecast(locationKey:string)
  {
    return  this.http.get(
      'http://dataservice.accuweather.com/forecasts/v1/daily/5day/'+locationKey+'?apikey='+this.key+'&metric=true')
      .map((res:Response)=>res);
      
      
  }
  getDefaultConditions()
  {
    return  this.http.get(
      'http://dataservice.accuweather.com/currentconditions/v1/'+215854+'?apikey='+this.key+'&details=true')
      .map((res:Response)=>res);
  }

  getDef()
  {
      
      this.getYourLocationCondtion().subscribe(
        data=>{
          console.log("bbbbbbbbaaaaa+" + this.currentSelectedLocation.id+ ","+ this.currentSelectedLocation.cityName+"," +this.currentSelectedLocation.countryName);

          this.currentSelectedLocation.id=data["Key"];
          console.log("gggg"+this.currentSelectedLocation.id);

          this.currentSelectedLocation.cityName=data["LocalizedName"];
          this.currentSelectedLocation.countryName=data["Country"].LocalizedName;
          this.currentSelectedLocation.isFavorite=false;
          console.log("aaaaabbbbbb+" + this.currentSelectedLocation.id+ ","+ this.currentSelectedLocation.cityName+"," +this.currentSelectedLocation.countryName);

        }
        
      );
      
      console.log("gggg8"+this.currentSelectedLocation.id);


  }

/*getDefaultWeeklyForecast()
  {
    return  this.http.get(
      'http://dataservice.accuweather.com/forecasts/v1/daily/5day/'+215854+'?apikey='+this.key+'&metric=true')
      .map((res:Response)=>res);
      
      
  }
*/
  checkIfInFavorite(idOfCurrentLocation:string)
  {
    var i;
    for(i=0;i<this.weatherItems.length;i++)
    {
        console.log("gggg: "+this.weatherItems[i].cityName);
      if(idOfCurrentLocation==this.weatherItems[i].id)
        {
         console.log("eeee");
          return true;

        }
      
    }
    console.log("ffff");
    return false;
  }



  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: Position) => {
        if (position) {
          console.log("Latitude: " + position.coords.latitude +
            "Longitude: " + position.coords.longitude);
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          console.log(this.lat);
          console.log(this.lat);
        }
      },
        (error: PositionError) => console.log(error));
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }


  getYourLocationCondtion()
  {
   
    return  this.http.get(
      'http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey='+this.key+'&q=31.771959,35.217018')
            .map((res:Response)=>res);
  }






}
