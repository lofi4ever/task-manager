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
    this.tasks = this.taskService.getTasks();
  }

}
