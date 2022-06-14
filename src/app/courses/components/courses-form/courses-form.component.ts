import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CourseService } from 'src/app/core/services/course.service';
import { Courses } from 'src/app/shared/interfaces/course.interface';

@Component({
  selector: 'app-courses-form',
  templateUrl: './courses-form.component.html',
  styleUrls: ['./courses-form.component.scss']
})
export class CoursesFormComponent implements OnInit, OnDestroy {

  subscriptions: Subscription = new Subscription();

  courseForm: FormGroup;
  courseToEdit!: Courses | null;
  //courses!: Courses[];

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.courseForm = this.fb.group({
      course: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      professor: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    })
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.courseService.getCourseToEdit().subscribe((course) => {
        this.courseToEdit = course;
      })
    );
    if (this.courseToEdit) {
      this.courseForm.get('course')?.patchValue(this.courseToEdit.course)
      this.courseForm.get('professor')?.patchValue(this.courseToEdit.professor)
    }
  }

  onSubmit() {
    /*Evalua si el elemento es nuevo o a editar, si es nuevo agrega el curso al listado de cursos.
    Si es a editar edita el curso segun el id. finalmente actualiza los cursos en el servicio*/
    let courses: Courses[] = [];
    this.subscriptions.add(
      this.courseService.getCourses().subscribe((coursesData) => {
        courses = coursesData
      })
    );
    let index = 1;
    if (courses.length > 0 && !this.courseToEdit) {
      index = courses.length + 1;
      this.courseForm.value['id'] = index;
      courses.push(this.courseForm.value);
    } else if (courses.length === 0) {
      this.courseForm.value['id'] = index;
      courses.push(this.courseForm.value);
    }

    if (this.courseToEdit) {
      let indexOfCourse = courses.findIndex((course) => course.id === this.courseToEdit!.id);
      this.courseForm.value['id'] = this.courseToEdit.id;
      courses[indexOfCourse] = this.courseForm.value;
    }
    this.courseService.setCourses(courses)
      .then((res) => {
        this._snackBar.open(res.message, 'Ok');
        this.router.navigate(['dashboard/courses']);
      })
      .catch((error) => this._snackBar.open(error.message, 'Cerrar'));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
