import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainWeatherComponent } from './main-weather/main-weather.component';
import { HttpClientModule } from '@angular/common/http';
import { weatherItem } from './weather-item';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WeatherSearchComponent } from './weather-search/weather-search.component';
import { Observable } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import{MatFormFieldModule,MatInputModule,MatButtonModule,MatCheckboxModule, MatAutocompleteModule} from '@angular/material';
import { FavoriteWeatherComponent } from './favorite-weather/favorite-weather.component';
import { WeatherService } from './weather.service';
import { RouterModule, Routes } from '@angular/router';
import { AnimatedLikeComponent } from './animated-like/animated-like/animated-like.component';
import { ToggleButtonComponent } from './toggle-button/toggle-button.component';
import{StoreModule}from '@ngrx/store';
import { weatherDataReducer } from './store/weatherData.reducers';



const routes: Routes = [
  //{path:'',redirectTo:'/main', pathMatch:'full'},

  {path:'favorites',component:FavoriteWeatherComponent},
  {path:'main',component:MainWeatherComponent},

];



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainWeatherComponent,WeatherSearchComponent, FavoriteWeatherComponent, AnimatedLikeComponent, ToggleButtonComponent, 
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, 
    AppRoutingModule,  
      HttpClientModule,
      FormsModule, 
      BrowserAnimationsModule
    ,MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
      MatButtonModule,
      ReactiveFormsModule,
      FormsModule,MatAutocompleteModule,AppRoutingModule,  RouterModule.forRoot(
        routes,
        { enableTracing: true } // <-- debugging purposes only
      ),
      UiSwitchModule,StoreModule.forRoot({weatherData:weatherDataReducer})

      

  ],

  providers: [WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
