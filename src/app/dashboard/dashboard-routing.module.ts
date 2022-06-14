import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  // { path: '', redirectTo: 'students'},
  { path: '', component: DashboardComponent, loadChildren: 'students',
    children: [
      { path: '', redirectTo: 'students', pathMatch: 'full' },
      { path: 'students', loadChildren: () => import('../students/students.module')
              .then(m => m.StudentsModule) },
      { path: 'users', loadChildren: () => import('../users/users.module')
              .then(m => m.UsersModule) },
      { path: 'courses', loadChildren: () => import('../courses/courses.module')
              .then(m => m.CoursesModule) },
      { path: 'inscriptions', loadChildren: () => import('../inscriptions/inscriptions.module')
              .then(m => m.InscriptionsModule) }
    ] },
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
