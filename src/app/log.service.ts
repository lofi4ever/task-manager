import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  messages: Array<string> = [];

  constructor() { }

  add(message: string): void {
    this.messages.push(message);
  }

  clear(): void {
    this.messages.length = 0;
  }
}
