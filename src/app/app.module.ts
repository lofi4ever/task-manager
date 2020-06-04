import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskListComponent } from './task-list/task-list.component';
import { LogInfoComponent } from './log-info/log-info.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { PropFilterPipe } from './prop-filter.pipe';
import { SearchByPropPipe } from './search-by-prop.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ErrorInterceptor } from './_helpers';

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    LogInfoComponent,
    AddTaskComponent,
    TaskDetailComponent,
    PropFilterPipe,
    SearchByPropPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
