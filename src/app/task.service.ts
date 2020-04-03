import { Injectable } from '@angular/core';

import { Task } from './task';
import { TASKS } from './mock-tasks';
import { LogService } from './log.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor( private logService: LogService ) { }

  getTasks(): Task[] {
    this.logService.add('getting tasks');
    return TASKS;
  }
}
