
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'plotly-example',
  template: '<plotly-plot [data]="graph.data" [layout]="graph.layout"></plotly-plot>',
  styleUrls: ['./plotly.component.css']
})
export class PlotlyComponent implements OnInit {
  
  @Input() dataChildReceives;

 
  graph = {
    
    data: [
        { values: [30,20,10], labels: ['USA', 'India', 'Brazil'], type: 'pie' },
    ],
    layout: {width: 750, height: 750, title: '10 Countries with most COVID cases Mar 2020 - March 2021"'}
  };
  ngOnInit(): void {
    
  }
}

