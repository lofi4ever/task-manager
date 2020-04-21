import { Component, OnInit } from '@angular/core';

import { TaskService } from '../task.service';
import { Task } from '../task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  pageTitle = 'Task list';

  tasks: Task[] = [];

  completionFilter = false;
  completionFilterOptions = [
    { name: 'Not complete', value: false },
    { name: 'Complete', value: true },
    { name: 'All', value: null }
  ];

  searchString = '';

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
        var removedPosition = this.tasks.map(el => el.id).indexOf(result.id);
        var newTasks = this.tasks.slice(0, removedPosition).concat(
          this.tasks.slice(removedPosition + 1)
        );
        this.tasks = newTasks;
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
        var newTasks = this.tasks.slice();
        newTasks.push(result);
        this.tasks = newTasks;
      });
  }

}
