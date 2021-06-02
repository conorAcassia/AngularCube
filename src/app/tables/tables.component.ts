import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { CubejsClient } from '@cubejs-client/ngx';
//import {MatSortModule} from '@angular/material/sort';
//import {MatTableDataSource} from '@angular/material/table';
/*
export interface PeriodicElement {
  name: string;
  position: number;

}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', },
  {position: 2, name: 'Helium', },
  {position: 3, name: 'Lithium', },
  {position: 4, name: 'Beryllium', },
  {position: 5, name: 'Boron', },

];


@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements AfterViewInit{
  displayedColumns: string[] = ['position', 'name'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSortModule) sort: MatSortModule;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
*/

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {

  displayedColumns: string[] = ['name','sum'];

  PieChartCubeData;
  constructor(private cubejs: CubejsClient) { }

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
          "limit": 100
        },

      )
      .subscribe(
        (resultSet) => {
          this.PieChartCubeData = resultSet.chartPivot();
          console.log(this.PieChartCubeData);

        },
        (err) => console.log('HTTP Error', err)
      );

  }

}

