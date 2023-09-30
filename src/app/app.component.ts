import {Component, OnInit} from '@angular/core';
import {DataService} from "./services/data.service";
import {from, map, pipe, Subject, tap} from "rxjs";
import {ConvertService} from "./services/convert.service";
import {logMessages} from "@angular-devkit/build-angular/src/tools/esbuild/utils";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Learning';

  subject = this.dataService.subject;
  observable$ = this.dataService.observable$;

  obj: { [index: string]: string } = {}
  res: Array<{ [index: string]: string }> = [];

  ngOnInit(): void {

    //подписчики
    // this.subject.subscribe(val => {
    //   console.log("A", val)
    // })
    //
    // this.subject.subscribe(val => {
    //   console.log("B", val)
    // })

    this.subject.subscribe(val => {})

    this.observable$
      .pipe(
        // tap(_ => console.log("stream el1", _)),
        map(value => {
          this.obj = {}
          this.obj[value] = this.convertService.getRandomChar()
          this.res.push(this.obj);
          return this.obj
        }))
      // @ts-ignore
      .subscribe(this.subject); // You can subscribe providing a Subject
  }

  constructor(private dataService: DataService, private convertService: ConvertService) {
  }

  addElement() {
    this.dataService.set();
    this.res = [];
    this.observable$
      .pipe(
        map(value => {
          this.obj = {}
          this.obj[value] = this.convertService.getRandomChar()
          return this.obj
        }))
      .subscribe(val => {
        this.res.push(this.obj);
      })
    console.log(this.res)
  }

  returnZero() {
    return 0
  }

  clickHandler(el: any, key: any) {
    console.log(el.value[key])
  }

  protected readonly Object = Object;
}
