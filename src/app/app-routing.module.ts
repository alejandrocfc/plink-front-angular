import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListComponent} from './list/list.component';
import {ChangeComponent} from './change/change.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent
  },
  {
    path: 'change',
    component: ChangeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
