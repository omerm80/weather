import { Component, OnInit,ElementRef, ViewChild, Output,EventEmitter } from '@angular/core';
import{NgForm, FormGroup, Validators}from '@angular/forms';
import { WeatherService } from '../weather.service';
import { weatherItem } from '../weather-item';
import {FormControl} from'@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatOptionModule } from '@angular/material';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import * as fromWeatherData from '../store/weatherData.reducers';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-weather-search',
  templateUrl: './weather-search.component.html',
  styleUrls: ['./weather-search.component.css']
})

export class WeatherSearchComponent implements OnInit {
  currWeather:weatherItem;

  @ViewChild('f',{ static: false}) weatherCityName: NgForm;
  myControl = new FormControl();
  options: any[] = [];
error=null;
values:"";
selectedString:string="";
  constructor(private weatherService:WeatherService,private store:Store <fromWeatherData.AppState>
) 
  {

   }  
  currCity:any;
  validatingForm: FormGroup;
  username = new FormControl(); 
  filteredOptions: Observable<string[]>;
  unamePattern = "^[a-z0-9_-]{8,15}$"; 
  ngOnInit() {
    this.validatingForm = new FormGroup({
      pattern: new FormControl(null, Validators.pattern(/A-Za-z/))
    });
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(val => this.filter(val))  
    );
    

  }
  

////////////////////////////////////////Filter///////////////////////////////////////////

  filter(val:string):any[]
  {

    return this.options.filter(option=> 
      option.LocalizedName.indexOf(val)==0); //filter with the options array that we got from the auto complete api

      
  }
  
 

////////////////////////////////////////On Key///////////////////////////////////////////
  
onKey(event: any) { // listen to the input value 
    this.values=event.target.value;
    this.options=[];
  this.weatherService.searchWeatherData(this.values)//calling the auto complete api
   .subscribe(
    data=>{ data.forEach((key)=>{
      if(this.options.length<=5){//push the values of the auto complete search to options array
        this.options.push(key);

      }


    },error=>{
        this.error=error.Message;
    }
    );
    this.filteredOptions = this.myControl.valueChanges //filter the options array
    .pipe(
      startWith(''),
      map(val => this.filter(val))
    );

  })
  }
  /*
  onSubmit()//after we submit the location
  {
    
    const check=this.weatherService.checkIfInFavorite(this.myControl.value.Key);

    //checking if the location is new and not in the favorite already
    if(check==true)
    {
      this.currWeather=new weatherItem(this.myControl.value.Key,this.myControl.value.LocalizedName,this.myControl.value.Country.LocalizedName,true);//
    }

   else
   {
    this.currWeather=new weatherItem(this.myControl.value.Key,this.myControl.value.LocalizedName,this.myControl.value.Country.LocalizedName,false);

   }

    this.weatherService.currentSelectedLocation=this.currWeather;
     this.weatherService.statusUpdate.emit(this.currWeather); //send the location that we chose to the service
   
   
  // this.weatherService.currentSelectedLocation=this.currWeather;
      // this.weatherService.currentSelectedLocation=new weatherItem(this.myControl.value.Key,this.myControl.value.LocalizedName,this.myControl.value.Country.LocalizedName,false);

  }
*/

public getDisplayFn() {
  return (val) => this.display(val);
}
public display(item: any): string {
  if (item) {
    return item.LocalizedName+","+item.Country.LocalizedName ;
  }
}


  onSelectionChanged(event: MatAutocompleteSelectedEvent) {

    const check=this.weatherService.checkIfInFavorite(this.myControl.value.Key);

    //checking if the location is new and not in the favorite already
    if(check==true)
    {
      this.currWeather=new weatherItem(this.myControl.value.Key,this.myControl.value.LocalizedName,this.myControl.value.Country.LocalizedName,true);//
    }

   else
   {
    this.currWeather=new weatherItem(this.myControl.value.Key,this.myControl.value.LocalizedName,this.myControl.value.Country.LocalizedName,false);

   }

    this.weatherService.currentSelectedLocation=this.currWeather;
     this.weatherService.statusUpdate.emit(this.currWeather); //send the location that we chose to the service
   
   
  // this.weatherService.currentSelectedLocation=this.currWeather;
      // this.weatherService.currentSelectedLocation=new weatherItem(this.myControl.value.Key,this.myControl.value.LocalizedName,this.myControl.value.Country.LocalizedName,false);

  }

}
