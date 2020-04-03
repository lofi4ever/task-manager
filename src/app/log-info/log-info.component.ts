import { Component, OnInit } from '@angular/core';

import { LogService } from '../log.service';

@Component({
  selector: 'app-log-info',
  templateUrl: './log-info.component.html',
  styleUrls: ['./log-info.component.scss']
})
export class LogInfoComponent implements OnInit {

  constructor( public logService: LogService ) { }

  ngOnInit(): void {
    
  }

}
