import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {ConvertService} from "../../services/convert.service";
import {map, Observable, Subscription, tap} from "rxjs";

interface Item {
  id: number,
  value: string
}

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit, OnDestroy {

  arrayStream$ = this.dataService.subject$;
  subscription: Subscription = new Subscription;

  obj: Item = {"id": 0, "value": ''};
  res: Array<Item> = [];

  constructor(private dataService: DataService, private convertService: ConvertService) {
  }

  ngOnInit(){

    this.subscription = this.arrayStream$
      .pipe(
        tap(_ => console.log("stream el1", _)),
        map(value => {
          this.convertArrayToArrayOfObject(value);
          return this.res
        }),
      )
      .subscribe(val => {
        console.log("A", val)
      })

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  pushData(val: number) {
    this.dataService.updateSubjectData = val;
  }

  convertArrayToArrayOfObject(arr: Array<number>) {
    if (this.res.length === 0) {
      for (let i = 0; i < arr.length; i++) {
        this.obj = {"id": 0, "value": ''}
        this.obj.id = arr[i];
        this.obj.value = this.convertService.getRandomChar();
        this.res.push(this.obj);
      }
    } else {
      this.obj = {"id": 0, "value": ''}
      this.obj.id = arr[arr.length - 1];
      this.obj.value = this.convertService.getRandomChar();
      this.res.push(this.obj);
    }
  }

  clickHandler(elValue: string) {
    console.log(elValue);
  }

  addElement() {
    if (this.res.length === 0) {
      this.pushData(0);
    } else {
      this.pushData(this.res[this.res.length - 1].id + 1)
    }
  }

  identify(i: number)  {
    return i;
  }


}
