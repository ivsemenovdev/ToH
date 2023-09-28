import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {MessageService} from '../message.service';
import {AntiHeroInterface} from "../manInterface";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagesComponent implements OnInit {

  _config = new BehaviorSubject<AntiHeroInterface>({} as AntiHeroInterface);
  config$ = this._config.asObservable()

  // Создать поток типа Observable<number> из массива и заменить каждый элемент на обьект с id такого номера и произвольной буквой
  // Прокинуть в шаблон и через директиву *ngFor вывести в виде кнопок с названием этих буков при нажатии на которые в консоль будет печататься значение ключа
  // Должно работать асинхронно, без subscribe только async
  // Отдельной кнопкой создавать кнопку с рандомной буквой, номер по порядку возрастанию
  // ...добавлять в subject
  arr = [1,2,3,4,5];

  @Input()
  set config(val: AntiHeroInterface) {
    this._config.next(val);
  }
  get config(): AntiHeroInterface {
    return  this._config.value;
  }

  constructor(public messageService: MessageService) {
    console.log("Constructor", this.config);
  }

  ngOnInit(): void {
    console.log("On Init", this.config);

  }


}
