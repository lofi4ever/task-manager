import { Component, OnInit, EventEmitter, Output } from '@angular/core';


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

  model = new TaskModel();

  @Output() add = new EventEmitter();

  constructor() { }

  onSubmit(form) {
    this.add.emit(this.model);
    this.model = new TaskModel();
    form.reset();
  }

  ngOnInit(): void {
  }

}
