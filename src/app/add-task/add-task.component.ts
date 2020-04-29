import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

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

  model = new TaskModel();

  @Output() add = new EventEmitter();

  constructor() { }

  onSubmit() {
    this.add.emit(this.model);
  }

  reset() {
    this.model = new TaskModel();
    console.log(this.taskForm);
    this.taskForm.reset();
  }

  ngOnInit(): void {
  }

}
