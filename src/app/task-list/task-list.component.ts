import { Component, OnInit } from '@angular/core';

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

  private addTaskComponentInstance;

  openAddTaskModal() {
    let modalRef = this.modalService.open(AddTaskComponent),
        instance = modalRef.componentInstance;
      instance.mode = 'add';
      instance.added.subscribe((task) => {
        this.addTask(task);
      });
      this.addTaskComponentInstance = instance;
  }

  openEditTaskModal(task) {
    let modalRef = this.modalService.open(AddTaskComponent),
        instance = modalRef.componentInstance;
    instance.mode = 'edit';
    instance.model = task;
    instance.edited.subscribe((task) => {
      this.editTask(task);
    });
    this.addTaskComponentInstance = instance;
  }

  addTask(task: Task): void {
    this.taskService.addTask(task)
      .subscribe(result => {
        let newTasks = this.tasks.slice();
        newTasks.push(result);
        this.tasks = newTasks;
        this.addTaskComponentInstance.reset();
      });
  }

  editTask(task: Task): void {
    this.taskService.editTask(task)
      .subscribe(result => {
        console.log(result);
        let taskPosition = this.tasks.map(el => el.id).indexOf(task.id);
        let newTasks = this.tasks.slice(0, taskPosition);
        newTasks.push(task);
        newTasks = newTasks.concat(
          this.tasks.slice(taskPosition + 1)
        );
        this.tasks = newTasks;
        this.addTaskComponentInstance.reset();
      })
  }

  deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId)
      .subscribe(result => {
        let removedPosition = this.tasks.map(el => el.id).indexOf(result.id);
        let newTasks = this.tasks.slice(0, removedPosition).concat(
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
      });
  }

}
