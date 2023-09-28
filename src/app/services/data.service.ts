import {Injectable} from '@angular/core';
import {from, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  inputArray: Array<number>= [1, 2, 3, 4, 5]

  get(): Observable<number> {
    return from(this.inputArray)
  }

}
