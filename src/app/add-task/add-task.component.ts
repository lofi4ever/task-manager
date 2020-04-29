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
  @ViewChild('taskForm') taskForm: ElementRef;

  model = new TaskModel();

  @Output() add = new EventEmitter();

  constructor() { }

  onSubmit(form) {
    this.add.emit(this.model);
    //this.model = new TaskModel();
    //form.reset();
  }

  reset() {
    //this.model = new TaskModel();
    //this.taskForm.nativeElement.reset()
    console.log('form should be reset');
  }

  ngOnInit(): void {
  }

}
