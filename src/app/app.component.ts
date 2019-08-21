import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'weather-app';
  allowEntrySite:boolean=false;
  enterSite()
  {
    this.allowEntrySite=true;
  }
 }
