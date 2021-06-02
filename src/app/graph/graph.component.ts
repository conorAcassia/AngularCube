import { Component, OnInit, EventEmitter,Output, OnDestroy } from '@angular/core';
import { CubejsClient } from '@cubejs-client/ngx';
import { Subscription } from 'rxjs';
import {chartInfo} from '../chart-info.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})

export class GraphComponent implements OnInit{
  subscription:Subscription;
  pieData;
  PieChartCubeData;

  graph = {
    data: [
        { values: [], labels: [], type: 'pie', hoverinfo: 'label, value' },
    ],
    layout: {width: 750, height: 750, title: '10 Countries with most COVID cases Mar 2020 - March 2021'},

  };

  @Output() ChartClicked = new EventEmitter;

  tableClicked(countryClicked){
    console.log("clicked: " + countryClicked);
    const country = countryClicked;
    this.ChartClicked.emit(country);
  }

  pieChartClicked(data){
   this.pieData = data.points[0].label;
   this.sendInfo();
   this.ChartClicked.emit(this.pieData);
  }




constructor(private cubejs: CubejsClient, private chartInfo : chartInfo) {
}
sendInfo(): void {
  // send message to subscribers via observable subject
  this.chartInfo.addInfo(this.pieData);
}

clearInfo(): void {
  // clear messages
  this.chartInfo.clearInfo();
}


  ngOnInit() {
    this.cubejs
      .load(
        {
          "measures": [
            "CovidCasesByCountry.totalsum"
          ],
          "timeDimensions": [],
          "order": {
            "CovidCasesByCountry.totalsum": "desc"
          },
          "dimensions": [
            "CovidCasesByCountry.countriesAndTerritories"
          ],
          "filters": [],
          "limit": 10
        },

      )
      .subscribe(
        (resultSet) => {
          this.PieChartCubeData = resultSet.chartPivot();
          console.log(this.PieChartCubeData);
          for (let i=0; i< this.PieChartCubeData.length; i++){
            this.graph.data[0].labels[i] = this.PieChartCubeData[i].x;
            this.graph.data[0].values[i] = this.PieChartCubeData[i]['CovidCasesByCountry.totalsum'];
          }
        },
        (err) => console.log('HTTP Error', err)
      );

  }

}
