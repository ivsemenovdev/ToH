import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConvertService {

  s = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

  private getRandomNumber() {
    return Math.floor(Math.random() * this.s.length - 1)
  }

  getRandomChar() {
    let res = this.s[this.getRandomNumber()]
    return res
  }
}
