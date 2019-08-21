import {weatherItem} from '../weather-item';
import { Action } from '@ngrx/store';
import { state } from '@angular/animations';
export const ADD_LOCATION ='ADD_LOCATION';
export const ADD_DAY_TO_WEEK ='ADD_DAY_TO_WEEK';
export const UPDATE_LOCATION='UPDATE_LOCATION';
export const INSERT_TEMP='INSERT_TEMP';

export const SAVE_LOCATION='SAVE_LOCATION';

export const ADD_LOCATION_TO_FAVORITES ='ADD_LOCATION_TO_FAVORITES';
export const DELETE_LOCATION_FROM_FAVORITE='DELETE_LOCATION_FROM_FAVORITE';
export const LOAD_WEATHER='LOAD_WEATHER';
export const ENTER_SEARCH_INPUT='ENTER_SEARCH_INPUT';
export const GET_COORDINATE='GET_COORDINATE'
export const GET_COORDINATE_LAT='GET_COORDINATE_LAT'
export const GET_COORDINATE_LNG='GET_COORDINATE_LNG'
export const CALL_COORDINATE_LNG='CALL_COORDINATE_LNG'
export const CALL_COORDINATE_LAT='CALL_COORDINATE_LAT'

export const GET_YOUR_LOCATION_URL='GET_YOUR_LOCATION_URL'


export class AddLocation implements Action
{
    readonly type=ADD_LOCATION;
    

   constructor(public payload:weatherItem)
   {

   }
    
}


export class getYourLocationUrl implements Action
{
    readonly type=GET_YOUR_LOCATION_URL;
    

   constructor(public payload:any)
   {

   }
    
}


export class getCoordinateLat implements Action
{
    readonly type=GET_COORDINATE_LAT;
    

   constructor(public payload:number)
   {

   }
    
}
export class getCoordinateLng implements Action
{
    readonly type=GET_COORDINATE_LNG;
    

   constructor(public payload:number)
   {

   }
    
}


export class callCoordinateLat implements Action
{
    readonly type=CALL_COORDINATE_LAT;
    

   constructor()
   {    
    return 
}
    
}





export class  enterSearchInput implements Action
{
    readonly type=ENTER_SEARCH_INPUT;

  constructor(public payload:boolean)
   {

   }
}


export class AddDayToWeek implements Action{
    readonly type=ADD_DAY_TO_WEEK;
    constructor(public payload:weatherItem[])
    {

    }

}


export class UpdateLocation implements Action{
    readonly type=UPDATE_LOCATION;
  
    constructor(public payload:{id:string, cityName:string, countryName:string,isFavorite:boolean})
    {
        
    }
}
export class InsertTemp implements Action{
    readonly type=INSERT_TEMP;
    constructor(public payload:{temp:number,currWeather:weatherItem})
    {

    }
}




export class AddLocationToFavorites implements Action{
    readonly type=ADD_LOCATION_TO_FAVORITES;
    constructor(public payload:weatherItem)
    {

    }

}


export class LoadWeather implements Action {
    readonly type = LOAD_WEATHER;
  
    constructor(readonly payload: {currentWeatherData: weatherItem}) {
  
    }
  }



export type weatherDataActions=
AddLocation|
AddDayToWeek|
AddLocationToFavorites|
UpdateLocation|
InsertTemp|
LoadWeather|enterSearchInput|getCoordinateLat|getCoordinateLng
|getYourLocationUrl

