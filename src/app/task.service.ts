import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

import { Task } from './task';
import { TASKS } from './mock-tasks';
import { LogService } from './log.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasksPath = '/api/tasks';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor( 
    private logService: LogService,
    private http: HttpClient
  ) { }

  getTasks(): Observable<Task[]> {
    this.logService.add('getting tasks');
    return this.http.get<Task[]>(this.tasksPath);
  }

  addTask(task: Task): Observable<Task> {
    this.logService.add('posting task');
    return this.http.post<Task>(this.tasksPath, task, this.httpOptions);
  }
}
