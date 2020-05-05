import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';

import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

class TaskModel {
  constructor(
    public name: string = '',
    public description: string = '',
    public isComplete: boolean = false
  ) { }
}

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  @ViewChild('taskForm') taskForm;
  public mode: string;
  public title: string;

  model = new TaskModel();

  @Output() added = new EventEmitter();
  @Output() edited = new EventEmitter();

  constructor( public modal : NgbActiveModal ) { }

  onSubmit() {

    if(this.mode === 'add') {
      this.added.emit(this.model);
    } else if(this.mode === 'edit') {
      this.edited.emit(this.model);
    }

  }

  reset() {
    this.model = new TaskModel();
    console.log(this.taskForm);
    this.taskForm.reset();
    this.modal.dismiss();
  }

  ngOnInit(): void {
    this.title = this.mode === 'add' ? 'Add new task' : 'Edit task';
  }

}
