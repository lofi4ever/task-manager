import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Task } from '../task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {

  task: Task;

  constructor(
    private taskService: TaskService,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getTask();
  }

  getTask(): void {
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.taskService.getTask(id)
    .subscribe(task => {
      this.task = task;
    })
  }

  goBack(): void {
    this.location.back();
  }

}
