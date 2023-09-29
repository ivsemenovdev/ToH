import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConvertService {

  s = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

  private getRandomNumber() {
    return Math.floor(Math.random() * (this.s.length - 1))
  }

  getRandomChar() {
    return this.s[this.getRandomNumber()]
  }
}
