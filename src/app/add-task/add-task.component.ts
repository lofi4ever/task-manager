import { Component, OnInit } from '@angular/core';


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

  constructor() { }

  onSubmit() {
    alert('form was submited');
    this.model = new TaskModel();
  }

  ngOnInit(): void {
  }

}
