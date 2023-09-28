import {Component, OnInit} from '@angular/core';
import {DataService} from "./services/data.service";
import {map, tap} from "rxjs";
import {ConvertService} from "./services/convert.service";
import {logMessages} from "@angular-devkit/build-angular/src/tools/esbuild/utils";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Learning';
  obj: {[index: string]:string} = {}
  char: string = ''
  res: Array<Object> = [];

  constructor(private dataService: DataService, private convertService: ConvertService) {
  }

  ngOnInit() {
    this.dataService.get()
      .pipe(
        // tap(_ => console.log(_))
      )
      .subscribe(
        el => {
          this.char = this.convertService.getRandomChar();
          this.obj[el] = this.char
          this.res.push(this.obj)
        });
    console.log(this.res)
  }

  // addElement() {
  //   let r = (Math.floor(Math.random() * 10)).toString();
  //   console.log("random", r);
  //   console.log('Add')
  //   this.dataService.getRandomChar();
  //   // this.dataService.set(1)
  //   this.dataService.get()
  //     .subscribe({
  //         //   res => {
  //         // this.array = res;
  //         // console.log(this.array);
  //         next: value => console.log('next:', value),
  //         error: err => console.log('error:', err),
  //         complete: () => console.log('the end'),
  //       }
  //     );
  // }
}
