import { Component, OnInit, Pipe,PipeTransform } from '@angular/core';
import { WeatherService } from '../weather.service';
import { weatherItem } from '../weather-item';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-main-weather',
  templateUrl: './main-weather.component.html',
  styleUrls: ['./main-weather.component.css'],
  animations: [
    trigger('heart', [
        state('unliked', style({
            color: '#fff',
            opacity: '0.5',
            transform: 'scale(1)'
        })),
        state('liked', style({
            color: '#e74c3c',
            opacity: '1',
            transform: 'scale(1.1)'
        })),
        transition('unliked <=> liked', animate('100ms ease-out'))
    ])
  ]
})


 
export class MainWeatherComponent implements OnInit  {
  public likeState: string = 'unliked';
  public iconName: string = 'heart-empty';
  selectedLocation:weatherItem=this.weatherService.currentSelectedLocation;
  defaultCity:any;
  isCelcius:boolean=true; 
  weatherWeekly:weatherItem[]=[];//array of the 5 days after weather

  constructor(private weatherService:WeatherService) {
    
    console.log("the default temp is: "+this.selectedLocation.temperature);

   }

///////////////////////////////NgOnInit/////////////////////////////////////////

  ngOnInit() {
        //listen to the input of the search component and get the weather of it
    this.weatherService.statusUpdate.subscribe(
      (weather:weatherItem)=>this.getCond(weather),
      
    );
    this.weatherWeekly=this.weatherService.weeklyWeather;//
    //this.getCond(this.selectedLocation);
    this.weatherService.getLocation();

  this.weatherService.getYourLocationCondtion().subscribe(
      data=>{

              this.weatherService.currentSelectedLocation.id=data["Key"];
              this.weatherService.currentSelectedLocation.cityName=data["LocalizedName"];
              this.weatherService.currentSelectedLocation.countryName=data["Country"].LocalizedName;
             
              this.getCond(this.weatherService.currentSelectedLocation);


      }

    );
  


  }
//////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////Get Cond/////////////////////////////////////

getCond(currWeather:weatherItem)//get the weather of the current location(the current and the 5 daily forecast together)
{
  this.selectedLocation=currWeather;

  //this.weatherService.currentSelectedLocation=this.selectedLocation;


  this.weatherService.getCurrentCondtions(this.selectedLocation.id)
  .subscribe(
   data=>{ 
   // console.log("omeromer " + this.selectedLocation.temperature);

    if(this.isCelcius)
    {
      this.selectedLocation.temperature=data[0].Temperature.Metric.Value;


    }
    
    else{
      this.selectedLocation.temperature=data[0].Temperature.Imperial.Value;


    }
      this.selectedLocation.weatherType=data[0].WeatherText;


     });
     debugger;
     
     this.getWeekForecast(currWeather.id,this.selectedLocation.cityName,this.selectedLocation.countryName); //get the weather of the 5 days after
    }


////////////////////////////////////Get Week Forecast////////////////////////////////

  getWeekForecast(locationKey:string,cityName:string,countryName:string)//get the weather of the 5 days after
  {
    var i=0;
    var tempWeek:weatherItem[]=[];
    this.weatherService.getWeeklyForecast(locationKey).subscribe(
      data=>{ 
          
       // console.log("the data is: " +data.DailyForecasts[0].Temperature.Minimum.Value);
        data["DailyForecasts"].forEach((key)=>{

          const weatherDay=new weatherItem(locationKey,cityName,countryName,false);

          weatherDay.maxTemp=(key.Temperature.Maximum.Value);
          weatherDay.minTemp=(key.Temperature.Minimum.Value);

          if(!this.isCelcius)
          {
            console.log("1111111");
            weatherDay.minTemp=(weatherDay.minTemp*1.8)+32;
            weatherDay.minTemp.toFixed(2);
            weatherDay.maxTemp=(weatherDay.maxTemp*1.8)+32;
            weatherDay.maxTemp.toFixed(2);
          }
          weatherDay.weatherType=key.Day.IconPhrase;

          weatherDay.day= this.getDayOfWeek(key.Date);
          tempWeek.push(weatherDay);
          this.weatherService.weeklyWeather.push(weatherDay);

          //this.weatherService.weeklyWeather.push(weatherDay);
           // console.log("Minimum: "+key.Temperature.Minimum.Value +" Maximum: "+key.Temperature.Maximum.Value);

        })
        this.weatherWeekly=tempWeek;
        this.weatherService.weeklyWeather=tempWeek;
        });


        
        


  }


  ///////////////////////Add To Favorite/////////////////////////////////////////

  addToFavorite()// add the location to the favorite component
  {

    var i;
    const check=this.weatherService.checkIfInFavorite(this.selectedLocation.id);
    console.log("fav is: "+this.weatherService.weatherItems);
    if(check==true)
    {
      this.selectedLocation.isFavorite=false;
      this.weatherService.weatherItems.splice(i, 1);
    
    }
    else
    {

      this.weatherService.weatherItems.push(this.selectedLocation);
      this.selectedLocation.isFavorite=true;

    }

    localStorage.setItem("favoriteItems", JSON.stringify(this.weatherService.weatherItems));
    
  }




  ///////////////////////Get Day Of Week/////////////////////////////////////////

  getDayOfWeek(date) //get the day of week from date
  {
   var dayOfWeek = new Date(date).getDay();    
   return isNaN(dayOfWeek) ? null : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
 }



//////////////////////////////////Toggle Metric/////////////////////////////////////////

toggleMetric()//change the metric unit
{
  this.isCelcius=!this.isCelcius;
  
}



toggleLikeState(){

  if(this.likeState == 'unliked'){
    this.likeState = 'liked';
    this.iconName = 'heart';
  } else {
    this.likeState = 'unliked';
    this.iconName = 'heart-empty';
  }

}














}

