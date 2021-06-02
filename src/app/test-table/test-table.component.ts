/*
So I added a new string to the displayedColumns file, as this is needed for the headers to map out.
in the HTML page I added a new container for the icon header, and created a icon class in this. I also added a
symbol class to the symbol header, as this will need to be accesseed by the css too.

in the CSS file I changed the header width, and accessed the created classes to adjust the width and hide the borders between the
symbol and icon class
ng Changes in the html also works, and I left both included - I'm not sure which will work with the @include(Which is think is from Saas
or a different css program?) so i said I'd leave both in.

*/

import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-test-table',
  templateUrl: './test-table.component.html',
  styleUrls: ['./test-table.component.css']
})
export class TestTableComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'icon'];

  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort) sort: MatSort;

  clicked(){
    console.log("filter clicked");
  }

  constructor() { }

  ngOnInit(): void {
  }



  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

}
