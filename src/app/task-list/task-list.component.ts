import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { TaskService } from '../task.service';
import { Task } from '../task';

import { AddTaskComponent } from '../add-task/add-task.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  @ViewChild(AddTaskComponent)
  private test: AddTaskComponent;

  pageTitle = 'Task list';

  tasks: Task[] = [];

  completionFilter = false;
  completionFilterOptions = [
    { name: 'Not complete', value: false },
    { name: 'Complete', value: true },
    { name: 'All', value: null }
  ];

  searchString = '';

  constructor( 
    private taskService: TaskService,
    private modalService: NgbModal
  ) { }

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
        console.log(this.test);
        this.test.reset();
      });
  }

  openAddTaskModal(modal: TemplateRef<any>) {
    this.modalService.open(modal); 
  }

}
