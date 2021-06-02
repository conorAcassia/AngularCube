import {Injectable} from'@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({providedIn: 'root'})

export class chartInfo {
  private info = new Subject<any> ();
  getInfo(){
    return this.info.asObservable();
  }
  addInfo(infoToAdd: string){

    this.info.next({infoToAdd});
  }
  clearInfo(){
    this.info.next();
  }
}
