import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';
import { StudentsListComponent } from './components/students-list/students-list.component';
import { StudentsDetailsComponent } from './components/students-details/students-details.component';
import { StudentsFormComponent } from './components/students-form/students-form.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    StudentsComponent,
    StudentsListComponent,
    StudentsDetailsComponent,
    StudentsFormComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    SharedModule
  ]
})
export class StudentsModule { }
