import { Component, OnInit } from '@angular/core';

import { TaskService } from '../task.service';
import { Task } from '../task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = []

  constructor( private taskService: TaskService ) { }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.getTasks()
      .subscribe(tasks => this.tasks = tasks);
  }

  deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId)
      .subscribe(result => {
        this.tasks.splice(
          this.tasks.map(el => el.id).indexOf(result.id), 1
        );
      });
  }

  deleteAll() {
    this.taskService.deleteAll()
      .subscribe(result => {
        console.log(result);
        this.tasks.length = 0;
      })
  }

  addTask(task: Task): void {
    console.log(task);
    this.taskService.addTask(task)
      .subscribe(result => {
        console.log(result);
        this.tasks.push(result);
      });
  }

}
