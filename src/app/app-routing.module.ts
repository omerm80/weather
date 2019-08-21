import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FavoriteWeatherComponent } from './favorite-weather/favorite-weather.component';
import { MainWeatherComponent } from './main-weather/main-weather.component';


const routes: Routes = [
  {path:'',redirectTo:'/main', pathMatch:'full'},

  {path:'favorites',component:FavoriteWeatherComponent},
  {path:'main',component:MainWeatherComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
