import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {DataService} from "./services/data.service";
import {map, take, tap} from "rxjs";
import {ConvertService} from "./services/convert.service";

interface Item {
  id: number,
  value: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {

  title = 'Learning';

  subject$ = this.dataService.subject$;

  obj: Item = {"id": 0, "value": ''};
  res: Array<Item> = [];

  constructor(private dataService: DataService, private convertService: ConvertService) {
  }

  ngOnInit(): void {

    this.subject$
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

  pushData(val: number) {
    this.dataService.updateSubjectData(val);
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
      console.log(arr)
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
    console.log(i)
    return i;
    }

}
