import {Component, OnInit} from '@angular/core';
import {DataService} from "./services/data.service";
import {map, Subject, tap} from "rxjs";
import {ConvertService} from "./services/convert.service";
import {logMessages} from "@angular-devkit/build-angular/src/tools/esbuild/utils";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  observable$ = this.dataService.get();

  title = 'Learning';
  obj: { [index: string]: string } = {}
  res: Array<{[index: string]: string}> = [];
  isClicked = false

  constructor(private dataService: DataService, private convertService: ConvertService) {
  }

  ngOnInit() {
    this.observable$
      .pipe(
        tap(_ => console.log("stream el", _)),
        map(value => {
          this.obj[value] = this.convertService.getRandomChar()
          return this.obj
        }))
      .subscribe(val => {
        this.res.push(this.obj);
        this.obj = {}
        console.log("piped el", val)
      })
    console.log(this.res)
  }

  addElement() {
    this.dataService.set();
    this.res = [];
    this.observable$
      .pipe(
        tap(_ => console.log("stream el", _)),
        map(value => {
          this.obj[value] = this.convertService.getRandomChar()
          return this.obj
        }))
      .subscribe(val => {
        this.res.push(this.obj);
        this.obj = {}
        console.log("piped el", val)
      })
    console.log(this.res)
  }

  returnZero() {
    return 0
  }

  // log(event) {
  clickHandler(el: any, key: any) {
    console.log(el.value[key])
  }

  protected readonly Object = Object;
}
