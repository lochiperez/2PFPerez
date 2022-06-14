import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Courses } from 'src/app/shared/interfaces/course.interface';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  courses: Courses[] = [
    { id: 1, course: 'Angular', professor: 'Juan Perez' },
    { id: 2, course: 'React', professor: 'José Garcia' },
    { id: 3, course: 'VueJS', professor: 'Luis Suarez' },
    { id: 4, course: 'Node-JS', professor: 'Marcos Juarez' },
    { id: 5, course: 'Python', professor: 'Pedro Ramires' },
    { id: 6, course: 'Java', professor: 'Juan Perez' },
  ];

  courseToEdit!: Courses | null;

  getCourses(): Observable<Courses[]> {
    return of(this.courses);
  }

  setCourses(courses: Courses[]): Promise<any> {
    return new Promise((resolve, reject) => {
      if (courses.length > 0 || courses !== null) {
        this.courses = courses;
        return resolve({ message: 'Se actualizó la información de los cursos' })
      } else {
        reject({ message: 'No se pudo actualizar la información de los cursos' })
      }
    });
  }

  getCourseToEdit(): Observable<Courses | null> {
    return of(this.courseToEdit)
  }

  setCourseToEdit(course: Courses | null) {
    return new Promise((resolve, reject) => {
      if (course || course === null) {
        this.courseToEdit = course;
        return resolve(true)
      } else {
        return reject({ message: ' No se pudo setear el curso a editar' })
      }
    });
  }

}
