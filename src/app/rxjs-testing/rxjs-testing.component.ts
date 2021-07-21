
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mergeMap, map} from 'rxjs/operators';

@Component({
  selector: 'app-rxjs-testing',
  templateUrl: './rxjs-testing.component.html',
  styleUrls: ['./rxjs-testing.component.css']
})
export class RxjsTestingComponent implements OnInit {

  private colour:Color = new Color();
  private driver:Driver = new Driver();
  getColor(){
    this.colour.color= "red";
    return this.colour;
  }
  getDriver(){
    this.driver.driver = "Sean"
    return this.driver;
  }
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const carColor: Color = this.getColor();
    const carDriver: Driver = this.getDriver();
    const carColorObs: Observable <Color> = of(carColor);
    const carDriverObs: Observable <Driver> = of(carDriver);
    const carObs: Observable <Car> = carColorObs.pipe(
      mergeMap(color =>{
        return carDriverObs.pipe(
          map(driver => {
            const car:Car ={
              driver:driver,
              color:color
            };
            return car;
          })
        );
      })
    );
    carObs.subscribe(data => console.log(data));
  }

}
export class Color {
  color: string;
}
export class Driver{
  driver:string;
}
export class Car{
  color:Color;
  driver:Driver;
}
