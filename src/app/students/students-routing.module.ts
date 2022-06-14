import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsDetailsComponent } from './components/students-details/students-details.component';
import { StudentsFormComponent } from './components/students-form/students-form.component';
import { StudentsListComponent } from './components/students-list/students-list.component';

const routes: Routes = [
  { path: '', component: StudentsListComponent },
  { path: 'studentform', component: StudentsFormComponent },
  { path: ':id', component: StudentsDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
