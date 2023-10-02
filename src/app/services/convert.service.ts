import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConvertService {

  charItems = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

  private getRandomNumber(charItems: string): number {
    return Math.floor(Math.random() * (charItems?.length - 1))
  }

  get randomChar(): string {
    return this.charItems[this.getRandomNumber(this.charItems)]
  }
}
