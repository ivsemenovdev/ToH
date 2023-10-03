import {Component, DestroyRef, inject, OnDestroy, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {ConvertService} from "../../services/convert.service";
import {BehaviorSubject, map, Observable, Subscription, tap} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {inspect} from "@rxjs-insights/devtools";

interface ItemInterface {
  id: number,
  value: string
}

export class Item implements ItemInterface {
  id: number;
  value: string;

  constructor(id: number, value: string) {
    this.id = id;
    this.value = value;
  }
}

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})

export class ParentComponent implements OnInit {

  private _buttonsArraySubject = new BehaviorSubject<ItemInterface[]>([]);
  private dataService = inject(DataService)
  private convertService = inject(ConvertService)
  private destroyRef = inject(DestroyRef);

  readonly buttonsArray$ = this._buttonsArraySubject.asObservable();
  inputArray$ = this.dataService.inputArray$;

  ngOnInit() {


    this.inputArray$
      .pipe(
        tap(value => this.convertArrayToArrayOfObject(value)),
        takeUntilDestroyed(this.destroyRef),
        inspect
      )
      .subscribe(val => {
      })

  }

  get buttonsArray() {
    return this._buttonsArraySubject.value
  }

  convertArrayToArrayOfObject(inputArray: number[]) {
    if (!inputArray?.length) {
      return
    }

    const arr: ItemInterface[] = [];

    for (let btn of inputArray) {
      const button: ItemInterface = new Item(btn, this.convertService.randomChar)
      arr.push(button);
    }

    this._buttonsArraySubject.next(arr);
  }

  onButtonClick(button: ItemInterface) {
    console.log(button);
  }

  onAddButtonClick() {

    if (!this.buttonsArray?.length) {
      const newButtonsArray = [...this.buttonsArray];
      newButtonsArray.push(new Item(0, 'x'));
      this._buttonsArraySubject.next(newButtonsArray);
      return
    }
    const newButtonsArray = [...this.buttonsArray];
    newButtonsArray.push(new Item(this.buttonsArray[this.buttonsArray.length - 1].id + 1, this.convertService.randomChar));
    this._buttonsArraySubject.next(newButtonsArray);
  }

  identify(i: number) {
    return i;
  }

}
