import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

import { Task } from './task';
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

  getTask(id: number): Observable<Task> {
    this.logService.add('getting task');
    return this.http.get<Task>(`${this.tasksPath}/${id}`);
  }

  getTasks(): Observable<Task[]> {
    this.logService.add('getting tasks');
    return this.http.get<Task[]>(this.tasksPath);
  }

  addTask(task: Task): Observable<Task> {
    this.logService.add('posting task');
    return this.http.post<Task>(this.tasksPath, JSON.stringify(task), this.httpOptions);
  }

  editTask(task: Task): Observable<Task> {
    return this.http.put<Task>(this.tasksPath, JSON.stringify(task), this.httpOptions);
  }

  deleteTask(taskId: number): Observable<Task> {
    return this.http.delete<Task>(`${this.tasksPath}/${taskId}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(this.tasksPath);
  }
}
