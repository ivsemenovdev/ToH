import {AfterViewInit, Component, ComponentRef, ElementRef, ViewChild} from '@angular/core';
import {Hero} from "./manInterface";
import {MessagesComponent} from "./messages/messages.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewInit {
  title = 'Tour of Heroes';
  configHero = Hero;

  text = 'Другой текст'

  // @ViewChild('message') mes!: ComponentRef<MessagesComponent>
  @ViewChild('message') mes!: ElementRef<MessagesComponent>

  ngAfterViewInit(): void {
    console.log(this.mes.nativeElement);
  }

}
