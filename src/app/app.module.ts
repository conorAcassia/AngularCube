import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CubejsClientModule } from '@cubejs-client/ngx';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { GraphComponent } from './graph/graph.component';
import { CommonModule } from '@angular/common';
import * as PlotlyJS from 'plotly.js/dist/plotly.js';
import { PlotlyModule } from 'angular-plotly.js';
import { PlotlyComponent } from './plotly/plotly.component';
import { LineChartsComponent } from './line-charts/line-charts.component';
import { HeaderComponent } from './header/header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TablesComponent } from './tables/tables.component';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
//import {MatTableDataSource} from '@angular/material/table';
import { BrowserDetectComponent } from './browser-detect/browser-detect.component';
import {PlatformModule} from '@angular/cdk/platform';
import { TestTableComponent } from './test-table/test-table.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from '@angular/material/card';


const cubejsOptions = {
  token: environment.CUBEJS_API_TOKEN,
  options: { apiUrl: environment.CUBEJS_API_URL }
};

PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  declarations: [
    AppComponent,
    GraphComponent,
    PlotlyComponent,
    LineChartsComponent,
    HeaderComponent,
    TablesComponent,
    BrowserDetectComponent,
    TestTableComponent
  ],
  imports: [
    BrowserModule,
    CubejsClientModule.forRoot(cubejsOptions),
    CommonModule,
    PlotlyModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    //MatTableDataSource,
    PlatformModule
 ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
