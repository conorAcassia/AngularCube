import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CubejsClient } from '@cubejs-client/ngx';
import { PlotlyComponent } from 'angular-plotly.js';
import { Subscription } from 'rxjs';
import {chartInfo} from '../chart-info.service';

@Component({
  selector: 'app-line-charts',
  template: '<plotly-plot [data]="graph.data" [layout]="graph.layout"></plotly-plot>',
  styleUrls: ['./line-charts.component.css']
})
export class LineChartsComponent implements OnChanges {

  //imports the country variable from the parent app.component

  @Input() country ='';

   //allows you to close subscription from chart-info.service;
  subscription: Subscription;
  //variable used to installize cube data. Should probably be declared equal to chartPivot
  LineChartCubeData;
  graph;
  //variable which contains the info sent via the child - service - child route
  infoData: string = '';

updateData(){
 this.graph = {
    data: [
        { x: [], y: [], type: 'scatter' },
    ],
    layout: {width: 800, height: 800, title: this.country + ' COVID cases over time January 2020 - January 2021'}
  };
}


constructor(private cubejs: CubejsClient, private chartInfo: chartInfo) {

  this.subscription = this.chartInfo.getInfo().subscribe(infoToAdd=> {

    if (infoToAdd) {
      this.infoData = JSON.stringify(infoToAdd);
      this.infoData = this.infoData.substring(14,this.infoData.length - 2);
      console.log("info sent to line chart: " + this.infoData);
    } else {
      console.log("info sent to line chart empty");
      // clear pieData when empty pieData received
      this.infoData = '';
    }

  });

}
  ngOnChanges(changes: SimpleChanges) {
    console.log("changes are : " + changes.country.currentValue);
    this.country = changes.country.currentValue;
    this.infoData = changes.country.currentValue;
    this.updateData();
    this.cubejs
      .load(
        {
          "measures": [],
          "timeDimensions": [],
          "order": [
            [
              "CovidCasesByCountry.countriesAndTerritories",
              "asc"
            ],
            [
              "CovidCasesByCountry.date",
              "asc"
            ]
          ],
          "dimensions": [
            "CovidCasesByCountry.date",
            "CovidCasesByCountry.confirmedcases"
          ],
          "filters": [
            {
              "member": "CovidCasesByCountry.countriesAndTerritories",
              "operator": "equals",
              "values": [
                this.infoData,
                this.country
              ]
            }
          ],
          "limit": 350
        }
      )
      .subscribe(
        (resultSet) => {
          this.LineChartCubeData = resultSet.chartPivot();
        //  console.log(this.LineChartCubeData);
          for (let i=0; i< this.LineChartCubeData.length; i++){
            this.graph.data[0].x[i] = this.LineChartCubeData[i].x;
            this.graph.data[0].y[i] = this.LineChartCubeData[i].xValues[1];
          }
        },
        (err) => console.log('HTTP Error', err)
      );

  }
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
}
}
