import { Component } from '@angular/core';
import {GraphComponent} from  './graph/graph.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
  storedCountry = '';
  oldStoredCountry = '';
  somethingClicked = false;
  onTableClicked(dataItem){
    this.oldStoredCountry == this.storedCountry;
    this.storedCountry = dataItem;
    if (!this.somethingClicked){
    this.somethingClicked =true;
    }
  //  else{
   //   this.somethingClicked =false;
   // }
  }
 // toggle(){
 //     this.somethingClicked =false;
 // }
}

