import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  initialArray: number[] = [1, 2, 4, 66, 77]

  private _inputArraySubject =  new BehaviorSubject<Array<number>>(this.initialArray);
  public inputArray$ = this._inputArraySubject.asObservable();

  set inputArraySetter(val: number) {
    this._inputArraySubject.next([...this._inputArraySubject.value, val]);
  }

  get inputArray(): number[] {
    return this._inputArraySubject.value;
  }

}
