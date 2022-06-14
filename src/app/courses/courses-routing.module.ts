import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesFormComponent } from './components/courses-form/courses-form.component';
import { CoursesListComponent } from './components/courses-list/courses-list.component';

const routes: Routes = [
  { path: '', component: CoursesListComponent },
  { path: 'addcourse', component: CoursesFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
