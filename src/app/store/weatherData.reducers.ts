import { weatherItem } from '../weather-item';
import { Action } from '@ngrx/store';
import{ADD_LOCATION}from './weatherData.actions';
import * as WeatherDataActions from './weatherData.actions';




export interface State{
    weatherData:weatherItem[];
    weatherOfWeek:weatherItem[];
    currentWeatherData:weatherItem;
    favoriteLocations:weatherItem[];
    searchState:boolean;
    lat:number;
    lng:number;
    locationUrl:number;


}
export interface AppState
{
    weatherData:State;
}




const initialState:State={
weatherData:[new weatherItem("s","s","s",false)],
currentWeatherData:new weatherItem("s","s","s",false),
weatherOfWeek:[new weatherItem("s","s","s",false)],
favoriteLocations:[],
searchState:false,
lng:null,
lat:null,
locationUrl:null



}
export function weatherDataReducer(state:State=initialState,action:WeatherDataActions.weatherDataActions)
{

switch(action.type)
{ 
    case WeatherDataActions.ADD_LOCATION:
        return{...state,
            currentWeatherData:action.payload
            
        };
        

    case WeatherDataActions.ADD_DAY_TO_WEEK:
        return{
            ...state,weatherOfWeek:[...action.payload]
        };





    case WeatherDataActions.ADD_LOCATION_TO_FAVORITES:
        return{
                ...state,favoriteLocations:[...state.favoriteLocations,action.payload]
            };
    
    case WeatherDataActions.GET_YOUR_LOCATION_URL:
        return{
                ...state,locationUrl:action.payload
                    };
            
            
    

    case WeatherDataActions.LOAD_WEATHER:
                return {
                    currentWeatherData: action.payload.currentWeatherData
                };   

    case WeatherDataActions.ENTER_SEARCH_INPUT:
        return{
            ...state,
            searchState:action.payload
        };
        case WeatherDataActions.GET_COORDINATE_LAT:
        return{
            lat:action.payload
        };
    
    case WeatherDataActions.GET_COORDINATE_LNG:
        return{
            lng:action.payload
        };
    
        default:return state;
}
}


export const selectWeather = (state: AppState) => state.weatherData.currentWeatherData;
