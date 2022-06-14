import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CourseService } from 'src/app/core/services/course.service';
import { UserService } from 'src/app/core/services/user.service';
import { Courses } from 'src/app/shared/interfaces/course.interface';
import { User } from 'src/app/shared/interfaces/user.interface';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit, OnDestroy {

  subscriptions: Subscription = new Subscription();
  user!: User | null;

  courses!: Courses[];
  @ViewChild('table') table!: MatTable<any>;
  displayedColumns = ['id', 'name', 'professor', 'actions'];
  dataSource = new MatTableDataSource(this.courses);

  constructor(
    private userService: UserService,
    private courseService: CourseService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getUserData();
    this.getCourses();
  }

  getUserData() {
    this.subscriptions.add(
      this.userService.getUserData().subscribe((userData) => {
        this.user = userData;
      })
    );
  }

  getCourses() {
    this.subscriptions.add(
      this.courseService.getCourses().subscribe((coursesData) => {
        this.courses = coursesData;
      })
    )
  }

  onClickAdd() {
    this.courseService.setCourseToEdit(null)
      .then(() => this.router.navigate(['dashboard/courses/addcourse']))
      .catch((error) => this._snackBar.open(error.message, 'Cerrar'));
  }

  onClickEdit(course: Courses) { //actualiza el curso a editar en el servicio
    this.courseService.setCourseToEdit(course)
      .then(() => {
        this.router.navigate(['dashboard/courses/addcourse']);
      })
      .catch((error) => {
        this._snackBar.open(error.message, 'Cerrar');
      });
  }

  onClickDelete(course: Courses) {
    /* Se busca el elemento por el id en el array de cursos,
    Se elimina por el index, y luego usando el ViewChild, se renderiza de nuevo la tabla.
    Por ultimo, actualizamos los cursos en el servicio */
    let index = this.courses.findIndex(x => x.id === course.id);
    this.courses.splice(index, 1);
    this.table.renderRows();
    this.onUpdateDeleteCourse(this.courses)
    this.courseService.setCourses(this.courses)
      .then((res) => this._snackBar.open(res.message, 'Ok'))
      .catch((error) => this._snackBar.open(error.message, 'Cerrar'));
  }

  onUpdateDeleteCourse(element: any) {
    /* Una vez editado por el delete, 
    se modifican los ids (para evitar errores en delete) y ademas hace un update del valor de data */
    element.forEach((el: any, index: number) => {
      el['id'] = index + 1
    })
    this.courses = element;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
