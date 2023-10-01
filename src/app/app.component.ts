import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from "./services/data.service";
import {first, fromEvent, map, Subject, Subscription, take, takeUntil, tap} from "rxjs";
import {ConvertService} from "./services/convert.service";

interface Item {
  id: number,
  value: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent{
  title = 'Learning';

}
