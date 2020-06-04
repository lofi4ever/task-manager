import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './_helpers/';

import { TaskListComponent } from './task-list/task-list.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);

const routes: Routes = [
  { 
    path: '',
    children: [
      { path: 'task-list/:id', component: TaskDetailComponent },
      { path: 'task-list', component: TaskListComponent }
    ],
    canActivate: [ AuthGuard ]
  },
  { path: 'account', loadChildren: accountModule },
  { path: '', redirectTo: '/task-list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
