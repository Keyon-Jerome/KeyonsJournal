import { Component } from '@angular/core';
declare var device;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'ng-keyons-journal';

  ngOnInit() {
    // document.addEventListener(“deviceready”, function() {
    //   alert(device.platform);
    //   }, false);
  }
}
